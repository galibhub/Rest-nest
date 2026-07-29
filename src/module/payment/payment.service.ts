import {
  PaymentProvider,
  PaymentStatus,
  PropertyAvailability,
  RentalRequestStatus,
  Role,
} from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { createCheckoutSession } from "./payment.utils";

import Stripe from "stripe";
import config from "../../config";
import { stripe } from "../../lib/stripe";



// ===============================
// Create Checkout Session
// ===============================

const createCheckoutSessionIntoDB = async (rentalRequestId: string) => {
  // Find Rental Request
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: {
      id: rentalRequestId,
    },
    include: {
      property: true,
      payment: true,
    },
  });

  if (!rentalRequest) {
    throw new Error("Rental request not found.");
  }

  // Only approved rental requests can pay
  if (rentalRequest.status !== RentalRequestStatus.APPROVED) {
    throw new Error("Only approved rental requests can be paid.");
  }

  // Prevent duplicate payment
  if (rentalRequest.payment) {
    throw new Error("Payment has already been initiated.");
  }

  // Create Stripe Checkout Session
  const session = await createCheckoutSession({
    rentalRequestId: rentalRequest.id,
    propertyTitle: rentalRequest.property.title,
    amount: Number(rentalRequest.property.rentAmount),
  });

  // Save Pending Payment
  await prisma.payment.create({
    data: {
      rentalRequestId: rentalRequest.id,
      transactionId: session.id,
      amount: rentalRequest.property.rentAmount,
      provider: PaymentProvider.STRIPE,
      paymentMethod: "CARD",
      status: PaymentStatus.PENDING,
    },
  });

  return {
    checkoutUrl: session.url,
  };
};

// ===============================
// Stripe Webhook
// ===============================

const handleWebhookIntoDB = async (signature: string, payload: Buffer) => {
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    config.stripe_webhook_secret,
  );

  // Ignore other events
  if (event.type !== "checkout.session.completed") {
    return;
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const rentalRequestId = session.metadata?.rentalRequestId;

  if (!rentalRequestId) {
    throw new Error("Rental request id not found.");
  }

  // Payment exists?
  const payment = await prisma.payment.findUnique({
    where: {
      rentalRequestId,
    },
  });

  if (!payment) {
    throw new Error("Payment not found.");
  }

  // Prevent duplicate webhook execution
  if (payment.status === PaymentStatus.COMPLETED) {
    return;
  }

  await prisma.$transaction(async (tx) => {
    // Complete Payment
    await tx.payment.update({
      where: {
        rentalRequestId,
      },
      data: {
        status: PaymentStatus.COMPLETED,
        paidAt: new Date(),
      },
    });

    // Activate Rental
    await tx.rentalRequest.update({
      where: {
        id: rentalRequestId,
      },
      data: {
        status: RentalRequestStatus.ACTIVE,
      },
    });

    // Get Rental Request
    const rentalRequest = await tx.rentalRequest.findUnique({
      where: {
        id: rentalRequestId,
      },
    });

    if (!rentalRequest) {
      throw new Error("Rental request not found.");
    }

    // Mark Property as Rented
    await tx.property.update({
      where: {
        id: rentalRequest.propertyId,
      },
      data: {
        availability: PropertyAvailability.RENTED,
      },
    });
  });
};

//get all payments

const getAllPayments = async (
  userId: string,
  role: Role,
  query: Record<string, any>,
) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (role === Role.TENANT) {
    where.rentalRequest = {
      tenantId: userId,
    };
  }

  if (role === Role.LANDLORD) {
    where.rentalRequest = {
      property: {
        landlordId: userId,
      },
    };
  }

  const [payments, total] = await Promise.all([
    prisma.payment.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        rentalRequest: {
          include: {
            tenant: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            property: {
              select: {
                id: true,
                title: true,
                rentAmount: true,
              },
            },
          },
        },
      },
    }),

    prisma.payment.count({
      where,
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: payments,
  };
};

const getSinglePayment = async (
  paymentId: string,
  userId: string,
  role: Role,
) => {
  const payment = await prisma.payment.findUnique({
  where: {
    id: paymentId,
  },
  include: {
    rentalRequest: {
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            status: true,
          },
        },
        property: {
          select: {
            id: true,
            landlordId: true,
            title: true,
            address: true,
            city: true,
            rentAmount: true,
            availability: true,
          },
        },
      },
    },
  },
});

  if (!payment) {
    throw new Error("Payment not found.");
  }

  if (role === Role.TENANT && payment.rentalRequest.tenantId !== userId) {
    throw new Error("Unauthorized access.");
  }

  if (
    role === Role.LANDLORD &&
    payment.rentalRequest.property.landlordId !== userId
  ) {
    throw new Error("Unauthorized access.");
  }

  return payment;
};


export const PaymentService = {
  createCheckoutSessionIntoDB,
  handleWebhookIntoDB,
  getAllPayments,
  getSinglePayment,
};
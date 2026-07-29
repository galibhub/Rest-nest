import {
  PropertyAvailability,
  RentalRequestStatus,
} from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreateRentalRequest } from "./rentalRequest.interface";

const createRentalRequest = async (
  payload: ICreateRentalRequest,
  tenantId: string
) => {
  // Check property exists
  const property = await prisma.property.findUnique({
    where: {
      id: payload.propertyId,
    },
  });

  if (!property) {
    throw new Error("Property not found.");
  }

  // Check property availability
  if (property.availability !== PropertyAvailability.AVAILABLE) {
    throw new Error("Property is not available.");
  }

  // Prevent requesting own property
  if (property.landlordId === tenantId) {
    throw new Error("You cannot request your own property.");
  }

  // Check duplicate pending request
  const existingRequest = await prisma.rentalRequest.findFirst({
    where: {
      tenantId,
      propertyId: payload.propertyId,
      status: RentalRequestStatus.PENDING,
    },
  });

  if (existingRequest) {
    throw new Error(
      "You already have a pending request for this property."
    );
  }

  // Create rental request
  const rentalRequest = await prisma.rentalRequest.create({
    data: {
      tenantId,
      propertyId: payload.propertyId,
      moveInDate: payload.moveInDate,
      message: payload.message,
      status: RentalRequestStatus.PENDING,
    },
    include: {
      tenant: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
        },
      },
      property: {
        select: {
          id: true,
          title: true,
          city: true,
          rentAmount: true,
          availability: true,
        },
      },
    },
  });

  return rentalRequest;
};

//get landlord rental request
const getLandlordRentalRequests = async (landlordId: string) => {
  const result = await prisma.rentalRequest.findMany({
    where: {
      property: {
        landlordId,
      },
    },

    select: {
      id: true,
      moveInDate: true,
      status: true,
      createdAt: true,

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
          city: true,
          rentAmount: true,
          availability: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};


//aprrove rental

const approveRentalRequest = async (
  requestId: string,
  landlordId: string
) => {
  // Step 1: Find rental request
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: {
      id: requestId,
    },
    include: {
      property: true,
    },
  });

  // Step 2: Check request exists
  if (!rentalRequest) {
    throw new Error("Rental request not found.");
  }

  // Step 3: Ownership check
  if (rentalRequest.property.landlordId !== landlordId) {
    throw new Error(
      "You are not authorized to approve this rental request."
    );
  }

  // Step 4: Request must be pending
  if (rentalRequest.status !== RentalRequestStatus.PENDING) {
    throw new Error("Only pending rental requests can be approved.");
  }

  // Step 5: Property must be available
  if (
    rentalRequest.property.availability !==
    PropertyAvailability.AVAILABLE
  ) {
    throw new Error("Property is no longer available.");
  }

  // Step 6: Transaction
  await prisma.$transaction(async (tx) => {
    // Update Property
    await tx.property.update({
      where: {
        id: rentalRequest.propertyId,
      },
      data: {
        availability: PropertyAvailability.RENTED,
      },
    });

    // Update Rental Request
    await tx.rentalRequest.update({
      where: {
        id: requestId,
      },
      data: {
        status: RentalRequestStatus.APPROVED,
      },
    });
  });

  // Step 7: Fetch latest updated data
  const result = await prisma.rentalRequest.findUnique({
    where: {
      id: requestId,
    },
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
          city: true,
          rentAmount: true,
          availability: true,
        },
      },
    },
  });

  return result;
};

//reject rental request
const rejectRentalRequest = async (
  requestId: string,
  landlordId: string
) => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: {
      id: requestId,
    },
    include: {
      property: true,
    },
  });

  if (!rentalRequest) {
    throw new Error("Rental request not found.");
  }

  if (rentalRequest.property.landlordId !== landlordId) {
    throw new Error(
      "You are not authorized to reject this rental request."
    );
  }

  if (rentalRequest.status !== RentalRequestStatus.PENDING) {
    throw new Error("Only pending rental requests can be rejected.");
  }

  const result = await prisma.rentalRequest.update({
    where: {
      id: requestId,
    },
    data: {
      status: RentalRequestStatus.REJECTED,
    },
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
          city: true,
          rentAmount: true,
          availability: true,
        },
      },
    },
  });

  return result;
};




const getAllRentalRequests = async (query: Record<string, any>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query.status) {
    where.status = query.status;
  }

  const [rentalRequests, total] = await Promise.all([
    prisma.rentalRequest.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
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
            title: true,
            address: true,
            city: true,
            rentAmount: true,
            availability: true,

            landlord: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },

        payment: {
          select: {
            id: true,
            amount: true,
            provider: true,
            status: true,
            paidAt: true,
          },
        },
      },
    }),

    prisma.rentalRequest.count({
      where,
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: rentalRequests,
  };
};





export const RentalRequestService = {
  createRentalRequest,
  getLandlordRentalRequests,
  approveRentalRequest,
  rejectRentalRequest,
  getAllRentalRequests
};
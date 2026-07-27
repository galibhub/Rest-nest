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

export const RentalRequestService = {
  createRentalRequest,
};
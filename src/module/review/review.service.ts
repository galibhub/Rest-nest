import { RentalRequestStatus } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createReview = async (
  userId: string,
  payload: {
    propertyId: string;
    rating: number;
    comment?: string;
  }
) => {
  // Property exists?
  const property = await prisma.property.findUnique({
    where: {
      id: payload.propertyId,
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  // Rental completed?
  const rentalRequest = await prisma.rentalRequest.findFirst({
    where: {
      tenantId: userId,
      propertyId: payload.propertyId,
      status: RentalRequestStatus.ACTIVE,
    },
  });

  if (!rentalRequest) {
    throw new Error(
      "You can review only after completing the rental."
    );
  }

  // Already reviewed?
  const existingReview = await prisma.review.findFirst({
    where: {
      tenantId: userId,
      propertyId: payload.propertyId,
    },
  });

  if (existingReview) {
    throw new Error(
      "You have already reviewed this property."
    );
  }

  // Create review
  const review = await prisma.review.create({
    data: {
      tenantId: userId,
      propertyId: payload.propertyId,
      rating: payload.rating,
      comment: payload.comment,
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
        },
      },
    },
  });

  return review;
};

const getAllReviews = async () => {
  const reviews = await prisma.review.findMany({
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
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews;
};



const getSingleReview = async (id: string) => {
  const review = await prisma.review.findUnique({
    where: {
      id,
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
        },
      },
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  return review;
};

const updateReview = async (
  reviewId: string,
  userId: string,
  payload: {
    rating?: number;
    comment?: string;
  }
) => {
  // 1. Review exists?
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  // 2. Only owner can update
  if (review.tenantId !== userId) {
    throw new Error("You are not authorized to update this review");
  }

  // 3. Update review
  const updatedReview = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: payload,
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
        },
      },
    },
  });

  return updatedReview;
};

const deleteReview = async (reviewId: string, userId: string) => {
  // 1. Review exists?
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  // 2. Only owner can delete
  if (review.tenantId !== userId) {
    throw new Error("You are not authorized to delete this review");
  }

  // 3. Delete review
  const deletedReview = await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  return deletedReview;
};

export const ReviewService = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview
};
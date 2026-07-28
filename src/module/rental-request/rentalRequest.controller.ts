import { Request, Response } from "express";

import { RentalRequestService } from "./rentalRequest.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createRentalRequest = catchAsync(
  async (req: Request, res: Response) => {
    const result = await RentalRequestService.createRentalRequest(
      req.body,
      req.user!.id
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Rental request submitted successfully.",
      data: result,
    });
  }
);


//get lanloard rental request
const getLandlordRentalRequests = catchAsync(async (req, res) => {
  const result = await RentalRequestService.getLandlordRentalRequests(
    req.user!.id
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Rental requests retrieved successfully.",
    data: result,
  });
});


//approve rental

const approveRentalRequest = catchAsync(async (req, res) => {
  const result = await RentalRequestService.approveRentalRequest(
    req.params.id as string,
    req.user!.id
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Rental request approved successfully.",
    data: result,
  });
});

//reject rental request

const rejectRentalRequest = catchAsync(async (req, res) => {
  const result = await RentalRequestService.rejectRentalRequest(
    req.params.id as string,
    req.user!.id
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Rental request rejected successfully.",
    data: result,
  });
});

export const RentalRequestController = {
  createRentalRequest,
  getLandlordRentalRequests,
  approveRentalRequest,
  rejectRentalRequest
};
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

export const RentalRequestController = {
  createRentalRequest,
};
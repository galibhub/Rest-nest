import { Request, Response } from "express";

import { PaymentService } from "./payment.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createCheckoutSession = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PaymentService.createCheckoutSessionIntoDB(
      req.body.rentalRequestId
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Checkout session created successfully.",
      data: result,
    });
  }
);

//webhook
const handleWebhook = catchAsync(
  async (req: Request, res: Response) => {
    const signature = req.headers["stripe-signature"] as string;

    await PaymentService.handleWebhookIntoDB(signature, req.body);

    res.status(200).json({
      received: true,
    });
  }
);

export const PaymentController = {
  createCheckoutSession,
  handleWebhook
};
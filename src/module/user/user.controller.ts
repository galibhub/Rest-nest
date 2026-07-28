import { Request, Response } from "express";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Users retrieved successfully",
    data: result,
  });
});

const updateUserStatus = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.id as string;
    const { status } = req.body;

    const result = await UserService.updateUserStatus(userId, status);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User status updated successfully",
      data: result,
    });
  }
);

export const UserController = {
  getAllUsers,
  updateUserStatus,
};
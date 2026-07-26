import { Request, Response } from "express";

import { CategoryService } from "./category.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createCategory = catchAsync(
  async (req: Request, res: Response) => {

    const result = await CategoryService.createCategory(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Category created successfully",
      data: result,
    });

  }
);

const getAllCategories = catchAsync(
  async (req: Request, res: Response) => {

    const result = await CategoryService.getAllCategories();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Categories retrieved successfully",
      data: result,
    });

  }
);

export const CategoryController = {
  createCategory,
  getAllCategories,
};
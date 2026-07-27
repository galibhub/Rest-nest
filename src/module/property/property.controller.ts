import { Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { propertyService } from "./property.service";


const createProperty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await propertyService.createProperty(
      req.body,
      req.user!.id
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Property created successfully",
      data: result,
    });
  }
);
//get all properties
const getAllProperties = catchAsync(
  async (req: Request, res: Response) => {
    const result = await propertyService.getAllProperties();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Properties retrieved successfully",
      data: result,
    });
  }
);




export const PropertyController = {
  createProperty,
  getAllProperties,
};
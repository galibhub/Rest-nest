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



// Get Single Property

const getSingleProperty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await propertyService.getSingleProperty(req.params.id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Property retrieved successfully",
      data: result,
    });
  }
);


// Update Property

const updateProperty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await propertyService.updateProperty(
      req.params.id as string,
      req.body,
      req.user!.id
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Property updated successfully",
      data: result,
    });
  }
);


// Delete Property

const deleteProperty = catchAsync(
  async (req: Request, res: Response) => {
    await propertyService.deleteProperty(
      req.params.id as string,
      req.user!.id
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Property deleted successfully",
      data: null,
    });
  }
);




export const PropertyController = {
  createProperty,
  getAllProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
};
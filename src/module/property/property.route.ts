import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../prisma/generated/prisma/enums";
import validateRequest from "../../middleware/validateRequest";
import { PropertyValidation } from "./property.validation";
import { PropertyController } from "./property.controller";

const router= Router()

router.post("/",auth(Role.LANDLORD),validateRequest(PropertyValidation.createPropertyValidationSchema),PropertyController.createProperty)

router.get("/", PropertyController.getAllProperties);

export const PropertyRoutes = router;
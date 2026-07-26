import express, { Application, Request, Response } from "express"
import cors from "cors";
import config from "./config";
import cookieParser from "cookie-parser";
import { AuthRoutes } from "./module/auth/auth.route";
import { PropertyRoutes } from "./module/property/property.route";
import { CategoryRoutes } from "./module/category/category.route";
const app : Application = express();

//middleware
app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



//root route
app.get("/",(req:Request, res: Response)=>{
    res.send("RestNest Server is Running Now")
})

app.use("/api/auth",AuthRoutes)
app.use("/api/properties",PropertyRoutes)

app.use("/api/categories", CategoryRoutes);

export default app;
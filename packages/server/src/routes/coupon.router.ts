import { Router } from "express";
import { addCoupon } from "../controllers/coupon.controller";
import { verifyToken } from "../middlewares";

const couponRouter: Router = Router();

couponRouter.post("/add", verifyToken, addCoupon);

export default couponRouter;

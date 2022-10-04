import { Router } from "express";
import {
  addCoupon,
  getCoupons,
  removeCoupon,
  updateCoupon
} from "../controllers/coupon.controller";
import { verifyToken } from "../middlewares";

const couponRouter: Router = Router();

couponRouter.post("/add", verifyToken, addCoupon);
couponRouter.post("/update", verifyToken, updateCoupon);
couponRouter.post("/remove", verifyToken, removeCoupon);
couponRouter.get("/all", verifyToken, getCoupons);

export default couponRouter;

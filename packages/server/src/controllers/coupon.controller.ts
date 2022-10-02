import { CouponBodyType } from "@coupons-manager/common";
import { Request, Response } from "express";
import { db } from "../db";
import { CustomRequestType } from "./user.controller";

export const addCoupon = (req: Request, res: Response) => {
  const data: CouponBodyType = req.body;
  const userId = (req as CustomRequestType).userId;
  data.userId = userId;
  const d = db.coupon.create({
    data: { ...data }
  });
};

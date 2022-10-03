import { Request, Response } from "express";
import { CustomRequestType } from "./user.controller";
import { db } from "../db";
import { Coupon } from "@prisma/client";

export const addCoupon = async (req: Request, res: Response) => {
  const data: Coupon = req.body;
  const userId = (req as CustomRequestType).userId;
  data.userId = userId;

  try {
    const coupon = await db.coupon.create({
      data: {
        ...data,
        usedDate: data.usedDate ? new Date(data.usedDate) : undefined,
        expiryDate: new Date(data.expiryDate),
        status: "Open"
      }
    });
    res.status(201).json(coupon);
  } catch (error: any) {
    console.log(error);
  }
};

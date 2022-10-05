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
    console.log(coupon);
    res.status(201).json(coupon);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ msg: "Unable to save coupon. Please try again" });
  }
};

export const removeCoupon = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const coupon = await db.coupon.delete({ where: { id } });
    res.status(200).json(coupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Unable to delete coupon, Please try again" });
  }
};

export const updateCoupon = async (req: Request, res: Response) => {
  const data: Coupon = req.body;
  const userId = (req as CustomRequestType).userId;
  data.userId = userId;
  try {
    const usedDate = data.usedDate ? new Date(data.usedDate) : undefined;
    const expiryDate = data.expiryDate ? new Date(data.expiryDate) : undefined;
    const { id, ...dataToUpdate } = data;
    const coupon = await db.coupon.update({
      where: { id },
      data: { ...dataToUpdate, usedDate, expiryDate }
    });
    res.status(200).json(coupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Unable to update coupon. Please try again" });
  }
};

export const getCoupons = async (req: Request, res: Response) => {
  const userId = (req as CustomRequestType).userId;
  try {
    const coupons = await db.coupon.findMany({ where: { userId } });
    res.status(200).json(coupons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Unable to fetch coupons. Please try again" });
  }
};

import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { CustomRequestType } from "../controllers/user.controller";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const sanitizeUserInput = () => {
  return [body("username").trim().escape(), body("password").trim().escape()];
};

export type UserIdType = { id: string };

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = <string>req.cookies.token;
  if (!token) return res.status(403).send({ auth: false, msg: "No token" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as UserIdType;
    console.log(`User ${decoded.id} verified`);
    (req as CustomRequestType).userId = decoded.id;
    next();
  } catch (err: any) {
    console.error(err);
    return res
      .status(401)
      .clearCookie("token")
      .json({ msg: `Invalid Token ${err.message}` });
  }
};

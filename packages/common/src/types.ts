export type UserType = {
  id: string | null;
  name: string;
  username: string;
  email: string;
  auth: boolean;
};

export type CouponBodyType = {
  id: string | null;
  userId: string;
  title: string;
  provider: string;
  targetApp: string;
  usedDate?: Date;
  expiryDate: Date;
  couponCode?: string;
  status: string;
};

export type ErrorMessageType = { msg: string };

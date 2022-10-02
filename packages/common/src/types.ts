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
  description: string;
  provider: string;
  targetApp: string;
  usedDate?: Date;
  expiryDate: Date;
  couponCode?: string;
  status: string;
};

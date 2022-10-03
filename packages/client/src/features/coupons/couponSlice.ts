import { CouponBodyType } from "@coupons-manager/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialStateCoupons: CouponBodyType[] = [];

const initialState = localStorage.getItem("coupons")
  ? (JSON.parse(localStorage.getItem("coupons") as string) as CouponBodyType[])
  : initialStateCoupons;

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    addCoupon: (state, action: PayloadAction<CouponBodyType>) => {
      state.push(action.payload);
    },
    removeCoupon: (state, action: PayloadAction<string>) => {
      return state.filter((coupon) => coupon.id !== action.payload);
    }
  }
});

export const { addCoupon, removeCoupon } = couponSlice.actions;

const couponReducer = couponSlice.reducer;

export default couponReducer;

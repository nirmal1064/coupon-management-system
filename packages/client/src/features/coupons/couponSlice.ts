import { CouponType } from "@coupons-manager/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialStateCoupons: CouponType[] = [];

const initialState = localStorage.getItem("coupons")
  ? (JSON.parse(localStorage.getItem("coupons") as string) as CouponType[])
  : initialStateCoupons;

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    loadCoupons: (state, action: PayloadAction<CouponType[]>) => {
      return action.payload;
    },
    addCoupon: (state, action: PayloadAction<CouponType>) => {
      state.push(action.payload);
    },
    removeCoupon: (state, action: PayloadAction<string>) => {
      return state.filter((coupon) => coupon.id !== action.payload);
    },
    updateCoupon: (state, action: PayloadAction<CouponType>) => {
      const idx = state.findIndex((coupon) => coupon.id === action.payload.id);
      state[idx] = action.payload;
    },
    clearCoupons: (state) => {
      return initialStateCoupons;
    }
  }
});

export const { loadCoupons, addCoupon, removeCoupon, clearCoupons } =
  couponSlice.actions;

const couponReducer = couponSlice.reducer;

export default couponReducer;

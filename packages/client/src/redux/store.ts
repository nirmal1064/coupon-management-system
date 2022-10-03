import { configureStore } from "@reduxjs/toolkit";
import couponReducer from "../features/coupons/couponSlice";
import userReducer from "../features/user/userSlice";

const couponMiddleware = (store: any) => (next: any) => (action: any) => {
  let result;
  if (action.type.startsWith("coupon")) {
    result = next(action);
    const coupons = store.getState().coupons;
    localStorage.setItem("coupons", JSON.stringify(coupons));
  } else {
    result = next(action);
  }
  return result;
};

export const store = configureStore({
  reducer: {
    users: userReducer,
    coupons: couponReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(couponMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

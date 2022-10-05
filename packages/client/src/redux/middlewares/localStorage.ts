import { AnyAction, Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const localStorageMiddleware: Middleware<{}, RootState> =
  (storeAPI) => (next) => (action: AnyAction) => {
    const result = next(action);
    if (action.type.startsWith("coupon")) {
      const coupons = storeAPI.getState().coupons;
      localStorage.setItem("coupons", JSON.stringify(coupons));
    } else if (action.type.startsWith("auth")) {
      const user = storeAPI.getState().users;
      localStorage.setItem("user", JSON.stringify(user));
    }
    if (action.type === "auth/clearState") {
      localStorage.removeItem("user");
    }
    if (action.type === "coupon/clearCoupons") {
      localStorage.removeItem("coupons");
    }
    return result;
  };

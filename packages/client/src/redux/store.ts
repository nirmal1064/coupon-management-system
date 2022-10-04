import { combineReducers, configureStore } from "@reduxjs/toolkit";
import couponReducer from "../features/coupons/couponSlice";
import userReducer from "../features/user/userSlice";
import { localStorageMiddleware } from "./middlewares/localStorage";

const reducer = combineReducers({ users: userReducer, coupons: couponReducer });

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

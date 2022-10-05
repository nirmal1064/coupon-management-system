import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { localStorageMiddleware } from "./middlewares/localStorage";
import couponReducer from "./slices/couponSlice";
import userReducer from "./slices/userSlice";

const reducer = combineReducers({ users: userReducer, coupons: couponReducer });

export const store = configureStore({
  reducer,
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

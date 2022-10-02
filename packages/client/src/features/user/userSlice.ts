import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@coupons-manager/common";

const initialStateUser: UserType = {
  id: null,
  name: "",
  username: "",
  email: "",
  auth: false
};

const initialState = localStorage.getItem("user")
  ? (JSON.parse(localStorage.getItem("user") as string) as UserType)
  : initialStateUser;

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserType>) => {
      return { ...state, ...action.payload };
    },
    clearState: (state) => {
      return initialStateUser;
    }
  }
});

export const { login, clearState } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;

import { ErrorMessageType } from "@coupons-manager/common";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import API from "../api";
import { addCoupon } from "../redux/slices/couponSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const style = { width: "350px" };

const AddCoupon = () => {
  const user = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const [errorMsg, setErrorMsg] = useState("");

  const handleAddCoupon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    e.currentTarget.reset();
    const body: { [key: string]: string } = {};
    formData.forEach((value, key) => (body[key] = value.toString()));
    body["userId"] = user.id as string;
    const requestBody = JSON.stringify(body);
    API.post("/coupon/add", requestBody)
      .then((res: AxiosResponse) => {
        const { data } = res;
        console.log(data);
        dispatch(addCoupon(data));
      })
      .catch((err: AxiosError<ErrorMessageType>) => {
        const msg = err.response?.data.msg as string;
        setErrorMsg(msg);
      });
  };

  return (
    <>
      <Typography component="h1" variant="h4" style={{ textAlign: "center" }}>
        Add Coupon
      </Typography>
      <Box component="form" onSubmit={handleAddCoupon}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          style={{ flexWrap: "wrap", justifyContent: "space-around" }}>
          <TextField
            style={style}
            required
            fullWidth
            id="title"
            label="Title"
            margin="normal"
            name="title"
            autoFocus
          />
          <TextField
            style={style}
            required
            fullWidth
            id="provider"
            label="Provider"
            margin="normal"
            name="provider"
          />
          <TextField
            style={style}
            required
            fullWidth
            id="targetApp"
            label="Target App"
            margin="normal"
            name="targetApp"
          />
          <TextField
            style={style}
            fullWidth
            id="couponCode"
            margin="normal"
            name="couponCode"
            label="Coupon Code"
          />
          <TextField
            style={style}
            type="date"
            required
            fullWidth
            id="expiryDate"
            label="Expiry Date"
            margin="normal"
            name="expiryDate"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            style={style}
            type="date"
            fullWidth
            id="usedDate"
            label="Used Date"
            margin="normal"
            name="usedDate"
            InputLabelProps={{ shrink: true }}
          />
        </Stack>
        {errorMsg && (
          <Alert onClose={() => setErrorMsg("")} severity="error">
            {errorMsg}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2, marginBottom: 3 }}>
          Add Coupon
        </Button>
      </Box>
    </>
  );
};

export default AddCoupon;

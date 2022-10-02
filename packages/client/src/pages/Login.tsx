import LockPersonIcon from "@mui/icons-material/LockPerson";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import { AxiosError, AxiosResponse } from "axios";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../features/user/userSlice";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const password = data.get("password");
    const username = data.get("username");
    if (!password || !username) {
      setErrorMsg("Please Fill in the fields");
      return;
    }
    const body = JSON.stringify({ password, username });
    API.post("/api/login", body)
      .then((res: AxiosResponse) => {
        const { data } = res;
        dispatch(login(data));
        localStorage.setItem("user", JSON.stringify(data));
        console.log("Login Successfull going to home");
        navigate("/");
      })
      .catch((err: AxiosError) => {
        console.error(err);
      });
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}>
        <Avatar sx={{ margin: 1, bgcolor: "#4287f5" }}>
          <LockPersonIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Login
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            id="username"
            label="Enter Username"
            margin="normal"
            name="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2, marginBottom: 3 }}>
            Log In
          </Button>
          {errorMsg && (
            <Alert onClose={() => setErrorMsg("")} severity="error">
              {errorMsg}
            </Alert>
          )}
        </Box>
        <Typography variant="h6">
          Don't have an Account?{" "}
          <Link
            to={"/register"}
            style={{ textDecoration: "none", color: "blue" }}>
            Register
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default Login;

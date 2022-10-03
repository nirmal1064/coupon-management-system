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

const Register = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirm-password");
    const username = data.get("username");
    const name = data.get("name");
    if (!email || !password || !confirmPassword || !username || !name) {
      setErrorMsg("Please Fill in the fields");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords doesn't match");
      return;
    }
    const body = JSON.stringify({ email, password, name, username });
    API.post("/api/register", body)
      .then((res: AxiosResponse) => {
        navigate("/");
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data);
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
          Register
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            id="name"
            label="Enter Name"
            margin="normal"
            name="name"
            autoFocus
          />
          <TextField
            required
            fullWidth
            id="username"
            label="Enter Username"
            margin="normal"
            name="username"
          />
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            margin="normal"
            name="email"
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
          />
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
            Register
          </Button>
        </Box>
        <Typography variant="h6" mb={2}>
          Already have an Account?{" "}
          <Link to={"/login"} style={{ textDecoration: "none", color: "blue" }}>
            Login
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default Register;

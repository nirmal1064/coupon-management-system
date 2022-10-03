import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import AddCoupon from "./pages/AddCoupon";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddCoupon />} />
          </Route>
        </Routes>
      </Container>
    </>
  );
};

export default App;

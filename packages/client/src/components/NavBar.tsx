import MenuIcon from "@mui/icons-material/Menu";
import RedeemIcon from "@mui/icons-material/Redeem";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { clearState } from "../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const drawerWidth = 240;

const TITLE = "Coupons Manager";

const unauthorizedLinks = [
  { to: "/login", text: "Login" },
  { to: "/register", text: "Register" }
];

const authorizedLinks = [
  { to: "/", text: "Home" },
  { to: "/add", text: "Add Coupon" },
  { to: "/view", text: "My Coupons" }
];

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.users).auth;
  const links = auth ? authorizedLinks : unauthorizedLinks;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    API.post("/api/logout")
      .then((res: AxiosResponse) => {
        dispatch(clearState());
      })
      .catch((err: AxiosError) => {
        dispatch(clearState());
      });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {TITLE}
      </Typography>
      <Divider />
      <List>
        {links.map(({ to, text }) => (
          <ListItem key={to} disablePadding>
            <ListItemButton sx={{ justifyContent: "center" }}>
              <Link to={to} style={{ textDecoration: "none", color: "black" }}>
                {text}
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
        {auth && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Logout"} onClick={handleLogout} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }} mb="2rem">
      <AppBar component="nav" position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <RedeemIcon sx={{ display: { xs: "none", sm: "block" }, mr: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            {TITLE}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {links.map(({ to, text }) => (
              <Button key={to} sx={{ color: "#fff" }}>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={to}>
                  {text}
                </Link>
              </Button>
            ))}
            {auth && (
              <Button sx={{ color: "#fff" }} onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}>
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavBar;

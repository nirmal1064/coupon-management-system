import { CouponType } from "@coupons-manager/common";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

type AddCouponModalType = {
  open: boolean;
  title?: string;
  handleClose: () => void;
  coupon?: CouponType;
};

const style = { width: "250px" };

const AddCouponModal = ({
  open,
  handleClose,
  title = "Add Coupon",
  coupon
}: AddCouponModalType) => {
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography style={{ textAlign: "center", fontSize: "24px" }}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box component="form">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            style={{ flexWrap: "wrap", justifyContent: "space-around" }}>
            <TextField
              style={style}
              required
              fullWidth
              value={coupon?.title}
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
              value={coupon?.provider}
              id="provider"
              label="Provider"
              margin="normal"
              name="provider"
            />
            <TextField
              style={style}
              required
              fullWidth
              value={coupon?.targetApp}
              id="targetApp"
              label="Target App"
              margin="normal"
              name="targetApp"
            />
            <TextField
              style={style}
              fullWidth
              value={coupon?.couponCode}
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
              value={coupon?.expiryDate.toString().slice(0, 10)}
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
              value={coupon?.usedDate ? coupon?.usedDate : ""}
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
            sx={{ marginTop: 2, marginBottom: 0 }}>
            Add Coupon
          </Button>
        </Box>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleClose}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCouponModal;

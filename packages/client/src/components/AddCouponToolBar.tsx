import { Button } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";

type AddCouponToolBarType = { handleClick: () => void };

const AddCouponToolBar = ({ handleClick }: AddCouponToolBarType) => {
  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClick}>
        Add Coupon
      </Button>
    </GridToolbarContainer>
  );
};

export default AddCouponToolBar;

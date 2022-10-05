import { CouponType, ErrorMessageType } from "@coupons-manager/common";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
  GridValueFormatterParams
} from "@mui/x-data-grid";
import { AxiosError, AxiosResponse } from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import API from "../api";
import CouponModal from "../components/CouponModal";
import AddCouponToolBar from "../components/AddCouponToolBar";
import {
  addCoupon,
  clearCoupons,
  loadCoupons,
  removeCoupon
} from "../redux/slices/couponSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const width = 150;

const CouponList = () => {
  const coupons = useAppSelector((state) => state.coupons);
  const user = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const [selectedCoupons, setSelectedCoupons] = useState<GridRowId[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState<CouponType | undefined>();
  const [action, setAction] = useState<"add" | "edit">("add");
  const [errorMsg, setErrorMsg] = useState("");

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body: { [key: string]: string } = {};
    formData.forEach((value, key) => (body[key] = value.toString()));
    body["userId"] = user.id as string;
    setCurrentCoupon(undefined);
    const requestBody = JSON.stringify(body);
    API.post("/coupon/add", requestBody)
      .then((res: AxiosResponse) => {
        const { data } = res;
        dispatch(addCoupon(data));
      })
      .catch((err: AxiosError<ErrorMessageType>) => {
        const msg = err.response?.data.msg as string;
      });
  };

  const handleDelete = (e: SyntheticEvent, id: GridRowId) => {
    e.stopPropagation();
    dispatch(removeCoupon(id as string));
  };

  const handleEdit = (e: SyntheticEvent, id: GridRowId) => {
    e.stopPropagation();
    const coupon = coupons.find((coupon) => coupon.id === id) as CouponType;
    setCurrentCoupon(coupon);
    setAction("edit");
    setIsFormOpen(true);
  };

  const openFormModal = () => {
    setIsFormOpen(true);
    setAction("add");
  };

  const AddToolBar = () => <AddCouponToolBar handleClick={openFormModal} />;

  const closeFormModal = () => {
    setIsFormOpen(false);
    setCurrentCoupon(undefined);
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width, editable: true },
    { field: "provider", headerName: "Provider", width, editable: true },
    { field: "targetApp", headerName: "Target", width, editable: true },
    { field: "couponCode", headerName: "Coupon", width, editable: true },
    {
      field: "usedDate",
      headerName: "Used Date",
      type: "date",
      width,
      editable: true
    },
    {
      field: "expiryDate",
      headerName: "Expiry Date",
      width,
      type: "date",
      editable: true,
      valueFormatter: (params: GridValueFormatterParams) => {
        const dt = new Date(params.value);
        return dt.toISOString().split("T")[0];
      }
    },
    { field: "status", headerName: "Status", width, editable: true },
    {
      field: "edit",
      headerName: "Action",
      width: 100,
      type: "actions",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              onClick={(e) => handleEdit(e, params.id)}
            />
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={(e) => handleDelete(e, params.id)}
            />
          </>
        );
      }
    }
  ];

  useEffect(() => {
    API.get("/coupon/all")
      .then((res: AxiosResponse<CouponType[]>) => {
        const { data } = res;
        dispatch(loadCoupons(data));
      })
      .catch((err: AxiosError) => {
        dispatch(clearCoupons());
      });
  }, []);

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <CouponModal
        open={isFormOpen}
        handleClose={closeFormModal}
        coupon={currentCoupon}
        action={action}
      />
      <DataGrid
        editMode="row"
        rows={coupons}
        columns={columns}
        selectionModel={selectedCoupons}
        onSelectionModelChange={setSelectedCoupons}
        components={{ Toolbar: AddToolBar }}
      />
    </div>
  );
};

export default CouponList;

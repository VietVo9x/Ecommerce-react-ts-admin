import * as React from "react";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/Add";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  TextField,
  Typography,
  Button,
  Pagination,
} from "@mui/material/";

import Stack from "@mui/material/Stack";
import ModalCategory from "../../components/ModalCategory";
import { CategoryEntities } from "../../types/Entities";
import { getData, getFullData } from "../../utils/Db";
import { I_categoryForm, I_categoryFormError } from "../../types/Request";
import { CategoryServices } from "./CategoryServices";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { perPage } from "../../utils/Constant";
export default function Category() {
  const [age, setAge] = React.useState("");
  const [open, setOpen] = useState(false);
  const [categorys, setCategorys] = useState<CategoryEntities[]>([]);
  const [category, setCategory] = useState<CategoryEntities | undefined>({
    id: "",
    category_name: "",
    description: "",
    status: true,
    products: [],
  });
  const [action, setAction] = useState("");
  const [errorForm, setErrorForm] = useState<I_categoryFormError | undefined>();

  const categoryServices = new CategoryServices(); //services

  //phan trang
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  useEffect(() => {
    getFullData(`categorys?_page=${page}&_limit=4`).then((res) => {
      setCategorys(res?.data);
      setCount(Math.ceil(res?.headers["x-total-count"] / 4));
    });
  }, [page]);

  //phan trang
  const handleActionForm = async (
    //action form
    event: { preventDefault: () => void },
    action: string,
    data: I_categoryForm
  ) => {
    event.preventDefault();
    if (action == "create") {
      const validator = await categoryServices.validator(data);
      if (validator.isError) {
        setErrorForm(validator);
        return;
      }
      const response = await categoryServices.createCategory(data);
      if (response) {
        toast.success("Add product successfully", { autoClose: 1000 });
        setOpen(false);
        getData("categorys").then((res) => {
          setCategorys(res);
        });
      }
    }
  };

  //delete
  const handleDeleteCategory = async (id: string) => {
    const conf = window.confirm("Are you sure you want to delete");
    if (!conf) return;
    const response = await categoryServices.deleteCategory(id);
    toast.success("Delete category successfully", { autoClose: 1000 });
    getData("categorys").then((res) => {
      setCategorys(res);
    });
  };
  //edit
  const handleEditCategory = (id: string) => {};

  const handleClose = () => {
    setOpen(false);
    setErrorForm(undefined);
  };

  //show modal
  const handleShowForm = (action: string, element?: CategoryEntities) => {
    setOpen(true);
    if (action == "create") {
      setCategory(undefined);
    } else {
      setCategory(element);
    }
    setAction(action);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <ToastContainer />
      {/* filter */}
      {/* <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "300px" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="filled-search"
            label="Search field"
            type="search"
            variant="filled"
          />
        </Box>
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 150, margin: "30px 0 " }}
        >
          <InputLabel id="demo-simple-select-standard-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Sort by name</MenuItem>
            <MenuItem value={20}>Sort by status</MenuItem>
          </Select>
        </FormControl>
      </Box> */}
      <Box m={5}>
        <Button
          variant="contained"
          sx={{ marginRight: "10px" }}
          onClick={() => handleShowForm("create")}
          startIcon={<AddIcon />}
        >
          New Category
        </Button>
      </Box>
      {/* table  */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorys &&
              categorys.map((element, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell scope="row">{element.category_name}</TableCell>

                  <TableCell align="center">
                    {element.status ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      component={"span"}
                      sx={{
                        display: "-webkit-box",
                        maxWidth: "200px",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {" "}
                      {element.description}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="inherit"
                      sx={{ marginRight: "10px" }}
                      onClick={() => handleShowForm("view", element)}
                    >
                      <RemoveRedEyeIcon />
                    </Button>

                    <Button
                      variant="contained"
                      color={element.status ? "primary" : "secondary"}
                      sx={{ marginRight: "10px" }}
                      startIcon={<EditIcon />}
                      onClick={() => handleEditCategory(element.id)}
                    >
                      {!element.status ? "Acive" : "Disabled"}
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteCategory(element.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* phan trang */}
      <Stack spacing={2} sx={{ padding: "15px 0" }}>
        <Pagination
          count={count}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Stack>
      {/* modal */}
      <ModalCategory
        open={open}
        onClose={handleClose}
        data={category}
        action={action}
        error={errorForm}
        onAction={handleActionForm}
      />
    </div>
  );
}

import * as React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextField,
  Typography,
  Button,
  Pagination,
} from "@mui/material/";

import Stack from "@mui/material/Stack";
import { ProductServices } from "./ProductsServices";
import { ProductEntities } from "../../types/Entities";
import { getData, getFullData } from "../../utils/Db";
import { formatDate } from "../../utils/FormatDate";
import { ToastContainer, toast } from "react-toastify";
import { ProductRepository } from "./ProductsRepository";
import ModalProduct from "../../components/ModalProduct";
import { I_ProductFormError, I_productForm } from "../../types/Request";
import { useSearchParams } from "react-router-dom";
import { perPage } from "../../utils/Constant";
export default function Products() {
  const inititalProduct = {
    id: "",
    sku: "",
    category_name: "PC Gaming",
    product_name: "",
    description: "",
    unit_price: 0,
    stock_quantity: 0,
    image: "",
    new: false,
    bestDeal: false,
    bestSelling: false,
    created_at: "",
    updated_at: "",
  };

  //filter data start
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>("");
  const [count, setCount] = useState(0);
  const [sortValue, setSortValue] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const params: any = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  React.useEffect(() => {
    getFullData(
      `products?_page=${page}&_limit=6&product_name_like=${search}&_sort=${sortValue}&_order=${sortOrder}`
    ).then((res) => {
      setProducts(res?.data);
      setCount(Math.ceil(res?.headers["x-total-count"] / perPage));
    });
  }, [page, search, sortValue, sortOrder]);

  //thay doi trang
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setSearchParams({ ...params, page: value.toString() });
  };
  //tim kiem
  const handleSearch = () => {
    setSearchParams({ ...params, search: searchValue });
  };
  //sort
  const handleChangeSelect = (event: SelectChangeEvent) => {
    setSearchParams({ ...params, page: "1" });
    setAge(event.target.value);

    switch (event.target.value.toString()) {
      case "1":
        setSortValue("product_name");
        setSortOrder("asc");
        break;

      case "2":
        setSortValue("product_name");
        setSortOrder("desc");
        break;

      case "3":
        setSortValue("unit_price");
        setSortOrder("asc");

        break;
      case "4":
        setSortValue("unit_price");
        setSortOrder("desc");
        break;
    }
  };
  //filter data end

  const [age, setAge] = React.useState("");
  const [products, setProducts] = useState<ProductEntities[]>([]);
  const [action, setAction] = useState("");
  const [product, setProduct] = useState<ProductEntities | undefined>(
    inititalProduct
  );
  const [open, setOpen] = useState(false);
  const [errorForm, setErrorForm] = useState<I_ProductFormError | undefined>();

  //call api lay du lieu lan dau

  const productServices = new ProductServices(); //services
  const productRepository = new ProductRepository(); //repository

  //edit form
  const handleActionForm = async (
    event: { preventDefault: () => void },
    action: string,
    data: I_productForm
  ) => {
    event?.preventDefault();
    if (action == "create") {
      const validate = productServices.validator(data);
      if (validate.isError) {
        setErrorForm(validate);
        return;
      }
      const response = await productServices.createProduct(data);

      if (response) {
        toast.success("Add product successfully", { autoClose: 1000 });
        setOpen(false);
        getFullData(
          `products?_page=${page}&_limit=6&product_name_like=${search}&_sort=${sortValue}&_order=${sortOrder}`
        ).then((res) => {
          setProducts(res?.data);
          setCount(Math.ceil(res?.headers["x-total-count"] / perPage));
        });
      }
    }

    if (action == "edit") {
      const validate = productServices.validator(data);
      if (validate.isError) {
        setErrorForm(validate);
        return;
      }
      const response = await productServices.editProduct(data);
      if (response) {
        toast.success("Edit product successfully", { autoClose: 1000 });
        setOpen(false);
        getFullData(
          `products?_page=${page}&_limit=6&product_name_like=${search}&_sort=${sortValue}&_order=${sortOrder}`
        ).then((res) => {
          setProducts(res?.data);
          setCount(Math.ceil(res?.headers["x-total-count"] / perPage));
        });
      }
    }
  };
  //delete san pham
  const handleDelete = async (id: string) => {
    const conf = window.confirm("Are you sure you want to delete");
    if (!conf) return;
    const response = await productRepository.deleteProduct(id);
    if (Object.keys(response).length === 0) {
      productRepository.getAllProducts().then((res) => {
        setProducts(res);
      });
    }
  };
  //show modal
  const handleShowForm = (action: string, product?: ProductEntities) => {
    setOpen(true);
    if (action == "create") {
      setProduct(undefined);
    } else {
      setProduct(product);
    }
    setAction(action);
  };

  //mui
  const handleClose = () => {
    setOpen(false);
    setErrorForm(undefined);
  };

  return (
    <div>
      <ToastContainer />
      {/* filter */}
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box pb={5} display={"flex"} mt={5}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={searchValue}
            onChange={(e: any) => setSearchValue(e.target.value)}
          />
          <Button onClick={handleSearch} variant="contained">
            Search
          </Button>
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
            onChange={handleChangeSelect}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Name (A - Z)</MenuItem>
            <MenuItem value={2}>Name (Z - A)</MenuItem>
            <MenuItem value={3}>Price(Lowest)</MenuItem>
            <MenuItem value={4}>Thirty(Highest)</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* table  */}
      <Box mb={5}>
        <Button
          variant="contained"
          sx={{ marginRight: "10px" }}
          onClick={() => handleShowForm("create")}
          startIcon={<AddIcon />}
        >
          New Product
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Index</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Code</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Create at</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{product.product_name}</TableCell>
                  <TableCell align="center">{product.sku}</TableCell>
                  <TableCell align="center">
                    $ {product.unit_price}.00
                  </TableCell>

                  <TableCell align="center">
                    {formatDate(product.created_at)}
                  </TableCell>
                  <TableCell align="center">{product.stock_quantity}</TableCell>

                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="inherit"
                      sx={{ marginRight: "10px" }}
                      onClick={() => handleShowForm("view", product)}
                    >
                      <VisibilityIcon />
                    </Button>

                    <Button
                      variant="contained"
                      sx={{ marginRight: "10px" }}
                      onClick={() => handleShowForm("edit", product)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(product.id)}
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
      <ModalProduct
        open={open}
        onAction={handleActionForm}
        onClose={handleClose}
        data={product}
        action={action}
        error={errorForm}
      />
    </div>
  );
}

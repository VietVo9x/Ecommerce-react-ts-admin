import * as React from "react";
import { useEffect, useState } from "react";

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
  SelectChangeEvent,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { formatDate } from "../../utils/FormatDate";
import { I_RegisterError, I_UserRegister } from "../../types/Request";
import ModalUser from "../../components/ModalUser";
import { UserEntities } from "../../types/Entities";
import { getData, getFullData } from "../../utils/Db";
import { UserServices } from "./UserServices";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { perPage } from "../../utils/Constant";

export default function Users() {
  const [errorForm, setErrorForm] = useState<I_RegisterError | undefined>();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<UserEntities[]>([]);
  const [action, setAction] = useState("");
  const [user, setUser] = useState<I_UserRegister | undefined>({
    userName: "",
    email: "",
    fullName: "",
    password: "",
    phone: "",
    address: "",
  });

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
  useEffect(() => {
    getFullData(
      `users?_page=${page}&_limit=6&userName_like=${search}&_sort=${sortValue}&_order=${sortOrder}`
    ).then((res) => {
      setUsers(res?.data);
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
        setSortValue("userName");
        setSortOrder("asc");
        break;

      case "2":
        setSortValue("userName");
        setSortOrder("desc");
        break;

        setSortValue("unit_price");
        setSortOrder("desc");
        break;
    }
  };
  //filter data end
  const handleClose = () => {
    setOpen(false);
    setErrorForm(undefined);
    setUser({
      userName: "",
      email: "",
      fullName: "",
      password: "",
      phone: "",
      address: "",
    });
  };

  //services
  const userServices = new UserServices();

  //show modal
  const handleShowForm = (action: string, user?: UserEntities) => {
    setOpen(true);
    if (action == "create") {
      setUser(undefined);
    } else {
      setUser(user);
    }
    setAction(action);
  };
  // handle action
  const handleActionForm = async (
    event: { preventDefault: () => void },
    action: string,
    data: I_UserRegister
  ) => {
    event?.preventDefault();
    if (action == "create") {
      const validate = await userServices.validator(data);
      if (validate.isError) {
        setErrorForm(validate);
        return;
      }
      const response = await userServices.register(data);
      if (response.id) {
        toast.success("User registration", { autoClose: 1000 });
        getFullData(
          `users?_page=${page}&_limit=6&userName_like=${search}&_sort=${sortValue}&_order=${sortOrder}`
        ).then((res) => {
          setUsers(res?.data);
          setCount(Math.ceil(res?.headers["x-total-count"] / perPage));
        });
      }
    }
    handleClose();
  };
  //handleEditStatus
  const handleEditStatus = async (user: UserEntities) => {
    const response = await userServices.updateUser(user.id, user);
    if (response.id) {
      getFullData(
        `users?_page=${page}&_limit=6&userName_like=${search}&_sort=${sortValue}&_order=${sortOrder}`
      ).then((res) => {
        setUsers(res?.data);
        setCount(Math.ceil(res?.headers["x-total-count"] / perPage));
      });
    }
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
            <MenuItem value={1}>NAME (A - Z)</MenuItem>
            <MenuItem value={2}>NAME (Z - A)</MenuItem>
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
          New User
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell align="center">UserName</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Create at</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell scope="row">{user.userName}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">
                  {user.role ? "Admin" : "User"}
                </TableCell>
                <TableCell align="center">
                  {formatDate(user.created_at)}
                </TableCell>
                <TableCell align="center">
                  {user.status ? "Active" : "Block"}
                </TableCell>

                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{ marginRight: "10px" }}
                    onClick={() => handleShowForm("view", user)}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleEditStatus(user)}
                  >
                    Block
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
      <ModalUser
        onClose={handleClose}
        open={open}
        error={errorForm}
        onAction={handleActionForm}
        action={action}
        data={user}
      />
    </div>
  );
}

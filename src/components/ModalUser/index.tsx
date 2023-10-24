import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Modal, TextField } from "@mui/material";
import { I_RegisterError, I_UserRegister } from "../../types/Request";
import { useEffect, useState } from "react";
interface Props {
  onClose: Function;
  open: boolean;
  error: I_RegisterError | undefined;
  onAction: Function;
  action: string;
  data: I_UserRegister | undefined;
}
export default function ModalUser(props: Props) {
  const formInitial = {
    password: "",
    email: "",
    userName: "",
    fullName: "",
    phone: "",
    address: "",
  };
  const [dataForm, setFormData] = useState<I_UserRegister>(formInitial);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const handleChange = (event: { target: { name: any; value: any } }) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...dataForm, [name]: value });
  };

  useEffect(() => {
    if (props.data) {
      setFormData(props.data);
    } else {
      setFormData(formInitial);
    }
  }, [props.data]);
  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              id="User Name"
              name="userName"
              label="User Name"
              fullWidth
              value={dataForm.userName}
              onChange={handleChange}
              error={
                props.error?.isError && props.error?.msgUserName.length > 0
              }
              helperText={props.error?.msgUserName}
            />
            <TextField
              margin="normal"
              required
              id="Email"
              type="email"
              label="Email"
              name="email"
              fullWidth
              value={dataForm.email}
              onChange={handleChange}
              error={props.error?.isError && props.error?.msgEmail.length > 0}
              helperText={props.error?.msgEmail}
            />
            <TextField
              margin="normal"
              required
              id="fullName"
              label="Full Name"
              name="fullName"
              fullWidth
              value={dataForm.fullName}
              onChange={handleChange}
              error={
                props.error?.isError && props.error?.msgFullName.length > 0
              }
              helperText={props.error?.msgFullName}
            />
            <TextField
              margin="normal"
              required
              id="Password"
              type="password"
              label="Password"
              name="password"
              fullWidth
              value={dataForm.password}
              onChange={handleChange}
              error={
                props.error?.isError && props.error?.msgPassword.length > 0
              }
              helperText={props.error?.msgPassword}
            />

            <TextField
              margin="normal"
              required
              id="phone"
              label="Phone"
              name="phone"
              fullWidth
              value={dataForm.phone}
              onChange={handleChange}
              error={props.error?.isError && props.error?.msgPhone.length > 0}
              helperText={props.error?.msgPhone}
            />
            <TextField
              margin="normal"
              required
              id="address"
              label="Address"
              name="address"
              fullWidth
              value={dataForm.address}
              onChange={handleChange}
              error={props.error?.isError && props.error?.msgAddress.length > 0}
              helperText={props.error?.msgAddress}
            />

            <Box display={"flex"} justifyContent={"space-between"}>
              {props.action === "create" && (
                <Button
                  variant="contained"
                  type="submit"
                  startIcon={<SendIcon />}
                  sx={{ mt: 3, mb: 2 }}
                  color="success"
                  onClick={(event) => props.onAction(event, "create", dataForm)}
                >
                  Create User
                </Button>
              )}

              <Button
                variant="contained"
                type="button"
                startIcon={<SendIcon />}
                sx={{ mt: 3, mb: 2 }}
                onClick={() => props.onClose()}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

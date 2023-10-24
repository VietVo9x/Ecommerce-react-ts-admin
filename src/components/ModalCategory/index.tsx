import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { CategoryEntities } from "../../types/Entities";
import { I_categoryFormError } from "../../types/Request";
import TextField from "@mui/material/TextField";
import { category } from "../../models";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import SendIcon from "@mui/icons-material/Send";

interface Props {
  open: boolean;
  onClose: Function;
  data: CategoryEntities | undefined;
  action: string;
  error: I_categoryFormError | undefined;
  onAction: Function;
}
export default function ModalCategory(props: Props) {
  const initialdataForm = {
    category_name: "",
    description: "",
    status: true,
    id: "",
    products: [],
  };
  const [dataForm, setDataForm] = useState<CategoryEntities>(initialdataForm);

  const handleFormChange = (e: { target: { name: any; value: any } }) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataForm({ ...dataForm, [name]: value });
  };
  //render moi khi du lieu thay doi
  useEffect(() => {
    if (props.data) {
      setDataForm(props.data);
    } else {
      setDataForm(initialdataForm);
    }
  }, [props.data]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
            <Box gap={2}>
              <TextField
                margin="normal"
                required
                id="category_name"
                name="category_name"
                label="Category Name"
                fullWidth
                aria-readonly={props.action == "view"}
                value={dataForm.category_name}
                onChange={handleFormChange}
                error={Boolean(props.error?.msgName)}
                helperText={props.error?.msgName}
              />
              <TextField
                margin="normal"
                required
                id="description"
                label="Description"
                name="description"
                fullWidth
                aria-readonly={props.action == "view"}
                value={dataForm.description}
                onChange={handleFormChange}
                error={Boolean(props.error?.msgDesc)}
                helperText={props.error?.msgDesc}
              />
            </Box>

            <Box
              display={"flex"}
              gap={2}
              mt={2}
              justifyContent={"space-between"}
            >
              <FormControl component="fieldset">
                <FormLabel component="legend"> Status</FormLabel>
                <RadioGroup
                  name="status"
                  value={dataForm.status.toString()}
                  onChange={handleFormChange}
                >
                  <FormControlLabel
                    disabled={props.action == "view"}
                    value="true"
                    control={<Radio />}
                    label="True"
                  />
                  <FormControlLabel
                    disabled={props.action == "view"}
                    value="false"
                    control={<Radio />}
                    label="False"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box display={"flex"} justifyContent={"space-between"}>
              {props.action == "create" && (
                <Button
                  variant="contained"
                  type="submit"
                  startIcon={<SendIcon />}
                  sx={{ mt: 3, mb: 2 }}
                  color="success"
                  onClick={(event) => props.onAction(event, "create", dataForm)}
                >
                  Create Product
                </Button>
              )}

              <Button
                variant="contained"
                type="button"
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

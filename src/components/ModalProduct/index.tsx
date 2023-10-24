import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import SendIcon from "@mui/icons-material/Send";
import { I_ProductFormError } from "../../types/Request";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";

import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material/";
import { ProductEntities, CategoryEntities } from "../../types/Entities";
import { getData } from "../../utils/Db";

interface Props {
  open: boolean;
  onClose: Function;
  onAction: Function;
  data: ProductEntities | undefined;
  action: string;
  error: I_ProductFormError | undefined;
}
export default function ModalProduct(props: Props) {
  const [categorys, setCategorys] = useState<CategoryEntities[]>([]);

  const [dataForm, setDataForm] = useState<ProductEntities>({
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
  });

  const handleFormChange = (e: { target: { name: any; value: any } }) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataForm({ ...dataForm, [name]: value });
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  //categorys name
  useEffect(() => {
    getData("categorys").then((res) => {
      setCategorys(res);
    });
  }, []);
  useEffect(() => {
    if (props.data) {
      setDataForm(props.data);
    } else {
      setDataForm({
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
      });
    }
  }, [props.data]);
  return (
    <div>
      {/* modal */}
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Modal
            open={props.open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
                <Box display={"flex"} gap={2}>
                  <TextField
                    margin="normal"
                    required
                    id="productName"
                    name="product_name"
                    label="Product Name"
                    fullWidth
                    value={dataForm.product_name}
                    onChange={handleFormChange}
                    error={Boolean(props.error?.msgProduct_name)}
                    helperText={props.error?.msgProduct_name}
                  />
                  <TextField
                    margin="normal"
                    required
                    id="sku"
                    label="SKU"
                    name="sku"
                    fullWidth
                    value={dataForm.sku}
                    onChange={handleFormChange}
                    error={Boolean(props.error?.msgSku)}
                    helperText={props.error?.msgSku}
                  />
                </Box>
                <Box display={"flex"} gap={2} alignItems={"baseline"}>
                  <TextField
                    margin="normal"
                    required
                    id="stock_quantity"
                    name="stock_quantity"
                    label="stockQuantity"
                    fullWidth
                    value={dataForm.stock_quantity}
                    onChange={handleFormChange}
                    error={Boolean(props.error?.msgStock_quantity)}
                    helperText={props.error?.msgStock_quantity}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                      labelId="Best Selling ?"
                      id="demo-simple-select-label"
                      value={dataForm.category_name}
                      label="Best Selling ?"
                      name="category_name"
                      onChange={handleFormChange}
                    >
                      {categorys.length > 0 &&
                        categorys.map((category, index) => (
                          <MenuItem value={category.category_name} key={index}>
                            {category.category_name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box display={"flex"} gap={2}>
                  <TextField
                    margin="normal"
                    required
                    id="unitPrice"
                    name="unit_price"
                    label="Price"
                    fullWidth
                    value={dataForm.unit_price}
                    onChange={handleFormChange}
                    error={Boolean(props.error?.msgUnit_price)}
                    helperText={props.error?.msgUnit_price}
                  />
                  <TextField
                    margin="normal"
                    required
                    id="image"
                    label="Image"
                    name="image"
                    fullWidth
                    value={dataForm.image}
                    onChange={handleFormChange}
                    error={Boolean(props.error?.msgImage)}
                    helperText={props.error?.msgImage}
                  />
                </Box>
                <Box display={"flex"} gap={2}>
                  <TextField
                    margin="normal"
                    required
                    id="description"
                    label="Description"
                    name="description"
                    fullWidth
                    value={dataForm.description}
                    onChange={handleFormChange}
                    error={Boolean(props.error?.msgDescription)}
                    helperText={props.error?.msgDescription}
                  />
                </Box>
                <Box
                  display={"flex"}
                  gap={2}
                  mt={2}
                  justifyContent={"space-between"}
                >
                  <FormControl component="fieldset">
                    <FormLabel component="legend"> Best Deal ?</FormLabel>
                    <RadioGroup
                      name="bestDeal"
                      value={dataForm.bestDeal?.toString()}
                      onChange={handleFormChange}
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="True"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="False"
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormControl component="fieldset">
                    <FormLabel component="legend"> New ?</FormLabel>
                    <RadioGroup
                      name="new"
                      value={dataForm.new?.toString()}
                      onChange={handleFormChange}
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="True"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="False"
                      />
                    </RadioGroup>
                  </FormControl>

                  <FormControl component="fieldset">
                    <FormLabel component="legend"> Best selling ?</FormLabel>
                    <RadioGroup
                      name="bestSelling"
                      value={dataForm.bestSelling?.toString()}
                      onChange={handleFormChange}
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="True"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="False"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <Box display={"flex"} justifyContent={"space-between"}>
                  {props.action == "edit" && (
                    <Button
                      variant="contained"
                      type="submit"
                      startIcon={<SendIcon />}
                      sx={{ mt: 3, mb: 2 }}
                      color="success"
                      onClick={(event) =>
                        props.onAction(event, "edit", dataForm)
                      }
                    >
                      Edit
                    </Button>
                  )}

                  {props.action == "create" && (
                    <Button
                      variant="contained"
                      type="submit"
                      startIcon={<SendIcon />}
                      sx={{ mt: 3, mb: 2 }}
                      color="success"
                      onClick={(event) =>
                        props.onAction(event, "create", dataForm)
                      }
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
        </Box>
      </Modal>
    </div>
  );
}

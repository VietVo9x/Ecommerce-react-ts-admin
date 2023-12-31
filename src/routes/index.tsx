import Category from "../pages/Category";
import DashBoard from "../pages/DashBoard";
import Orders from "../pages/Orders";
import Products from "../pages/Products";
import Users from "../pages/Users";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Home from "../pages/Home";

export const links = [
  { path: "/", title: "Home", element: <Home /> },

  {
    path: "/users",
    title: "Users",
    icon: <SupervisedUserCircleIcon />,
    element: <Users />,
  },
  {
    path: "/products",
    title: "Products",
    icon: <StoreIcon />,
    element: <Products />,
  },
  {
    path: "/category",
    title: "Category",
    icon: <CategoryIcon />,
    element: <Category />,
  },
  {
    path: "/orders",
    title: "Orders",
    icon: <AttachMoneyIcon />,
    element: <Orders />,
  },
];

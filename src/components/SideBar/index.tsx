import { Button } from "@mui/material";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { links } from "../../routes";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useContext } from "react";
import { IsLoginContext } from "../../Context/IsLoginContext";

export default function SideBar() {
  const { isLogin, setIsLogin } = useContext(IsLoginContext);
  const handleLogout = () => {
    localStorage.removeItem("adminLogin");
    setIsLogin(false);
  };
  return (
    <aside className="sidebar">
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <NavLink to={link.path}>
              {link.icon}
              {link.title}
            </NavLink>
          </li>
        ))}
        <li>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleLogout}
          >
            <ExitToAppIcon />
            Logout
          </Button>
        </li>
      </ul>
    </aside>
  );
}

import "./App.scss";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";

import { links } from "./routes";
import Login from "./pages/Login";
import { useContext } from "react";
import { IsLoginContext } from "./Context/IsLoginContext";
import { auth } from "./utils/auth";
function App() {
  const { isLogin, setIsLogin } = useContext(IsLoginContext);
  auth().then((res) => {
    if (res) {
      setIsLogin(true);
    }
  });
  return (
    <>
      {!isLogin ? (
        <Login />
      ) : (
        <div className="App">
          <Header />
          <div className="main">
            <SideBar />
            <Routes>
              {links.map((item, index) => (
                <Route key={index} path={item.path} element={item.element} />
              ))}
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

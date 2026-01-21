import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../api";
import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { setUser, setRole } = useContext(AuthContext);
  const currentPath = location.pathname;

  const handleNavigation = (event, newValue) => {
    navigate(newValue);
  };

  // logout has issue
  const handleLogout = async () => {
    try {
      await logOut();
      console.error("Logout failed:", err);
    } finally {
      setRole(null);
      setUser(null);

      localStorage.removeItem("email");
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      navigate("/");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <a
            href="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: 24,
              marginRight: 20,
            }}
          >
            CRM
          </a>
          <Tabs
            value={currentPath}
            onChange={handleNavigation}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            color="inherit"
          >
            <Tab value="/projects" label="Projects" />
            <Tab value="/clients" label="Clients" />
            {localStorage.getItem("email") ? (
              <Tab value="/add" label="Add" />
            ) : null}
            {localStorage.getItem("email") ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Tab value="/login" label="Login" color="inherit" />
            )}
          </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

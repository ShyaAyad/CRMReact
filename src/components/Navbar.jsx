import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../api";
import { Button } from "@mui/material";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const handleNavigation = (event, newValue) => {
    navigate(newValue);
  };

  // logout has issue
  const handleLogout = async (e) => {
    e.preventDefault();
    await logOut();

    localStorage.removeItem("email");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CRM 
          </Typography>
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

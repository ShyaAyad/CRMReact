import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // value of the Tabs is the current pathname
  const currentPath = location.pathname;

  const handleNavigation = (event, newValue) => {
    navigate(newValue); // navigate to the route
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
            <Tab value="/tasks" label="Tasks" />            
            <Tab value="/login" label="Login" color="inherit">Login</Tab>
          </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FolderIcon from "@mui/icons-material/Folder";
import PeopleIcon from "@mui/icons-material/People";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logOut } from "../api.jsx";

const drawerWidth = 240;

function Layout() {
  const { user, setUser, setRole } = useContext(AuthContext); // from context
  const [mobileOpen, setMobileOpen] = useState(false); // state for mobile sidebar
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // function to handle logout
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

      navigate("/login");
    }
  };

  const drawerContent = (
    <>
      <Toolbar />
      <Divider />
      <List>
        <ListItemButton 
          component={Link} 
          to="/"
          onClick={() => setMobileOpen(false)} // Close drawer on mobile after click
        >
          <ListItemIcon>
            <HomeFilledIcon />
          </ListItemIcon>
          Home
        </ListItemButton>
        <ListItemButton 
          component={Link} 
          to="/projects"
          onClick={() => setMobileOpen(false)} 
        >
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          Projects
        </ListItemButton>
        <ListItemButton 
          component={Link} 
          to="/clients"
          onClick={() => setMobileOpen(false)}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          Clients
        </ListItemButton>
        <ListItemButton 
          component={Link} 
          to="/add"
          onClick={() => setMobileOpen(false)}
        >
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          Add New
        </ListItemButton>
      </List>
      <Divider />
      <List>
        {user ? (
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            Logout
          </ListItemButton>
        ) : (
          <ListItemButton component={Link} to="/login">
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            Login
          </ListItemButton>
        )}
      </List>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <a href="/" style={{ textDecoration: "none", color: "inherit", fontWeight: 'bold', fontSize: '20px' }}>
            CRM
          </a>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Displaying main content besides the sidebar */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {/* Outlet to render current routes component */}
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
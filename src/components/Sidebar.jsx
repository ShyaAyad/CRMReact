import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import FolderIcon from "@mui/icons-material/Folder";
import PeopleIcon from "@mui/icons-material/People";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const drawerWidth = 240;

function SideBar() {
  const { user, setUser, setRole } = useContext(AuthContext);

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
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            CRM
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItemButton component="a" href="/projects">
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            Projects
          </ListItemButton>
          <ListItemButton component="a" href="/clients">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            Clients
          </ListItemButton>
          <ListItemButton component="a" href="/add">
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
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

export default SideBar;

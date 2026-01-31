import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FolderIcon from "@mui/icons-material/Folder";
import PersonIcon from '@mui/icons-material/Person';
import * as api from "../api.jsx";

export default function RecycleBin() {
  const [deletedItems, setDeletedItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogAction, setDialogAction] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchTrashedProjects = async () => {
      try {
        const trashedProject = await api.getTrasheProjects();
        const trashedClients = await api.getTrashedClients();

        // get projects and clients also add the type of trashed data
        const projectsWithType = trashedProject.data.trashed_data.map(
          (item) => ({
            ...item,
            type: "project",
          }),
        );

        const clientsWithType = trashedClients.data.trashed_data.map(
          (item) => ({
            ...item,
            type: "client",
          }),
        );

        setDeletedItems([...projectsWithType, ...clientsWithType]);
      } catch (error) {
        console.log("Error fetching deleted items", error);
      }
    };
    fetchTrashedProjects();
  }, []);

  const handleRestore = (item) => {
    setSelectedItem(item);
    setDialogAction("restore");
    setOpenDialog(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setDialogAction("delete");
    setOpenDialog(true);
  };

  const confirmAction = () => {
    if (dialogAction === "restore") {
      setDeletedItems(
        deletedItems.filter((item) => item.id !== selectedItem.id),
      );
      setSnackbar({
        open: true,
        message: `"${selectedItem.name}" has been restored successfully!`,
        severity: "success",
      });
    } else if (dialogAction === "delete") {
      setDeletedItems(
        deletedItems.filter((item) => item.id !== selectedItem.id),
      );
      setSnackbar({
        open: true,
        message: `"${selectedItem.name}" has been permanently deleted!`,
        severity: "info",
      });
    }
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <DeleteOutlineIcon sx={{ fontSize: 40, color: "#666" }} />
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 600, color: "#333" }}
          >
            Recycle Bin
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: "#666" }}>
          {deletedItems.length} {deletedItems.length === 1 ? "item" : "items"}{" "}
          in recycle bin
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          bgcolor: "white",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#fafafa" }}>
              <TableCell sx={{ fontWeight: 600, color: "#333" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#333" }}>
                Data type
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#333" }}>
                Date Deleted
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#333" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deletedItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                  <DeleteOutlineIcon
                    sx={{ fontSize: 64, color: "#ccc", mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ color: "#999" }}>
                    Recycle Bin is empty
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#bbb", mt: 1 }}>
                    Deleted items will appear here
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              deletedItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:hover": { bgcolor: "#f5f5f5" },
                    transition: "background-color 0.2s",
                  }}
                >
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      {item.type === 'project' ? <FolderIcon /> : <PersonIcon />}
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, color: "#333" }}
                        >
                          {item.name}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  {item.type === "project" ? (
                    <TableCell sx={{ color: "#4e9dff" }}>{item.type}</TableCell>
                  ) : (
                    <TableCell sx={{ color: "#ce58db" }}>{item.type}</TableCell>
                  )}
                  <TableCell sx={{ color: "#666" }}>
                    {item.deleted_at.substring(0, 10)}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Restore">
                      <IconButton
                        onClick={() => handleRestore(item)}
                        sx={{
                          color: "#4caf50",
                          "&:hover": { bgcolor: "#e8f5e9" },
                        }}
                      >
                        <RestoreIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Permanently">
                      <IconButton
                        onClick={() => handleDelete(item)}
                        sx={{
                          color: "#f44336",
                          "&:hover": { bgcolor: "#ffebee" },
                        }}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        {/* Delete and restore dialog */}
        <DialogTitle sx={{ color: "#333", fontWeight: 600 }}>
          {dialogAction === "restore" ? "Restore Item" : "Permanent Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#666" }}>
            {dialogAction === "restore"
              ? `Are you sure you want to restore "${selectedItem?.name}"? It will be moved back to its original location.`
              : `Are you sure you want to permanently delete "${selectedItem?.name}"? This action cannot be undone.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: "#666" }}>
            Cancel
          </Button>
          <Button
            onClick={confirmAction}
            variant="contained"
            sx={{
              bgcolor: dialogAction === "restore" ? "#4caf50" : "#f44336",
              "&:hover": {
                bgcolor: dialogAction === "restore" ? "#45a049" : "#da190b",
              },
            }}
          >
            {dialogAction === "restore" ? "Restore" : "Delete Forever"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* snackbar to show state after deleting or restoring data */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%", bgcolor: "white" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

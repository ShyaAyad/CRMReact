import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import BasicPagination from "./BasicPagination";
import { Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useContext } from "react";
import * as api from "../api.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";

export default function DataGridDemo({
  clientData,
  setClientData,
  page,
  totalPages,
  handlePagination,
  searchQuery,
}) {
  const { role } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // check if screen is mobile size

  // functions for handling delete and edit functionality
  const handleDelete = async (id) => {
    try {
      await api.deleteClient(id);
      setClientData((prev) => prev.filter((client) => client.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // inline editing
  const processRowUpdate = async (newRow, oldRow) => {
    try {
      const updatedClient = await api.updateClient(newRow.id, {
        name: newRow.name,
        phone: newRow.phone,
        email: newRow.email,
        company: newRow.company,
      });

      setClientData((prev) =>
        prev.map((client) =>
          client.id === newRow.id ? updatedClient : client,
        ),
      );

      return updatedClient; // on success return updated row
    } catch (error) {
      console.error("Update failed:", error);
      return oldRow; // if any error return old row
    }
  };

  // column stylings and fields
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
      flex: isMobile ? 0 : 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      width: 160,
      editable: true,
      flex: isMobile ? 0 : 1,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      width: 260,
      flex: isMobile ? 0 : 1,
    },
    {
      field: "company",
      headerName: "Company",
      width: 200,
      editable: true,
      flex: isMobile ? 0 : 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px" }}>
          {/* conditionally display delete button based on user role */}
          {role === "admin" ? (
            <Button
              sx={{ color: "red" }}
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          ) : (
            <Typography variant="body2">No Actions</Typography>
          )}
        </div>
      ),
    },
  ];

  // map to get each clients data
  const rows = clientData.map((client) => {
    return {
      id: client.id,
      name: client.name,
      phone: client.phone,
      email: client.email,
      company: client.company,
    };
  });

  // map to get serached clients data
  const searchRows = searchQuery.map((client) => {
    return {
      id: client.id,
      name: client.name,
      phone: client.phone,
      email: client.email,
      company: client.company,
    };
  });

  // if there is a result for search query then display result of query else display all clients
  const displayedRows =
    searchQuery && searchQuery.length > 0 ? searchRows : rows;

  // Mobile Card View for responsiveness 
  const MobileCardView = () => (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: "1fr",
        mt: 2,
      }}
    >
      {displayedRows.map((client) => (
        <Card key={client.id} sx={{ width: "100%" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {client.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>ID:</strong> {client.id}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Phone:</strong> {client.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Email:</strong> {client.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Company:</strong> {client.company}
            </Typography>
          </CardContent>
          
          {/* again conditionally display delete button based on user role */}
          {role === "admin" && (
            <>
              <Divider />
              <CardActions>
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={() => handleDelete(client.id)}
                  fullWidth
                >
                  Delete
                </Button>
              </CardActions>
            </>
          )}
        </Card>
      ))}
    </Box>
  );

  return (
    <>
    {/* conditional rendering based on screen size */}
      {isMobile ? (
        <MobileCardView />
      ) : (
        <Box
          sx={{
            height: 630,
            width: "100%",
            marginTop: "20px",
            "& .MuiDataGrid-root": {
              border: "none",
            },
          }}
        >
          <DataGrid
            rows={displayedRows}
            columns={columns}
            processRowUpdate={processRowUpdate}
            experimentalFeatures={{ newEditingApi: true }}
            onProcessRowUpdateError={(error) => console.error(error)}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #f0f0f0",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f5f5f5",
                borderBottom: "2px solid #e0e0e0",
              },
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: { xs: 3, md: 2 },
          mb: { xs: 3, md: 2 },
        }}
      >
        <BasicPagination
          page={page}
          totalPages={totalPages}
          handlePagination={handlePagination}
        />
      </Box>
    </>
  );
}
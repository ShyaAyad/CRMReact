import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import BasicPagination from "./BasicPagination";
import { Button } from "@mui/material";
import * as api from "../api.jsx";

export default function DataGridDemo({
  clientData,
  setClientData,
  page,
  totalPages,
  handlePagination,
  searchQuery,
}) {
  // functions for handling delete and edit functionality
  const handleDelete = async (id) => {
    await api.deleteClient(id);
    setClientData((prev) => prev.filter((client) => client.id != id));
  };

  const processRowUpdate = async (newRow, oldRow) => {
    try {
      // Call API to update client
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

      return updatedClient; // return the new updated data
    } catch (error) {
      console.error("Update failed:", error);
      return oldRow; // keep the old data if update fails
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
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      width: 160,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      width: 260,
    },
    {
      field: "company",
      headerName: "Company",
      width: 380,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            sx={{ color: "red" }}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // map to get each clients info
  const rows = clientData.map((client) => {
    return {
      id: client.id, // the key names must match the name of the column fields
      name: client.name,
      phone: client.phone,
      email: client.email,
      company: client.company,
    };
  });

  const searchRows = searchQuery.map((client) => {
    return {
      id: client.id, // the key names must match the name of the column fields
      name: client.name,
      phone: client.phone,
      email: client.email,
      company: client.company,
    };
  });

  const displayedRows =
    searchQuery && searchQuery.length > 0 ? searchRows : rows;

  return (
    <>
      <Box sx={{ height: 630, width: "100%", marginTop: "20px" }}>
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
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <BasicPagination
          page={page}
          totalPages={totalPages}
          handlePagination={handlePagination}
        />
      </div>
    </>
  );
}

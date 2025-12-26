import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

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
    width: 260
  },
  {
    field: "company",
    headerName: "Company",
    width: 180,
    editable: true,
  },
];

export default function DataGridDemo({ clientData }) {

  // map to get each clients info 
  const rows = clientData.map((client) => {
    return {
      id: client.id, // the key names must match the name of the column fields 
      name: client.name,
      phone: client.phone,
      email: client.email,
      company: client.company
    };
  });

  return (
    <Box sx={{ height: 400, width: "100%", marginTop: "20px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

import { useEffect, useState } from "react";
import DataGridDemo from "../components/DataGridDemo";
import * as api from "../api.jsx";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

const ClientCard = () => {
  const [clientData, setClientData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState([]);
  const [loading, setLoading] = useState(true);

  function handlePagination(event, value) {
    setPage(value);
  }

  const handleSearch = async (e) => {
    e.preventDefault();

    const query = e.target.search.value; // take users input
    try {
      const resp = await api.searchClient(query);
      setSearchQuery(resp.data.searchResult);

      e.target.search.value = "";
    } catch (error) {
      console.log("Failed to return client", error);
    }
  };

  useEffect(() => {
    const getClients = async () => {
      try {
        const resp = await api.getAllClients(page);
        setClientData(resp.data.data);
        setTotalPages(resp.data.meta.last_page);
        getClients();
      } catch (error) {
        console.log("Error fetching client data, Try again!");
      } finally {
        setLoading(false);
      }
    };
    getClients();
  }, [page]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
          gap: 2,
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body1" color="text.secondary">
          Loading clients...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <input
          style={{
            padding: "5px 10px",
            outline: "none",
            width: "100%",
            height: "30px",
          }}
          type="text"
          name="search"
          placeholder="John Doe"
        />
        <Button type="submit">Search</Button>
      </form>
      <DataGridDemo
        page={page}
        totalPages={totalPages}
        handlePagination={handlePagination}
        clientData={clientData}
        searchQuery={searchQuery}
        setClientData={setClientData}
      />
    </>
  );
};

export default ClientCard;

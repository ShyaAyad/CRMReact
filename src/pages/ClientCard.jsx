import { useEffect, useState } from "react";
import DataGridDemo from "../components/DataGridDemo";
import * as api from "../api.jsx";
import { Button } from "@mui/material";

const ClientCard = () => {
  const [clientData, setClientData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState([]);

  function handlePagination(event, value){
    setPage(value);
  }

  const handleSearch = async (e) => {
     e.preventDefault();

    const query = e.target.search.value; // take users input 
    try {
      const resp = await api.searchClient(query);
      console.log(resp.data.searchResult);
      // becuase search result is an array and don't want error if no result is found so we render empty array
      setSearchQuery(resp.data.searchResult); 

      e.target.search.value = "";

    } catch (error) {
      console.log("Failed to return client", error);
    }
  }

  useEffect(() => {
    try {
      const getClients = async () => {
        const resp = await api.getAllClients(page);
        setClientData(resp.data.data); 
        setTotalPages(resp.data.meta.last_page);
      };

      getClients();
    } catch (error) {
      console.log("Error fetching client data, Try again!");
    }
  }, [page]);

  return (
    <>
      <form onSubmit={handleSearch} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px'}}>
        <input style={{padding: '5px 10px', outline: 'none', width: '100%', height: '30px'}} type="text" name="search" placeholder="John Doe"/><Button type="submit">Search</Button>
      </form>
      <DataGridDemo page={page} totalPages={totalPages} handlePagination={handlePagination} clientData={clientData} searchQuery={searchQuery} setClientData={setClientData}/>
    </>
  );
};

export default ClientCard;

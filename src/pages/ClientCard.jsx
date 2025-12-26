import { useEffect, useState } from "react";
import DataGridDemo from "../components/DataGridDemo";
import * as api from "../api.jsx";

const ClientCard = () => {
  const [clientData, setClientData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  function handlePagination(event, value){
    setPage(value);
  }

  useEffect(() => {
    try {
      const getClients = async () => {
        const resp = await api.getAllClients(page);
        setClientData(resp.data.data); 
        setTotalPages(resp.data.meta.last_page);

        // only for debugging and testing
        console.log(resp.data.meta.last_page);
        console.log(resp.data);
      };

      getClients();
    } catch (error) {
      console.log("Error fetching client data, Try again!");
    }
  }, []);

  return (
    <>
      <DataGridDemo page={page} totalPages={totalPages} handlePagination={handlePagination} clientData={clientData} />
    </>
  );
};

export default ClientCard;

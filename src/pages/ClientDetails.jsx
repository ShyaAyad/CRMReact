import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api.jsx";

const ClientDetails = () => {
  const { id } = useParams();
  const [clientData, setClientData] = useState([]);

  useEffect(() => {
    try {
        const fetchClientData = async() =>{
            const resp = await api.clientDetails(id);
            console.log(resp.data);
            // setClientData(resp.data);
        }

        fetchClientData();
    } catch (error) {
        console.log(`Failed to fetch client ${id} data`, error);
    }

  }, []);

  return(
    <div>ClientDetails</div>
  );
};

export default ClientDetails;

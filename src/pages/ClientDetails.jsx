import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api.jsx";
import { Card, CardContent, Chip, Container, Divider, Grid, Typography } from "@mui/material";

const ClientDetails = () => {
  const { id } = useParams();
  const [clientData, setClientData] = useState([]);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const resp = await api.clientDetails(id);
        console.log(resp.data);
        setClientData(resp.data[0]);
      } catch (error) {
        console.log(`Failed to fetch client ${id} data`, error);
      }
    };
    
    fetchClientData();
  }, [id]);

  return (
    <>
    <Typography style={{marginTop: "20px"}}>Client {id}</Typography>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Client Details
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid>
                <Typography variant="subtitle2" color="text.secondary">
                  Name
                </Typography>
                <Typography>{clientData.name || "No name"}</Typography>
              </Grid>

              <Grid>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography>{clientData.email || "No email"}</Typography>
              </Grid>

              <Grid>
                <Typography variant="subtitle2" color="text.secondary">
                  Phone
                </Typography>
                <Typography>{clientData.phone || "No phone"}</Typography>
              </Grid>

              <Grid>
                <Typography variant="subtitle2" color="text.secondary">
                  Company
                </Typography>
                <Chip label={clientData.company || "No company"} color="primary" size="small" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default ClientDetails;
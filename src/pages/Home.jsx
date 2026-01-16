import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import * as api from "../api.jsx";

const Home = () => {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [page, setPages] = useState(1); // state for pages (use it in the api file to fetch data accordingly)
  const [totalPages, setTotalPages] = useState(1); // state for total pages to tell how many pages there will be in the pagination list

  useEffect(() => {
    try {
      const getClients = async () => {
        const resp = await api.getAllClients(page);
        setClients(resp.data.data);
        setTotalPages(resp.data.meta.last_page);

        console.log("Clients Data:", resp.data);
        console.log(resp.data.total_clients);
      };

      const getProjects = async () => {
        const resp = await api.getAllProjects();
        setProjects(resp.data.data);
        setTotalPages(resp.data.meta.last_page);

        console.log(resp.data.total_projects);
      }

      getClients();
      getProjects();
    } catch (error) {
      console.log("Error fetching clients, Try again!");
    }
  }, [page]);

  const stats = [
    {
      title: "Total Clients",
      value: clients.length * totalPages, // number of clients per page is nearly 15 so multiply by number of pages to get total
      icon: <PeopleIcon fontSize="large" color="primary" />
    },
    {
        title: "All Projects",
        value: projects.length ,
        icon: <AccountTreeIcon fontSize="large" color="blue" />,
    },
    {
      title: "Active Projects",
      value: 35,
      icon: <AssignmentIcon fontSize="large" color="secondary" />,
    },
    {
      title: "Revenue",
      value: "$12,500",
      icon: <MonetizationOnIcon fontSize="large" color="success" />,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Your CRM
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your clients, projects, and revenue all in one place.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                minHeight: 120,
              }}
            >
              <Box sx={{ mr: 2 }}>{stat.icon}</Box>
              <CardContent sx={{ p: 0 }}>
                <Typography variant="h6">{stat.title}</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;

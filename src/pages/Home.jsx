import { useEffect, useState } from "react";
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
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import * as api from "../api.jsx";

const Home = () => {
  // total clients and projects stored in state
  const [totalClients, setTotalClients] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);

  const [page, setPages] = useState(1); // state for pages (use it in the api file to fetch data accordingly)
  const [totalPages, setTotalPages] = useState(1); // state for total pages to tell how many pages there will be in the pagination list

  useEffect(() => {
    const getHomePageData = async () => {
        try {
        // Fetch clients data
        const clientRes = await api.getAllClients(page);
        setTotalClients(clientRes.data.total_clients);

        // Fetch projects data
        const projectRes = await api.getAllProjects();
        setActiveProjects(projectRes.data.active_projects);
        setTotalProjects(projectRes.data.total_projects);
        setTotalPages(projectRes.data.meta.last_page);

      } catch (error) {
        console.log("Error fetching clients:", error);
      }
    };

    getHomePageData();
  }, [totalClients, totalProjects, activeProjects]);

  const stats = [
    {
      title: "Total Clients",
      value: totalClients,
      icon: <PeopleIcon fontSize="large" color="primary" />,
    },
    {
      title: "All Projects",
      value: totalProjects,
      icon: <AccountTreeIcon fontSize="large" color="blue" />,
    },
    {
      title: "Active Projects",
      value: activeProjects,
      icon: <AssignmentIcon fontSize="large" color="secondary" />,
    },
    // {
    //   title: "Revenue",
    //   value: "$12,500",
    //   icon: <MonetizationOnIcon fontSize="large" color="success" />,
    // },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Your CRM
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your clients, and projects all in one place.
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

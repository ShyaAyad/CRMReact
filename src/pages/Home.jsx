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
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Chart as ChartJs } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import * as api from "../api.jsx";

const Home = () => {
  // total clients and projects stored in state
  const [totalClients, setTotalClients] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);
  const [projectsWithTasks, setProjectsWithTasks] = useState([]);
  const [clientProjectsNumber, setClientProjectNumber] = useState([]);
  const [projects, setProjects] = useState({
    high: 0,
    medium: 0,
    low: 0,
  });

  const [page, setPages] = useState(1); // state for pages (use it in the api file to fetch data accordingly)
  const [totalPages, setTotalPages] = useState(1); // state for total pages to tell how many pages there will be in the pagination list

  useEffect(() => {
    const getHomePageData = async () => {
      try {
        // Fetch clients data
        const clientRes = await api.getAllClients(page);
        setTotalClients(clientRes.data.total_clients);
        setClientProjectNumber(clientRes.data.projects);

        // Fetch projects data
        const projectRes = await api.getAllProjects();
        setActiveProjects(projectRes.data.active_projects);
        setTotalProjects(projectRes.data.total_projects);
        setTotalPages(projectRes.data.meta.last_page);

        setProjectsWithTasks(projectRes.data.tasks);
        setProjects({
          high: projectRes.data.high,
          medium: projectRes.data.medium,
          low: projectRes.data.low,
        });
      } catch (error) {
        console.log("Error fetching clients:", error);
      }
    };

    getHomePageData();
  }, []);

  const projectLabels = projectsWithTasks.map((p) => p.name);
  const taskCounts = projectsWithTasks.map((p) => p.tasks_count);

  const clientProjectLabels = clientProjectsNumber.map((p) => p.name);
  const clientProjectsCount = clientProjectsNumber.map((p) => p.projects_count);

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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          marginTop: "3%",
        }}
      >
        <div style={{ width: "450px", height: "450px", margin: "0 auto" }}>
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: "15px",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            Project Priorities
          </Typography>
          <Doughnut
            data={{
              labels: ["High", "Medium", "Low"],
              datasets: [
                {
                  label: "Project number with this priority",
                  data: [projects.high, projects.medium, projects.low],
                  backgroundColor: [
                    "rgba(209, 0, 45, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(201, 203, 207, 0.6)",
                  ],
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>

        <div style={{ width: "100%", maxWidth: "1200px", height: "400px", margin: "7% 0"}}>
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: "15px",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            Project Task Numbers
          </Typography>
          <Line
            data={{
              labels: projectLabels,
              datasets: [
                {
                  label: "Project Task number",
                  data: taskCounts,
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 2,
                  tension: 0.4,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>

        <div style={{ width: "100%", maxWidth: "1200px", height: "400px" }}>
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: "15px",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            Client project number
          </Typography>
          <Bar
            data={{
              labels: clientProjectLabels,
              datasets: [
                {
                  label: "Project priority",
                  data: clientProjectsCount,
                  backgroundColor: [
                    "rgba(239, 176, 3, 0.6)",
                    "rgba(255, 82, 186, 0.6)",
                    "rgba(201, 203, 207, 0.6)",
                  ],
                },
              ],
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default Home;

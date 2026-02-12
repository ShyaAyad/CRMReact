import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import FolderIcon from "@mui/icons-material/Folder";
import * as api from "../api.jsx";
import {
  Card,
  Typography,
  Box,
  Container,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import DescriptionIcon from "@mui/icons-material/Description";

export default function TasksPage() {
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [updateTaskId, setUpdateTaskId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchIDs = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const idsParam = params.get("ids");

        if (!idsParam) return;

        const idsArray = idsParam.split(",").map(Number);
        const resp = await api.getTasksByIds(idsArray); // fetch tasks by ids

        setTasks(resp.data.data);
      } catch (error) {
        console.log("Failed to fetch tasks", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIDs();
  }, [location.search]);

  // using a patch request to update the status of a task
  const updateStatus = async (id, status) => {
    try {
      setUpdateTaskId(id);
      await api.updateTaskStatus(id, { status });

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...task, status } : task)),
      );
    } catch (error) {
      console.log("Failed to update task status", error);
    } finally {
      setUpdateTaskId(null);
    }
  };

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
          Loading tasks...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "white", p: 4 }}>
      <Container maxWidth="lg">
        <Link
          to="/projects"
          style={{
            color: "black",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <FolderIcon />
          Back to projects
        </Link>

        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: "black", mb: 4, mt: 2 }}
        >
          Tasks
          <Link
            to={`/projects/${id}/add-task?ids=${new URLSearchParams(location.search).get("ids")}`}
            style={{
              marginBottom: "16px",
              textDecoration: "none",
              color: "#fff",
              fontWeight: 400,
              fontSize: "20px",
              marginLeft: "40px",
              backgroundColor: "#5d73ff",
              padding: "6px 12px",
              borderRadius: "5px"
            }}
          >
            Add new task
          </Link>
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* dipslay each task in cards */}
          {tasks.map((task, index) => (
            <Card
              key={task.id}
              sx={{
                boxShadow: 5,
                p: 3,
              }}
            >
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "black" }}
                >
                  {index + 1}.
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "black" }}
                >
                  {task.name}
                </Typography>
              </Box>

              <Box sx={{ ml: 4 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <AccessTimeFilledIcon sx={{ fontSize: 18 }} />
                  <Typography variant="body2">{task.duration}</Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <DescriptionIcon sx={{ fontSize: 18, mt: 0.3 }} />
                  <Typography variant="body2">{task.description}</Typography>
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Status:
                  </Typography>
                  {/* dropdown list to update the status of the task in place */}
                  <FormControl size="small">
                    <Select
                      value={task.status}
                      disabled={updateTaskId === task.id}
                      // send task id and the value of it to update the status
                      onChange={(e) => updateStatus(task.id, e.target.value)}
                      sx={{
                        minWidth: 150,
                        border: "1px solid black",
                      }}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="under-work">Under Work</MenuItem>
                      <MenuItem value="on-hold">On Hold</MenuItem>
                      <MenuItem value="finished">Finished</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

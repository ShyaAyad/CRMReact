import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FolderIcon from "@mui/icons-material/Folder";
import * as api from "../api.jsx";
import { Card, Typography } from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import DescriptionIcon from "@mui/icons-material/Description";

export default function TasksPage() {
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIDs = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const idsParam = params.get("ids"); // "14,81"

        if (!idsParam) return;

        const idsArray = idsParam.split(",").map(Number);
        const resp = await api.getTasksByIds(idsArray);
        setTasks(resp.data.data);
      } catch (error) {
        console.log("Failed to fetch tasks", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIDs();
  }, [location.search]);

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h2>Tasks of this project are: </h2>

      <a
        href="/projects"
        style={{
          color: "black",
          margin: "10px 20px",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <FolderIcon fontSize="large" />
        Back to projects
      </a>

      {tasks.map((task, num) => (
        <Card sx={{ padding: 2, marginBottom: 2, boxShadow: 3 }} key={task.id}>
          <Typography sx={{ fontWeight: 800, fontSize: 20, marginBottom: 2 }}>
            <span style={{ paddingRight: "10px" }}>{(num += 1)}.</span>
            {task.name}
          </Typography>
          <Typography sx={{ fontSize: 18, marginBottom: 1 }}>
            Status:{" "}
            {task.status === "pending" ? (
              <span style={{ color: "orange", fontWeight: 600 }}>Pending</span>
            ) : task.status === "under-work" ? (
              <span style={{ color: "blue", fontWeight: 600 }}>
                In progress
              </span>
            ) : (
              <span style={{ color: "green", fontWeight: 600 }}>Completed</span>
            )}
          </Typography>
          <Typography sx={{ fontSize: 18, marginBottom: 1 }}>
            <AccessTimeFilledIcon sx={{ fontSize: 18, marginRight: 1 }} />
            Duration: {task.duration}
          </Typography>
          <Typography sx={{ fontSize: 18, marginBottom: 1 }}>
            <DescriptionIcon sx={{ fontSize: 18, marginRight: 1 }} />
            Description: <br />
            <Typography sx={{ marginLeft: 3 }}>{task.description}</Typography>
          </Typography>
        </Card>
      ))}
    </div>
  );
}

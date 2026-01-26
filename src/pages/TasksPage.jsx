import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FolderIcon from "@mui/icons-material/Folder";
import * as api from "../api.jsx";

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
          display: "flex",
          color: "black",
          margin: "10px 20px",
          textDecoration: "none",
        }}
      >
        <FolderIcon
          fontSize="large"
          style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        />
        Back to projects
      </a>

      {tasks.map((task, num) => (
        <div key={task.id}>
          <span>{(num += 1)}.</span>
          <h4>{task.name}</h4>
          <p>Status: {task.status}</p>
          <p>Duration: {task.duration}</p>
          <p>Description: {task.description}</p>
        </div>
      ))}
    </div>
  );
}

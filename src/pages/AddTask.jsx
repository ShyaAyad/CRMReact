import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import * as api from "../api.jsx";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // project ID from URL

  const [task, setTask] = useState({
    name: "",
    status: "pending",
    description: "",
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const taskData = {
        name: task.name,
        description: task.description,
        project_id: id, // Use project ID from URL params
        status: "pending",
        duration: task.duration,
      };

      await api.createTask(taskData);
      alert("Task added successfully!");
      
      // Navigate back with the same query params if they exist
      const params = new URLSearchParams(location.search);
      const idsParam = params.get("ids");
      
      if (idsParam) {
        navigate(`/projects/${id}/tasks?ids=${idsParam}`);
      } else {
        navigate(`/projects/${id}/tasks`);
      }
    } catch (error) {
      console.error("Error details:", error);
      console.error("Error response:", error.response);
    }
  };

  const handleCancel = () => {
    // Navigate back with the same query params if they exist
    const params = new URLSearchParams(location.search);
    const idsParam = params.get("ids");
    
    if (idsParam) {
      navigate(`/projects/${id}/tasks?ids=${idsParam}`);
    } else {
      navigate(`/projects/${id}/tasks`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Box
        sx={{
          width: 700,
          mx: "auto",
          mt: 10,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography textAlign="center" variant="h5" fontWeight={600}>
          Add Task
        </Typography>

        <TextField
          label="Task name"
          name="name"
          value={task.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Task description"
          name="description"
          value={task.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Task duration (Hours/days/weeks)"
          name="duration"
          value={task.duration}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained" sx={{ width: 200 }}>
          Save
        </Button>

        <Button
          type="button"
          variant="outlined"
          sx={{ width: 200 }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default AddTask;
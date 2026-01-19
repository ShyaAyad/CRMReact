import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import DropDownList from "../components/DropDownList";
import * as api from "../api.jsx";

const EditProject = ({ projectId, initialProject, onClose }) => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    clientId: "",
    status: "",
    priority: "",
  });

  useEffect(() => {
    if (initialProject) {
      setProject(initialProject);
    }
  }, [initialProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await api.updateProject(projectId, data);
      alert("Project updated successfully!");
      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update project.");
    }
  };

  return (
    <form
      onSubmit={handleEdit}
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Box sx={{ width: 350, mx: "auto", mt: 10, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography textAlign="center" variant="h5" fontWeight={600}>
          Edit Project
        </Typography>

        <TextField
          label="Project Name"
          name="name"
          value={project.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Description"
          name="description"
          value={project.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Typography>Start Date</Typography>
        <TextField
          type="date"
          name="startDate"
          value={project.startDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Typography>End Date</Typography>
        <TextField
          type="date"
          name="endDate"
          value={project.endDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Example dropdowns */}
        <DropDownList
          label="Status"
          value={project.status}
          options={["not started", "in progress", "completed", "on hold"]}
          onChange={(e) => setProject({ ...project, status: e.target.value })}
        />

        <DropDownList
          label="Priority"
          value={project.priority}
          options={["Low", "Medium", "High"]}
          onChange={(e) => setProject({ ...project, priority: e.target.value })}
        />
      </Box>

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <Button type="submit" variant="contained" sx={{ width: 200 }}>
          Save
        </Button>
        <Button
          type="button"
          variant="contained"
          sx={{ width: 200, backgroundColor: "gray" }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditProject;

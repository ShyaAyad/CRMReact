import { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import DropDownList from "../components/DropDownList";
import * as api from "../api.jsx";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const navigate = useNavigate();

  const [project, setProject] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    client_id: "",
    status: "",
    priority: "",
  });

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const statusOptions = [
    { id: "Not started", name: "Not Started" },
    { id: "In progress", name: "In Progress" },
    { id: "Completed", name: "Completed" },
    { id: "On hold", name: "On Hold" },
  ];

  const priorityOptions = [
    { id: "Low", name: "Low" },
    { id: "Medium", name: "Medium" },
    { id: "High", name: "High" },
  ];

  // Fetch clients for dropdown
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await api.clientsForDropdown();
        console.log("Clients response:", response.data);
        setClients(response.data.data || response.data || []);
      } catch (error) {
        console.error("Error fetching clients:", error);
        alert("Failed to load clients.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!project.name.trim()) {
      alert("Please enter a project name.");
      return;
    }

    try {
      await api.createProject(project);
      alert("Project added successfully!");
      navigate("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to add project.");
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
          Add Project
        </Typography>

        <TextField
          label="Project Name"
          name="name"
          value={project.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Description"
          name="description"
          value={project.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />

        <Typography sx={{ mt: 2, mb: 0.5 }}>Start Date</Typography>
        <TextField
          type="date"
          name="start_date"
          value={project.start_date || ""}
          onChange={handleChange}
          fullWidth
        />

        <Typography sx={{ mt: 2, mb: 0.5 }}>End Date</Typography>
        <TextField
          type="date"
          name="end_date"
          value={project.end_date || ""}
          onChange={handleChange}
          fullWidth
        />

        <Autocomplete
          options={clients}
          getOptionLabel={(option) => option.name || ""}
          value={clients.find((c) => c.id === project.client_id) || null}
          onChange={(e, newValue) =>
            setProject((prev) => ({ ...prev, client_id: newValue?.id || "" }))
          }
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Client"
              margin="normal"
              fullWidth
              placeholder="Search for a client..."
            />
          )}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          noOptionsText={loading ? "Loading..." : "No clients found"}
        />

        <DropDownList
          label="Status"
          value={project.status}
          options={statusOptions}
          onChange={(e) =>
            setProject((prev) => ({ ...prev, status: e.target.value }))
          }
        />

        <DropDownList
          label="Priority"
          value={project.priority}
          options={priorityOptions}
          onChange={(e) =>
            setProject((prev) => ({
              ...prev,
              priority: e.target.value,
            }))
          }
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
          onClick={() => navigate("/projects")}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default AddProject;
import { useState, useEffect } from "react";
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import DropDownList from "../components/DropDownList";
import * as api from "../api.jsx";
import { useNavigate, useParams } from "react-router-dom";

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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

  // Fetch project data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await api.getProject(id);
        const clientsResp = await api.getAllClients();
        console.log(clientsResp.data.data);
        setClients(clientsResp.data.data);
        setProject(resp.data.attribute);
      } catch (error) {
        console.log("Error fetching project:", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await api.updateProject(id, project);
      alert("Project updated successfully!");
      navigate("/projects");
    } catch (error) {
      console.error(error);
      alert("Failed to update project.");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.createProject(id, project);
      alert("Project added successfully!");
      navigate("/projects");
    } catch (error) {
      console.error(error);
      alert("Failed to update project.");
    }
  };

  return (
    <form
      onSubmit={handleAdd}
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
          name="start_date"
          value={project.start_date || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Typography>End Date</Typography>
        <TextField
          type="date"
          name="end_date"
          value={project.end_date || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Autocomplete
          options={clients}
          getOptionLabel={(option) => option.name || ""}
          value={clients.find((c) => c.id === project.client_id) || null}
          onChange={(e, newValue) =>
            setProject((prev) => ({ ...prev, client_id: newValue?.id || "" }))
          }
          renderInput={(params) => (
            <TextField {...params} label="Client" margin="normal" fullWidth />
          )}
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
          variant="contained"
          sx={{ width: 200, backgroundColor: "gray" }}
          onClick={() => navigate("/projects")}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default EditProject;
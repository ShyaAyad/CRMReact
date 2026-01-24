import { Box, Button, TextField, Typography } from "@mui/material";
import DropDownList from "../components/DropDownList";
import { useEffect, useState } from "react";
import * as api from "../api.jsx";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const navigate = useNavigate();

  const [project, setProject] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const resp = await api.getAllClients();
        setClients(resp.data.data);
      } catch (error) {
        console.log("error in fetching clients data", error);
      }
    };

    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      ...project,
      client_id: clientId,
      status,
      priority,
    };

    try {
      const res = await api.createProject(projectData);
      console.log("Project created:", res.data);
      setProject({ name: "", description: "", start_date: "", end_date: "" });
      setClientId("");
      setStatus("");
      setPriority("");

      navigate("/");
    } catch (error) {
      console.log(
        "Error creating project:",
        error.response?.data || error.message,
      );
    }
  };

  // id muust math the values in the backend
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

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Box
        sx={{
          width: 350,
          mx: "auto",
          mt: 10,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography textAlign="center" variant="h5" fontWeight={600}>
          Add new Project
        </Typography>

        <TextField
          label="Project name"
          name="name"
          value={project.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Description of project"
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
          value={project.start_date}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Typography>End Date</Typography>
        <TextField
          type="date"
          name="end_date"
          value={project.end_date}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        
        {/* change this drop down to an autocomplete dropdown on search */}
        <DropDownList
          label="Client"
          value={clientId}
          options={clients}
          onChange={(e) => setClientId(e.target.value)}
        />

        <DropDownList
          label="Status"
          value={status}
          options={statusOptions}
          onChange={(e) => setStatus(e.target.value)}
        />

        <DropDownList
          label="Priority"
          value={priority}
          options={priorityOptions}
          onChange={(e) => setPriority(e.target.value)}
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2, width: 400 }}
      >
        Create project
      </Button>
    </form>
  );
};

export default AddProject;

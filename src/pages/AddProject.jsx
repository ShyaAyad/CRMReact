import { Box, Button, TextField, Typography } from "@mui/material";
import DropDownList from "../components/DropDownList";
import { useState } from "react";

const AddProject = () => {
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [client, setClient] = useState("");

  const statusOptions = ["Not Started", "In Progress", "Completed"];
  const priorityOptions = ["Low", "Medium", "High"];

  return (
    <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
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
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          type="text"
          fullWidth
          margin="normal"
        />

        <TextField
          label="Description of project"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          type="text"
          fullWidth
          margin="normal"
        />

        <Typography>Start Date</Typography>
        <TextField
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          type="date"
          fullWidth
          margin="normal"
        />

        <Typography>End Date</Typography>
        <TextField
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          type="date"
          fullWidth
          margin="normal"
        />

        <DropDownList
          label={"Client"}
          value={client}
          options={statusOptions}
          onChange={(e) => setClient(e.target.value)}
        />

        <DropDownList
          label={"Status"}
          value={status}
          options={statusOptions}
          onChange={(e) => setStatus(e.target.value)}
        />

        <DropDownList
          label={"Priority"}
          value={priority}
          options={priorityOptions}
          onChange={(e) => setPriority(e.target.value)}
        />
      </Box>
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, width: 400 }}>Create project</Button>
    </div>
  );
};

export default AddProject;

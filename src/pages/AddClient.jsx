import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import * as api from "../api.jsx";
import { useNavigate } from "react-router-dom";

const AddClient = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const clientData = { name, email, phone, company };

    try {
      const res = await api.createClient(clientData);
      // console.log("Client created:", res.data);
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");

      navigate("/");
    } catch (error) {
      console.log(
        "Error creating client:",
        error.response?.data || error.message,
      );
    }
  }

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <form onSubmit={handleSubmit}>
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
            Add new Client
          </Typography>

          <TextField
            label="Client name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            fullWidth
            margin="normal"
          />

          <TextField
            label="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="phone"
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            fullWidth
            margin="normal"
          />

          <TextField
            label="Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            type="text"
            fullWidth
            margin="normal"
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
            onClick={() => navigate("/clients")}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddClient;

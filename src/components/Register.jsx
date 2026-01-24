import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import * as api from "../api.jsx";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setRole } = useContext(AuthContext); // get the context

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const resp = await api.register(name, email, password);
      const { token, user, role } = resp.data;
      setUser(user);
      setRole(role);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", role);

      navigate("/projects");
    } catch (error) {
      alert("Failed to register user, try again!");
      console.log("Error: ", error);
    }
  };
  return (
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
      <Typography variant="h5" textAlign="center" mb={2}>
        Register
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          fullWidth
          autoComplete="off"
          margin="normal"
        />

        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          fullWidth
          autoComplete="off"
          margin="normal"
        />

        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          fullWidth
          autoComplete="off"
          margin="normal"
        />

        <Typography variant="body2" color="textSecondary" mt={1}>
          Already have an account? <a href="/login">Login</a>.
        </Typography>
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Continue
        </Button>
      </form>
    </Box>
  );
};

export default Register;

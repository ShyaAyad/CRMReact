import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import * as api from "../api.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

function Login() {
  
  const { setUser, setRole } = useContext(AuthContext); // get the context 
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resp = await api.logIn(email, password);
      const { token, user, role } = resp.data;
      setUser(user); // set user to the context state after login to use it in the whole program
      setRole(role);
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("user", user);

      navigate("/projects");
    } catch (error) {
      console.log("Failed to log user in", error);
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
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          fullWidth
          margin="normal"
        />

        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          fullWidth
          margin="normal"
        />

        <Typography variant="body2" color="textSecondary" mt={1}>
          Don't have an account? <a href="/register">Register</a>.
        </Typography>
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Box>
  );
}

export default Login;

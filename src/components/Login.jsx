import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import * as api from "../api.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resp = api.logIn(email, password);
      console.log(resp);
    //   const { token, user } = resp.data;

    //   localStorage.setItem("token", token);
      localStorage.setItem("email", email);

      console.log("logged in successfully:", email)
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
      <form action="" onSubmit={handleLogin}>
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

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Box>
  );
}

export default Login;

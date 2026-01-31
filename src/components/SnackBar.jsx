import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

const SnackBar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
        sx={{ width: "100%", bgcolor: "white" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;

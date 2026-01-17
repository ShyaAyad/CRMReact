import { Tab, Tabs, Card, Typography, Box, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";

const AddNew = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const handleNavigation = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        mt: 6,
      }}
    >
      <Card
        elevation={4}
        sx={{
          width: 480,
          borderRadius: 3,
          p: 3,
          mt: 15
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <AddCircleOutlineIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
          <Typography variant="h5" fontWeight={600}>
            Create New
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Choose what you want to add
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Tabs
          value={currentPath}
          onChange={handleNavigation}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
          sx={{
            "& .MuiTab-root": {
              minHeight: 60,
              fontSize: "1rem",
              textTransform: "none",
            },
          }}
        >
          <Tab
            icon={<AssignmentIcon />}
            iconPosition="start"
            value="/addProject"
            label="Project"
          />

          <Tab
            icon={<BusinessIcon />}
            iconPosition="start"
            value="/addClient"
            label="Client"
          />
        </Tabs>

        <Box
          sx={{
            mt: 4,
            p: 2,
            border: "1px dashed #90caf9",
            borderRadius: 2,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          Select a tab to start adding data
        </Box>
      </Card>
    </Box>
  );
};

export default AddNew;

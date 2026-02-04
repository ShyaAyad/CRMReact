import { Card, Typography, Box, Divider, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";

const AddNew = () => {
  const options = [
    {
      title: "Add Project",
      description: "Create a new project with tasks and deadlines",
      icon: <AssignmentIcon sx={{ fontSize: 48, color: "#1976d2" }} />,
      link: "/addProject",
      color: "#1976d2",
    },
    {
      title: "Add Client",
      description: "Register a new client with contact information",
      icon: <BusinessIcon sx={{ fontSize: 48, color: "#1976d2" }} />,
      link: "/addClient",
      color: "#1976d2",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        mt: 6,
        px: 2,
      }}
    >
      <Card
        elevation={4}
        sx={{
          width: 900,
          borderRadius: 3,
          p: 4,
          mt: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <AddCircleOutlineIcon
            sx={{ fontSize: 36, mr: 1.5, color: "#1976d2" }}
          />
          <Typography variant="h4" fontWeight={600} color="text.primary">
            Create New
          </Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" mb={3}>
          Choose what you want to add
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 3,
          }}
        >
          {options.map((option, index) => (
            <Link
              key={index}
              to={option.link}
              style={{ textDecoration: "none" }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  border: "2px solid transparent",
                  cursor: "pointer",
                  height: "100%",
                  minHeight: 250,
                }}
              >
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#e3f2fd",
                    mb: 1,
                  }}
                >
                  {option.icon}
                </Box>

                <Typography
                  variant="h5"
                  fontWeight={600}
                  color="text.primary"
                  textAlign="center"
                >
                  {option.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  sx={{ px: 2 }}
                >
                  {option.description}
                </Typography>

                <Box
                  sx={{
                    mt: "auto",
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor: "#e3f2fd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: option.color,
                    fontWeight: "bold",
                    fontSize: 24,
                  }}
                >
                  →
                </Box>
              </Paper>
            </Link>
          ))}
        </Box>

        <Box
          sx={{
            mt: 4,
            p: 2.5,
            border: "2px dashed #90caf9",
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Select an option above to start adding data
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default AddNew;
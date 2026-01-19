import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BasicPagination from "../components/BasicPagination.jsx";
import * as api from "../api.jsx";

export default function ProjectCard() {
  const [projectData, setProjectData] = useState([]);
  const [page, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePagination = (event, value) => {
    setPages(value);
  };

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await api.getAllProjects(page);
        setProjectData(response.data.data);
        setTotalPages(response.data.meta.last_page);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchingData();
  }, [page]);

  const handleProjectDeletion = async (id) => {
    try {
      await api.deleteProject(id);
      // after deleting show the rest of the projects without the deleted one
      setProjectData((prevData) =>  prevData.filter(project => project.id !== id));
    } catch (error) {
      console.log("Failed to delete project, try again:", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          mt: 2,
        }}
      >
        {projectData.map((data, index) => (
          <Card
            sx={{
              maxWidth: 345,
              height: 260,
              display: "flex",
              flexDirection: "column",
            }}
            key={index}
          >
            <CardActionArea
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5">
                  {data.attribute.name || "No name"}
                </Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {data.attribute.description || "No description"}
                </Typography>

                {data.attribute.status === "completed" ? (
                  <Typography variant="body2" sx={{ color: "green" }}>
                    {data.attribute.status || "No status"}
                  </Typography>
                ) : data.attribute.status === "in progress" ? (
                  <Typography variant="body2" sx={{ color: "orange" }}>
                    {data.attribute.status || "No status"}
                  </Typography>
                ) : data.attribute.status === "not started" ? (
                  <Typography variant="body2" sx={{ color: "red" }}>
                    {data.attribute.status || "No status"}
                  </Typography>
                ) : data.attribute.status === "on hold" ? (
                  <Typography variant="body2" sx={{ color: "blue" }}>
                    {data.attribute.status || "No status"}
                  </Typography>
                ) : (
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {data.attribute.status || "No status"}
                  </Typography>
                )}

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {data.attribute.priority === 1
                    ? "High priority"
                    : data.attribute.priority === 2
                      ? "Medium priority"
                      : "No priority"}
                </Typography>
              </CardContent>

              <Divider />

              {/* Authorized buttons only displayed for admin */}
              <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                <Button
                  component={Link}
                  to={`/edit-project/${data.id}`}
                  state={{ project: data.attribute }}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Edit
                </Button>

                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => handleProjectDeletion(data.id)}
                >
                  Delete
                </Button>
              </CardActions>

              {/* seeing tasks and clients related to the project */}
              <CardActions
                sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
              >
                <Button
                  component={Link}
                  to={`/clients/${data.attribute.client_id}`}
                  size="small"
                  variant="outlined"
                >
                  Client
                </Button>

                <Button
                  component={Link}
                  to={`/tasks/${data.attribute.task_id}`}
                  size="small"
                  variant="outlined"
                >
                  Tasks
                </Button>
              </CardActions>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 4,
          mb: 4,
        }}
      >
        <BasicPagination
          page={page}
          totalPages={totalPages}
          handlePagination={handlePagination}
        />
      </Box>
    </>
  );
}

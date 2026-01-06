import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import * as api from "../api.jsx";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import BasicPagination from "../components/BasicPagination.jsx";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function ProjectCard() {
  const [projectData, setProjectData] = useState([]);
  const [page, setPages] = useState(1); // state for pages (use it in the api file to fetch data accordingly)
  const [totalPages, setTotalPages] = useState(1); // state for total pages to tell how many pages there will be in the pagination list

  const handlePagination = (event, value) => {
    setPages(value);
  };

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await api.getAllProjects(page);
        setProjectData(response.data.data);
        setTotalPages(response.data.meta.last_page); // get total page numbers from backend
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchingData();
  }, [page]); // useEffect will run when page changes

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
                justifyContent: "space-between",
                alignItems: "stretch",
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {data.attribute.name || "No name"}
                </Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {data.attribute.description || "No description"}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {data.attribute.status || "No status"}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {data.attribute.priority === 1 ? 'High priority' : data.attribute.priority === 2 ? 'Medium priority' : "No priority"}
                </Typography>
              </CardContent>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                component={Link}
                to={`/clients/${data.client_id}`} 
                variant="contained"
                sx={{ m: 2, alignSelf: "flex-start" }}
              >
                Client
              </Button>
              <Button
                component={Link}
                to={`/tasks/${data.task_id}`} 
                variant="contained"
                sx={{ m: 2, alignSelf: "flex-start" }}
              >
                Tasks
              </Button>
              </div>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      {/* pagination */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <BasicPagination
          page={page}
          totalPages={totalPages}
          handlePagination={handlePagination}
        />
      </div>
    </>
  );
}

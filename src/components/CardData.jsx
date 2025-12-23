import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import * as api from "../api.jsx";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";

export default function CardData() {

  const [projectData, setProjectData] = useState([]);
  const [page, setPages] = useState(1); // state for pages (use it in the api file to fetch data accordingly)
  const [totalPages, setTotalPages] = useState(1); // state for total pages

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await api.getAllProjects();
        setProjectData(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchingData();
  }, [page]); // useEffect refreshes when page changes 

  return (
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
        <Card sx={{ maxWidth: 345 }} key={index}>
          <CardActionArea>
            {/* <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.attribute.name || "no name"}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {data.attribute.description || "no description"}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>

    // there will be pagination component here
  );
}
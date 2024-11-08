import React, { useContext, useEffect } from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import "./CustomerDashboard.css"; // Import the CSS file

const VideoCard = ({ videoUrl }: any) => {
  return (
    <Card className="video-card">
      <CardMedia
        component="iframe"
        src={videoUrl}
        className="video-card-iframe"
        height="200"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <CardContent className="video-card-content">
        <Typography variant="body2" component="p">
          {videoUrl}
        </Typography>
      </CardContent>
    </Card>
  );
};

const CustomerDashboard = () => {
  const videoLinks = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/3JZ_D3ELwOQ",
    "https://www.youtube.com/embed/V-_O7nl0Ii0",
    "https://www.youtube.com/embed/L_jWHffIx5E",
    "https://www.youtube.com/embed/ZZ5LpwO-An4",
    "https://www.youtube.com/embed/eY52Zsg-KVI",
    "https://www.youtube.com/embed/9bZkp7q19f0",
    "https://www.youtube.com/embed/fJ9rUzIMcZQ",
    "https://www.youtube.com/embed/kJQP7kiw5Fk",
    "https://www.youtube.com/embed/60ItHLz5WEA",
  ];

  return (
    <div className="dashboard-container">
      <Grid container spacing={2}>
        {videoLinks.map((videoUrl, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <VideoCard videoUrl={videoUrl} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CustomerDashboard;

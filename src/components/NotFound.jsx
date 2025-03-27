import { Box, Button, Container, Typography, Grid2 } from "@mui/material";
import { Link } from "react-router-dom";
import planetImg from "../assets/planet.avif";

function NotFound() {
  return (
    <Box
      sx={{
        paddingTop: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        minHeight: "100vh",
        color: "white",
        backgroundImage: `url(${planetImg})`, // Set background image
        backgroundSize: "cover", // Cover full area
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent repetition
      }}
    >
      <Container maxWidth="md">
        <Grid2
          container
          spacing={1}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid2 xs={12}>
            <div className="flex flex-col justify-center items-center">
              <Typography variant="h1">404</Typography>
              <Typography variant="h6">
                The page you&apos;re looking for doesn&apos;t exist.
              </Typography>
              <Button
                variant="contained"
                LinkComponent={Link}
                to={"/"}
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                Back Home
              </Button>
            </div>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}

export default NotFound;

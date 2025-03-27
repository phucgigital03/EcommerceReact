import { Box, Button, Container, Typography, Grid2 } from "@mui/material";
import { Link } from "react-router-dom";
import planetImg from "../assets/planet.avif"


function AccessDenied() {
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
              <Typography variant="h1">Access-Denied</Typography>
              <Typography variant="h6">
                Your role have authorization to access resouces
              </Typography>
              <Button
                sx={{
                    cursor: "pointer",
                    textDecoration: "none"
                }}
                variant="contained"
                color="error"
                LinkComponent={Link}
                to={"/"}
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

export default AccessDenied;

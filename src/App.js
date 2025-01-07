import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Box, Container } from "@mui/system";
import backgroundImage from "./assets/background-image.png";

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          width: "100%",
        }}
      >
        <Container maxWidth="xl">
          <Header />
          <Outlet />
          <Footer />
        </Container>
      </Box>
    </>
  );
}

export default App;

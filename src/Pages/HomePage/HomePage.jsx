import { Box, Container } from "@mui/system";
import { ProductsGrid } from "../../components/Grid/Grid.jsx";
import backgroundImage from "../../assets/background-image.png";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const HomePage = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        // height: "100vh",
        width: "100%",
      }}
    >
      <Container maxWidth="xl" >
        <Header />
        <Box sx={{ bgcolor: "white", height:"80vh", padding:"none" }}>
          <ProductsGrid />
        </Box>
        <Footer />
      </Container>
    </Box>
  );
};

export default HomePage;

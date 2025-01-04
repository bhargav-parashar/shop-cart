import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/system";
import ProductsGrid from "../../components/Grid/grid.jsx";
import backgroundImage from "../../assets/background-image.png";
import { getProducts } from "../../services/callApi.js";
import { API_BASE_URL } from "../../config/config.jsx";

const HomePage = () => {
  const [rows, setRows] = useState([]);

  //Get Products and set rows
  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await getProducts(API_BASE_URL);
        const productRows = res.data.products.map((item, index) => {
          return {
            id: item.id,
            lastName: item.name,
            firstName: item.main_category,
            age: item.mrp.mrp
          };
        });
        setRows(productRows);
        console.log(productRows);
      } catch (err) {
        console.log(err);
      }
    };
    callApi();
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        height: "100vh",
        width: "100%",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "white", height: "100vh" }}>
          <ProductsGrid />
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/system';
import ProductsGrid from "../../components/Grid/grid.jsx";

const HomePage = () =>  {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" >
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} >
            <ProductsGrid/>
        </Box>
      </Container>
    </>
  );
}


export default HomePage;
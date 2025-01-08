import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Box, maxWidth } from "@mui/system";
import { useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "../../config/config.jsx";
import { getProducts } from "../../services/callApi.js";
import Loader from "../../components/Loader/Loader.jsx";
import productDefaultImg from "../../assets/default-image.png";

const Details = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const page = searchParams.get("page");

  const callApi = async (page) => {
    try {
      setLoading(true);
      const res = await getProducts(`${API_BASE_URL}?page=${Number(page)}`);
      let dataItem = res.data.products.find((item) => item.gtin === id);
      setProduct(dataItem);
      
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //CALL API
  useEffect(() => {
    callApi(page);
  }, [page]);

  return (
    <Box sx={{ bgcolor: "white", height: "88vh", width: "100%" }}>
      {loading && <Box sx={{paddingTop:"20vh"}}><Loader /></Box> }
      {!loading && (
        <>
          <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        paddingBottom: "40px",
      }}
    >
      <Typography
        sx={{
          marginTop: { xs: "25px", sm: "30px", md: "40px " },
          marginBottom: "10px",
          fontWeight: "700",
          color: "DarkBlue",
          fontSize: { xs: "10px", sm: "15px", md: "17px" },
          letterSpacing: "0.1px",
          lineHeight: "20px",
        }}
      >
       Know your product
      </Typography>
      <Typography
        sx={{
          fontWeight: "700",
          color: "DarkBlue",
          fontSize: { xs: "25px", sm: "30px", md: "33px " },
          letterSpacing: "0.1px",
          lineHeight: "40px",
        }}
      >
        Product Details
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          width: "81%",
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            height: { xs: "50vw", sm: "35vw" },
            width: { xs: "65vw", sm: "50vw" },
            maxHeight:"600px",
            maxWidth:"600px",

            position: "relative",
          }}
          alt="faq-image-section"
        >
          <img
            src={productDefaultImg}
            alt="patient-img-1"
            style={{
              width: "100%",
              height: "100%",
              maxWidth:"350px",
              maxHeight:"350px",
              position: "absolute",
            }}
          />
          
          <Box
            sx={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              backgroundColor: "white",
              height: { xs: "7vw", sm: "5vw" },
              width: { xs: "20vw", sm: "13vw" },
              maxHeight:"60px",
              maxWidth:"160px",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              zIndex: 2,
              bottom: { xs: "40%", sm: "60%" },
              left: "-15%",
              gap: "1vw",
            }}
          >
            

            <Box sx={{ marginRight: "8%" }}>
            {
            product.sell_out_of_stock === "0"?
            <Typography
            sx={{
              color: "green",
              fontWeight: "600",
              letterSpacing: 1,
              fontSize: { xs: "2vw", sm: "0.8vw" },
            }}
          >
            In Stock
          </Typography>:
          <Typography
                sx={{
                  color: "red",
                  fontWeight: "600",
                  letterSpacing: 1,
                  fontSize: { xs: "2vw", sm: "0.8vw" },
                }}
              >
                Out of Stock
              </Typography>
              }
              
              <Typography
                sx={{
                  color: "gray",
                  letterSpacing: 1,
                  fontSize: { xs: "1vw", sm: "0.5vw" },
                }}
              >
               {product.sell_out_of_stock === "0" && "Last 10 Units left"}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            height: { xs: "50vw", sm: "35vw" },
            width: { xs: "65vw", sm: "50vw" },
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            boxSizing: "border-box",
            padding: { xs: "0px 0px", md: "2vw 0px" },
          }}
        >
          <Typography variant="h6">GTIN No: {id}</Typography>
          <Typography variant="h6">Name: {product.name}</Typography>
          <Typography variant="h6">
            Category: {product.main_category}
          </Typography>
          <Typography variant="h6">
            Packaging Type: {product.packaging_type}
          </Typography>
          <Typography variant="h6">igst: {`${product.igst} %`}</Typography>
          <Typography variant="h6">cgst: {`${product.cgst} %`}</Typography>
          <Typography variant="h6">sgst: {`${product.sgst} %`}</Typography>
          <Typography variant="h6">cess: {`${product.cess} %`}</Typography>
        </Box>
      </Box>
    </Box>



          
        </>
      )}
    </Box>
  );
};

export default Details;

import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "../../config/config.jsx";
import { getProducts } from "../../services/callApi.js";
import Loader from "../../components/Loader/Loader.jsx";

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
          <Typography variant="h6">Details: {id}</Typography>
          <Typography variant="h6">Name: {product.name}</Typography>
          <Typography variant="h6">
            Category: {product.main_category}
          </Typography>
          <Typography variant="h6">
            Packaging Type: {product.packaging_type}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default Details;

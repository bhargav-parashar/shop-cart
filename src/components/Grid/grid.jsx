import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import defaultImage from "../../assets/default-image.png";
import { API_BASE_URL } from "../../config/config.jsx";
import { getProducts } from "../../services/callApi.js";
import Dropdown from "../Dropdowns/Dropdown.jsx";

const columns = [
  {
    field: "image",
    headerName: "",
    width: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const url = params.row.image || defaultImage;
      return (
        <img
          src={url}
          alt="Product"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      );
    },
  },
  {
    field: "productName",
    headerName: "Product Name",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 110,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "inStock",
    headerName: "Status",
    width: 110,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "details",
    headerName: "Details",
    width: 110,
    align: "center",
    headerAlign: "center",
  },
];

//CREATED DATA GRID ROW ITEM FROM INPUT ARRAY
const getProductRows = (arr) => {
  const rows = arr.map((item, index) => {
    return {
      id: item.id || index,
      image: item.images.front || "",
      productName: item.name,
      category: item.main_category,
      price: `₹ ${item.mrp.mrp}`,
      inStock: item.sell_out_of_stock === 0 ? "Out of Stock" : "In Stock",
      details: "View",
    };
  });
  return rows;
};

const ProductsGrid = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchedItem, setSearchedItem] = useState("");
  const [sort, setSort] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const callApi = async (page) => {
    try {
      setLoading(true);
      const res = await getProducts(
        `${API_BASE_URL}?page=${Number(page) + 1 + ""}`
      );
      setProducts(res.data.products);
      setFilteredProducts([]);
      setSelectedCategory("");
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

  //UPDATE FILTERED PRODUCTS ARRAY
  useEffect(() => {
    const productRows =
      filteredProducts.length === 0
        ? getProductRows(products)
        : getProductRows(filteredProducts);
    setRows(productRows);
    const catList = products.map((item, idx) => item.main_category);
    setCategoryList(catList);
  }, [products, filteredProducts]);

  //APPLY FILTER
  useEffect(() => {
    let data ;
    
    if (selectedCategory !== null) {
      
      data = products.filter((item, idx) => item.main_category === selectedCategory);
    }

    if (sort !== null) {
      console.log(data);
      if(sort === "Price Ascending"){
        data.sort((a,b) => a.mrp.mrp - b.mrp.mrp);
      }else if (sort === "Price Descending"){
       data.sort((a,b) => b.mrp.mrp - a.mrp.mrp);
      }
    }

    setFilteredProducts(data);
  }, [selectedCategory,sort]);

  //HANDLE PAGE CHANGE
  const handlePageChange = (newPage) => {
    const { page: p } = newPage;
    setPage(p);
  };

  //HANDLE FILTER CHANGE
  const handleFilterChange = (event) => {
    
    if(event.target.name === "Category")
      setSelectedCategory(event.target.value);
     
    if(event.target.name === "Sort")
      setSort(event.target.value);
        
  };

  

  return (
    <Box sx={{ height: "85%", width: "100%" }}>
      <Stack direction="row" spacing={2}>
        <Dropdown
          categoryList={categoryList}
          selectedValue={selectedCategory}
          handleFilterChange={handleFilterChange}
          label="Category"
        />
        <Dropdown
          categoryList={["","Price Ascending","Price Descending"]}
          selectedValue={sort}
          handleFilterChange={handleFilterChange}
          label = "Sort"
        />
      </Stack>

      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        paginationMode="server"
        page={page}
        pageSize={20}
        onPaginationModelChange={(newPage) => handlePageChange(newPage)}
        loading={loading}
        rowCount={501 * 20}
      />
    </Box>
  );
};

export { ProductsGrid };

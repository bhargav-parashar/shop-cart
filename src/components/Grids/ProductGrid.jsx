/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, Stack,Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import defaultImage from "../../assets/default-image.png";
import { API_BASE_URL } from "../../config/config.jsx";
import { getProducts } from "../../services/callApi.js";
import Dropdown from "../Dropdowns/Dropdown.jsx";
import SearchField from "../SearchField/SearchField.jsx";
import { useLocalStorage } from "../../Hooks/useLocalStorage.jsx";

//CREATE DATA GRID ROW ITEM FROM INPUT ARRAY
const getProductRows = (arr) => {
  const rows = arr.map((item, index) => {
    return {
      id: item.gtin ,
      image: item.images.front || "",
      productName: item.name,
      category: item.main_category,
      price: `₹ ${item.mrp.mrp}`,
      inStock: item.sell_out_of_stock === 0 ? "Out of Stock" : "In Stock",
      cart: "Add to Cart",
      gtin:item.gtin
    };
  });
  return rows;
};

const ProductsGrid = ({selectedId,handleSelectionChange,handleAddCart,page, setPage}) => {
  
  //STATE VARIABLES
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [filters, setFilters] = useState({
  //   searchField : "",
  //   category:"",
  //   sort:""
  // });
  const [filters, setFilters] = useLocalStorage("filters",{
    searchField : "",
    category:"",
    sort:""
  });
  const [categoryList, setCategoryList] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  //FUNCTIONS

  //API CALL
  const callApi = async (page) => {
    try {
      setLoading(true);
      const res = await getProducts(
        `${API_BASE_URL}?page=${Number(page) + 1 + ""}`
      );
      setProducts(res.data.products);
      setFilteredProducts(res.data.products);
      
      
      const productRows = getProductRows(products);
      setRows(productRows);
      const catList = products.map((item, idx) => item.main_category);
      setCategoryList(catList);


    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //HANDLE PAGE CHANGE
  const handlePageChange = (newPage) => {
    const { page: p } = newPage;
    setPage(p);
    setFilters({
      searchField : "",
      category:"",
      sort:""
    })
  };

  //HANDLE FILTER CHANGE
  const handleFilterChange = (event) => {

    const {name,value} = event.target;
    setFilters((prev)=>({...prev, [name] : value})) 
    
  };


  //USE EFFECTS 

  //API
  useEffect(() => {
    callApi(page);
  }, [page]);

  //UPDATE FILTERED PRODUCTS ARRAY AND CATEGORY DROPDOWN LIST
  useEffect(() => {
    localStorage.setItem('filters',JSON.stringify(filters));  
    const productRows =getProductRows(filteredProducts);
    setRows(productRows);
    
    const catList = products.map((item, idx) => item.main_category);
    setCategoryList(catList);

  }, [products, filteredProducts]);

  
  //APPLY FILTERS
  useEffect(()=>{
    
    let filteredData = [...products];

    if(filters.category){
      filteredData = filteredData.filter((item) =>
        item.main_category.includes(filters.category)
      );
    }

    if(filters.searchField){
      filteredData = filteredData.filter((item)=>item.name.toLowerCase().includes(filters.searchField.toLowerCase()))
    }

    if(filters.sort){
      filteredData.sort((a,b)=>{
        if(filters.sort === 'Price Ascending'){
          return a.mrp.mrp - b.mrp.mrp;
        }else if(filters.sort === 'Price Descending'){
          return b.mrp.mrp - a.mrp.mrp;
        }
      })
      
    }
    setFilteredProducts(filteredData)
  },[filters,products])

  

  //DEFINE DATA GRID COLUMN SCHEMA
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
      align: "left",
      headerAlign: "left",
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 110,
      align: "left",
      headerAlign: "left"
      
    },
   
    {
      field: "details",
      headerName: "Details",
      width: 110,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const gtinId = params.row.gtin;
        return (
         
          <Button onClick={()=>handleSelectionChange(gtinId)}>
            View
          </Button>
         
        );
      },
    },
    {
      field: "cart",
      headerName: "Buy",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const gtinId = params.row.gtin;
        const prodName = params.row.productName;
        const prodMrp = params.row.price;
        return (
          <Button
            variant="contained"
            onClick={()=>handleAddCart(gtinId,prodName,prodMrp)}
          >
            Add to Cart
          </Button>
        );
      },
    },
    {
      field: "gtin",
      headerName: "GTIN",
      type: "number",
      width: 110,
      align: "left",
      headerAlign: "left"
      
    },
  ];
  
  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <Stack direction="row" spacing={2}>
      <SearchField
        searchedItem = {filters.searchField}
        label="SearchField"
        handleFilterChange={handleFilterChange}
        name="searchField"
      />
        <Dropdown
          categoryList={categoryList}
          selectedValue={filters.category}
          handleFilterChange={handleFilterChange}
          label="Category"
          name = "category"
        />
        <Dropdown
          categoryList={["","Price Ascending","Price Descending"]}
          selectedValue={filters.sort}
          handleFilterChange={handleFilterChange}
          label = "Sort"
          name = "sort"
        />
      </Stack>

      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        paginationMode="server"
        paginationModel={{
          page : page,
          pageSize : 25
        }}
        onPaginationModelChange={(newPage) => handlePageChange(newPage)}
        loading={loading}
        rowCount={501 * 20}
        rowSelectionModel={selectedId ? [selectedId] : []} 
        disableMultipleSelection 
        sx={{cursor:"pointer"}}
        columnVisibilityModel={{
          gtin: false
          
        }}
      />
    </Box>
  );
};

export { ProductsGrid };

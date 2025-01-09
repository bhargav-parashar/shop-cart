import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { ProductsGrid } from "../../components/Grids/ProductGrid.jsx";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import Cart from "../../components/Cart/Cart.jsx";
import { useLocalStorage } from "../../Hooks/useLocalStorage.jsx";

const HomePage = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(0);
  const [cartItems, setCartitems] = useLocalStorage("cart",[]);
  const [cartTotal, setCartTotal] = useState(0);
  const[showSuccess,setShowSuccess] = useState(false);
  const navigate = useNavigate();

  //HANDLE SELECTION CHANGE
  const handleSelectionChange = (selectedRowId) => {
    setSelectedId(selectedRowId);
    navigate(`/details?id=${selectedRowId}&page=${Number(page) + 1 + ""}`);
  };

  //HANDLE PAGE CHANGE
  const handlePageChange = (newpage) => {
    setPage(newpage);
  };

  //HANDLE ADD TO CART
  const handleAddCart = (id, name, mrp ) =>{
    const existingItem = cartItems.find((item)=>item.gtin === id);
    
    if(existingItem){

      //IF CART CONTAINS ITEM INCREASE QUANTITY BY 1
      const index = cartItems.indexOf(existingItem);
      const newItem = {
        "gtin" : existingItem.gtin,
        "name" : existingItem.name,
        "mrp"  : existingItem.mrp,
        "qty"  : Number(existingItem.qty) + 1
      };
      const newArray = cartItems.toSpliced(index,1,newItem);
      localStorage.setItem("cart",JSON.stringify(newArray));
      setCartitems(newArray);

    }else{
      //IF CART DOES NOT CONTAIN ITEM, ADD NEW ITEM
      const newItem = {
        "gtin" : id,
        "name" : name,
        "mrp"  : mrp,
        "qty"  : 1
      }
      localStorage.setItem("cart",JSON.stringify([...cartItems,newItem]));
      setCartitems([...cartItems,newItem]);
    }
    
  };

  //HANDLE DELETE FROM CART
  const handleDeleteCart = (id) =>{
    const existingItem = cartItems.find((item)=>item.gtin === id);
    let index = cartItems.indexOf(existingItem);
    const newItem = {
      "gtin" : existingItem.gtin,
      "name" : existingItem.name,
      "mrp"  : existingItem.mrp,
      "qty"  : Number(existingItem.qty) - 1
    };
    let newArray=[];
    if(newItem.qty === 0)
        newArray = cartItems.toSpliced(index,1);
     else
        newArray = cartItems.toSpliced(index,1,newItem);
    
    localStorage.setItem("cart",JSON.stringify(newArray)); 
    setCartitems(newArray);
  };

  //UPDATE CART TOTAL
  useEffect(()=>{
    const total = cartItems.reduce((acc,curr)=>{
      let itemPrice = Number(curr.mrp.split(' ')[1]);
      let itemQuantity = Number(curr.qty);
      return acc + itemPrice*itemQuantity;
    },0) || 0;
    setCartTotal(total);
  },[cartItems]);

  //HANDLE CHECKOUT
  const handleCheckout = () =>{
    localStorage.removeItem("page");
    localStorage.removeItem("cart");
    setCartitems([]);
    setShowSuccess(true);
    setTimeout(()=>{
      setShowSuccess(false);
    },2000)
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={0} columnSpacing={0}>
        <Grid size={{xs:12,md:9}}>
          <Box sx={{ bgcolor: "white", height: "90vh", padding: "none" }}>
            <ProductsGrid
              selectedId={selectedId}
              handleSelectionChange={handleSelectionChange}
              handleAddCart={handleAddCart}
              page={page}
              setPage={handlePageChange}
            />
          </Box>
        </Grid>

        <Grid size={{xs:12,md:3}}>
          <Box
            sx={{
              bgcolor: "white",
              height: {xs:"fit-content", md:"90vh"},
              overflow:"hidden",
              width: "100%",
              padding : "2%",
              overflowY: "scroll"
            }}
          >
            <Cart 
            items={cartItems} 
            handleAddCart={handleAddCart}
            handleDeleteCart ={handleDeleteCart}
            cartTotal={cartTotal}
            handleCheckout={handleCheckout}
            showSuccess = {showSuccess}
            />
          </Box>
         
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;

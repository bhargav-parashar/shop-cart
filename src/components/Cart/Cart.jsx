import { Box, Stack, Typography,Button } from "@mui/material";
import defaultImage from "../../assets/default-image.png";
import ItemQuantityModule from "../Cart/ItemQuantityModule.jsx";
import Cart from "@mui/icons-material/ShoppingCart";

const CartModule = ({
  items=[], 
  handleAddCart,
  handleDeleteCart,
  cartTotal=0,
  handleCheckout,
  showSuccess = false
}) =>{

    return (
        <Box sx={{
            borderRadius: "5px", 
            bgcolor: "white",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            marginTop:"54px"
        }}>

         
        <Stack direction="row" sx={{padding:"5%"}} >
            <Cart sx={{ color: "black", cursor:"pointer" }} />
            <Typography >CART</Typography>    
        </Stack>   

        { !showSuccess &&
                <Box>
                        { 
                        
                        items.map((item) => (
                            <Box key={item.gtin}  >

                            <Box 
                              display="flex" 
                              flexDirection="column"
                              justifyContent="flex-start" 
                              padding="1rem" 
                              
                              >
                            
                            
                              
                              <Box display="flex" alignItems="center">

                              {/* IMAGE */}
                              <Box sx={{
                                maxHeight: "10rem",
                                maxWidth: "8rem",
                                
                              }}>
                                <img
                                
                                  src={
                                    defaultImage
                                }
                                
                                  alt={item.name}
                                  width="60px"
                                  height="60px"
                                />
                              </Box>

                              {/* PRODUCT NAME */}
                              <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="space-between"
                                height=""
                                paddingX="1rem"
                                
                              >
                                <Box>
                                    <Typography sx={{fontSize:"0.9vw", textWrap:"wrap"}}>
                                    {item.name}
                                    </Typography>
                                </Box>

                                
                                
                              </Box>
                              
                              </Box>
                              
                              {/* PRICE BLOCK */}
                              <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  sx={{borderBottom:"1px solid lightGray"}}
                                >
                                <ItemQuantityModule
                                      value={item.qty}
                                      handleAdd={() =>{handleAddCart(item.gtin)}}
                                      handleDelete={() => {handleDeleteCart(item.gtin)}}
                                      isReadOnly={false}
                                    />

                                  <Box padding="0.5rem" fontWeight="700">
                                  {
                                    `₹ ${Number(item.mrp.split(' ')[1]) * Number(item.qty)}` 
                                  }
                                  </Box>
                                </Box>
                                
                                
                              
                            
                            </Box>
                          
                          </Box>
                        ))
                        
                        }
                        {items.length > 0 && (
                          <Box sx={{display:"flex", justifyContent:"flex-end", padding:"0% 5% 0% 0%"}}>
                            <Typography sx={{fontSize:"1vw", color:"#577616"}}><b>{`Total : ₹ ${cartTotal}`}</b></Typography>
                          </Box>
                        )}
                        {items.length > 0 && (
                          <Box sx={{display:"flex", justifyContent:"flex-end", padding:"5%"}}>
                            <Button 
                            variant="contained"
                            onClick={()=>{handleCheckout()}}
                            >Checkout</Button>
                          </Box>
                        ) }
                        {items.length === 0 &&<Typography textAlign="center" sx={{marginBottom:"5%"}} >Your cart is empty</Typography> }
                </Box>
        }
        {showSuccess && 
        <Box sx={{bgcolor:"#577616", margin:"6%"}}>
          <Typography 
            textAlign="center" 
            sx={{marginBottom:"5%", color:"white"}} 
          ><b>Success! Order Submitted</b>
          </Typography>
        </Box>
        }
        </Box>

    )
}

export default CartModule;
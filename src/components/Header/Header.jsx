import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Cart from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

export default function SearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#577616" }}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Cart sx={{ color: "black", cursor:"pointer" }} />
          </Link>

          <Link to="/" style={{ textDecoration: "none", color:"white" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{cursor:"pointer" , flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              ShopCart
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

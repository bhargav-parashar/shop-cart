import { Box, Typography,Stack } from "@mui/material";
import Link from "@mui/material/Link";
import Logo from "../../assets/Logo/Logo.svg";
import Fb from "../../assets/Logo/fb.svg";
import Twitter from "../../assets/Logo/twitter.svg";
import Youtube from "../../assets/Logo/youtube.svg";
import Pinterest from "../../assets/Logo/pinterest.svg";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Cart from '@mui/icons-material/ShoppingCart';

const socialMedia = [
  {
    id: 1,
    title: "Facebook",
    logo: Fb,
  },
  {
    id: 2,
    title: "Twitter",
    logo: Twitter,
  },
  {
    id: 3,
    title: "Youtube",
    logo: Youtube,
  },
  {
    id: 4,
    title: "Pinterest",
    logo: Pinterest,
  },
];

const linkSet1 = [
  {
    id: 1,
    title: "About Us",
  },
  {
    id: 2,
    title: "Our Pricing",
  },
  {
    id: 3,
    title: "Our Gallery",
  },
  {
    id: 4,
    title: "Products",
  },
  {
    id: 5,
    title: "Privacy Policy",
  },
];

const linkSet2 = [
  {
    id: 1,
    title: "Home Needs",
  },
  {
    id: 2,
    title: "Essentials",
  },
  {
    id: 3,
    title: "Consumables",
  },
  {
    id: 4,
    title: "Kitchen",
  },
  {
    id: 5,
    title: "Skin Care",
  },
];

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "green",
        padding: "5% 10%",
      }}
    >
      <Box
        sx={{
          height: "80%",
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          marginBottom: "40px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            height: { xs: "100px", md: "213px" },
            width: "40%",
          }}
        >
          <Box
            
            sx={{
              height: { xs: "8vw", sm: "4vw", md: "2.5vw" },
              position: "absolute",
              left: "3%",
              top: "8%",
              cursor: "pointer",
            }}
          >
            <Stack direction="row">
                <Cart />
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ color:"white", flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                ShopCart
                </Typography>
          </Stack>
            </Box>
          <Box
            sx={{
              display: "flex",
              gap: [1.5],
              position: "absolute",
              left: "3%",
              bottom: "5%",
            }}
          >
            {socialMedia.map((item) => (
              <Box
                key={item.id}
                component="img"
                src={item.logo}
                alt={item.title}
                sx={{
                  height: { xs: "6vw", sm: "4vw", md: "2.5vw" },
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "213px",
            width: { xs: "80%", sm: "20%" },
          }}
        >
          {linkSet1.map((item) => (
            <Link
              key={item.id}
              sx={{
                cursor: "pointer",
                color: "white",
                textDecoration: "none",
                fontSize: { xs: "2vw", sm: "1.5vw", md: "1vw" },
                ":hover": { color: "lightBlue" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ChevronRightIcon sx={{ height: { xs: "3vw", md: "1.5vw" } }} />
                {item.title}
              </Box>
            </Link>
          ))}
        </Box>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "213px",
            width: { xs: "80%", sm: "20%" },
          }}
        >
          {linkSet2.map((item) => (
            <Link
              key={item.id}
              sx={{
                cursor: "pointer",
                color: "white",
                textDecoration: "none",
                fontSize: { xs: "2vw", sm: "1.5vw", md: "1vw" },
                ":hover": { color: "lightBlue" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ChevronRightIcon sx={{ height: { xs: "3vw", md: "1.5vw" } }} />
                {item.title}
              </Box>
            </Link>
          ))}
        </Box>
        <Box
          sx={{
            position: "relative",
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "space-around",
            height: "213px",
            width: "20%",
          }}
        >
          {linkSet1.map((item) => (
            <Link
              key={item.id}
              sx={{
                cursor: "pointer",
                color: "white",
                textDecoration: "none",
                fontSize: "1vw",
                ":hover": { color: "lightBlue" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ChevronRightIcon sx={{ height: { xs: "3vw", md: "1.5vw" } }} />
                {item.title}
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
      <Box sx={{ borderTop: "1px solid white", paddingTop: "20px" }}>
        <Typography
          variant="caption"
          letterSpacing={1}
          sx={{
            color: "white",
            fontSize: { xs: "2vw", sm: "1.5vw", md: "1vw" },
          }}
        >
          Copyright ©2025 Twinleaves | Pallet. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};
export default Footer;

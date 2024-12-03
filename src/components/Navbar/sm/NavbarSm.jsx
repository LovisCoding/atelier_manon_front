import React, { useState } from "react";
import { IconButton, Stack, Typography, useScrollTrigger, useTheme } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useLocation } from "react-router";
import ImgMui from "../../ImgMui";
import imgManon from "../../../assets/img/logo_manon.webp";
import DrawerSm from "./DrawerSm";
import ElevationScroll from "../ElevationScroll";

export default function NavbarSm() {
  const [openDrawer, setOpenDrawer] = useState(false);
const [navbarState, setNavbarState] = useState({
	bgNavbar: "transparent",
	textColor: "text.primary",
	scrolled: false,
  });
  const { bgNavbar, textColor, scrolled } = navbarState;
  const location = useLocation();
  const theme = useTheme();
  const color = scrolled ? theme.palette.text.white : theme.palette.text.primary;

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
 

  return (
    <>
      <ElevationScroll
        setNavbarState={setNavbarState}
      >
        <Stack
          direction="row"
          sx={{
            backgroundColor: bgNavbar,
            transition: "background-color 0.3s",
            position: "sticky",
            top: 0,
            zIndex: 1100,
          }}
          py={1}
          px={2}
          justifyContent="space-between"
        >
          {/* Menu and Logo */}
          <Stack direction="row" alignItems="center">
            <IconButton sx={{ pr: 2 }} onClick={toggleDrawer}>
              <IoMenu color={color}/>
            </IconButton>
            <Stack direction="row" spacing={2} alignItems="center">
              <ImgMui sx={{ width: 40, height: 40 }} alt="logo" src={imgManon} />
              <Typography variant="h6" sx={{ fontWeight: 200, color }}>
                L'Atelier de Manon
              </Typography>
            </Stack>
          </Stack>

          {/* Search Icon */}
          <IconButton>
            <FaSearch color={color} />
          </IconButton>
        </Stack>
      </ElevationScroll>

      {/* Drawer */}
      <DrawerSm open={openDrawer} setOpen={toggleDrawer} />
	  
    </>
  );
}

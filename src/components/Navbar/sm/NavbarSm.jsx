import React, { useState } from "react";
import { IconButton, Stack, Typography, useTheme, Box } from "@mui/material";
import { IoMenu } from "react-icons/io5";
import ImgMui from "../../ImgMui";
import imgManon from "../../../assets/img/logo_manon.webp";
import DrawerSm from "./DrawerSm";
import ElevationScroll from "../ElevationScroll";
import Link from "../../Link";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router";
import { useAuth } from "../../../utils/AuthContext";
import { IoMdCart } from "react-icons/io";

export default function NavbarSm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const {isLogged} = useAuth();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [navbarState, setNavbarState] = useState({
    bgNavbar: "white",
    textColor: "text.primary",
    scrolled: false,
  });
  const { bgNavbar, textColor, scrolled } = navbarState;

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
            width: "100%",
            top: 0,
            zIndex: 1100
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
              <Link href="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: 2 }}>
                <ImgMui sx={{ width: 40, height: 40 }} alt="logo" src={imgManon} />
                <Typography variant="h6" sx={{ fontWeight: 300, color }}
                >L'Atelier de Manon</Typography>
              </Link>
            </Stack>
          </Stack>

          {/* Account Icon */}
          <Box>
          {isLogged && <Link variant="navbar" href="/cart" >
                  <IconButton>
                    <IoMdCart color={scrolled ? theme.palette.text.white : theme.palette.text.primary} size={30} />
                  </IconButton>
                </Link>}
              <IconButton onClick={(e) => { navigate(isLogged ? "/profil" : "/login");}}>
                <MdAccountCircle color={scrolled ? theme.palette.text.white : theme.palette.text.primary} size={30} />
              </IconButton>
          </Box>
        </Stack>
      </ElevationScroll>

      {/* Drawer */}
      <DrawerSm open={openDrawer} setOpen={toggleDrawer} />

    </>
  );
}
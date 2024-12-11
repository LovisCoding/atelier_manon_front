import React, { useState } from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Stack, IconButton, Typography, useTheme } from "@mui/material";
import { MdAccountCircle } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import Link from "../../Link";
import { useLocation } from "react-router";
import ImgMui from "../../ImgMui";
import imgManon from "../../../assets/img/logo_manon.webp";
import DropDownMenu from "./DropDownMenu";
import ElevationScroll from "../ElevationScroll";
import { useAuth } from "../../../utils/AuthContext";

export default function NavbarMd() {
  const location = useLocation();
  const theme = useTheme();
  const { isLogged } = useAuth();

  const [navbarState, setNavbarState] = useState({
    bgNavbar: "white",
    textColor: "text.primary",
    scrolled: false
  });

  const { bgNavbar, textColor, scrolled } = navbarState;

  const isSelectedMenu = location.pathname.includes("/jewelry");

  const getLinkStyles = (path) =>
    location.pathname === path
      ? { fontWeight: "bold", color: scrolled ? theme.palette.text.secondary : "text.primary" }
      : { color: scrolled ? "text.white": textColor, fontWeight:'300' };

  return (
    <>
      <ElevationScroll setNavbarState={setNavbarState}>
        <AppBar position="sticky" sx={{ backgroundColor: bgNavbar, transition: "background-color 0.3s" }}>
          <Toolbar>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ py: 1, pl: 3, width: "100%" }}
            >
              {/* Logo and title */}
              <Stack direction="row" spacing={2} alignItems="center">
              <Link href="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: 2 }}>
                <ImgMui sx={{ width: 40, height: 40 }} alt="logo" src={imgManon} />
                <Typography variant="h6" sx={{ fontWeight: 300, color: textColor }}
                >L'Atelier de Manon</Typography>
              </Link>

              </Stack>

              {/* Navigation links */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Link variant="navbar" sx={getLinkStyles("/")} href="/">
                  Accueil
                </Link>
                <DropDownMenu textColor={getLinkStyles("/about")} selected={isSelectedMenu} scrolled={scrolled} />
                <Link variant="navbar" sx={getLinkStyles("/about")} href="/about">
                  À propos
                </Link>
                <Link variant="navbar"  sx={getLinkStyles("/faq")} href="/faq">
                  FAQ
                </Link>
                <Link variant="navbar" sx={getLinkStyles("/contact")} href="/contact">
                  Contact
                </Link>
                <Link variant="navbar" sx={getLinkStyles("/blog")} href="/blog">
                  Blog
                </Link>
                {isLogged && <Link variant="navbar" href="/cart" >
                  <IconButton>
                    <IoMdCart color={scrolled ? theme.palette.text.white : theme.palette.text.primary} sx={getLinkStyles("/cart")} />
                  </IconButton>
                </Link>}
                <Link variant="navbar" href={isLogged ? "/profil" : "/login"}>
                  <IconButton>
                    <MdAccountCircle color={scrolled ? theme.palette.text.white : theme.palette.text.primary} sx={getLinkStyles("/profil")} />
                  </IconButton>
                </Link>
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
}

NavbarMd.propTypes = {
  logoTitle: PropTypes.node,
};
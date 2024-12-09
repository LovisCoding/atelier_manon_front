import React, { useState } from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Stack, IconButton, Typography, useTheme } from "@mui/material";
import { FaSearch } from "react-icons/fa";
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
  const auth = useAuth();

  const [navbarState, setNavbarState] = useState({
    bgNavbar: "transparent",
    textColor: "text.primary",
    scrolled: false,
  });

  const { bgNavbar, textColor, scrolled } = navbarState;

  const isSelectedMenu = location.pathname === "/bijoux";

  const getLinkStyles = (path) =>
    location.pathname === path
      ? { fontWeight: "bold", color: scrolled ? "text.secondary" : "text.primary" }
      : { color: textColor };

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
              <Link href="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <ImgMui sx={{ width: 40, height: 40 }} alt="logo" src={imgManon} />
              </Link>
                <Typography variant="h6" sx={{ fontWeight: 200, color: textColor }}>
                  L'Atelier de Manon
                </Typography>
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
                <Link variant="navbar" sx={getLinkStyles("/faq")} href="/faq">
                  FAQ
                </Link>
                <Link variant="navbar" sx={getLinkStyles("/contact")} href="/contact">
                  Contact
                </Link>
                {
                  !auth.details && <Link variant="navbar" sx={getLinkStyles("/login")} href="/login">Connexion</Link>
                }
                <Link variant="navbar" sx={getLinkStyles("/profil")} href="/profil">
                  Profil
                </Link>
                <IconButton>
                  <FaSearch color={scrolled ? theme.palette.text.white : theme.palette.text.primary} />
                </IconButton>
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
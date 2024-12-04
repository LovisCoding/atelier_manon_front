import React, { useState } from "react";
import { Box, Button, Typography, Stack, Paper, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { MdCalendarToday, MdAdd, MdEdit } from "react-icons/md";
import { FaEuroSign } from "react-icons/fa";
import SidebarMenu from "../SidebarMenu";
import { CiUser } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import theme from "../../../theme/theme";

export default function OrderDetails() {
  return (
    <Box display={"flex"}>
      <SidebarMenu />
      <OrderDetailsContent />
    </Box>
  )
}

function OrderDetailsContent() {

  return (
    <Stack spacing={4} p={4}>
      <Typography variant="h4" fontWeight="bold">
        Détail de la commande
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <Stack direction="row" alignItems="center" spacing={1}>
          <FaEuroSign />
          <Typography>34,00</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <MdCalendarToday />
          <Typography>25 novembre 2024</Typography>
        </Stack>
      </Stack>

      <ClientDetail />
      <ProductsDetail />
      <Actions />

    </Stack>
  );
}

function Actions() {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Button fullWidth variant="yellowButton">
          Changer l'état
        </Button>
        <Button fullWidth variant="contained" color="error">
          Supprimer
        </Button>
      </Stack>
      <Button variant="outlined" color="secondary">
        Envoyer un lien de paiement
      </Button>
    </Stack>
  )
}

function ProductsDetail() {

  const products = [
    "", "", ""
  ]

  return (
    <>
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">
            Produits
          </Typography>
        </Stack>
        {products.map((product) => (
          <Stack
            key={""}
            direction="row"
            alignItems="center"
            spacing={3}
            padding={2}
            sx={{ mb: 1 }}
          >
            <Box sx={{
              height: "4rem",
              width: "4rem",
              objectFit: "cover"
            }} component={"img"} src="https://via.placeholder.com/200x400">
            </Box>

            <Stack spacing={1}>
              <Stack>
                <Stack direction={"row"} spacing={1}>
                  <Typography color={theme.palette.grey[900]} variant="h6">5x</Typography>
                  <Typography color={theme.palette.grey[900]} variant="h6">Nom du produit 1</Typography>
                </Stack>
                <Stack color={theme.palette.grey[600]} direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={1}>
                  <Typography variant="body2">10x Howlite</Typography>
                  <GoDotFill size={6} />
                  <Typography variant="body2">5x séparateur</Typography>
                  <GoDotFill size={6} />
                  <Typography variant="body2">fil doré</Typography>
                  <GoDotFill size={6} />
                  <Typography variant="body2">gravure: Florian</Typography>
                </Stack>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <Typography variant="body1">30,00 €</Typography>
                <Typography variant="body2">(6€ unitaire)</Typography>
              </Stack>
            </Stack>

          </Stack>
        ))}
      </Stack>
    </>

  )
}

function ClientDetail() {
  return (
    <>
      <Stack spacing={1}>
        <Typography variant="h4">
          Client
        </Typography>
        <Stack sx={{
            border: "1px solid grey",
            padding: 3
          }} direction={"row"} spacing={3}>
            <CiUser size={64} />
            <Stack maxWidth={"20rem"}>
              <Typography variant="h6">Matthias Bernouy</Typography>
              <Typography variant="body2">matthias.bernouy@orange.fr</Typography>
              <Typography>18b chemin du fond du val, 76930 octeville-sur-mer</Typography>
            </Stack>
        </Stack>
      </Stack>
    </>

  )
}
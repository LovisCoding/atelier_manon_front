import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Stack, Paper, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { MdCalendarToday } from "react-icons/md";
import { FaEuroSign } from "react-icons/fa";
import SidebarMenu from "../SidebarMenu";
import { CiUser } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import theme from "../../../theme/theme";
import { FiGift } from "react-icons/fi";
import { CiStickyNote } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";


const orderDetailTmp = {
  "amount": "34,00 €",
  "date_creation": "15 novembre 2024",
  "delivery": null,
  "gift": true,
  "note": "Note de la commande",
  "commentary": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga doloremque repellat eligendi eum accusamus, culpa libero tempora vero suscipit quos veritatis ducimus, corporis quas atque, consectetur perspiciatis architecto nisi amet.",
  "state": "En cours",
  "client": {
    "firstname": "MAtthias",
    "lastname": "Bernouy",
    "email": "matt.bernouy@orange.fr"
  },
  "products": [
    {
      "id": "1",
      "title": "Titre du produit",
      "qty": 6,
      "price": 5.50,
      "image": "image1.jpg",
      "gravure": "Florian",
      "fil": "...",
      "materiaux": "...",
      "pierre": "..."
    },
    {
      "id": "2",
      "title": "Titre du produit",
      "qty": 6,
      "price": 5.50,
      "image": "image1.jpg",
      "gravure": "Florian",
      "fil": "...",
      "materiaux": "...",
      "pierre": "..."
    }
  ]
}

export default function OrderDetails() {

  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {

  }, [])

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

      <Stack spacing={2}>



        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <CiStickyNote />
          <Typography>Note de la commande</Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <TbTruckDelivery />
          <Typography>livraison le 25 novembre 2024</Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <FiGift />
          <Typography>est cadeau</Typography>
        </Stack>

      </Stack>

      <Stack maxWidth={"30rem"} spacing={2}>
        <Typography variant="h4">Commentaire</Typography>
        <Typography variant="body1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit qui eveniet ducimus quasi rem excepturi dolore, magni iste, consequatur necessitatibus ab repellat et non dolor? Suscipit dignissimos quod sint.</Typography>
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
import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import { MdCalendarToday } from "react-icons/md";
import { FaEuroSign } from "react-icons/fa";
import SidebarMenu from "../SidebarMenu";
import { CiUser } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import theme from "../../../theme/theme";
import { FiGift } from "react-icons/fi";
import { CiStickyNote } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { GrStatusGoodSmall } from "react-icons/gr";
import { getOrderAdminDetail } from "../../../services/CommandService";


const orderDetailTmp = {
  "amount": "34,00 €",
  "creation_date": "15 novembre 2024",
  "delivery": "12 novembre 2024",
  "gift": true,
  "note": "Note de la commande",
  "commentary": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga doloremque repellat eligendi eum accusamus, culpa libero tempora vero suscipit quos veritatis ducimus, corporis quas atque, consectetur perspiciatis architecto nisi amet.",
  "state": "En cours",
  "client": {
    "firstname": "Matthias",
    "lastname": "Bernouy",
    "email": "matt.bernouy@orange.fr",
    "address": "17b chemin du fond du val"
  },
  "products": [
    {
      "id": "1",
      "title": "Titre du produit",
      "qty": 6,
      "price": 5.50,
      "image": "bracelet1.webp",
      "gravure": "Florian",
      "fil": "...",
      "materiaux": "...",
      "pierre": "..."
    },
    {
      "id": "2",
      "title": "Titre du produit",
      "qty": 3,
      "price": 4,
      "image": "bracelet1.webp",
      "gravure": "Florian",
      "fil": "...",
      "materiaux": "...",
      "pierre": "..."
    }
  ]
}

export default function OrderDetails() {

  return (
    <Box display={"flex"}>
      <SidebarMenu />
      <OrderDetailsContent />
    </Box>
  )
}

function OrderDetailsContent() {

  const [orderDetails, setOrderDetails] = useState(orderDetailTmp);
  const { id } = useParams();

  useEffect(() => {
    getOrderAdminDetail(id)
      .then((data) => {
        if (data != null) setOrderDetails(data);
      })
  }, [])

  return (
    <Stack spacing={4} p={4}>
      <Typography variant="h4" fontWeight="bold">
        Détail de la commande
      </Typography>


      <Stack spacing={2}>

        <Stack direction="row" alignItems="center" spacing={1}>
          <FaEuroSign />
          <Typography>{orderDetails.amount}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <MdCalendarToday />
          <Typography>{orderDetails.creation_date}</Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <CiStickyNote />
          <Typography>{orderDetails.note}</Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <TbTruckDelivery />
          <Typography>livraison le {orderDetails.delivery}</Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <GrStatusGoodSmall />
          <Typography>en cours</Typography>
        </Stack>
        {
          orderDetails.gift &&
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <FiGift />
            <Typography>est cadeau</Typography>
          </Stack>
        }


      </Stack>

      <Stack maxWidth={"30rem"} spacing={2}>
        <Typography variant="h4">Commentaire</Typography>
        <Typography variant="body1">{orderDetails.commentary}</Typography>
      </Stack>

      <ClientDetail client={orderDetails.client} />
      <ProductsDetail products={orderDetails.products} />
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
      {/* <Button variant="outlined" color="secondary">
        Envoyer un lien de paiement
      </Button> */}
    </Stack>
  )
}

function ProductsDetail({ products }) {

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
            }} component={"img"} src={`/api/img/${product.image}`}>
            </Box>

            <Stack spacing={1}>
              <Stack>
                <Stack direction={"row"} spacing={1}>
                  <Typography color={theme.palette.grey[900]} variant="h6">{product.qty}x</Typography>
                  <Typography color={theme.palette.grey[900]} variant="h6">{product.title}</Typography>
                </Stack>
                <Stack color={theme.palette.grey[600]} direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={1}>
                  <Typography variant="body2">{product.pierre}</Typography>
                  <GoDotFill size={6} />
                  <Typography variant="body2">{product.materiaux}</Typography>
                  <GoDotFill size={6} />
                  <Typography variant="body2">{product.fil}</Typography>
                  <GoDotFill size={6} />
                  <Typography variant="body2">gravure: {product.gravure}</Typography>
                </Stack>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <Typography variant="body1">{product.price * product.qty} €</Typography>
                <Typography variant="body2">({product.price}€ unitaire)</Typography>
              </Stack>
            </Stack>

          </Stack>
        ))}
      </Stack>
    </>

  )
}

function ClientDetail({ client }) {
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
            <Typography variant="h6">{client.firstname} {client.lastname}</Typography>
            <Typography variant="body2">{client.email}</Typography>
            <Typography>{client.address}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </>

  )
}
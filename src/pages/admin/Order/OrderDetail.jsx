import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import { MdCalendarToday } from "react-icons/md";
import { FaEuroSign } from "react-icons/fa";
import SidebarMenu from "../SidebarMenu";
import { CiUser } from "react-icons/ci";
import theme from "../../../theme/theme";
import { FiGift } from "react-icons/fi";
import { CiStickyNote } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { GrStatusGoodSmall } from "react-icons/gr";
import { getOrderAdminDetail, getProduitsCommande } from "../../../services/CommandService";
import { getCompte } from "../../../services/UserService";
import { Link, useLocation, useParams } from "react-router";

export default function OrderDetails() {

  return (
    <Box display={"flex"}>
      <SidebarMenu />
      <OrderDetailsContent />
    </Box>
  )
}

function OrderDetailsContent() {

  const [orderDetails, setOrderDetails] = useState();
  const [products, setProducts] = useState(null);
  const [client, setClient] = useState(null);
  const [total, setTotal] = useState();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    getOrderAdminDetail(id)
      .then((data) => {
        if (data != null) {
          setOrderDetails(data);
        } else {
          console.log("Hello World");
          setError("Une erreur est survenue lors du chargment du détail de la commande")
        }
      })
    getProduitsCommande(id)
      .then((data) => {
        if (data != null) setProducts(data);
        else setError("Une erreur est survenue lors du chargment du détail de la commande")
      })
  }, [])

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      let total = 0;
      products.forEach((product) => {
        total += product.qa * product.prix;
      });
      setTotal(total);
    } else {
      setTotal(0); // Si `products` est null ou vide, le total est 0
    }
  }, [products]);
  

  useEffect(() => {
    getCompte()
      .then((data) => {
        if ( data != null ) setClient(data);
        else setError("Une erreur est survenue lors du chargment du détail de la commande")
      })
  }, [orderDetails])

  if ( !orderDetails || !products || !client ) {
    return (
      <Stack padding={5}>
        {
          error ? <>
            <Typography mb={5} variant="h2">{error}</Typography>
            <Typography><Link to="/admin/orders">Revenir à la liste des commandes</Link></Typography>
          </> : <Typography variant="h1">Chargement des détails de la commande...</Typography>
        }
      </Stack>
    );
  }

  return (
    <Stack spacing={4} p={4}>
      <Typography variant="h4" fontWeight="bold">
        Détail de la commande
      </Typography>

      <Stack spacing={2}>

        <Stack direction="row" alignItems="center" spacing={1}>
          <FaEuroSign />
          <Typography>{total}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <MdCalendarToday />
          <Typography>{orderDetails.dateCommande}</Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <CiStickyNote />
          <Typography>{orderDetails.carte}</Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <TbTruckDelivery />
          <Typography>livraison le {orderDetails.dateLivraison}</Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <GrStatusGoodSmall />
          <Typography>{ orderDetails.etat }</Typography>
        </Stack>
        {
          orderDetails.estCadeau &&
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <FiGift />
            <Typography>est cadeau</Typography>
          </Stack>
        }


      </Stack>

      <Stack maxWidth={"30rem"} spacing={2}>
        <Typography variant="h4">Commentaire</Typography>
        <Typography variant="body1">{orderDetails.comm}</Typography>
      </Stack>

      <ClientDetail client={client} />
      <ProductsDetail products={products} />
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
{/*         <Button fullWidth variant="contained" color="error">
          Supprimer
        </Button> */}
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
                  <Typography color={theme.palette.grey[900]} variant="h6">{product.qa}x</Typography>
                  <Typography color={theme.palette.grey[900]} variant="h6">{product.libProd}</Typography>
                </Stack>
                <Stack color={theme.palette.grey[600]} direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={1}>
                  <Typography variant="body2">{product.variante}</Typography>
                  <Typography variant="body2">gravure: {product.gravure}</Typography>
                </Stack>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <Typography variant="body1">{product.prix * product.qa} €</Typography>
                <Typography variant="body2">({product.prix}€ unitaire)</Typography>
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
            <Typography variant="h6">{client.preCli} {client.nomCli}</Typography>
            <Typography variant="body2">{client.email}</Typography>
            <Typography>{client.adresse}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </>

  )
}
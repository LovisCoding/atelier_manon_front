import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import SidebarMenu from "../SidebarMenu";
import theme from "../../../theme/theme";
import { getOrderAdminDetail, getProduitsCommande } from "../../../services/CommandService";
import { getCompte } from "../../../services/UserService";
import { Link, useParams } from "react-router";
import { FaEuroSign } from "react-icons/fa";
import { MdCalendarToday } from "react-icons/md";
import { CiStickyNote, CiUser } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { GrStatusGoodSmall } from "react-icons/gr";
import { FiGift } from "react-icons/fi";
import { updateState } from "../../../services/OrderService";
import { formatDate } from "../../../utils/Date";

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
  const { id } = useParams();
  const [error, setError] = useState(null);


  useEffect(() => {
    getOrderAdminDetail(id)
      .then((data) => {
        if (data != null) {
          setOrderDetails(data);
        } else {
          setError("Une erreur est survenue lors du chargement du détail de la commande")
        }
      })
    getProduitsCommande(id)
      .then((data) => {
        if (data != null) {
          setProducts(data)
        }
        else setError("Une erreur est survenue lors du chargement du détail de la commande")
      })
  }, [])


  useEffect(() => {
    if (!orderDetails) return;
    getCompte(orderDetails.idCli)
      .then((data) => {
        if (data != null) setClient(data);
        else setError("Une erreur est survenue lors du chargment du détail du client")
      })
  }, [orderDetails])

  if (!orderDetails || !products || !client) {
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
    <Stack margin={"0 auto"} spacing={4} p={4}>
      <Typography variant="h4" fontWeight="bold">
        Détail de la commande
      </Typography>

      <Stack spacing={2}>

        <Stack direction="row" alignItems="center" spacing={1}>
          <FaEuroSign />
          <Typography>{orderDetails.prixTotal}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <MdCalendarToday />
          <Typography>{ formatDate(orderDetails.dateCommande) }</Typography>
        </Stack>

        {
          orderDetails.estCadeau &&
          <>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <CiStickyNote />
              <Typography>{ orderDetails.carte || "Pas de note"}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <FiGift />
              <Typography>Cette commande est un cadeau</Typography>
            </Stack>
          </>

        }
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <TbTruckDelivery />
          <Typography>livraison le { formatDate(orderDetails.dateLivraison) }</Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <GrStatusGoodSmall />
          <Typography>{orderDetails.etat}</Typography>
        </Stack>



      </Stack>

      <Stack maxWidth={"30rem"} spacing={2}>
        <Typography variant="h4">Commentaire</Typography>
        <Typography variant="body1">{orderDetails.comm}</Typography>
      </Stack>

      <ClientDetail client={client} />
      <ProductsDetail products={products} />
      <Actions setOrderDetails={setOrderDetails} orderDetails={orderDetails} />

    </Stack>
  );
}

function Actions({ setOrderDetails, orderDetails }) {
  const { id } = useParams();

  const changeState = async (state) => {
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      etat: state,
    }));

    try {
      await updateState(id, state);
    } catch (error) {
      setOrderDetails((prevDetails) => ({
        ...prevDetails,
        etat: prevDetails.etat,
      }));
    }
  };

  return (
    <Stack spacing={3}>
        { orderDetails.etat === "pas commencée" &&  <Button onClick={() => changeState("en cours")} fullWidth variant="yellowButton">Commencer la commande</Button> }
        { orderDetails.etat === "en cours" &&  <Button onClick={() => changeState("terminée")} fullWidth variant="yellowButton">Terminer la commande</Button> }
        { orderDetails.etat !== "annulée" &&  <Button onClick={() => changeState("annulée")} fullWidth variant="yellowButton">Annuler la commande</Button> }
    </Stack>
  );
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
            }} component={"img"} src={getProductImage(row.photo, 100, product.photo)}>
            </Box>

            <Stack spacing={1}>
              <Stack>
                <Stack direction={"row"} spacing={1}>
                  <Typography color={theme.palette.grey[900]} variant="h6">{product.qa}x</Typography>
                  <Typography color={theme.palette.grey[900]} variant="h6">{product.produit.libProd}</Typography>
                </Stack>
                <Stack color={theme.palette.grey[600]} direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={1}>
                  <Typography variant="body2">{product.variante}</Typography>
                  <Typography variant="body2">{ product.gravure && `gravure: ${product.gravure}` }</Typography>
                </Stack>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <Typography variant="body1">{product.produit.prix * product.qa} €</Typography>
                <Typography variant="body2">({product.produit.prix}€ unitaire)</Typography>
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
            <Typography>{client.adresse.replace(/[{}"]/g, '').replaceAll(',', ' ')}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </>

  )
}
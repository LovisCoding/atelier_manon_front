import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Card,
  CardContent,
  Grid2,
  TableFooter,
  TextField,
  TextareaAutosize,
  Checkbox,
} from "@mui/material";
import ImgMui from "../components/ImgMui";
import {
  MdAdd as Add,
  MdDelete as Delete,
  MdRemove as Remove,
  MdClose as Close,
} from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";

import { useTheme } from "@mui/material/styles";

import { addCommande, addProductPanier, getCartProducts, reduceProductPanier, deleteProductPanier } from "../services/CartService";
import { useNavigate } from "react-router";

import { useAuth } from "../utils/AuthContext";

function Cart() {
  const {details} = useAuth();
  const [cartProducts, setCartProducts] = useState([]);
  const [commentary, setCommentary] = useState("");
  const [promoCodes, setPromoCodes] = useState([]);
  const [isGift, setIsGift] = useState(false);
  const [giftCommentary, setGiftCommentary] = useState("");
  const [total, setTotal] = useState(0.0);

  const navigate = useNavigate();

  useEffect(() => {
    const exec = async () => {
      const data = await getCartProducts();
      if (!data || data.status === 403) navigate('/');
      if (!data) return;
      setCartProducts(data);
    };
    exec();
  }, []);

  const theme = useTheme();

  useEffect(() => {
    calculateTotal();
  }, [cartProducts]);

  const calculateTotal = () => {
    setTotal(
      Math.round(
        cartProducts.reduce((acc, product) => {
          const prix = product.produit.prix; // Convertit en nombre si nécessaire
          const quantite = product.qa || 1; // Définit une quantité par défaut si elle est manquante
          return acc + prix * quantite;
        }, 0) * 100
      ) / 100
    );
  };

  const updateQuantity = (idProd,variante,gravure,idCli,increment) => {
    setCartProducts((prev) =>
      prev.map((product) =>
        product.idProd+product.variante+product.gravure+product.idCli === idProd+variante+gravure+idCli
          ? { ...product, qa: Math.max(1, product.qa + increment) }
          : product
      )
    );
  };

  const removeItem = (idProd,variante,gravure,idCli) => {
    setCartProducts((prev) =>
      prev.filter((product) => product.idProd+product.variante+product.gravure+product.idCli !== idProd+variante+gravure+idCli)
    );
    deleteProductPanier(cartProducts.find((product) => product.idProd+product.variante+product.gravure+product.idCli === idProd+variante+gravure+idCli));
  };


  const handleConfirmCommand = async () => {
    const commandId = await addCommande(commentary, isGift, giftCommentary, promoCodes);
    if (!commandId) return; // TODO: handle error
    navigate('/command/'+commandId);
  }

  return (
    <Box mb={3} fontFamily={theme.typography.fontFamily} >
      <Typography
        fontWeight="bold"
        variant="h4"
        display="flex"
        justifyContent="center"
        padding="1rem 0"
      >
        Mon panier
      </Typography>

      <Grid2
        container
        columns={{ xs: 2, sm: 8, md: 12 }}
        spacing={5}
        justifyContent="center"
        margin="0 1rem"
      >
        <Grid2 item size={{ xs: 2, sm: 8, md: 12 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* titre gravure, variante, prix, quantité, total */}
                  <TableCell sx={{ fontSize: 16 }}>Produit</TableCell>
                  <TableCell
                    align="right"
                    sx={{ minWidth: "6rem", fontSize: 16 }}
                  >
                    Prix
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: "8rem", fontSize: 16 }}
                  >
                    Quantité
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ minWidth: "6rem", fontSize: 16 }}
                  >
                    Total
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartProducts.map((product) => (
                  <CartItem
                    product={product}
                    removeItem={removeItem}
                    updateQuantity={updateQuantity}
                  />
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bolder" }}>
                    {" "}
                    <Typography
                      fontSize={18}
                      fontWeight="bolder"
                      color="customYellow"
                    >
                      Sous-total
                    </Typography>
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell sx={{ fontWeight: "bolder" }}>
                    {" "}
                    <Typography
                      fontSize={18}
                      fontWeight="bolder"
                      color="customYellow"
                      textAlign="end"
                    >
                      {total} €
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid2>

        <Grid2 item size={{ xs: 2, sm: 8, md: 6 }}>
          <Card>
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <TextareaAutosize
                multiline
                minRows={2}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "16px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  resize: " none",
                  outlineColor: theme.palette.customYellow.main,
                  fontWeight: "normal",
                  fontFamily: theme.typography.fontFamily
                }}
                placeholder="Ajoutez un commentaire sur votre commande"
                value={commentary}
                onChange={(e) => setCommentary(e.target.value)}
              />
              <Box display="flex" alignItems="center" gap={1} >
                <BsInfoCircle />
                <Typography variant="body2" >Les codes promo sont effectifs après vérification, une fois la commande validée.</Typography>
              </Box>
              <PromoCodeSection
                promoCodes={promoCodes}
                setPromoCodes={setPromoCodes}
              />

              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  width="30rem"
                  ml={0}
                  display="flex"
                  gap={1}
                  alignItems="center"
                  onClick={(e) => setIsGift(!isGift)}
                  sx={{ cursor: "pointer" }}
                >
                  <Checkbox color="customYellow" checked={isGift} />
                  <Typography>Votre commande est un cadeau</Typography>
                </Box>

                <TextareaAutosize
                  hidden={!isGift}
                  multiline
                  minRows={1}
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "16px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    resize: " none",
                    outlineColor: theme.palette.customYellow.main,
                    fontWeight: "normal",
                    fontFamily: theme.typography.fontFamily
                  }}
                  placeholder="Ajoutez un mot pour le destinataire"
                  value={giftCommentary}
                  onChange={(e) => setGiftCommentary(e.target.value)}
                />
              </Box>

              <Typography
                alignSelf="end"
                variant="body1"
                gutterBottom
                mr={3}
                fontSize={18}
              >
                Dû total : <span style={{ fontWeight: "bold" }}>{total} €</span>
              </Typography>

              <Button
                variant="yellowButton"
                disabled={cartProducts.length === 0}
                onClick={(e) => handleConfirmCommand()}
              >
                Passer commande
              </Button>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
}

const CartItem = ({ product, removeItem, updateQuantity }) => {
  return (
    <TableRow key={product.idProd}>
      <TableCell width="auto">
        <Box
          display="flex"
          width="auto"
          alignItems="center"
          gap={2}
          padding="0"
        >
          <ImgMui
            alt=""
            src={product.produit.tabPhoto}
            sx={{ height: "70px", width: "auto", borderRadius: "5px" }}
          />
          <Box fullWidth>
            <Box fullWidth>
              <Typography fontSize={18}>{product.produit.libProd}</Typography>
              <Typography fontSize={14} color="grey">
                {product.produit.descriptionProd}
              </Typography>
            </Box>
            <Box display="flex" gap={5}>
              {product.gravure !== "" && (
                <Typography fontSize={16}>
                  <span style={{ fontWeight: "500" }}>Gravure :</span>{" "}
                  {product.gravure}
                </Typography>
              )}
              {product.variante !== "" && (
                <Typography fontSize={16}>
                  <span style={{ fontWeight: "500" }}>Variante :</span>{" "}
                  {product.variante}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </TableCell>

      <TableCell align="right">{product.produit.prix} €</TableCell>
      <TableCell align="center">
        <IconButton onClick={() => {updateQuantity(product.idProd,product.variante,product.gravure,product.idCli,-1); reduceProductPanier(product)}}>
          <Remove />
        </IconButton>
        {product.qa}
        <IconButton onClick={() => {updateQuantity(product.idProd,product.variante,product.gravure,product.idCli,1); addProductPanier(product)}}>
          <Add />
        </IconButton>
      </TableCell>
      <TableCell align="right">{Math.round(product.produit.prix * product.qa*100)/100} €</TableCell>
      <TableCell align="center">
        <IconButton onClick={() => removeItem(product.idProd,product.variante,product.gravure,product.idCli)}>
          <Delete color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const PromoCodeSection = ({ promoCodes, setPromoCodes }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddPromoCode = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!promoCodes.includes(inputValue.trim())) {
        setPromoCodes([...promoCodes, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleRemovePromoCode = (code) => {
    setPromoCodes(promoCodes.filter((item) => item !== code));
  };

  return (
    <Box display="flex" flexDirection="column" width="100%" gap={2}>
      <TextField
        placeholder="Entrez un code promo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddPromoCode}
        color="customYellow"
        fullWidth
      />

      {promoCodes.length > 0 && (
        <Box
          display="flex"
          gap=".5rem"
          padding=".2rem .5rem"
          borderRadius="5px"
          minWidth="15rem"
          flexWrap="wrap"
        >
          {promoCodes.map((code, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: ".2rem .5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#f9f9f9",
                height: "fit-content",
                bgcolor: "none",
                gap: ".3rem",
              }}
            >
              <Typography>{code}</Typography>
              <Box
                size="small"
                color="error"
                onClick={() => handleRemovePromoCode(code)}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ cursor: "pointer" }}
              >
                <Close color="error" />
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Cart;

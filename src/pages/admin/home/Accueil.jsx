import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel, Stack, Snackbar, Alert } from "@mui/material";
import SidebarMenu from "../SidebarMenu";
import { getCategories } from "/src/services/CategorieService";
import { addImage, addImageCateg } from "/src/services/HomeService";
import { convertFilesToBase64 } from "/src/utils/Base64";
import axios from "axios";
import { getEvenement, getImageURL, updateEvenement } from "../../../services/HomeService";
import { getAllProducts } from "../../../services/ProductService";

export default function Accueil() {

  const [categorie, setCategorie] = useState("");
  const [idCategorie, setIdCategorie] = useState(null);
  const [categories, setCategories] = useState([]);

  const [produit, setProduit] = useState("");
  const [idProduit, setIdProduit] = useState(null);
  const [produits, setProduits] = useState([]);

  const [event, setEvent] = useState("");

  const [eventBarMessage, setEventBarMessage] = useState("");
  const [isEventBarDisplayed, setIsEventBarDisplayed] = useState(false);


  const changeEvent = () => {
    axios.post("/api/admin/personnalisation/update-evenement", {
      type:"evenement",
      message: event
    })
      .then((res) => {
        console.log(res);
        setEventBarMessage("Evénement mis à jour avec succès !");
        setIsEventBarDisplayed(true);
      })
      .catch((err) => {
        console.error(err)
        setEventBarMessage("Erreur lors de la mise à jour de l'événement.");
        setIsEventBarDisplayed(true);
      })
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      if (data) {
        setCategories(data);
      }
    };

    fetchCategories();

    const fetchProduits = async () => {
      const data = await getAllProducts();
      if (data) {
        setProduits(data);
      }
    };
    fetchProduits();

    getEvenement("evenement")
      .then((data) => {
        setEvent(data);
      })
  }, []);

  const handleFileChange = async (event, type, idCategorie = null) => {
    const files = event.target.files;
    if (files.length > 0) {
      try {
        const base64Images = await convertFilesToBase64(files);

        if (type === "categorie" && idCategorie) {
          await addImageCateg(idCategorie, idCategorie, base64Images[0]);
          setEventBarMessage("Image de la categorie envoyée avec succès !");
          setIsEventBarDisplayed(true);
        } else if (type !== "categorie") {
          await addImage(base64Images[0], type);
          setEventBarMessage("Image envoyée avec succès !");
          setIsEventBarDisplayed(true);
        } else {
          setEventBarMessage("Veuillez sélectionner une catégorie.");
          setIsEventBarDisplayed(true);
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'image :", error);
        setEventBarMessage("Une erreur est survenue lors de l'envoi de l'image.");
        setIsEventBarDisplayed(true);
      }
    }
  };

  const handleSaveRedirectProduct = async () => {
    const data = await updateEvenement("produitEvenement", Number(idProduit));
    if (data) {
      setEventBarMessage("Redirection produit mise à jour avec succès !")
      setIsEventBarDisplayed(true);
    }
    else {
      setEventBarMessage("Erreur lors de la mise à jour de la redirection produit.");
      setIsEventBarDisplayed(true);
    }
  }

  const handleCategorieChange = (event) => {
    setCategorie(event.target.value);
    const selectedCategory = categories.find(
      (cat) => cat.libCateg === event.target.value
    );

    setIdCategorie(selectedCategory ? selectedCategory.idCateg : null);
  };

  const handleProduitChange = (event) => {
    setProduit(event.target.value);
    const selectedProduit = produits.find(
      (prod) => prod.libProd == event.target.value
    );
    setIdProduit(selectedProduit ? selectedProduit.idProd : null);
  };

  return (
    <Box sx={{ display: "flex", height:'100vh' }}>
      <SidebarMenu />

      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f4f6f8",
          borderRadius: 2
        }}
      >
        <Snackbar
          open={isEventBarDisplayed}
          autoHideDuration={3000}
          onClose={()=>setIsEventBarDisplayed(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={()=>setIsEventBarDisplayed(false)} severity={eventBarMessage.includes("succès") ? "success" : "error"} sx={{ width: "100%" }}>{eventBarMessage}</Alert>
        </Snackbar>
        <Stack spacing={4} sx={{ width: "100%", maxWidth: 600, mb: "2rem" }}>
          <Typography variant="h4" align="center">
            Gestion des Pages
          </Typography>

          <Box display="flex" width="100%" gap={1} >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: '100%' }}>
              <Typography variant="h6" sx={{ marginBottom: 1, color: "black" }}>
                Logo
              </Typography>
              <TextField
                type="file"
                onChange={(e) => handleFileChange(e, "logo")}
                sx={{ marginBottom: 2 }}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box sx={{ borderRadius: "15px", backgroundImage: `url(${getImageURL('logo')})`, backgroundSize: 'cover', width: 200, height: 'auto', backgroundPosition: 'center' }} ></Box>
          </Box>

          <Box display="flex" width="100%" gap={1} >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: '100%' }}>
              <Typography variant="h6" sx={{ marginBottom: 1, color: "black" }}>
                Page d'accueil
              </Typography>
              <TextField
                type="file"
                onChange={(e) => handleFileChange(e, "home")}
                sx={{ marginBottom: 2 }}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box sx={{ borderRadius: "15px", backgroundImage: `url(${getImageURL('home')})`, backgroundSize: 'cover', width: 200, height: 'auto', backgroundPosition: 'center' }} ></Box>
          </Box>

          <Box display="flex" width="100%" gap={1} >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: '100%' }} >
              <Typography variant="h6" sx={{ marginBottom: 1, color: "black" }}>
                Page de Bijoux
              </Typography>
              <TextField
                type="file"
                onChange={(e) => handleFileChange(e, "bijoux")}
                sx={{ marginBottom: 2 }}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box sx={{ borderRadius: "15px", backgroundImage: `url(${getImageURL('bijoux')})`, backgroundSize: 'cover', width: 200, height: 'auto', backgroundPosition: 'center' }} ></Box>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ marginBottom: 1, textAlign: "center", color: "black" }}>
              Catégorie
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel sx={{ color: "black" }}>Choisir une catégorie</InputLabel>
              <Select
                value={categorie}
                onChange={handleCategorieChange}
                label="Choisir une catégorie"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.idCateg} value={cat.libCateg}>
                    {cat.libCateg}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box display="flex" width="100%" gap={1} >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: '100%' }} >
              <Typography variant="h6" sx={{ marginBottom: 1, color: "black" }}>
                Fichier Catégorie
              </Typography>
              <TextField
                type="file"
                onChange={(e) => handleFileChange(e, "categorie", idCategorie)}
                sx={{ marginBottom: 2 }}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box sx={{ borderRadius: "15px", backgroundImage: `url(${getImageURL(idCategorie)})`, backgroundSize: 'cover', width: 200, height: 'auto', backgroundPosition: 'center' }} ></Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h6" sx={{ marginBottom: 1, color: "black" }}>
              Évènement (bannière en haut de la page)
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, width:"100%"}}>
              <TextField
                type="text"
                onChange={(e) => {
                  setEvent(e.target.value);
                }}
                value={event}
                fullWidth
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ fontWeight: "bold" }}
                onClick={() => changeEvent()}>
                Changer l'évènement
              </Button>
            </Box>

          </Box>

          <Box>
            <Typography variant="h6" sx={{ marginBottom: 1, textAlign: "center", color: "black" }}>
              Redirection du produit de la page d'accueil
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: "black" }}>Choisir un produit</InputLabel>
                <Select
                  value={produit}
                  onChange={handleProduitChange}
                  label="Choisir un produit"
                >
                  {produits.map((prod) => (
                    <MenuItem key={prod.idProd} value={prod.libProd}>
                      {prod.libProd}
                    </MenuItem>
                  ))}
                </Select>

              </FormControl>

              <Button
                variant="contained"
                color="primary"
                sx={{ fontWeight: "bold" }}
                onClick={() => handleSaveRedirectProduct()}>
                Changer le produit
              </Button>
            </Box>

          </Box>

        </Stack>
      </Box>
    </Box>
  );
}
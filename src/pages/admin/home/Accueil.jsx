import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel, Stack } from "@mui/material";
import SidebarMenu from "../SidebarMenu";
import { getCategories } from "/src/services/CategorieService";
import { addImage, addImageCateg } from "/src/services/HomeService";
import { convertFilesToBase64 } from "/src/utils/Base64";
import axios from "axios";
import { getEvenement, getImageURL } from "../../../services/HomeService";

export default function Accueil() {

  const [categorie, setCategorie] = useState("");
  const [idCategorie, setIdCategorie] = useState(null);
  const [categories, setCategories] = useState([]);
  const [event, setEvent] = useState("");

  const changeEvent = () => {
    axios.post("/api/personnalisation/update-evenement", {
      message: event
    })
    .then((res) => {
      // console.log(res)
    })
    .catch((err) => {
      // console.log(err)
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
    getEvenement()
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
          alert("Image envoyée pour la catégorie avec succès !");
        } else if (type !== "categorie") {
          await addImage(base64Images[0], type);
          alert("Image envoyée avec succès !");
        } else {
          alert("Aucune catégorie sélectionnée.");
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'image :", error);
        alert("Une erreur est survenue lors de l'envoi de l'image.");
      }
    }
  };

  const handleCategorieChange = (event) => {
    setCategorie(event.target.value);
    const selectedCategory = categories.find(
      (cat) => cat.libCateg === event.target.value
    );

    setIdCategorie(selectedCategory ? selectedCategory.idCateg : null);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <SidebarMenu />

      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f4f6f8",
          borderRadius: 2,
        }}
      >
        <Stack spacing={4} sx={{ width: "100%", maxWidth: 600 }}>
          <Typography variant="h4" align="center">
            Gestion des Pages
          </Typography>

          <Box display="flex" width="100%" gap={1} >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width:'100%' }}>
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
            <Box sx={{borderRadius: "15px", backgroundImage: `url(${getImageURL('home')})`, backgroundSize:'cover', width:200, height:'auto', backgroundPosition:'center'}} ></Box>
          </Box>

          <Box display="flex" width="100%" gap={1} >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width:'100%' }} >
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
            <Box sx={{borderRadius: "15px", backgroundImage: `url(${getImageURL('bijoux')})`, backgroundSize:'cover', width:200, height:'auto', backgroundPosition:'center'}} ></Box>
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
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width:'100%' }} >
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
            <Box sx={{borderRadius: "15px", backgroundImage: `url(${getImageURL(idCategorie)})`, backgroundSize:'cover', width:200, height:'auto', backgroundPosition:'center'}} ></Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h6" sx={{ marginBottom: 1, color: "black" }}>
              Évènement (bannière en haut de la page)
            </Typography>
            <TextField
              type="text"
              onChange={(e) => {
                setEvent(e.target.value);
              }}
              value={event}
              sx={{ marginBottom: 2 }}
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


        </Stack>
      </Box>
    </Box>
  );
}
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel, Stack } from "@mui/material";
import SidebarMenu from "../SidebarMenu";
import { getCategories } from "/src/services/CategorieService";
import { addImage, addImageCateg } from "/src/services/HomeService";
import { convertFilesToBase64 } from "/src/utils/Base64";

export default function Accueil() {
  const [categorie, setCategorie] = useState("");
  const [idCategorie, setIdCategorie] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      if (data) {
        setCategories(data);
      }
    };

    fetchCategories();
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
    <Box sx={{ display: "flex" }}>
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
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Gestion des Pages
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Page d'accueil
            </Typography>
            <TextField
              type="file"
              onChange={(e) => handleFileChange(e, "home")}
              sx={{ marginBottom: 2 }}
              fullWidth
              variant="outlined"
              helperText="Sélectionnez un fichier pour la page d'accueil"
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Page de Bijoux
            </Typography>
            <TextField
              type="file"
              onChange={(e) => handleFileChange(e, "bijoux")}
              sx={{ marginBottom: 2 }}
              fullWidth
              variant="outlined"
              helperText="Sélectionnez un fichier pour la page des bijoux"
            />
          </Box>

          <Box>
            <Typography variant="h6" sx={{ marginBottom: 1, textAlign: "center" }}>
              Catégorie
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Choisir une catégorie</InputLabel>
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

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Fichier Catégorie
            </Typography>
            <TextField
              type="file"
              onChange={(e) => handleFileChange(e, "categorie", idCategorie)}
              sx={{ marginBottom: 2 }}
              fullWidth
              variant="outlined"
              helperText="Sélectionnez un fichier pour la catégorie"
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, fontWeight: "bold" }}
          >
            Soumettre
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
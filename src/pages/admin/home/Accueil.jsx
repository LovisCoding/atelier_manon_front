import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel, Stack } from "@mui/material";
import SidebarMenu from "../SidebarMenu";
import { getCategories } from "/src/services/CategorieService";
import { addImage } from "/src/services/HomeService";
import { convertFilesToBase64 } from "/src/utils/Base64";

export default function Accueil() {
  const [categorie, setCategorie] = useState("");
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

  const handleFileChangePageAccueil = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      try {
        const base64Images = await convertFilesToBase64(files);
        console.log("Base64 image :", base64Images[0]);
        await addImage(base64Images[0], "home");
        alert("Image envoyée avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'image :", error);
        alert("Une erreur est survenue lors de l'envoi de l'image.");
      }
    }
  };

  const handleFileChangePageBijoux = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      try {
        const base64Images = await convertFilesToBase64(files);
        await addImage(base64Images[0], "bijoux");
        alert("Image envoyée avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'image :", error);
        alert("Une erreur est survenue lors de l'envoi de l'image.");
      }
    }
  };

  const handleCategorieChange = (event) => {
    setCategorie(event.target.value);
    console.log("Catégorie sélectionnée :", event.target.value);
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
              onChange={handleFileChangePageAccueil}
              sx={{ marginBottom: 2 }}
              fullWidth
              variant="outlined"
              helperText="Sélectionnez un fichier pour la page d'accueil"
              InputProps={{
                style: { textAlign: "center" },
              }}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Page de Bijoux
            </Typography>
            <TextField
              type="file"
              onChange={handleFileChangePageBijoux}
              sx={{ marginBottom: 2 }}
              fullWidth
              variant="outlined"
              helperText="Sélectionnez un fichier pour la page des bijoux"
              InputProps={{
                style: { textAlign: "center" },
              }}
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
              onChange={handleFileChangePageBijoux}
              sx={{ marginBottom: 2 }}
              fullWidth
              variant="outlined"
              helperText="Sélectionnez un fichier pour la catégorie"
              InputProps={{
                style: { textAlign: "center" },
              }}
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
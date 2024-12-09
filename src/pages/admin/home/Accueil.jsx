import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel, Stack } from "@mui/material";
import SidebarMenu from "../SidebarMenu";
import { getCategories } from '/src/services/CategorieService';

export default function Accueil() {
  const [categorie] = useState("");
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

  const handleFileChangePageAccueil = (event) => {

  };

  const handleFileChangePageBijoux = (event) => {

  };

  const handleCategorieChange = (event) => {
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
          <Typography variant="h4" align="center" sx={{ fontWeight: "bold", color: "#333" }}>
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
                style: { textAlign: 'center' },
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
                style: { textAlign: 'center' },
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
                style: { textAlign: 'center' },
              }}
            />
          </Box>

          <Button variant="contained" color="primary" sx={{ marginTop: 2, fontWeight: "bold" }}>
            Soumettre
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
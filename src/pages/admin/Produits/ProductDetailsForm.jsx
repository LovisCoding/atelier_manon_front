import React from 'react';
import { TextField, Select, MenuItem, Typography, Box, Grid2, Switch } from '@mui/material';
import { InputAdornment } from '@mui/material';

const ProductDetailsForm = ({
  valueLib, setValueLib,
  valueDesc, setValueDesc,
  valuePrix, setValuePrix,
  engraving, setEngraving,
  categories, selectedCategory, setSelectedCategory
}) => {
  return (
    <Box>
      {/* Nom du produit */}
      <TextField
        fullWidth
        label="Nom du produit"
        variant="outlined"
        value={valueLib}
        onChange={(e) => setValueLib(e.target.value)}
        sx={{ marginBottom: 2 }}
        required
      />
      {/* Description du produit */}
      <TextField
        multiline
        fullWidth
        label="Description du produit"
        variant="outlined"
        rows={3}
        value={valueDesc}
        onChange={(e) => setValueDesc(e.target.value)}
        sx={{ marginBottom: 2 }}
        required
      />
      {/* Catégorie du produit */}
      <Typography variant="h6">Catégorie de produit</Typography>
      <Select
        fullWidth
        variant="outlined"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        sx={{ marginBottom: 2 }}
      >
        <MenuItem value="">Sélectionner</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.idCateg} value={category.idCateg}>
            {category.libCateg}
          </MenuItem>
        ))}
      </Select>
      {/* Prix */}
      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <TextField
            fullWidth
            label="Prix"
            variant="outlined"
            value={valuePrix}
            onChange={(e) => setValuePrix(e.target.value)}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">€</InputAdornment>
            }}
            required
          />
        </Grid2>
        {/* Engraving */}
        <Grid2 item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ marginRight: 1 }}>Gravure disponible</Typography>
            <Switch
              checked={engraving}
              onChange={() => setEngraving(!engraving)}
              inputProps={{ 'aria-label': 'Gravure Switch' }}
            />
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ProductDetailsForm;

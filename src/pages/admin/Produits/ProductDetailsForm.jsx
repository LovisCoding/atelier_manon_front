import React from 'react';
import {TextField, Select, MenuItem, Typography, Box, Grid2, Switch, InputLabel, FormControl} from '@mui/material';
import { InputAdornment } from '@mui/material';

const   ProductDetailsForm = ({
  valueLib, setValueLib,
  valueDesc, setValueDesc,
  valuePrix, setValuePrix,
  engraving, setEngraving,
  categories, selectedCategory, setSelectedCategory,
    tempsRea, setTempsRea,
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
        {/*Temps de réalisation*/}

        <TextField
            fullWidth
            label="Temps de réalisation"
            variant="outlined"
            value={tempsRea}
            onChange={(e) => setTempsRea(e.target.value)}
            type="number"
            InputProps={{
                endAdornment: <InputAdornment position="end">jour(s)</InputAdornment>
            }}
            required
        />
      {/* Catégorie du produit */}
        <FormControl fullWidth sx={{mt: 4}}>
            <InputLabel id={'select-category'}>Catégorie de produit</InputLabel>
            <Select label={"Catégorie de produit"}
                    fullWidth
                    variant="outlined"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    sx={{ marginBottom: 2 }}
                    id={'select-category'}
            >
                <MenuItem value="">Sélectionner</MenuItem>
                {categories.map((category) => (
                    <MenuItem key={category.idCateg} value={category.idCateg}>
                        {category.libCateg}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

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
        <Grid2 item xs={6} display={'flex'}>
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

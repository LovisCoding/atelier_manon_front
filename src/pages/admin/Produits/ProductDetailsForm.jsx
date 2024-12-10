import React from 'react';
import {
    TextField,
    Select,
    MenuItem,
    Typography,
    Box,
    Switch,
    InputLabel,
    FormControl,
    InputAdornment,
} from '@mui/material';

const ProductDetailsForm = ({
                                valueLib,
                                setValueLib,
                                valueDesc,
                                setValueDesc,
                                valuePrix,
                                setValuePrix,
                                engraving,
                                setEngraving,
                                categories,
                                selectedCategory,
                                setSelectedCategory,
                                tempsRea,
                                setTempsRea,
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
            {/* Temps de réalisation */}
            <TextField
                fullWidth
                label="Temps de réalisation"
                variant="outlined"
                value={tempsRea}
                onChange={(e) => setTempsRea(e.target.value)}
                type="number"
                InputProps={{
                    endAdornment: <InputAdornment position="end">jour(s)</InputAdornment>,
                    min: 0,
                    max: 100
                }}
                required
                sx={{ marginBottom: 2 }}
            />
            {/* Catégorie du produit */}
            <FormControl fullWidth sx={{ mt: 4 }}>
                <InputLabel id="select-category">Catégorie de produit *</InputLabel>
                <Select
                    label="Catégorie de produit *"
                    fullWidth
                    variant="outlined"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    sx={{ marginBottom: 2 }}
                    id="select-category"
                >
                    <MenuItem value="">Sélectionner</MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category.idCateg} value={category.idCateg}>
                            {category.libCateg}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {/* Prix and Engraving */}
            <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                {/* Prix */}
                <TextField
                    fullWidth
                    label="Prix"
                    variant="outlined"
                    value={valuePrix}
                    onChange={(e) => setValuePrix(e.target.value)}
                    type="number"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">€</InputAdornment>,
                    }}
                    required
                />
                {/* Engraving */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ marginRight: 1 }}>
                        Gravure disponible
                    </Typography>
                    <Switch
                        checked={engraving}
                        onChange={() => setEngraving(!engraving)}
                        inputProps={{ 'aria-label': 'Gravure Switch' }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ProductDetailsForm;

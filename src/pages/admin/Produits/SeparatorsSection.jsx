import React from 'react';
import { Autocomplete, Chip, TextField, Box, Typography } from '@mui/material';

const SeparatorsSection = ({ separateurs, selectedSeparateurs, setSelectedSeparateurs }) => {
  return (
    <Box>
      <Typography variant="h6">Séparateurs disponibles</Typography>
      <Autocomplete
        multiple
        options={separateurs}
        getOptionLabel={(option) => option.libMateriau}
        value={selectedSeparateurs}
        onChange={(event, newValue) => setSelectedSeparateurs(newValue)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip key={index} label={option.libMateriau} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Sélectionner des separateurs" />
        )}
        sx={{ marginBottom: 2 }}
      />
    </Box>
  );
};

export default SeparatorsSection;
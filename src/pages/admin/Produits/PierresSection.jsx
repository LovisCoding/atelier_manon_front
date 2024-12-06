import React from 'react';
import { Autocomplete, Chip, TextField, Box, Typography } from '@mui/material';

const PierresSection = ({ pierres, selectedPierres, setSelectedPierres }) => {
  return (
    <Box>
      <Typography variant="h6">Pierres disponibles</Typography>
      <Autocomplete
        multiple
        options={pierres}
        getOptionLabel={(option) => option.libPierre}
        value={selectedPierres}
        onChange={(event, newValue) => setSelectedPierres(newValue)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip key={index} label={option.libPierre} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Sélectionner des pierres" />
        )}
        sx={{ marginBottom: 2 }}
      />
    </Box>
  );
};

export default PierresSection;

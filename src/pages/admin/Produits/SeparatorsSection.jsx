import React from 'react';
import { Autocomplete, Chip, TextField, Box, Typography } from '@mui/material';

const SeparatorsSection = ({ separateurs, selectedSeparators, setSelectedSeparateurs }) => {
    console.log(selectedSeparators)
    return (
    <Box>
      <Typography variant="h6">Séparateurs disponibles</Typography>
        <Autocomplete
            multiple
            options={separateurs.filter(p => !selectedSeparators.map(v => v.libMateriau).includes(p.libMateriau))}
            getOptionLabel={(option) => option.libMateriau}
            value={selectedSeparators}
            onChange={(event, newValue) => setSelectedSeparateurs(newValue)}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    const { key, ...rest } = getTagProps({ index }); // Destructure to exclude `key`
                    return (
                        <Chip
                            key={option.libMateriau || index} // Explicitly set the key
                            label={option.libMateriau}
                            {...rest} // Spread other props, excluding `key`
                        />
                    );
                })
            }
            renderInput={(params) => (
                <TextField {...params} variant="outlined" label="" />
            )}
            sx={{ marginBottom: 2 }}
        />

    </Box>
  );
};

export default SeparatorsSection;
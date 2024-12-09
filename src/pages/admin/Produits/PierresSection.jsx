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
                value.map((option, index) => {
                    const { key, ...rest } = getTagProps({ index }); // Destructure to exclude `key`
                    return (
                        <Chip
                            key={option.libPierre} // Explicitly set the key here
                            label={option.libPierre}
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

export default PierresSection;

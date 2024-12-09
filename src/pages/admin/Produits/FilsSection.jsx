import React from 'react';
import { Autocomplete, Chip, TextField, Box, Typography } from '@mui/material';

const FilsSection = ({ fils, selectedFils, setSelectedFils }) => {
    return (
        <Box>
            <Typography variant="h6">Fils disponibles</Typography>
            <Autocomplete
                multiple
                options={fils}
                getOptionLabel={(option) => option.libCouleur}
                value={selectedFils}
                onChange={(event, newValue) => setSelectedFils(newValue)}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                        const { key, ...rest } = getTagProps({ index }); // Destructure to exclude `key`
                        return (
                            <Chip
                                key={option.libCouleur || index} // Explicitly set the key
                                label={option.libCouleur}
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

export default FilsSection;
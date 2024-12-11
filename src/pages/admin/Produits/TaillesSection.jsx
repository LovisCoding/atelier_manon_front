import React from 'react';
import { Autocomplete, Chip, TextField, Box, Typography } from '@mui/material';

const TaillesSection = ({ tailles, selectedTailles, setSelectedTailles }) => {


    return (
    <Box>
      <Typography variant="h6">Tailles disponibles</Typography>
        <Autocomplete
            multiple
            options={tailles.filter(p => !selectedTailles.map(v => v.libTaille).includes(p.libTaille))}
            getOptionLabel={(option) => option.libTaille}
            value={selectedTailles}
            onChange={(event, newValue) => setSelectedTailles(newValue)}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    const { key, ...rest } = getTagProps({ index }); // Destructure to exclude `key`
                    return (
                        <Chip
                            key={option.libTaille || index} // Explicitly set the key
                            label={option.libTaille}
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

export default TaillesSection;
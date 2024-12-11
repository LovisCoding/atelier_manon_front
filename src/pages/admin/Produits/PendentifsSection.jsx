import React from 'react';
import { Autocomplete, Chip, TextField, Box, Typography } from '@mui/material';

const PendentifsSection = ({ pendentifs, selectedPendentifs, setSelectedPendentifs }) => {

    return (
        <Box>
            <Typography variant="h6">Pendentifs disponibles</Typography>
            <Autocomplete
                multiple
                options={pendentifs?.filter(p => !selectedPendentifs.map(v => v.libPendentif).includes(p.libPendentif))}
                getOptionLabel={(option) => option.libPendentif}
                value={selectedPendentifs}
                onChange={(event, newValue) => setSelectedPendentifs(newValue)}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                        const { key, ...rest } = getTagProps({ index }); // Destructure to exclude `key`
                        return (
                            <Chip
                                key={option.libPendentif} // Explicitly set the key here
                                label={option.libPendentif}
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

export default PendentifsSection;

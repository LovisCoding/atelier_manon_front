// src/components/Loader/Loader.jsx
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loader = ({ message = 'Loading, please wait...' }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f9f9f9"
        >
            <CircularProgress size={60} thickness={5} color="primary" />
            <Typography variant="h6" color="textSecondary" mt={2}>
                {message}
            </Typography>
        </Box>
    );
};

export default Loader;
import React from 'react';
import { Box, Typography, Rating } from '@mui/material';

const Avis = ({ rating, text, author }) => {
  return (
    <Box
      sx={{
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#fff',
        boxShadow: 'none',
        border: 'none',
        borderRadius: '8px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
        {author}
      </Typography>
      <Rating name="read-only" value={rating} readOnly precision={0.5} sx={{ marginBottom: '10px' }} />
      <Typography variant="body1" sx={{ fontSize: '1rem', color: '#333' }}>
        {text}
      </Typography>
    </Box>
  );
};

export default Avis;
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
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 'bold',
          marginBottom: '10px',
          fontSize: '1rem',
          textAlign: 'center',
        }}
      >
        {author}
      </Typography>
      <Rating
        name="read-only"
        value={rating}
        readOnly
        precision={0.5}
        sx={{ fontSize: '3.2rem', marginBottom: '10px' }}
      />
      <Typography
        variant="body1"
        sx={{
          fontSize: '0.85rem',
          color: '#333',
          textAlign: 'left',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Avis;

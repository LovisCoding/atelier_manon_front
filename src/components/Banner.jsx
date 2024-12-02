import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const Banner = () => {
  const items = [
    {
      image: './src/assets/img/livraison.png',
      text: 'Livraison Gratuite',
    },
    {
      image: './src/assets/img/fabrication.png',
      text: 'Fabriqué en France',
    },
    {
      image: './src/assets/img/materiaux.png',
      text: 'Matériaux naturels',
    },
    {
      image: './src/assets/img/main.png',
      text: 'Fabriqué à la main',
    },
  ];

  return (
    <Box sx={{ width: '100%', backgroundColor: '#fff', padding: '20px 0', marginTop: '20px' }}>
      <Grid container justifyContent="center" spacing={4}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <img
                src={item.image}
                alt={item.text}
                style={{
                  width: '120px',
                  height: '80px',
                  marginBottom: '10px',
                }}
              />
              <Typography variant="body1">
                {item.text}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Banner;
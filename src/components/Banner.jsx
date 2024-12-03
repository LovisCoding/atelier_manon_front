import React from 'react';
import { Box, Container, Grid2, Typography } from '@mui/material';

const Banner = () => {
  const items = [
    {
      image: './src/assets/img/livraison.webp',
      text: 'Livraison Gratuite',
    },
    {
      image: './src/assets/img/fabrication.webp',
      text: 'Fabriqué en France',
    },
    {
      image: './src/assets/img/materiaux.webp',
      text: 'Matériaux naturels',
    },
    {
      image: './src/assets/img/main.webp',
      text: 'Fabriqué à la main',
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#fff', marginTop: '20px' }}>
      <Container>
        <Grid2 container justifyContent="center">
          {items.map((item, index) => (
            <Grid2 item xs={12} sm={6} md={3} key={index}>
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
                    width: '150px',
                    height: 'auto',
                  }}
                />
                <Typography variant="body1">
                  {item.text}
                </Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default Banner;

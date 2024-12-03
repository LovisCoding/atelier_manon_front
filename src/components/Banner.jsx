import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

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
    <Box sx={{ backgroundColor: '#fff', marginTop: '20px' }}>
      <Container>
        <Grid container justifyContent="center">
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
                    width: '150px',
                    height: 'auto',
                  }}
                />
                <Typography variant="body1">
                  {item.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;

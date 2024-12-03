import React from 'react';
import { Box, Grid2, Stack, Typography, CardMedia, CardContent } from '@mui/material';
import Banner from '../../components/Banner';

const BestSale = ({ products }) => {
  return (
    <Stack sx={{ margin: '0 auto', padding: '2rem' }}>
      <Typography
        variant="sectionTitle"
        sx={{
          fontSize: '2.5rem',
          textAlign: 'center',
          letterSpacing: '0.1em',
          marginBottom: '2rem',
        }}
      >
        Bijoux les plus vendus
      </Typography>

      <Box sx={{ width: '100%', margin: '0 auto' }}>
        <Grid2 container spacing={4} justifyContent="center">
          {products.map((product, index) => (
            <Grid2 item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardMedia
                  component="img"
                  alt={product.title}
                  image={product.image}
                  sx={{ width: '365px', objectFit: 'cover' }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="cardTitle" sx={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>
                    {product.title}
                  </Typography>
                  <br />
                  <Typography variant="cardPrice" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    {product.price} €
                  </Typography>
                </CardContent>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Box>
      <Banner />
    </Stack>
  );
};

export default BestSale;
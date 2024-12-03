import React from 'react';
import { Box, Grid, Stack, Typography, CardMedia, CardContent } from '@mui/material';
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

      <Box sx={{ width: '90%', margin: '0 auto' }}>
        <Grid container spacing={4}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box variant="cardContainer" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardMedia
                  component="img"
                  alt={product.title}
                  height="300"
                  image={product.image}
                  sx={{ width: '100%', objectFit: 'cover' }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="cardTitle" sx={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>
                    {product.title}
                  </Typography><br />
                  <Typography variant="cardPrice" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    {product.price} €
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Banner />
    </Stack>
  );
};

export default BestSale;
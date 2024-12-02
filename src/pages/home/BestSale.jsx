import React from 'react';
import { Box, Grid, Stack, Typography, CardMedia, CardContent } from '@mui/material';
import Banner from '../../components/Banner';

const BestSale = () => {
  return (
    <Stack>
      <Stack sx={{ height: '100vh' }}>
        <Typography
          variant="sectionTitle"
          sx={{
            fontSize: '2.5rem',
            textAlign: 'center',
            fontWeight: 'normal',
            letterSpacing: '0.1em',
          }}
        >
          Bijoux les plus vendus
        </Typography>

        <Box sx={{ width: '80%', margin: '0 auto' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Box variant="cardContainer">
                <CardMedia
                  component="img"
                  alt="Produit 1"
                  height="300"
                  image="./src/assets/img/bracelet1.png"
                />
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="cardTitle">Collier Kelyan</Typography>
                  <Typography variant="cardPrice">25 €</Typography>
                </CardContent>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box variant="cardContainer">
                <CardMedia
                  component="img"
                  alt="Produit 2"
                  height="300"
                  image="./src/assets/img/bracelet2.png"
                />
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="cardTitle">Bracelet ?</Typography>
                  <Typography variant="cardPrice">10 €</Typography>
                </CardContent>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box variant="cardContainer">
                <CardMedia
                  component="img"
                  alt="Produit 3"
                  height="300"
                  image="./src/assets/img/bracelet3.png"
                />
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="cardTitle">Bracelet ?</Typography>
                  <Typography variant="cardPrice">10 €</Typography>
                </CardContent>
              </Box>
            </Grid>
          </Grid>
        </Box>
		<Banner />
      </Stack>
    </Stack>
  );
};

export default BestSale;
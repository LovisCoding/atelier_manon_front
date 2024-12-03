import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const ManufacturingStep = () => {
  return (
    <Box sx={{ width: '100%', padding: { xs: '40px 0', sm: '80px 0' } }}>
      <Grid container alignItems="flex-start" spacing={4}>
        <Grid 
          item xs={12} sm={6} 
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <img
            src="./src/assets/img/step.jpg"
            alt="Étape de la fabrication"
            style={{ 
              width: '100%', 
              maxWidth: '500px', // Limite la largeur de l'image
              height: 'auto',
            }}
          />
        </Grid>

        <Grid 
          item xs={12} sm={6} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: { xs: 'center', sm: 'flex-start' },
            marginTop: { xs: '1rem', sm: '2rem' },
            paddingLeft: { sm: '0', xs: '1rem' },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.5rem' },
              color: '#F3A800',
              marginBottom: '20px',
              letterSpacing: '2px',
            }}
          >
            L'étape de la fabrication
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', sm: '1rem' },
              color: '#333',
              maxWidth: '700px',
              lineHeight: '1.5',
              margin: { xs: '0 auto', sm: '0' },
            }}
          >
            Parce qu'une vidéo vaut mieux que 1000 mots ! Voici comment se passe la confection d'un bracelet !
            Découvrez les différentes étapes de la création et plongez au cœur de mon quotidien !
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManufacturingStep;
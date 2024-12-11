import React from 'react';
import { Box, Grid2, Typography } from '@mui/material';

const ManufacturingStep = () => {
  return (
    <Box sx={{ width: '100%', padding: { xs: '40px 0', sm: '80px 0' } }}>
      <Grid2 container alignItems="flex-start" justifyContent='center' spacing={4}>
        <Grid2 
          item xs={12} sm={6} 
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <img
            src="./src/assets/img/step.webp"
            alt="Étape de la fabrication"
            style={{ 
              width: '100%', 
              maxWidth: '500px',
              height: 'auto',
            }}
          />
        </Grid2>

        <Grid2 
          item xs={12} sm={6} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: { xs: 'center', sm: 'flex-start' },
            marginTop: { xs: '1rem', sm: '2rem' },
            paddingLeft: { xs: '0rem', sm: '0' },
            textAlign: { xs: 'center', sm: 'left' },
            margin: { xs: '0 3rem',  }
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.5rem' },
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
              fontWeight: '400',
              margin: { xs: '0 auto', sm: '0' },
            }}
          >
            Parce qu'une vidéo vaut mieux que 1000 mots ! Voici comment se passe la confection d'un bracelet !
            Découvrez les différentes étapes de la création et plongez au cœur de mon quotidien !
          </Typography>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ManufacturingStep;
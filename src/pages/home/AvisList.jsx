import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Avis from '../../components/Avis';

const AvisList = ({ title, avisData }) => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '40px', // Création d'un espace autour de l'ensemble du contenu
        display: 'flex',
        justifyContent: 'center', // Centrage horizontal
        alignItems: 'center', // Centrage vertical
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: '2rem',
          color: '#F3A800',
          marginBottom: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>

      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {avisData.map((avis, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Avis
              rating={avis.rating}
              text={avis.text}
              author={avis.author}
              sx={{
                boxShadow: 'none', // Pas d'ombre
                border: 'none', // Pas de bordure
                padding: '20px',
                backgroundColor: '#fff', // Fond blanc ou une autre couleur de fond si nécessaire
                textAlign: 'center', // Centrer le texte dans l'avis
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AvisList;
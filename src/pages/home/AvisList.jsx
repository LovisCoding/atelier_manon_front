import React from 'react';
import { Box, Typography, Grid } from '@mui/material'; // Utilisation de Grid au lieu de Grid2
import Avis from '../../components/Avis';

const AvisList = ({ title, avisData }) => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: '2.5rem',
          color: '#F3A800',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ flexWrap: 'wrap' }}
      >
        {avisData.map((avis, index) => (
          <Grid item xs={12} sm={4} md={4} key={index}>
            <Avis
              rating={avis.rating}
              text={avis.text}
              author={avis.author}
              sx={{
                boxShadow: 'none',
                border: 'none',
                padding: '20px',
                backgroundColor: '#fff',
                textAlign: 'center',
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AvisList;
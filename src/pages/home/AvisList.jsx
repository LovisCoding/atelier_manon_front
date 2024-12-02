import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Avis from '../../components/Avis';

const AvisList = ({ title, avisData }) => {
  return (
    <Box sx={{ width: '100%', padding: '40px 0' }}>
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
      <Grid container spacing={4} justifyContent="center">
        {avisData.map((avis, index) => (
          <Grid item xs={12} sm={4} key={index}> {/* 4 colonnes par ligne sur petits écrans */}
            <Avis
              rating={avis.rating}
              text={avis.text}
              author={avis.author}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AvisList;
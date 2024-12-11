import React from 'react';
import { Box, Typography, Grid2 } from '@mui/material';
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
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>

      <Grid2
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ flexWrap: 'wrap' }}
      >
        { avisData.length == 0 && <Typography>Aucun avis pour le moment</Typography>}
        {avisData.map((avis, index) => (
          <Grid2 item xs={12} sm={4} md={4} key={index}>
            <Avis
              rating={avis.note}
              text={avis.contenu}
              author={avis.compte.preCli + " " + avis.compte.nomCli}
              sx={{
                boxShadow: 'none',
                border: 'none',
                padding: '20px',
                backgroundColor: '#fff',
                textAlign: 'center',
              }}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default AvisList;
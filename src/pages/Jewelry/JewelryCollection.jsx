import React from 'react';
import { Box, Button, Typography, Grid2, Card, CardMedia, CardContent } from '@mui/material';

const JewelryCollection = ({ collectionData, backgroundImage, collectionName, collectionTitle }) => {
  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          height: '300px',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />
        <Typography
          variant="h2"
          sx={{
            position: 'relative',
            zIndex: 2,
            color: 'white',
            textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
            fontSize: '5rem',
            letterSpacing: '0.1em',
            textAlign: 'center',
          }}
        >
          {collectionName}
        </Typography>
      </Box>

      <Box
        sx={{
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#f9a825',
            marginBottom: '2rem',
            textAlign: 'center',
          }}
        >
          {collectionTitle}
        </Typography>

        <Box
          sx={{
            marginBottom: '2rem',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          {['Tout voir', 'Colliers', 'Bracelets', collectionName].map((label, index) => (
            <Button
              key={index}
              variant="contained"
              sx={{
                backgroundColor: '#f9a825',
                color: '#333',
                fontWeight: 'bold',
                border: '1px solid #333',
                '&:hover': { backgroundColor: '#d49a00' },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        <Grid2 container justifyContent="center">
          {collectionData.map((item) => (
            <Grid2 item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  textAlign: 'center',
                  boxShadow: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '1rem',
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    height: '350px',
                    width: '350px',
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ color: '#f9a825', fontWeight: 'bold' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#333', fontWeight: 'bold' }}>
                    {item.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};

export default JewelryCollection;
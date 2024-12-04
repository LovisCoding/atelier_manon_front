import React, { useEffect, useState } from 'react';
import { Button, Stack, Box, IconButton } from '@mui/material';

const Presentation = ({ scrollToSection }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 64px)', // Retire 64px de la hauteur totale
        width: '100%',
        backgroundImage: 'url(/src/assets/img/home.webp)',
        backgroundPosition: `center ${scrollPosition * 0.1 - 100}px`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          zIndex: 0,
        }}
      />
      <Stack
        spacing={3}
        alignItems="flex-start"
        justifyContent="center"
        sx={{
          textAlign: 'center',
          zIndex: 1,
          width: '100%',
          paddingLeft: '70px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button variant="home" size="large">
            En savoir plus
          </Button>
          <Button variant="home" size="large">
            Acheter
          </Button>
        </Box>

        <IconButton
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}
          onClick={scrollToSection}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19l-7-7h14l-7 7z" />
          </svg>
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Presentation;
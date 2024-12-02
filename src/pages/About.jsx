import React from 'react';
import { Box, Typography } from '@mui/material';
import { TextPresentation } from '../components/TextPresentation';

function About() {
  return (
    <Box sx={{ padding: '40px', maxWidth: '1200px', margin: 'auto' }}>
		<Typography align='center' variant="h1">
			À propos
		</Typography>
		<TextPresentation title="Hello World" description="Description" image="..." />
    </Box>
  );
}

export default About;
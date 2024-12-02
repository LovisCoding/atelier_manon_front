import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import Link from './components/Link';

export default function App() {
    axios.get(
        '/api/test'
    ).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.error(error);
    })

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                    Material UI Vite.js example
                </Typography>
                <Link to="/test/1">Test 1</Link>
            </Box>
        </Container>
    );
}

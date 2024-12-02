import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'home' },
          style: {
            fontFamily: '"GREYCLIFF ARABIC CF", sans-serif',
            backgroundColor: '#ffffff',
            color: '#000',
            border: '2px solid #333',
            borderRadius: '6px',
            width: '200px',
            height: '40px',
            fontSize: '14px',
            textTransform: 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            },
          },
        },
      ],
    },
  },
});

export default theme;

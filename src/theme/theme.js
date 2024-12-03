import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  typography: {
    fontFamily: '"Lato", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 300,
    fontWeightMedium: 300,
  },
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
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      ],
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'sectionTitle' },
          style: {
            color: 'orange',
            textAlign: 'center',
            marginTop: '40px',
            marginBottom: '20px',
          },
        },
        {
          props: { variant: 'cardTitle' },
          style: {
            color: 'orange',
            fontWeight: 'bold',
            marginBottom: '8px',
          },
        },
        {
          props: { variant: 'cardPrice' },
          style: {
            fontWeight: 'bold',
            fontSize: '1.1rem',
          },
        },
      ],
    },
    MuiBox: {
      variants: [
        {
          props: { variant: 'cardContainer' },
          style: {
            borderRadius: '10px',
            overflow: 'hidden',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          },
        },
      ],
    },
  },
});

export default theme;
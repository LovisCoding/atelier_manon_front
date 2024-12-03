import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const textPrimary = "#333333";

const theme = createTheme({
  typography: {
    fontFamily: '"Lato", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 300,
    fontWeightMedium: 300,
    h1: {
      fontSize: '2.4rem',
      fontWeight: '800',
      color: '#eeba39',
    },
    h2: {
      fontSize: '2.2rem',
      color: '#eeba39',
    },
    h3: { color: '#eeba39' },
    h4: { color: '#eeba39' },
    h5: { color: '#eeba39' },
    h6: { color: '#eeba39' },
  },
  palette: {
    primary: {
      main: '#556cd6',
      dark: '#333333',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: textPrimary,
      white: "#ffffff",
      secondary: 'rgba(241, 198, 83, 1)',
    },
    customYellow: {
      main: '#EEB828',
    },
  },
  components: {
    // Variants and styles for Typography
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
    // Variants and styles for Box
    MuiBox: {
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
    // Variants and styles for Button
    MuiButton: {
      variants: [
        {
          props: { variant: 'yellowButton' },
          style: {
            backgroundColor: '#EEB828',
            border: '1px solid black',
            color: 'black',
            '&:hover': {
              boxShadow: '1px 2px 2px 1px rgba(0,0,0,0.2)',
            },
          },
        },
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
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      ],
    },
    // Variants and styles for TextField
    MuiTextField: {
      variants: [
        {
          props: { variant: 'errorTextField' },
          style: {
            outlineColor: 'red',
          },
        },
      ],
    },
    // Styles for Accordion
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: '1rem 0',
          backgroundColor: '#000000',
          border: 'unset',
          boxShadow: 'unset',
          borderRadius: '8px',
          marginBottom: '10px',
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: '10px 0',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          '.MuiTypography-root': {
            fontSize: '1.5rem',
          },
          backgroundColor: '#fff',
          borderBottom: '1px solid black',
          '& .MuiAccordionSummary-content': {
            margin: '12px 0',
          },
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        },
        expandIconWrapper: {
          color: '#555',
          '&.Mui-expanded': {
            color: '#000',
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          fontSize: '64px',
          padding: '16px',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #ddd',
        },
      },
    },
    // Styles for Link
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: textPrimary,
          '&:hover': {
            color: 'black',
          },
        },
      },
    },
    // Styles for ListItemText
    ListItemText: {
      styleOverrides: {
        root: {
          ' span': {
            fontWeight: 200,
            color: 'blue',
          },
        },
      },
    },
  },
});

export default theme;

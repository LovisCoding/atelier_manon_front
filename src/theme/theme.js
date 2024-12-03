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
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '2.4rem',
          fontWeight: '800',
          color: '#eeba39',
        },
        h2: {
          fontSize: '2.2rem',
          color: '#eeba39',
        },
        h3: {
          color: '#eeba39',
        },
        h4: {
          color: '#eeba39',
        },
        h5: {
          color: '#eeba39',
        },
        h6: {
          color: '#eeba39',
        }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: '1rem 0rem',
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
        }
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          ' .MuiTypography-root': {
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
      }
    ]
    }
  }
});

export default theme;

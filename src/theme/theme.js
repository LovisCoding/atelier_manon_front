import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
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
    customYellow: {
      main: '#EEB828'
    }
  },
  components: {
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
    MuiButton: {
      variants : [
        {
          props: { variant: 'yellowButton' },
          style: {
            backgroundColor: '#EEB828',
            border: '1px solid black',
            color: 'black',
            '&:hover' : {
              boxShadow : '1px 2px 2px 1px rgba(0,0,0,0.2);'
            }
          }
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
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            },
          },
        }
      ]
    },
    MuiTextField : {
      variants : [
        {
          props : { variant: 'errorTextField' },
          style: {
            outlineColor : 'red'

          }
        }
      ]
    }
  }
});

export default theme;

import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const textPrimary = "#333333";
// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#556cd6',
	  dark: '#333333'
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
	}
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
	MuiLink: {
		styleOverrides: {
			root: {
				variants: [
					{
						// `dashed` is an example value, it can be any name.
						props: { variant: 'navbar' },
						style: {
							textDecoration: "none", // Enlever le soulignement
							color: textPrimary, // Modifier la couleur
							"&:hover": {
								color: "black", // Changer la couleur au survol
							},
						},
					},
				],

			},
		},
	},
	ListItemText: {
		styleOverrides: {
			root: {
				variants: [
					{
					  props: { variant: "custom" }, // Nom de la variante
					  style: {
						" span": {
						  fontWeight: 200,
						  color: "blue", // Vous pouvez ajouter d'autres styles ici
						},
					  },
					},
				  ],
			}
		}
	}
  },
  
});

export default theme;
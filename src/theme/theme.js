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
	}

});

export default theme;

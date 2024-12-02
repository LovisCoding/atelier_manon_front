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
		text: {
			primary: '#FFF'
		}
	},
	components: {
		MuiLink: {
			styleOverrides: {
				root: {
					variants: [
						{
							// `dashed` is an example value, it can be any name.
							props: { variant: 'dashed' },
							style: {
								textDecoration: "none", // Enlever le soulignement
								color: "black", // Modifier la couleur
								"&:hover": {
									textDecoration: "underline", // Ajouter un soulignement au survol
									color: "darkblue", // Changer la couleur au survol
								},
							},
						},
					],

				},
			},
		}
	}

});

export default theme;

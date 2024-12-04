import React from 'react';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Grid2, Stack } from '@mui/material';
import { IoTimeOutline } from 'react-icons/io5';

export default function ProductDetails() {
	return (
		<Box padding={2}>
			<Box marginBottom={3}>
				<Typography variant="h4">L'Éclat de l'Océan</Typography>
				<Box display={"flex"} alignItems={"center"}>
					<IoTimeOutline />
					<Typography marginLeft={1} variant="subtitle2" color="textSecondary">
						disponible sous 8 jours
					</Typography>
				</Box>
			</Box>


			<Typography marginBottom={4} variant="body1">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lectus quam, scelerisque vitae tincidunt ac, cursus a dolor. Suspendisse potenti. Curabitur consectetur orci ligula, et porta nisl placerat nec. Nullam lobortis bibendum mi sit amet aliquam.
			</Typography>

			<Stack spacing={3}>
				<Select fullWidth defaultValue="" displayEmpty>
					<MenuItem value="" disabled>Variante</MenuItem>
					<MenuItem value="option1">Option 1</MenuItem>
					<MenuItem value="option2">Option 2</MenuItem>
				</Select>
				<Grid2 container spacing={4}>

					<Grid2 item size={{
						xs: 9
					}}>
						<Select fullWidth defaultValue="" displayEmpty>
							<MenuItem value="" disabled>Select fil</MenuItem>
							<MenuItem value="fil1">Fil 1</MenuItem>
							<MenuItem value="fil2">Fil 2</MenuItem>
						</Select>
					</Grid2>
					<Grid2 item size={{
						xs: 3
					}}>
						<TextField fullWidth label="Quantité" type="number" />
					</Grid2>

				</Grid2>

				<Grid2 container spacing={4}>
					
					<Grid2 item size={{
						xs: 9
					}}>
						<Select fullWidth defaultValue="" displayEmpty>
							<MenuItem value="" disabled>
								Select matériel
							</MenuItem>
							<MenuItem value="materiel1">Matériel 1</MenuItem>
							<MenuItem value="materiel2">Matériel 2</MenuItem>
						</Select>
					</Grid2>
					<Grid2 item size={{
						xs: 3
					}}>
						<TextField fullWidth label="Quantité" type="number" />
					</Grid2>

				</Grid2>

				<Grid2 container spacing={4}>
					
					<Grid2 item size={{
						xs: 9
					}}>
						<Select fullWidth defaultValue="" displayEmpty>
							<MenuItem value="" disabled>Select pierre</MenuItem>
							<MenuItem value="pierre1">Pierre 1</MenuItem>
							<MenuItem value="pierre2">Pierre 2</MenuItem>
						</Select>
					</Grid2>
					<Grid2 item size={{
						xs: 3
					}}>
						<TextField fullWidth label="Quantité" type="number" />
					</Grid2>

				</Grid2>

				<TextField fullWidth label="Rentrer une gravure" />
				<Button variant="contained" color="primary" fullWidth>Ajouter au panier</Button>
			</Stack>
		</Box>
	);
}

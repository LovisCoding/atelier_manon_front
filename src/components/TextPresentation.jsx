import { Box, colors, Container, Grid2, Typography } from "@mui/material";

export function TextPresentation({ title, titleType, description, image, reverse, sx }) {
	titleType = titleType ?? 'h1';
	reverse = reverse ?? false;
	image = image ?? 'https://via.placeholder.com/800x400';

	return (
			<Box sx={sx}>
				<Grid2
					container
					spacing={{
						sm: 3,
						md: 5
					}}
					direction={reverse ? 'row-reverse' : 'row'}
				>
					<Grid2 item size={{
						xs: 12,
						md: 6
					}}>
						<Box
							component="img"
							src={image}
							alt="Image"
							sx={{
								objectFit: 'contain',
								objectPosition: 'top',
								width: "100%",
								height: "auto",
							}}
						/>
					</Grid2>

					<Grid2 item size={{
						xs: 12,
						md: 6
					}}>
						<Box>
							<Typography variant={titleType} sx={{ width: "100%", margin: "1rem 0", color: colors.grey[800] }}>
								{title}
							</Typography>
							<Typography sx={{ width: "100%", maxWidth: "35rem" }}>
								{description}
							</Typography>
						</Box>
					</Grid2>
				</Grid2>
			</Box>
	);
}
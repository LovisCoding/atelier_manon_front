import { Box, Typography } from "@mui/material";

export function TextPresentation({title, description, image}){

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', md: 'row' },
				alignItems: 'center',
				gap: '20px',
				marginBottom: '40px',
			}}
		>
			<Box // Image
				sx={{
					width: { xs: '100%', md: '40%' },
					height: '200px',
					backgroundColor: '#f4f4f4',
					border: '1px dashed #ccc',
				}}
			></Box>
			<Box sx={{ width: { xs: '100%', md: '60%' } }}>
				<Typography>
					{title}
				</Typography>
				<Typography>
					{description}
				</Typography>
			</Box>
		</Box>
	)

}
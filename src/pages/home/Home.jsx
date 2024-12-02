import React from 'react';
import { Button, Stack, Box, IconButton } from '@mui/material';

const Home = () => {
	return (
		<Box
			sx={{
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				width: '100%',
				backgroundColor: 'rgba(255, 255, 255, 0.5)',
			}}
		>
			<img
				src="/src/assets/img/Home.png"
				alt="Background"
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					zIndex: -1,
				}}
			/>

			<Stack
				spacing={3}
				alignItems="flex-start"
				justifyContent="center"
				sx={{
					textAlign: 'center',
					zIndex: 1,
					width: '100%',
					paddingLeft: '70px',
				}}
			>
				<Box sx={{ display: 'flex', gap: '20px' }}>
					<Button variant="home" size="large">
						En savoir plus
					</Button>
					<Button variant="home" size="large">
						Acheter
					</Button>
				</Box>

				<IconButton
					sx={{
						position: 'absolute',
						bottom: 20,
						left: '50%',
						transform: 'translateX(-50%)',
						zIndex: 1,
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M12 19l-7-7h14l-7 7z" />
					</svg>
				</IconButton>
			</Stack>
		</Box>
	);
};

export default Home;
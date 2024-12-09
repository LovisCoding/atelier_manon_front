import React from 'react';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from "react";

import { getEvenement } from "../../services/HomeService";



export default function EventBanner() {

	const [message, setMessage] = useState("");

	useEffect(() => {
		const exec = async () => {
			const response = await getEvenement();
			setMessage(response);
		}
		exec();
	}, [])


	if (!message) {
		return null;
	}

	return (
		<Box
			sx={{
				width: '100%',
				backgroundColor: 'rgb(255, 217, 102)',
				padding: '1rem',
			}}
		>
			<Typography variant="body1" sx={{ fontWeight: 'normal', textAlign: 'center', color: 'black', wordWrap: 'break-word' }}>
				{message}
			</Typography>
		</Box>
	);
}

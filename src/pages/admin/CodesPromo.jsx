import { Grid2, IconButton, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function CodesPromo() {
	const [promoTextfield, setPromoTextfied] = useState('')
	return (
		<Grid2 container columns={{ xs: 4, sm: 8, md: 12 }}>
			<Grid2 item size={{ xs: 4, sm: 4, md: 6 }}>
				<Grid2 container columns={{ xs: 4, sm: 8, md: 12 }}>
				
					<Grid2 item columns={{ xs: 3, sm: 6, md: 9 }}>
					
					<InputLabel  htmlFor="input-promos">
								Bootstrap
							</InputLabel>
						<TextField size="small" value={promoTextfield} onChange={(e) => setPromoTextfied(e.target.value)} fullWidth id={'input-promos'}></TextField>
					</Grid2>
					<Grid2 item columns={{ xs: 1, sm: 2, md: 3 }} alignItems={'flex-end'}>
						<IconButton sx={{
							background: 'lightgreen', borderRadius: '15px',
							height: '30px',
							width: '30px',
							'&:hover': {
								'background': '#1acf5e'
							}

						}}><FaCheck size={'10px'}/></IconButton>
					</Grid2>
				</Grid2>

			</Grid2>
			<Grid2 item size={{ xs: 4, sm: 4, md: 6 }}>

			</Grid2>
		</Grid2>
	)
}
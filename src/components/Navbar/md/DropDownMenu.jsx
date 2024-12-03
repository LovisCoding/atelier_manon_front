import { Button, Menu, MenuItem, Stack, useTheme } from "@mui/material";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useLocation } from "react-router";

export default function DropDownMenu({ scrolled, selected }) {
	const [anchorEl, setAnchorEl] = useState(null);

	const color = () => {
		if (scrolled && selected) {
			return 'text.secondary'
		}
		if (scrolled) {
			return 'text.white'
		}
		return 'text.primary'
	}


	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const theme = useTheme();

	console.log(theme);

	return (
		<Stack direction="row" spacing={2} alignItems="center">
			<Stack direction={'row'}>
				<Button sx={{ background: 'transparent', color, fontSize: '1rem', textTransform: 'none', fontWeight: selected ? 'bold' : '400', paddingRight: 0 }} onClick={handleClick}>
					Bijoux
				</Button>
				<Button sx={{minWidth: '0px', color, padding: 0}}>
					<FaAngleDown />
				</Button>
			</Stack>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
					sx: {
						background: scrolled ? theme.palette.primary.dark : ''
					}
				}}
			>
				<MenuItem onClick={handleClose} sx={{ color: scrolled ? 'text.white' : '' }}>Colliers</MenuItem>
				<MenuItem onClick={handleClose} sx={{ color: scrolled ? 'text.white' : '' }}>Bracelets</MenuItem>
			</Menu>
		</Stack>
	);
}

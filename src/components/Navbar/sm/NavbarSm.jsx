import { IconButton, Stack } from "@mui/material";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import DrawerSm from "./DrawerSm";
import { useLocation } from "react-router";

export default function NavbarSm({logoTitle}) {

	const [openDrawer, setOpenDrawer] = useState(false)
	const location = useLocation()
	const setOpen = () => {
		setOpenDrawer(!openDrawer)
	}

	
	return (
		<>
		<Stack direction={'row'} sx={{ background: 'green'}} py={1} px={2} justifyContent={'space-between'}>
				<Stack direction={'row'} >
				<IconButton sx={{pr: 2}} onClick={()=>setOpenDrawer(!openDrawer)}>
					<IoMenu />
				</IconButton>
				{logoTitle}
				</Stack>
				<IconButton>
					<FaSearch />
				</IconButton>
		</Stack>
		<DrawerSm open={openDrawer} setOpen={setOpen} />
		</>
	)	
}
import { Box, Collapse, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../../utils/AuthContext";
  
  export default function DrawerSm({ open, setOpen }) {
	const [openDdl, setOpenDdl] = useState(false);
	const tab = ['/', '/jewelry', '/about', '/faq', '/contact', '/login', '/profil']
  
	const location = useLocation();
	const navigate = useNavigate();
	const auth = useAuth();
	// Fonction pour gérer les clics
	const onClickDdl = () => {
	  setOpenDdl(!openDdl);
	};
	const setColorByLink= (index) => {
		if (location.pathname === tab[index]) {
			return 'text.secondary'
		}
		return 'rgba(255,255,255,1)'
	}
  
	return (
	  <Drawer open={Boolean(open)} onClose={() => setOpen(false)}
	  PaperProps={{
		sx : {
			backgroundColor: 'rgba(33,33,33,1)',
		}
	  }}
	  >
		<Box
		  sx={{ width: 250 }}
		  role="presentation"
		  // Fermer le drawer uniquement sur clic extérieur
		  onClick={(e) => {
			// Si le clic est sur le Box directement, fermer
			if (!e.defaultPrevented) setOpen(false);
		  }}
		>
		  <List>
			{/* Bouton pour fermer le drawer */}
			<ListItem>
			  <IconButton onClick={() => setOpen(false)}>
				<RxCross2 color={'rgba(255,255,255,1)'}/>
			  </IconButton>
			</ListItem>
  
			{/* Liste des items */}
			{["Accueil", "Bijoux", "A propos", "FAQ", "Contact", "Connexion", "Profil"].map(
			  (text, index) => (
				<Box key={text}>
				  <ListItem sx={{paddingY: 0}}>
					<ListItemButton 
					sx={{paddingY: 0}}
					  onClick={(e) => {
						navigate(tab[index]);						
					  }}
					>
					  {/* Ajout du dropdown pour "Bijoux" */}
					  {text === "Bijoux" ? (
						<>
						  <IconButton
							sx={{ mr: 1, py: 0 }} // Espace entre la flèche et le texte
							onClick={(e) => {
							  e.stopPropagation();
							  onClickDdl();
							}}
						  >
							{openDdl ? (
							  <FaAngleUp size={"18px"} color={setColorByLink(index)} />
							) : (
							  <FaAngleDown size={"18px"} color={setColorByLink(index)} />
							)}
						  </IconButton>
						  <ListItemText primaryTypographyProps={{fontWeight: '200', color: setColorByLink(index)}}  primary={text} />
						</>
					  ) : (
						<>
						
						<Box sx={{width:'40px'}}></Box>
						<ListItemText primaryTypographyProps={{fontWeight: '200', color: setColorByLink(index)}} primary={text} />
						</>
					  )}
					</ListItemButton>
				  </ListItem>
  
				  {/* Contenu déroulant pour "Bijoux" */}
				  {text === "Bijoux" && (
					<Collapse in={openDdl} timeout="auto" unmountOnExit>
					  <List component="div" disablePadding>
						<ListItemButton sx={{ pl: 10, py:0 }} onClick={() => navigate("/jewelry/necklaces")} >
						  <ListItemText primaryTypographyProps={{fontWeight: '200', color: setColorByLink('/jewelry/necklaces' )}}  primary="Colliers" />
						</ListItemButton>
					  </List>
					  <List component="div" disablePadding>
						<ListItemButton sx={{ pl: 10, py:0 }} onClick={() => navigate("/jewelry/bangles")}>
						  <ListItemText primaryTypographyProps={{fontWeight: '200', color: setColorByLink('/jewelry/bangles')}} primary="Bracelets" />
						</ListItemButton>
					  </List>
					</Collapse>
				  )}
				</Box>
			  )
			)}
		  </List>
		</Box>
	  </Drawer>
	);
}
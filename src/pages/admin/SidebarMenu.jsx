import React, { useState } from 'react';
import { List, ListItem, ListItemText, Drawer, Typography, Box, useTheme, useMediaQuery, IconButton, Button } from '@mui/material';
import { FaBox, FaShoppingCart, FaQuestionCircle, FaHome, FaNewspaper, FaPercent, FaBlog, FaPaintBrush, FaRegComment } from 'react-icons/fa';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '../../components/Link';
import { useNavigate } from 'react-router';
import { IoMdStats } from "react-icons/io";
import { GoLaw } from "react-icons/go";
import { FaFileInvoiceDollar } from "react-icons/fa6";

const SidebarMenu = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box display='flex'>
      {isSmallScreen && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 1201,
            backgroundColor: '#f4f4f4',
            borderRadius: '50%',
            padding: '8px',
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      
      <Drawer
        variant={isSmallScreen ? 'temporary' : 'permanent'}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          width: isSmallScreen ? '45%' : 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isSmallScreen ? '45%' : 250,
            boxSizing: 'border-box',
            backgroundColor: '#f4f4f4',
            paddingTop: '16px',
          },
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            padding: 2,
            borderBottom: '1px solid #ddd',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Lato, sans-serif',
              color: '#333',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            Tableau de bord
          </Typography>
        </Box>
        <List sx={{height:'100%', display:'flex', flexDirection:'column', gap:1 }} >
          {[
            { text: 'Statistiques', href: '/admin/stats', icon: <IoMdStats /> },
            { text: 'Accueil', href: '/admin/accueil', icon: <FaHome /> },
            { text: 'Commandes', href: '/admin/orders', icon: <FaShoppingCart /> },
            { text: 'Produits', href: '/admin/products', icon: <FaBox /> },
            { text: 'Personnalisation', href: '/admin/personalization', icon: <FaPaintBrush /> },
            { text: 'Réductions', href: '/admin/codesPromo', icon: <FaPercent /> },
            { text: 'Newsletters', href: '/admin/newsletter', icon: <FaNewspaper /> },
            { text: 'FAQ', href: '/admin/faq', icon: <FaQuestionCircle />, view: 'faq' },
            { text: 'Blog', href: '/admin/blog', icon: <FaBlog /> },
            { text: 'Avis', href: '/admin/avis', icon: <FaRegComment /> },
            { text: 'CGV', href: '/admin/cgv', icon: <FaFileInvoiceDollar /> },
            { text: 'Mentions Légales', href: '/admin/mentionsLegales', icon: <GoLaw /> },
          ].map((item) => (
            <ListItem
              button
			  component={Link}
              key={item.text}
              sx={{
                padding: '10px 16px',
              }}
			  href={item.href}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    color: '#333',
                    fontSize: '20px',
                    marginRight: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '24px',
                  }}
                >
                  {item.icon}
                </Box>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    sx: {
                      color: '#333',
                      fontFamily: 'Lato, sans-serif',
                      fontWeight: '400',
                    },
                  }}
                />
              </Box>
            </ListItem>
          ))}
          <ListItem sx={{justifySelf:'end', marginTop:'auto'}} >
            <Button
              variant='outlined'
              sx={{margin:'0 auto', fontWeight:'bold'}}
              onClick={()=>navigate('/')}
            >Revenir au site web</Button>
          </ListItem>
        </List>
      </Drawer>
	  {children}
    </Box>
  );
};

export default SidebarMenu;
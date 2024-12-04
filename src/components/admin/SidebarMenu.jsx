import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Drawer,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  IconButton
} from '@mui/material';
import { FaBox, FaShoppingCart, FaQuestionCircle, FaHome, FaNewspaper, FaPercent, FaCalendarAlt } from 'react-icons/fa';
import MenuIcon from '@mui/icons-material/Menu';

const SidebarMenu = ({ onSidebarClick }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
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
          width: isSmallScreen ? '100%' : 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isSmallScreen ? '100%' : 250,
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
        <List>
          {[
            { text: 'Produits', href: '#configurer-produit', icon: <FaBox /> },
            { text: 'Commandes', href: '#liste-des-commandes', icon: <FaShoppingCart /> },
            { text: 'FAQ', href: '#faq', icon: <FaQuestionCircle />, view: 'faq' },
            { text: 'Accueil', href: '#configurer-accueil', icon: <FaHome /> },
            { text: 'Newsletters', href: '#commandes', icon: <FaNewspaper /> },
            { text: 'Réductions', href: '#articles-du-blog', icon: <FaPercent /> },
            { text: 'Évènements', href: '#evenements', icon: <FaCalendarAlt /> },
          ].map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => onSidebarClick(item.view)}
              sx={{
                padding: '10px 16px',
              }}
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
        </List>
      </Drawer>
    </>
  );
};

export default SidebarMenu;

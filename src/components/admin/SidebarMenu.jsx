import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Drawer,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import { FaBox, FaShoppingCart, FaQuestionCircle, FaHome, FaNewspaper, FaPercent, FaCalendarAlt } from 'react-icons/fa';

const SidebarMenu = ({ onSidebarClick }) => {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
          backgroundColor: '#f4f4f4',
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
  );
};

export default SidebarMenu;
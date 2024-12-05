import { Button, Menu, MenuItem, Stack, useTheme } from "@mui/material";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

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

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Stack direction={'row'}>
        <Link to="/jewelry" style={{ textDecoration: 'none' }}>
          <Button sx={{ 
            background: 'transparent', 
            color: color(), 
            fontSize: '1rem', 
            textTransform: 'none', 
            fontWeight: selected ? 'bold' : '400', 
            paddingRight: 0 
          }} onClick={handleClick}>
            Bijoux
          </Button>
        </Link>
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
        <MenuItem onClick={handleClose} sx={{ color: scrolled ? 'text.white' : '' }} component={Link} to="/jewelry/necklaces">Colliers</MenuItem>
        <MenuItem onClick={handleClose} sx={{ color: scrolled ? 'text.white' : '' }} component={Link} to="/jewelry/bangles">Bracelets</MenuItem>
      </Menu>
    </Stack>
  );
}
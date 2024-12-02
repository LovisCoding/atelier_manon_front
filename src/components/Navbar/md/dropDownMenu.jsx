import { Button, Menu, MenuItem, Stack, useTheme } from "@mui/material";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useLocation } from "react-router";

export default function MenuNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);

 
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button sx={{background: 'transparent', color: theme.palette.text.primary, fontSize: '1rem', textTransform: 'none', fontWeight: '400'}} onClick={handleClick}>
        Bijoux
        <FaAngleDown />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Colliers</MenuItem>
        <MenuItem onClick={handleClose}>Bracelets</MenuItem>
      </Menu>
    </Stack>
  );
}

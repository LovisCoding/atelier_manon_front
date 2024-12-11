import { Button, Menu, MenuItem, Stack, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getCategories } from "../../../services/CategorieService";

export default function DropDownMenu({ scrolled, selected }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const exec = async () => {
      const data = await getCategories();
      if (data) setCategories(data);
    };
    exec();
  }, [])

  const color = () => {
    if (selected) {
      if (scrolled) return 'text.secondary';
      else return 'text.primary';
    } else {
      if (scrolled) return 'text.white'
      else return 'text.primary';
    }
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
            fontWeight: selected ? 'bold' : '300', 
            paddingRight: 0 
          }}>
            Bijoux
          </Button>
        </Link>
        <Button sx={{minWidth: '0px', color, padding: 0}} onClick={handleClick}>
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
        { categories.map((categorie) =>
            <MenuItem onClick={handleClose} sx={{ color: scrolled ? 'text.white' : '' }} component={Link} to={"/jewelry/"+categorie.libCateg}>{categorie.libCateg}</MenuItem>
          ) }
      </Menu>
    </Stack>
  );
}
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Card, CardMedia, CardContent, Grid2, Popover, List, ListItem, ListItemText, Slider, TextField } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { getCategories } from '/src/services/CategorieService';
import { useNavigate } from 'react-router-dom';  // Importer useNavigate

const JewelryCollection = ({ collectionData, backgroundImage, collectionName, collectionTitle, onCategoryChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Tout voir');
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();  // Initialiser useNavigate

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories || []);
    };

    fetchCategories();
  }, []);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category.toLowerCase() === 'tout voir' ? '' : category.toLowerCase());
    handleClose();
  };

  const filteredCollectionData = collectionData.filter((item) => {
    const price = parseInt(item.price);
    const [minPrice, maxPrice] = priceRange;
    return price >= minPrice && price <= maxPrice && item.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Box>
      <Box sx={{ position: 'relative', height: 300, backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }} />
        <Typography variant="h2" sx={{ position: 'relative', zIndex: 2, color: 'white', textShadow: '2px 2px 8px rgba(0,0,0,0.7)', fontSize: '3rem', textAlign: 'center' }}>
          {collectionName}
        </Typography>
      </Box>

      <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ color: '#f9a825', marginBottom: '1rem', textAlign: 'center' }}>
          {collectionTitle}
        </Typography>

        <Box sx={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
          <Button variant="outlined" sx={{ marginRight: '1rem', fontWeight: 'bold' }} onClick={handleClick} endIcon={<FilterListIcon />}>
            Filtres
          </Button>
          <TextField
            label="Recherche"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 200 }}
          />
        </Box>

        <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <List>
            {['Tout voir', ...categories.map(cat => cat.libCateg)].map((category) => (
              <ListItem button key={category} onClick={() => handleCategorySelect(category)}>
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Popover>

        <Box sx={{ width: '100%', marginBottom: '1rem', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
            Prix: {priceRange[0]} € - {priceRange[1]} €
          </Typography>
          <Slider 
            value={priceRange} 
            onChange={(e, newValue) => setPriceRange(newValue)} 
            valueLabelDisplay="auto" 
            valueLabelFormat={(value) => `${value} €`} 
            min={0} 
            max={100} 
            step={5} 
            sx={{ width: '80%' }} 
          />
        </Box>

        <Grid2 container spacing={2} justifyContent="center">
          {filteredCollectionData.map((item) => (
            <Grid2 item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{ textAlign: 'center', boxShadow: 'none', padding: '1rem', cursor: 'pointer' }}
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{ height: '350px', width: '350px', objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#f9a825', fontWeight: 'bold' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333', fontWeight: 'bold' }}>
                    {item.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};

export default JewelryCollection;
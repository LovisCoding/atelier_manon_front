import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Card, CardMedia, CardContent, Popover, List, ListItem, ListItemText, Slider, TextField, IconButton, Grid2, useTheme } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getCategories, getImageURL } from '/src/services/CategorieService';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const JewelryCollection = ({ collectionData, category, collectionName, collectionTitle, onCategoryChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Tout voir');
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();
  const theme = useTheme();
  const [maxPrice, setMaxPrice] = useState(0);

  const maxPriceProduct = () => {
    if (!collectionData || collectionData.length === 0) {
      return null;
    }
    const max = collectionData.reduce((maxPrice, product) => {
      return product.price > maxPrice ? product.price : maxPrice;
    }, 0);

    return max;
  };


  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories || []);
    };
    fetchCategories();

  }, []);

  useEffect(() => {
    if (!collectionData) return;
    const max = maxPriceProduct();
    setMaxPrice(max);
    setPriceRange([0, max]);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [priceRange, searchTerm, selectedCategory]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category.toLowerCase() === 'tout voir' ? '' : category.toLowerCase());
    handleClose();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredCollectionData = collectionData.filter((item) => {
    const price = parseInt(item.price);
    const [minPrice, maxPrice] = priceRange;
    return price >= minPrice && price <= maxPrice && item.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCollectionData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box>
      <Box sx={{ position: 'relative', height: 300, backgroundImage: `url(${getImageURL(category)})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }} />
        <Typography variant="h2" sx={{ position: 'relative', zIndex: 2, color: 'white', textShadow: '2px 2px 8px rgba(0,0,0,0.7)', fontSize: '3rem', textAlign: 'center' }}>
          {collectionName}
        </Typography>
      </Box>

      <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ color: 'customYellow', marginBottom: '1rem', textAlign: 'center' }}>
          {collectionTitle}
        </Typography>

        <Box sx={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 3 }}>
          <Button variant="yellowButton" sx={{ fontWeight: 'bold' }} onClick={handleClick} endIcon={<FilterListIcon />}>
            Filtres
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #EEB828', borderRadius: 1 }}>
            <SearchIcon sx={{ color: '#EEB828', marginRight: '0.5rem' }} />
            <TextField
              placeholder="Recherche"
              variant="standard"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{ disableUnderline: true }}
              sx={{ width: 200 }}
            />
          </Box>
          <Box sx={{ width: '20%', marginBottom: '1rem', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
              Prix: {priceRange[0]} € - {priceRange[1]} €
            </Typography>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value} €`}
              min={0}
              max={maxPriceProduct()}
              step={1}
              sx={{ width: '80%' }}
              color='customYellow'
            />
          </Box>
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



        <Grid2 container spacing={2} justifyContent="center">
          {currentItems.map((item) => (
            <Grid2 item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{ textAlign: 'center', boxShadow: 'none', padding: '1rem', cursor: 'pointer' }}
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333', fontWeight: 'bold' }}>
                    {item.price.toFixed(2)}€                  
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
          <IconButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="body2" sx={{ margin: '0 1rem' }}>
            Page {currentPage} sur {Math.ceil(filteredCollectionData.length / itemsPerPage)}
          </Typography>
          <IconButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredCollectionData.length / itemsPerPage)}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default JewelryCollection;
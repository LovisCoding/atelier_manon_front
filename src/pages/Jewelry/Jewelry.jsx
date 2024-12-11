import React, { useEffect, useState } from 'react';
import JewelryCollection from './JewelryCollection';
import { getProducts } from '../../services/ProductService';
import { getCategories } from '/src/services/CategorieService';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Stack } from '@mui/material';

const Jewelry = () => {
  const { category } = useParams();
  const [jewelryData, setJewelryData] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('/src/assets/img/bijoux.webp');
  const [collectionTitle, setCollectionTitle] = useState('Retrouvez ici tous les bijoux disponibles !');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      let categoryId = '';
      let title = 'Retrouvez ici tous les bijoux disponibles !';
      let bgImage = 'bijoux';

      if (category) {
        const matchedCategory = categories.find(cat => cat.libCateg.toLowerCase() === category.toLowerCase());

        if (matchedCategory) {
          categoryId = matchedCategory.idCateg;
          title = `Découvrez les ${category.charAt(0).toUpperCase() + category.slice(1)} !`;
          bgImage = categoryId;
        } else {
          title = `Retrouvez ici tous les bijoux disponibles !`;
          bgImage = category;
        }
      }

      const params = {
        search: '',
        category: categoryId || '',
        priceInf: null,
        priceSup: null,
        nbDisplay: 10,
        page: 1,
      };

      const products = await getProducts(params);

      if (products) {
        const formattedData = products.produits.map((product) => ({
          id: product.idProd,
          image: `${import.meta.env.VITE_API_URL}img/${product.tabPhoto[0]}?width=350`,
          title: product.libProd,
          price: Number.parseFloat(product.prix),
          idCateg: product.idCateg
        }));

        setJewelryData(formattedData);
        setLoading(false);
      }

      setCollectionTitle(title);
      setBackgroundImage(bgImage);
    };

    fetchProducts();
  }, [category, categories]);

  const handleCategoryChange = (newCategory) => {
    navigate(`/jewelry/${newCategory}`);
  };

	if (loading) {
		return (
			<Stack direction="row" justifyContent="center" sx={{ mt: 10 }}>
				<CircularProgress />
			</Stack>
		);
	}
  return (
    <JewelryCollection
      collectionData={jewelryData}
      category={backgroundImage}
      collectionName={category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Bijoux'}
      collectionTitle={collectionTitle}
      onCategoryChange={handleCategoryChange}
    />
  );
};

export default Jewelry;

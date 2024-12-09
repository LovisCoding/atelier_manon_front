import React, { useEffect, useState } from 'react';
import JewelryCollection from './JewelryCollection';
import { getProducts } from '../../services/ProductService';
import { getCategories } from '/src/services/CategorieService';
import { useParams, useNavigate } from 'react-router-dom';

const Jewelry = () => {
  const { category } = useParams();
  const [jewelryData, setJewelryData] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('/src/assets/img/bijoux.webp');
  const [collectionTitle, setCollectionTitle] = useState('Retrouvez ici tous les bijoux disponibles !');
  const [categories, setCategories] = useState([]);
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
      let bgImage = '/src/assets/img/bijoux.webp';

      if (category) {
        const matchedCategory = categories.find(cat => cat.libCateg.toLowerCase() === category.toLowerCase());

        if (matchedCategory) {
          categoryId = matchedCategory.idCateg;
          title = `Découvrez les ${category.charAt(0).toUpperCase() + category.slice(1)} !`;
          bgImage = `/src/assets/img/${category}.webp`;
        } else {
          title = `Retrouvez ici tous les bijoux disponibles !`;
          bgImage = '/src/assets/img/bijoux.webp';
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
          image: `${import.meta.env.VITE_API_URL}img/${product.tabPhoto[0]}`,
          title: product.libProd,
          price: `${product.prix}€`,
          idCateg: product.idCateg
        }));

        setJewelryData(formattedData);
      }

      setCollectionTitle(title);
      setBackgroundImage(bgImage);
    };

    fetchProducts();
  }, [category, categories]);

  const handleCategoryChange = (newCategory) => {
    navigate(`/jewelry/${newCategory}`);
  };

  return (
    <JewelryCollection
      collectionData={jewelryData}
      backgroundImage={backgroundImage}
      collectionName={category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Bijoux'}
      collectionTitle={collectionTitle}
      onCategoryChange={handleCategoryChange}
    />
  );
};

export default Jewelry;
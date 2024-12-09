import React, { useEffect, useState } from 'react';
import JewelryCollection from './JewelryCollection';
import { getAllProducts } from '../../services/ProductService';

const Bangles = () => {
  const [bangleData, setBangleData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        search: '',
        category: 2,
        priceInf: null,
        priceSup: null,
        nbDisplay: 10,
        page: 1,
      };

      const products = await getAllProducts(params);

      if (products && products.produits) {
        const formattedData = products.produits.map((product) => ({
          id: product.idProd,
          image: `${import.meta.env.VITE_API_URL}img/${product.tabPhoto[0]}`,
          title: product.libProd,
          price: `${product.prix}€`,
        }));

        setBangleData(formattedData);
      }
    };

    fetchProducts();
  }, []);

  return (
    <JewelryCollection
      collectionData={bangleData}
      backgroundImage="/src/assets/img/bracelets.webp"
      collectionName="Bracelets"
      collectionTitle="Les nouveautés à ne pas rater !"
    />
  );
};

export default Bangles;
import React, { useEffect, useState } from 'react';
import JewelryCollection from './JewelryCollection';
import { getAllProducts } from '../../services/ProductService';

const Necklaces = () => {
  const [necklaceData, setNecklaceData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        search: '',
        category: 1,
        priceInf: null,
        priceSup: null,
        nbDisplay: 10,
        page: 1,
      };

      const products = await getAllProducts(params);

      if (products) {
        const formattedData = products.map((product) => ({
          id: product.idProd,
          image: `${import.meta.env.VITE_API_URL}img/${product.tabPhoto[0]}`,
          title: product.libProd,
          price: `${product.prix}€`,
        }));

        setNecklaceData(formattedData);
      }
    };

    fetchProducts();
  }, []);

  return (
    <JewelryCollection
      collectionData={necklaceData}
      backgroundImage="/src/assets/img/colliers.webp"
      collectionName="Colliers"
      collectionTitle="Découvrez les dernières créations !"
    />
  );
};

export default Necklaces;
import React from 'react';
import JewelryCollection from './JewelryCollection';

const necklaceData = [
  { id: 1, image: '/src/assets/img/collier1.webp', title: 'Collier 1', price: '25€' },
  { id: 2, image: '/src/assets/img/collier2.webp', title: 'Collier 2', price: '30€' },
  { id: 3, image: '/src/assets/img/collier3.webp', title: 'Collier 3', price: '22€' },
];

const Necklaces = () => {
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
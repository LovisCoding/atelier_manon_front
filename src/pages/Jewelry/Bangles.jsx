import React from 'react';
import JewelryCollection from './JewelryCollection';

const bangleData = [
  { id: 1, image: '/src/assets/img/bangle1.webp', title: 'Bracelet 1', price: '15€' },
  { id: 2, image: '/src/assets/img/bangle2.webp', title: 'Bracelet 2', price: '18€' },
  { id: 3, image: '/src/assets/img/bangle3.webp', title: 'Bracelet 3', price: '20€' },
];

const Bangles = () => {
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
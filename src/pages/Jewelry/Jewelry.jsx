import React from 'react';
import JewelryCollection from './JewelryCollection';

const braceletData = [
  { id: 1, image: '/src/assets/img/bracelet1.webp', title: 'Bracelet 1', price: '12€' },
  { id: 2, image: '/src/assets/img/bracelet2.webp', title: 'Bracelet 2', price: '11€' },
  { id: 3, image: '/src/assets/img/bracelet3.webp', title: 'Bracelet 3', price: '11€' },
];

const Jewelry = () => {
  return (
    <JewelryCollection
      collectionData={braceletData}
      backgroundImage="/src/assets/img/bijoux.webp"
      collectionName="Bijoux"
      collectionTitle="Retrouvez ici tous les bijoux disponibles !"
    />
  );
};

export default Jewelry;
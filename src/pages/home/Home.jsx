import React from 'react';
import Presentation from './Presentation';
import BestSale from './BestSale';
import ManufacturingStep from './ManufacturingStep';
import AvisList from './AvisList'; // Import du composant AvisList

const avisData = [
  {
    rating: 4,
    text: "Super produit, je suis très content de mon achat !",
    author: "Alice",
  },
  {
    rating: 5,
    text: "Qualité incroyable, je recommande vivement !",
    author: "Bob",
  },
  {
    rating: 3,
    text: "Bon produit mais un peu cher à mon goût.",
    author: "Charlie",
  },
  // Ajoutez d'autres avis ici
];

const Home = () => {
  return (
    <div>
      <Presentation />
      <BestSale />
      <ManufacturingStep />
      <AvisList title="Avis des clients" avisData={avisData} /> {/* Ajouter AvisList ici */}
    </div>
  );
};

export default Home;
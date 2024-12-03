import React, { useRef } from 'react';
import Presentation from './Presentation';
import BestSale from './BestSale';
import ManufacturingStep from './ManufacturingStep';
import AvisList from './AvisList';

const avisData = [
  {
    rating: 4,
    text: "J'ai bien reçu les bracelets et je suis agréablement surpris du résultat ! Le côté artisanal est bien mis en avant. Je vous les recommande !",
    author: "Kelyan",
  },
  {
    rating: 5,
    text: "La façon dont les colliers sont faits m'a donné envie d'en commander ! J'ai reçu mon collier la semaine dernière et je ne peux plus m'en passer !",
    author: "Noa",
  },
  {
    rating: 3,
    text: "J'ai eu l'occasion de découvrir le travail de Manon sur un marché. J'ai sauté le pas en achetant un bracelet et la qualité est impressionnante !",
    author: "Anouk",
  },
];

const products = [
  {
    title: "Collier Kelyan",
    price: "25",
    image: "./src/assets/img/bracelet1.png",
  },
  {
    title: "Bracelet ?",
    price: "10",
    image: "./src/assets/img/bracelet2.png",
  },
  {
    title: "Bracelet ?",
    price: "10",
    image: "./src/assets/img/bracelet3.png",
  },
];

const Home = () => {
  const bestSaleRef = useRef(null);

  const scrollToBestSale = () => {
    if (bestSaleRef.current) {
      bestSaleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Presentation scrollToSection={scrollToBestSale} />
      <div ref={bestSaleRef}>
        <BestSale products={products} />
      </div>
      <ManufacturingStep />
      <AvisList title="Vos avis comptent" avisData={avisData} />
    </div>
  );
};

export default Home;
import React, { useRef, useState, useEffect } from 'react';
import Presentation from './Presentation';
import BestSale from './BestSale';
import ManufacturingStep from './ManufacturingStep';
import AvisList from './AvisList';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import { Box } from '@mui/material';

import {getBestSellers} from "../../services/ProductService";
import {getAvis} from "../../services/AvisService";

// const avisData = [
//   {
//     rating: 4,
//     text: "J'ai bien reçu les bracelets et je suis agréablement surpris du résultat ! Le côté artisanal est bien mis en avant. Je vous les recommande !",
//     author: "Kelyan",
//   },
//   {
//     rating: 5,
//     text: "La façon dont les colliers sont faits m'a donné envie d'en commander ! J'ai reçu mon collier la semaine dernière et je ne peux plus m'en passer !",
//     author: "Noa",
//   },
//   {
//     rating: 3,
//     text: "J'ai eu l'occasion de découvrir le travail de Manon sur un marché. J'ai sauté le pas en achetant un bracelet et la qualité est impressionnante !",
//     author: "Anouk",
//   },
// ];



const Home = () => {
  const bestSaleRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [avisData, setAvisData] = useState([]);

  useEffect(() => {
    const exec = async () => {
      console.log("dono")
      const prods = await getBestSellers();
      if (!prods) return;
      setProducts(prods);
    }
    exec();

  }, []);

  useEffect(() => {
    const exec = async () => {
      console.log("dono")
      const avis = await getAvis();
      if (!avis) return;
      setAvisData(avis);
    }
    exec();

  }, []);


  const scrollToBestSale = () => {
    if (bestSaleRef.current) {
      bestSaleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Presentation scrollToSection={scrollToBestSale} />
      <Box ref={bestSaleRef}>
        <BestSale products={products} />
      </Box>
      <ManufacturingStep />
      <AvisList title="Vos avis comptent" avisData={avisData} />
    </>
  );
};

export default Home;
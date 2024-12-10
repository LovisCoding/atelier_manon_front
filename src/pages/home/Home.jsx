import React, { useRef, useState, useEffect } from "react";
import Presentation from "./Presentation";
import BestSale from "./BestSale";
import ManufacturingStep from "./ManufacturingStep";
import AvisList from "./AvisList";
import { Box } from "@mui/material";
import { getBestSellers } from "../../services/ProductService";
import { getAvisToDisplay } from "../../services/AvisService";

const Home = () => {
  const bestSaleRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [avisData, setAvisData] = useState([]);

  useEffect(() => {
    const exec = async () => {
      const prods = await getBestSellers();
      if (!prods) return;
      setProducts(prods);
    };
    exec();
  }, []);

  useEffect(() => {
    const exec = async () => {
      const avis = await getAvisToDisplay();
      console.log(avis);
      if (!avis) return;
      setAvisData(avis);
    };
    exec();
  }, []);

  const scrollToBestSale = () => {
    if (bestSaleRef.current) {
      bestSaleRef.current.scrollIntoView({ behavior: "smooth" });
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
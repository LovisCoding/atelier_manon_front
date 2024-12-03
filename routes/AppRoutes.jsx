import React from 'react';
import { Route, Routes } from 'react-router';
import App from '../src/App';
import Test from '../src/pages/Test/Test';
import FAQ from '../src/pages/faq/Faq';
import About from '../src/pages/About';
import TestMatt from '../src/pages/TestMatt';
import { Product } from '../src/pages/Product/Product';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
	    <Route path="/test/:id" element={<Test />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/about" element={<About />} />
      <Route path="/testMatt" element={<TestMatt />} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  );
};

export default AppRoutes;
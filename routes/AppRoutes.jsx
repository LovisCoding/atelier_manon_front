import React from 'react';
import { Route, Routes } from 'react-router';
import App from '../src/App';
import Test from '../src/pages/Test/Test';
import Navbar from '../src/components/Navbar/Navbar';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
	  <Route path="/test/:id" element={<Test />} />
	  <Route path="/home" element={<Navbar/>} />

    </Routes>
  );
};

export default AppRoutes;
import React from 'react';
import { Route, Routes } from 'react-router';
import App from '../src/App';
import Test from '../src/pages/Test/Test';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
	  <Route path="/test/:id" element={<Test />} />

    </Routes>
  );
};

export default AppRoutes;
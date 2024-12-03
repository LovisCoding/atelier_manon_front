import React from 'react';
import { Route, Routes } from 'react-router';
import App from '../src/App';
import Test from '../src/pages/Test/Test';
import Home from '../src/pages/home/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" >
        <Route index element={<App />} />
        <Route path="/test/:id" element={<Test />} />
        <Route path="/home" element={<Home />} />
       </Route>
    </Routes>
  );
};

export default AppRoutes;
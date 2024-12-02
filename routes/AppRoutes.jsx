import React from 'react';
import { Route, Routes } from 'react-router';
import App from '../src/App';
import Test from '../src/pages/Test/Test';
import Connection from '../src/pages/Connection.jsx';
import Register from '../src/pages/Register.jsx';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/test/:id" element={<Test />} />
      <Route path="/connection" element={<Connection />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
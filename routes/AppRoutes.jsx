import React from 'react';
import { Route, Routes } from 'react-router';
import App from '../src/App';
import Test from '../src/pages/Test/Test';

import Connection from '../src/pages/Connection.jsx';
import Register from '../src/pages/Register.jsx';
import ForgotPassword from '../src/pages/ForgotPassword.jsx';
import EmailSent from '../src/pages/EmailSent.jsx';

import FAQ from '../src/pages/faq/Faq';
import About from '../src/pages/About';
import Home from '../src/pages/home/Home';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<App />} />
          <Route path="/test/:id" element={<Test />} />
        <Route path="/login" element={<Connection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/email-sent" element={<EmailSent />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/about" element={<About />} />
	<Route path="home" element={<Home />} />
      
    </Routes>
  );
};

export default AppRoutes;

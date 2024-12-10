import React from 'react';
import Products from './Produits/Produits';
import { useAuth } from '../../utils/AuthContext';

const Admin = () => {
  const {isLogged,details} = useAuth();
  if (!isLogged || !details.isAdmin) window.location = '/';

  return (
    <Products />
  );
};

export default Admin;
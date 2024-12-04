import React, { useState } from 'react';
import SidebarMenu from './SidebarMenu'; 
import { Box } from '@mui/material';
import FoireAuxQuestions from './FAQ/FAQS';


const Admin = () => {



  return (
    <Box style={{ display: 'flex' }}>
       <FoireAuxQuestions />
    </Box>
  );
};

export default Admin;
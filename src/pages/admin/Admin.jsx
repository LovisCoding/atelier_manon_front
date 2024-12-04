import React, { useState } from 'react';
import SidebarMenu from './SidebarMenu'; 
import { Box } from '@mui/material';
import FoireAuxQuestions from './FAQ';


const Admin = () => {



  return (
    <Box style={{ display: 'flex' }}>
      <SidebarMenu >
		<FoireAuxQuestions />
		</SidebarMenu>
    </Box>
  );
};

export default Admin;
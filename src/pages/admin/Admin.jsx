import React, { useState } from 'react';
import SidebarMenu from './SidebarMenu';
import FoireAuxQuestions from './FAQ'; // Assurez-vous que ce fichier existe
import { Box } from '@mui/material'; // Importation de Box de MUI
import SidebarMenu from '../../components/admin/SidebarMenu';
import FoireAuxQuestions from '../../components/admin/FAQ';

const Admin = () => {
  const [activeView, setActiveView] = useState('');

  const handleSidebarClick = (view) => {
    setActiveView(view);
  };

  return (
    <Box style={{ display: 'flex' }}>
      <SidebarMenu onSidebarClick={handleSidebarClick} />
      <Box style={{ flex: 1, padding: '20px', backgroundColor: '#fff' }}>
        {activeView === 'faq' && <FoireAuxQuestions />}
      </Box>
    </Box>
  );
};

export default Admin;
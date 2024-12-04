import React, { useState } from 'react';
import SidebarMenu from './SidebarMenu';
import FoireAuxQuestions from './FAQ'; // Assurez-vous que ce fichier existe

const Admin = () => {
  const [activeView, setActiveView] = useState('');

  const handleSidebarClick = (view) => {
    setActiveView(view);
  };

  return (
    <div style={{ display: 'flex' }}>
      <SidebarMenu onSidebarClick={handleSidebarClick} />
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff' }}>
        {activeView === 'faq' && <FoireAuxQuestions />}
        {/* Ajoutez d'autres composants en fonction de la vue active */}
      </div>
    </div>
  );
};

export default Admin;
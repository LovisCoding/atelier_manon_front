import React from 'react';
import SidebarMenu from '../../components/admin/SidebarMenu';

const Admin = () => {
	return (
	  <div style={{ display: 'flex' }}>
		<SidebarMenu />
		<div style={{ flex: 1, padding: '20px', backgroundColor: '#fff' }}>
		</div>
	  </div>
	);
};

export default Admin;
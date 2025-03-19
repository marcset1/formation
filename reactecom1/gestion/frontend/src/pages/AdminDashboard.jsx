import React from 'react';
import CommandesTable from '../components/CommandesTable';
import AchatsTable from '../components/AchatsTable';

const AdminDashboard = () => {
  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Système d'Administration</h1>
      {/* Tableau des commandes */}
      <CommandesTable />
      {/* Tableau des achats */}
      <AchatsTable />
    </div>
  );
};

export default AdminDashboard;

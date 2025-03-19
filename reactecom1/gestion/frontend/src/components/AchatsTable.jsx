import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AchatsTable = () => {
  const [achats, setAchats] = useState([]); // État pour les achats

  // Récupérer les achats effectués
  useEffect(() => {
    const fetchAchats = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/achats/all');
        setAchats(response.data); // Mettre à jour l'état avec les achats
      } catch (error) {
        console.error('Erreur lors de la récupération des achats :', error);
      }
    };

    fetchAchats();
  }, []);

  return (
    <div className="mt-4">
      <h2>Achats Effectués</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Commande</th>
            <th>Montant</th>
            <th>Mode de Paiement</th>
          </tr>
        </thead>
        <tbody>
          {achats.map((achat) => (
            <tr key={achat.idachat}>
              <td>{achat.idachat}</td>
              <td>{achat.idcommande}</td>
              <td>{achat.montant} FCFA</td>
              <td>{achat.modepaiement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AchatsTable;

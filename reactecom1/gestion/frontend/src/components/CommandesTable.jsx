import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap'; // Composants de Bootstrap pour le formulaire modal

const CommandesTable = () => {
  const [commandes, setCommandes] = useState([]); // État pour les commandes
  const [showModal, setShowModal] = useState(false); // État pour afficher/masquer le formulaire
  const [selectedCommande, setSelectedCommande] = useState(null); // Commande sélectionnée
  const [modePaiement, setModePaiement] = useState(''); // Mode de paiement sélectionné

  // Récupérer les commandes en cours
  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/commandes/en-cours');
        setCommandes(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes :', error);
      }
    };

    fetchCommandes();
  }, []);

  // Ouvrir le formulaire pour une commande
  const handleOpenModal = (commande) => {
    setSelectedCommande(commande);
    setShowModal(true);
  };

  // Soumettre le formulaire
  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5001/api/commandes/terminer/${selectedCommande.idcommande}`, {
        modePaiement, // Envoyer le mode de paiement sélectionné
      });

      // Mettre à jour l'interface
      setCommandes(commandes.filter((cmd) => cmd.idcommande !== selectedCommande.idcommande));
      setShowModal(false); // Fermer la fenêtre
      setSelectedCommande(null); // Réinitialiser l'état
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la commande :', error);
    }
  };

  return (
    <div className="mt-4">
      <h2>Commandes en Cours</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Produit</th>
            <th>Quantité</th>
            <th>État</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((commande) => (
            <tr key={commande.idcommande}>
              <td>{commande.idcommande}</td>
              <td>{commande.idclient_fk}</td>
              <td>{commande.idproduit_fk}</td>
              <td>{commande.qtecommande}</td>
              <td>{commande.etat}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => handleOpenModal(commande)}
                >
                  Terminer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Fenêtre modale pour saisir le mode de paiement */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Terminer la Commande</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCommande && (
            <div>
              <p>
                Montant total : <strong>{selectedCommande.qtecommande * 10000} FCFA</strong> {/* Exemple */}
              </p>
              <Form>
                <Form.Group>
                  <Form.Label>Mode de Paiement</Form.Label>
                  <Form.Select
                    value={modePaiement}
                    onChange={(e) => setModePaiement(e.target.value)}
                  >
                    <option value="">Sélectionnez un mode de paiement</option>
                    <option value="Orange">Orange</option>
                    <option value="MTN">MTN</option>
                    <option value="Carte Bancaire">Carte Bancaire</option>
                    <option value="Cash">Cash</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!modePaiement}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CommandesTable;

import React from 'react';
import { useLocation } from 'react-router-dom'; // Récupère les données passées via navigate
import './Cart.css';

const Cart = () => {
  const location = useLocation();
  const order = location.state || {}; // Données de commande passées via navigate

  // Fonction pour valider la commande
  const handleValidateOrder = () => {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;

    if (name && phone && city) {
      const message = `Bonjour, je souhaite commander :
- Produit : ${order.name}
- Quantité : ${order.quantity}
- Total : ${order.total}€

Mes coordonnées :
- Nom : ${name}
- Téléphone : ${phone}
- Ville : ${city}`;

      // Ouvrir WhatsApp avec les informations
      window.open(
        `https://wa.me/+237671865401?text=${encodeURIComponent(message)}`,
        '_blank'
      );
    } else {
      alert("Veuillez remplir toutes les informations !");
    }
  };

  return (
    <div className="cart-page">
      <h1>Votre Panier</h1>

      {/* Résumé de la commande */}
      {order.name ? (
        <div className="order-summary">
          <h3>Résumé de la commande</h3>
          <p><strong>Produit :</strong> {order.name}</p>
          <p><strong>Quantité :</strong> {order.quantity}</p>
          <p><strong>Total :</strong> {order.total} €</p>
        </div>
      ) : (
        <p>Aucun produit dans le panier.</p>
      )}

      {/* Formulaire client */}
      <div className="customer-form mt-4">
        <h3>Vos Informations</h3>
        <div className="form-group">
          <label>Nom et Prénom</label>
          <input type="text" id="name" className="form-control" placeholder="Entrez votre nom" />
        </div>
        <div className="form-group">
          <label>Téléphone</label>
          <input type="text" id="phone" className="form-control" placeholder="Entrez votre téléphone" />
        </div>
        <div className="form-group">
          <label>Ville</label>
          <input type="text" id="city" className="form-control" placeholder="Entrez votre ville" />
        </div>
        <button className="btn btn-success w-100 mt-3" onClick={handleValidateOrder}>
          Valider la commande
        </button>
      </div>
    </div>
  );
};

export default Cart;

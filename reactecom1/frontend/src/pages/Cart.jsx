import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Utilisé pour rediriger
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const location = useLocation();
  const order = location.state || {}; // Données de commande passées via navigate
	const navigate = useNavigate();

  // Fonction pour valider la commande
  const handleValidateOrder = async () => {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;

    if (name && phone && city) {
      try {
        const response = await axios.post(`http://localhost:5000/api/orders/validate`, {
          nom: name,
          prenom: '', // Si tu as un champ prénom, utilise-le ici
          email: email,
          tel: phone,
          ville: city,
          produit: {
            idproduit: order.id,
            libelle: order.name, //c'est le nom du produit dans ..productCard
          },
          image: order.image, // Ajouter l'image
          qte: order.quantity,
          total: order.total,
        });

        // Redirection vers WhatsApp
        if (response.data.whatsappUrl) {
          window.open(response.data.whatsappUrl, '_blank');
          alert("Terminer la commande sur le nouvel onglet vers whatsapp. cliquer sur 'ok' pour vous rediriger vers la page d'accueil");
          navigate('/');
        }
      } catch (error) {
        console.error('Erreur lors de la validation de la commande :', error);
        alert('Une erreur est survenue lors de la validation de la commande.');
      }
    } else {
      alert('Veuillez remplir toutes les informations nécessaires.');
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
          <p><strong>Total :</strong> {order.total} FCFA</p>
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
          <label>Email</label>
          <input type="email" id="email" className="form-control" placeholder="Entrez votre email" />
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

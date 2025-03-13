import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Utilisé pour rediriger
import './ProductCard.css';

const ProductCard = ({ id, image, name, description, price }) => {
  const [quantity, setQuantity] = useState(0); // État pour la quantité
  const navigate = useNavigate(); // Navigation pour changer de page

  // Fonction pour augmenter la quantité
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // Fonction pour réduire la quantité (minimum = 0)
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  // Fonction pour commander maintenant
  const handleOrderNow = () => {
    if (quantity > 0) {
      // Redirige vers /cart avec des données de commande
      navigate('/cart', {
        state: { id, name, quantity, price, total: quantity * price },
      });
    } else {
      alert("Veuillez choisir une quantité avant de commander !");
    }
  };

  return (
    <div className="product-card">
      {/* Image du produit */}
      <img src={image} alt={name} className="product-image" />

      {/* Détails du produit */}
      <div className="product-details">
        <h5 className="product-name">{name}</h5>
        <p className="product-description">{description}</p>
        <p className="product-price">Prix : {price} €</p>

        {/* Contrôle de quantité */}
        <div className="quantity-control">
          <button className="btn btn-outline-danger" onClick={handleDecrease}>-</button>
          <span className="quantity-display">{quantity}</span>
          <button className="btn btn-outline-success" onClick={handleIncrease}>+</button>
        </div>

        {/* Bouton Commander Maintenant */}
        <button className="btn btn-warning w-100 mt-3" onClick={handleOrderNow}>
          Commander maintenant
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

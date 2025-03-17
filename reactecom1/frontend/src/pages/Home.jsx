import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]); // État pour stocker les produits
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs

  // Appeler l'API pour récupérer les produits
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://ventelivre.onrender.com/api/products/all`);
        setProducts(response.data); // Met à jour l'état avec les produits récupérés
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des produits :', err);
        setError('Impossible de récupérer les produits');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Affichage en cas de chargement ou d'erreur
  if (loading) {
    return <p>Chargement des produits...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Nos Produits</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.idproduit} className="col-md-4 mb-4">
            <ProductCard
            	id={product.idproduit}
              image="/imagesp/front1.jpg" // Image en dur
              name={product.libelle}
              description={product.descriptions}
              price={product.prix}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

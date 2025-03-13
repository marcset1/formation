import React from 'react';
import ProductCard from '../components/ProductCard';

const products = [
  {
    id: 1,
    name: 'Produit 1',
    description: 'Un excellent produit de qualité supérieure.',
    price: 20,
    image: '/imagesp/front1.jpg',
  },
  {
    id: 2,
    name: 'Produit 2',
    description: 'Idéal pour votre quotidien.',
    price: 30,
    image: '/imagesp/front2.jpg',
  },
  {
    id: 3,
    name: 'Produit 3',
    description: 'Un produit innovant pour vous.',
    price: 25,
    image: '/images/produit3.jpg',
  },
];

const Home = () => {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="mb-4">
          <ProductCard
            image={product.image}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;

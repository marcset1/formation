import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light text-center py-3">
      <p>© {new Date().getFullYear()} Ma Boutique. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;

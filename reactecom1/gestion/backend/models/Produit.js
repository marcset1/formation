const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');

// Définir le modèle `tbproduit`
const Produit = sequelize.define('tbproduit', {
  idproduit: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  libelle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriptions: {
    type: DataTypes.TEXT, // Texte pour les descriptions longues
    allowNull: true,
  },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false, // Prix par unité
  },
  qstock: {
    type: DataTypes.INTEGER, // Quantité en stock
    allowNull: false,
  },
  imageurl: {
  	type: DataTypes.STRING,
  	allowNull: true,
  }
});

Produit.associate = (models) => {
	// Un produit peut être associé à plusieurs commandes
	Produit.hasMany(models.tbcommandes, { foreignKey: 'idproduit_fk' });
};


module.exports = Produit;

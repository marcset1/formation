const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');

// Définir le modèle `tbachat`
const Achat = sequelize.define('tbachat', {
  idachat: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idcommande: {
    type: DataTypes.INTEGER, // Clé étrangère vers commande
    allowNull: false,
  },
  montant: {
    type: DataTypes.FLOAT, // Montant total
    allowNull: false,
  },
  modepaiement: {
    type: DataTypes.STRING, // Mode de paiement
    allowNull: false,
  },
  dateachat: {
    type: DataTypes.DATE, // Date de l'achat
    allowNull: false,
    defaultValue: DataTypes.NOW, // Valeur par défaut
  },
});

module.exports = Achat;

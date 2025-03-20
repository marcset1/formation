const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');

// Définir le modèle `tbclient`
const Client = sequelize.define('tbclient', {
  idclient: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING, // Texte pour les descriptions longues
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, // Prix par unité
  },
  tel: {
    type: DataTypes.STRING, // Quantité en stock
    allowNull: false,
  },
  ville: {
  	type: DataTypes.STRING,
  	allowNull: true,
  }
});



module.exports = Client;

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
    type: DataTypes.TEXT, // Texte pour les descriptions longues
    allowNull: true,
  },
  email: {
    type: DataTypes.FLOAT,
    allowNull: false, // Prix par unité
  },
  tel: {
    type: DataTypes.INTEGER, // Quantité en stock
    allowNull: false,
  },
  ville: {
  	type: DataTypes.STRING,
  	allowNull: true,
  }
});

};


module.exports = Client;

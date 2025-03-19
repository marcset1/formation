const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');

// Définir le modèle `tbcommande`
const Commande = sequelize.define('tbcommande', {
  idcommande: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Auto-incrémenté
  },
  idclient_fk: {
    type: DataTypes.INTEGER, // Clé étrangère (client)
    allowNull: false,
  },
  idproduit_fk: {
    type: DataTypes.INTEGER, // Clé étrangère (produit)
    allowNull: false,
  },
  datetimecommande: {
    type: DataTypes.DATE, // Date et heure
    allowNull: false,
    defaultValue: DataTypes.NOW, // Date actuelle par défaut
  },
  qtecommande: {
    type: DataTypes.INTEGER, // Quantité commandée
    allowNull: false,
  },
  etat: {
    type: DataTypes.STRING, // "en cours" ou "terminé"
    defaultValue: 'en cours',
  },
});
Commande.associate = (models) => {
    // Une commande appartient à un client
    Commande.belongsTo(models.tbclients, { foreignKey: 'idclient_fk' });

    // Une commande appartient à un produit
    Commande.belongsTo(models.tbproduits, { foreignKey: 'idproduit_fk' });
  };
module.exports = Commande;

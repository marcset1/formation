const Commande = require('../models/Commande');
const Produit = require('../models/Produit');
const Achat = require('../models/Achat');

// Relations
Produit.hasMany(Commande, { foreignKey: 'idproduit_fk' });
Commande.belongsTo(Produit, { foreignKey: 'idproduit_fk' });

Commande.hasOne(Achat, { foreignKey: 'idcommande' });
Achat.belongsTo(Commande, { foreignKey: 'idcommande' });

module.exports = { Commande, Produit, Achat };

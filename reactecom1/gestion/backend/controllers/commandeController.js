const Commande = require('../models/Commande');
const Achat = require('../models/Achat');

// Récupérer les commandes en cours
exports.getCommandesEnCours = async (req, res) => {
  try {
    const commandes = await Commande.findAll({ where: { etat: 'en cours' } });
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne.' });
  }
};

// Marquer une commande comme terminée et ajouter un achat
exports.terminerCommande = async (req, res) => {
  try {
    const { id } = req.params;
    const commande = await Commande.findByPk(id);

    if (!commande) return res.status(404).json({ message: 'Commande non trouvée.' });

    commande.etat = 'terminé';
    await commande.save();

    // Ajouter un achat correspondant à la commande
    await Achat.create({
      idcommande: commande.id,
      montant: commande.quantite * commande.prix_unitaire,
      modepaiement: 'Carte bancaire',
    });

    res.json({ message: 'Commande terminée et achat ajouté.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne.' });
  }
};

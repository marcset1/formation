const express = require('express');
const Commande = require('../models/Commande');
const Achat = require('../models/Achat');
const Produit = require('../models/Produit');
const Client = require('../models/Client');

const router = express.Router();


// Récupérer les commandes en cours
router.get('/en-cours', async (req, res) => {
  const commandes = await Commande.findAll({ where: { etat: 'en cours' } });
  res.json(commandes);
});


// Terminer une commande et ajouter un achat
router.put('/terminer/:id', async (req, res) => {
  const { id } = req.params;
  const { modePaiement } = req.body; // Mode de paiement envoyé depuis le frontend
  console.log(id);

  try {
    const commande = await Commande.findByPk(id);

    if (!commande) return res.status(404).json({ message: 'Commande non trouvée.' });

    // Vérification de l'état de la commande
    if (commande.etat === 'terminé') {
      return res.status(400).json({ message: 'Cette commande est déjà terminée.' });
    }



	
    // Calcul du montant total
    const produit = await Produit.findOne({
	  where: { idproduit: commande.idproduit_fk }, // Filtrer par l'ID du produit
	  attributes: ['prix'], // Charger uniquement la colonne `prix`
	});

	if (!produit) {
	  throw new Error('Produit introuvable.');
	}

	const prix = produit.prix;
	console.log(`Le prix du produit est : ${prix} FCFA`);
    
    const montant = produit.prix * commande.qtecommande;

    // Mise à jour de l'état de la commande
    commande.etat = 'terminé';
    await commande.save();

    // Enregistrer l'achat
    console.log("enregistrement de l'achat");
    await Achat.create({
      idcommande: commande.idcommande,
      montant: montant,
      modepaiement: modePaiement,
    });
	console.log("achat enregistre");

    res.json({ message: 'Commande terminée et achat ajouté.', montant: montant });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la commande :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

module.exports = router;

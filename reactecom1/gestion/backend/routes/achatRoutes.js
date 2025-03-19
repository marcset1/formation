const express = require('express');
const Achat = require('../models/Achat');
const router = express.Router();

// Récupérer les commandes en cours
router.get('/all', async (req, res) => {
  const achats = await Achat.findAll();
  res.json(achats);
});

module.exports = router;

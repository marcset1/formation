const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route pour valider une commande
router.post('/validate', orderController.validateOrder);

module.exports = router;

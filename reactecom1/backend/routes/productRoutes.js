const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//Route pour ajouter
router.post('/add', productController.addProduct);

//Route pour tout recuperer
router.get('/all', productController.getAllProducts);

module.exports = router;

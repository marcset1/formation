const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = 5000;

//Middlewares
app.use(cors()); //pour les requetes cross-origin
app.use(bodyParser.json()); //parse les donnees JSON
app.use('/api/products', productRoutes); //attache les routes produits
app.use('/api/orders', orderRoutes); //attache les routes commandes
//Demarrer le serveur
app.listen(PORT, () => {

	console.log(`Serveur API demarre sur le port ${PORT}`);

});

const db = require('../db');

//add new product
exports.addProduct = async (req, res) => {

	const {libelle, descriptions, prix, qstock} = req.body;
	
	console.log(req.body, " \nprix: ", prix, " qstock: ", qstock);
	
	if(!libelle || !descriptions || !qstock){
	
		return res.status(400).json({error: 'Bien vouloir fournir tous les champs requis.'});
	
	}
	
	// Requête SQL d'insertion
	const query = `
	INSERT INTO tbproduit (libelle, descriptions, prix, qstock) 
	VALUES ($1, $2, $3, $4)`;

	// Exécute la requête avec les valeurs dynamiques
	try {
		await db.query(query, [libelle, descriptions, prix, qstock]);
		res.status(201).json({ message: 'Produit ajouté avec succès.'});
	} catch (err) {
		console.error('Erreur lors de l\'ajout du produit :', err);
		res.status(500).json({ error: 'Erreur interne du serveur.' });
	}

};

//get all products
exports.getAllProducts = (req, res) => {
	const query = 'SELECT * FROM tbproduit';
	db.query(query, (err, results) => {
	  if (err) throw err;
	  console.error('recuperation des produits reussie');
	  res.status(200).json(results.rows);
	});

};

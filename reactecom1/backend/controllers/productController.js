const db = require('../db');

//add new product
exports.addProduct = (req, res) => {

	const {libelle, descriptions, prix, qstock} = req.body;
	
	console.log(req.body, " \nprix: ", prix, " qstock: ", qstock);
	
	if(!libelle || !descriptions || !qstock){
	
		return res.status(400).json({error: 'Bien vouloir fournir tous les champs requis.'});
	
	}
	
	const query = 'INSERT INTO tbproduit(libelle, descriptions, prix, qstock) VALUES (?, ?, ?, ?)';
	db.query(query, [libelle, descriptions, prix, qstock], (err, result) => {
	
		if(err){
		
			console.error('Erreur: ajout du produit -> ', err);
			return res.status(500).json({error: 'erreur interne du serveur.'});
		
		}
		console.log('ajout du produit reussi');
		res.status(201).json({message: 'Produit ajoute avec succes!', productId: result.insertId});
	
	});

};

//get all products
exports.getAllProducts = (req, res) => {

	const query = 'SELECT * FROM tbproduit';
	db.query(query, (err, results) => {
	
		if(err){
		
			console.error('Erreur: getting all products -> ', err);
			return res.status(500).json({error: 'Erreur du serveur.'});
		
		}
		console.error('recuperation des produits reussie');
		res.status(200).json(results);
	
	});

};

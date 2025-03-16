require('dotenv').config();
const mysql = require('mysql2');

//conf de la connexion mysql
const db = mysql.createConnection({

	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.BD_PASSWORD,
	database: process.env.DB_NAME

});

//connect db
db.connect((err) => {

	if(err){
	
		console.error('Erreur: Connexion a la bd -> ', err);
		return;
	
	}
	console.log('connexion a la bd mysql reussie');

});

module.exports = db;

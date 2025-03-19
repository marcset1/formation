const { Sequelize } = require('sequelize');
require('dotenv').config(); // Charger les variables d'environnement

// Initialisation de Sequelize en fonction des variables d'environnement
const sequelize = new Sequelize(
  process.env.DB_NAME,        // Nom de la base de données
  process.env.DB_USER,        // Nom d'utilisateur
  process.env.DB_PASSWORD,    // Mot de passe
  {
    host: process.env.DB_HOST, // Hôte de la base de données
    dialect: process.env.DB_DIALECT || 'mysql', // Type de base : MySQL ou PostgreSQL
    port: process.env.DB_PORT || 3306, // Port par défaut
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true', // Activer SSL si nécessaire
    },
    define: {
    	timestamps: false, // empecher l'ajout auto des colums timestamp
    }
  }
);

// Vérification de la connexion à la base
sequelize
  .authenticate()
  .then(() => console.log(`Connecté à la base de données ${process.env.DB_DIALECT} !`))
  .catch((err) => console.error('Erreur de connexion :', err));

module.exports = sequelize; // Exporter l'instance pour utilisation ailleurs

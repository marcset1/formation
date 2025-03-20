const { Sequelize } = require('sequelize');
require('dotenv').config(); // Charger les variables d'environnement

// Configuration de la connexion à la base de données
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
      timestamps: false, // Empêcher l'ajout automatique des colonnes timestamp
    },
    retry: {
      // Configuration des tentatives de reconnexion
      max: 5, // Nombre maximal de tentatives
      timeout: 5000, // Délai entre chaque tentative (en millisecondes)
    },
  }
);

// Fonction pour vérifier la connexion avec réessai
async function checkConnection() {
  const maxRetries = 5; // Nombre maximal de tentatives
  const retryDelay = 5000; // Délai entre chaque tentative (en millisecondes)

  let retries = 0;

  while (retries < maxRetries) {
    try {
      await sequelize.authenticate();
      console.log(`Connecté à la base de données ${process.env.DB_DIALECT} !`);
      return; // Connexion réussie, sortie de la fonction
    } catch (err) {
      retries++;
      console.error(`Tentative de connexion ${retries}/${maxRetries} échouée :`, err.message);

      if (retries < maxRetries) {
        console.log(`Nouvelle tentative dans ${retryDelay / 1000} secondes...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay)); // Attendre avant de réessayer
      } else {
        console.error('Nombre maximal de tentatives atteint. Arrêt du backend.');
        process.exit(1); // Quitter l'application en cas d'échec final
      }
    }
  }
}

// Démarrer la vérification de la connexion
checkConnection();

module.exports = sequelize; // Exporter l'instance pour utilisation ailleurs

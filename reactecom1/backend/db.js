require('dotenv').config();
const mysql = require('mysql2');

// Configuration de la connexion MySQL
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Créer une connexion MySQL
const db = mysql.createConnection(dbConfig);

// Fonction pour notifier en cas d'échec de connexion
function notifyFailure(error) {
  console.error('Notification : Échec de connexion à la base de données !');
  console.error('Détails de l\'erreur :', error.message);
  // Vous pouvez ajouter ici une notification externe (e-mail, Slack, etc.)
}

// Fonction pour établir la connexion à la base de données avec réessai
function connectWithRetry() {
  const maxRetries = 5; // Nombre maximal de tentatives
  const retryDelay = 5000; // Délai entre chaque tentative (en millisecondes)

  let retries = 0;

  const attemptConnection = () => {
    db.connect((err) => {
      if (err) {
        retries++;
        console.error(`Tentative de connexion ${retries}/${maxRetries} échouée :`, err.message);

        if (retries < maxRetries) {
          console.log(`Nouvelle tentative dans ${retryDelay / 1000} secondes...`);
          setTimeout(attemptConnection, retryDelay); // Réessayer après un délai
        } else {
          console.error('Nombre maximal de tentatives atteint. Arrêt du backend.');
          notifyFailure(err); // Notifier en cas d'échec final
          process.exit(1); // Quitter l'application
        }
      } else {
        console.log('Connexion à la base de données réussie !');
      }
    });
  };

  // Démarrer la première tentative de connexion
  attemptConnection();
}

// Démarrer la connexion avec réessai
connectWithRetry();

// Exporter la connexion pour une utilisation dans d'autres modules
module.exports = db;

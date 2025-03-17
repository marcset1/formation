const { Pool } = require('pg');
require('dotenv').config(); // Charger les variables d'environnement

// Configuration de la connexion PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432, // Port PostgreSQL par défaut
  //ssl: process.env.DB_SSL === 'true' // Pour Render, activer SSL si nécessaire
});

// Vérifier la connexion
pool.connect((err, client, release) => {
  if (err) {
    console.error('Erreur de connexion à PostgreSQL :', err);
  } else {
    console.log('Connecté à PostgreSQL');
    release();
  }
});

module.exports = pool;

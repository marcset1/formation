const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db/config');
const commandeRoutes = require('./routes/commandeRoutes');
const achatRoutes = require('./routes/achatRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());
app.use('/api/commandes', commandeRoutes);
app.use('/api/achats', achatRoutes);

sequelize.sync({ alter: true })
  .then(() => app.listen(PORT, () => console.log(`Serveur sur http://127.0.0.1:${PORT}`)))
  .catch((err) => console.error('Erreur de synchronisation :', err));

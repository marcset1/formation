const db = require('../db');


// Valider une commande
exports.validateOrder = (req, res) => {
  const { nom, prenom, email, tel, ville, produit, image, qte, total } = req.body;

	// Fonction pour enregistrer la commande
	const saveOrder = (clientId) => {
	  const insertOrderQuery = 'INSERT INTO tbcommandes (idclient_fk, idproduit_fk, datetimecommande, qtecommande) VALUES (?, ?, NOW(), ?)';
	  db.query(insertOrderQuery, [clientId, produit.idproduit, qte], (err, result) => {
		if (err) {
		  console.error('Erreur lors de l\'ajout de la commande :', err);
		  return res.status(500).json({ error: 'Erreur interne du serveur.' });
		}
		else{
			console.log("commande enregistree avec succes!");
		}

		// Envoi de la commande à WhatsApp
		const message = `Bonjour, voici ma commande :
	- Produit : ${produit.libellé}
	- Quantité : ${qte}
	- Total : ${total}€
	- Image : ${image}

	Mes coordonnées :
	- Nom : ${nom} ${prenom}
	- Téléphone : ${tel}
	- Ville : ${ville}`;

		const whatsappUrl = `https://wa.me/00237671865401?text=${encodeURIComponent(message)}`;
		res.status(200).json({ message: 'Commande validée avec succès !', whatsappUrl });
	  });
	};

  if (!nom || !tel || !ville || !produit || !qte) { //apprendre a gerer la valeur 0 du empty ou null
    return res.status(400).json({ error: 'Veuillez remplir tous les champs requis.' });
  }

  // Vérifier si le client existe déjà (par email ou téléphone)
  const clientCheckQuery = 'SELECT idclient FROM tbclients WHERE email = ? OR tel = ?';
  db.query(clientCheckQuery, [email, tel], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification du client :', err);
      return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }

    let clientId;
    if (results.length > 0) {
      // Client déjà existant
      clientId = results[0].idclient;
      saveOrder(clientId);
    } else {
      // Ajouter un nouveau client
      const insertClientQuery = 'INSERT INTO tbclients (nom, prenom, email, tel, ville) VALUES (?, ?, ?, ?, ?)';
      db.query(insertClientQuery, [nom, prenom, email, tel, ville], (err, result) => {
        if (err) {
          console.error('Erreur lors de l\'ajout du client :', err);
          return res.status(500).json({ error: 'Erreur interne du serveur.' });
        }

        clientId = result.insertId;
        saveOrder(clientId);
      });
    }

  });
};

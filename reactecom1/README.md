# Projet Dockerisé - Gestion de Produits et Commandes

## Prérequis

- Docker et Docker Compose installés sur votre machine.
- Un fichier `.env` correctement configuré dans le dossier `backend` et `gestion/backend`.

---

## Nettoyer l'environnement Docker

1. Vérifier l'état des services Docker.  
   <!-- Commande : docker-compose ps -->

2. Arrêter tous les services Docker en cours d'exécution.  
   <!-- Commande : docker-compose down -->

3. Supprimer tous les conteneurs Docker.  
   <!-- Commande : docker rm -f $(docker ps -aq) -->

4. Supprimer toutes les images Docker.  
   <!-- Commande : docker rmi -f $(docker images -aq) -->

5. Supprimer tous les volumes Docker.  
   <!-- Commande : docker volume rm $(docker volume ls -q) -->

6. Supprimer tous les réseaux Docker.  
   <!-- Commande : docker network rm $(docker network ls -q) -->

---

## Construire et démarrer les services

1. Construire les images Docker.  
   <!-- Commande : docker-compose build --no-cache -->

2. Démarrer les conteneurs.  
   <!-- Commande : docker-compose up -->

3. Vérifier que les services sont en cours d'exécution.  
   <!-- Commande : docker-compose ps -->

---

## Accéder aux services

- **Base de données MySQL** : Port `3307`.
- **Backend (Node.js)** : Port `5000`.
- **Frontend (React)** : Port `80`.
- **Backend de gestion (Node.js)** : Port `5001`.
- **Frontend de gestion (React)** : Port `81`.

---


## Structure du projet
.
├── backend/
│ ├── controllers/
│ ├── db.js
│ ├── Dockerfile
│ ├── index.js
│ ├── models/
│ ├── routes/
│ └── package.json
├── frontend/
│ ├── Dockerfile
│ ├── src/
│ └── package.json
├── gestion/
│ ├── backend/
│ └── frontend/
├── docker-compose.yml
└── README.md


---

## Commandes utiles

- Arrêter les services.  
  <!-- Commande : docker-compose down -->

- Redémarrer les services.  
  <!-- Commande : docker-compose restart -->

- Voir les logs des services.  
  <!-- Commande : docker-compose logs -f -->

- Nettoyer l'environnement Docker.  
  <!-- Commande : docker system prune -a --volumes -->

---

## Auteur

Marc SALLA.

---

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.


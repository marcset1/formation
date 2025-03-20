# Utilise une image officielle de Node.js
FROM node:latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances système (mysql-client)
RUN apt-get update && apt-get install -y default-mysql-client

# Installer les dépendances Node.js
RUN npm install -g npm@latest
RUN npm install --production

# Copier tout le projet dans le conteneur
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["npm", "start"]

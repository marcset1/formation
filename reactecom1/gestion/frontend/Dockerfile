# Utilise une image officielle de Node.js pour construire le projet

# Utilise une image officielle de Node.js pour construire le projet
FROM node:latest AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

RUN npm cache clean --force

# Installer les dépendances
RUN npm install -g npm@latest
RUN npm install

# Copier tout le projet et construire le frontend
COPY . .
RUN npm run build

# Utilise une image NGINX pour servir le frontend
FROM nginx:alpine

# Copier les fichiers générés dans le dossier de déploiement NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande par défaut (déjà incluse avec l'image NGINX)
CMD ["nginx", "-g", "daemon off;"]

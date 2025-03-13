# Utiliser une image Node.js officielle comme base
FROM node:18-alpine as builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de configuration
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install

# Copier le reste des fichiers source
COPY . .

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3000

# Utiliser la commande de développement au lieu de build + start
CMD ["yarn", "dev"] 
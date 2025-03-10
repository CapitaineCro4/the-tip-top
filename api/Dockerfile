# Utiliser une image Node.js officielle comme base
FROM node:20.17.0-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app/api

# Copier les fichiers de configuration
COPY package.json yarn.lock ./
COPY prisma ./prisma/
COPY tsconfig.json ./

# Installer les dépendances
RUN yarn install

# Copier le reste des fichiers source
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Compiler le code TypeScript
RUN yarn build

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3002

# Commande pour démarrer l'application
CMD ["yarn", "dev"]

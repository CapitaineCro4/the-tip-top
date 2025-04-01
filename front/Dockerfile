FROM node:18-alpine AS development

WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json yarn.lock ./

# Installation des dépendances (y compris les devDependencies)
RUN yarn install --frozen-lockfile

# Copie de tout le code source
COPY . .

# Copie du fichier .env pour le développement
COPY .env.local ./.env.local

# Définit l'environnement comme développement
ENV NODE_ENV=development
ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true

# Expose le port (par défaut 3000 pour Next.js)
EXPOSE 3000

# Démarre l'application en mode développement (avec rechargement à chaud)
CMD ["yarn", "dev"]
# Étape 1 : Construction de l'application
FROM node:18-alpine AS builder

# Définir des arguments pour le build
ARG NEXT_PUBLIC_API_URL
ARG NODE_ENV

# Définir les variables d’environnement pour le build
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de gestion des dépendances
COPY package*.json yarn.lock ./

# Installer les dépendances
RUN yarn install --frozen-lockfile

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application Next.js
RUN yarn build

# Étape 2 : Image finale pour l'exécution
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires depuis l'étape builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Définir la variable d'environnement pour l'exécution
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["yarn", "start"]
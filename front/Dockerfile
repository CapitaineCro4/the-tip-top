# Étape 1 : Construction de l'application
FROM node:18-alpine AS builder

# Définir des arguments pour le build
ARG NODE_ENV
ARG NEXT_PUBLIC_API_URL

# Définir les variables d’environnement pour le build
ENV NODE_ENV=$NODE_ENV
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Étape 2 : Image finale pour la production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Définir les variables d’environnement pour le runtime
ENV NODE_ENV=$NODE_ENV
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

EXPOSE 3000
CMD ["yarn", "start"]
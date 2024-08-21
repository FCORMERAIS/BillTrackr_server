# Étape de construction
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Étape d'exécution
FROM node:18

WORKDIR /app

COPY --from=build /app /app

ENV MYSQL_HOST="db"
ENV MYSQL_USER="root"
ENV MYSQL_PASSWORD=""
ENV MYSQL_DATABASE="billtrackr"

EXPOSE 3000

CMD ["node", "server.js"]

# Verwenden Sie das offizielle Node-Image als Basis
FROM node:20-alpine AS build

# Arbeitsverzeichnis im Container festlegen
WORKDIR /app

# Package-Dateien kopieren und Abhängigkeiten installieren
COPY package*.json ./
RUN npm ci

# Gesamten Projektordner kopieren
COPY . .

# Angular-Anwendung bauen
RUN npm run build

# Produktions-Image mit Nginx erstellen
FROM nginx:alpine

# Nginx-Standardkonfiguration entfernen
RUN rm -rf /usr/share/nginx/html/*

# Buildartefakte aus dem Build-Stage kopieren
COPY --from=build /app/dist/spoterly-frontend/browser /usr/share/nginx/html

# Nginx-Konfiguration kopieren
COPY default.conf /etc/nginx/conf.d/default.conf

# Entrypoint-Skript kopieren und ausführbar machen
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Standardport für Nginx
EXPOSE 80

# Entrypoint-Skript als Startpunkt verwenden
ENTRYPOINT ["/entrypoint.sh"]

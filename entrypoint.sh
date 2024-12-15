#!/bin/sh

# Ersetzen der Platzhalter in env.js
sed -i "s|\${API_BASE_URL}|$API_BASE_URL|g" /usr/share/nginx/html/assets/env.js

# Nginx im Vordergrund starten
exec nginx -g 'daemon off;'

FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build the application
ARG API_BASE_URL
ENV API_BASE_URL=${API_BASE_URL:-http://localhost:8080}

# Replace API_BASE_URL in environment.prod.ts
RUN sed -i "s|apiBaseUrl: '.*'|apiBaseUrl: '${API_BASE_URL}'|g" src/environments/environment.prod.ts

# Build with production configuration
RUN npm run build -- --configuration=production

# Use nginx to serve the application
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/spoterly-frontend/browser /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]







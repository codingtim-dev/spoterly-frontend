FROM node:18 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/spoterly-frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Replace config.json dynamically
COPY ./config.template.json /usr/share/nginx/html/assets/config.json
CMD ["sh", "-c", "envsubst < /usr/share/nginx/html/assets/config.json > /usr/share/nginx/html/assets/config.json && nginx -g 'daemon off;'"]

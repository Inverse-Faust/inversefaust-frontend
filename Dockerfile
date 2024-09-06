FROM node:22.3.0-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Use Nginx as the web server
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY --from=build /app/src/assets /usr/share/nginx/html/assets

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Gunakan image Node.js sebagai base untuk tahap build
FROM node:18 AS build-stage

# Set work directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file proyek ke dalam container
COPY . .

# Build aplikasi Vue
RUN npm run build

# Gunakan image nginx sebagai base untuk production
FROM nginx:latest AS production-stage

# Copy build hasil dari tahap sebelumnya ke dalam folder nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 82

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]

# Gunakan Nginx untuk menyajikan aplikasi Vue
FROM nginx:alpine

# Salin file build Vue ke direktori Nginx
COPY dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]

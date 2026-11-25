
# Use lightweight Nginx web server
FROM nginx:alpine

# Copy website files into Nginx directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Expose web server port
EXPOSE 80

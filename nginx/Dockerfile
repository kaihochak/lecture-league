# Use the official NGINX image as a base
FROM nginx:alpine

# Copy custom configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# The base image handles the rest (starting NGINX)
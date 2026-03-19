# Stage 1: Build Angular frontend
FROM node:22-alpine AS build
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install
COPY frontend/ ./
RUN npx ng build --configuration production

# Stage 2: Serve with nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx config template and entrypoint script
COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Copy Angular build output
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# API_BACKEND_URL must be set to the backend API base URL (e.g. http://api:3000)
ENV API_BACKEND_URL=http://localhost:3000

EXPOSE 8080

ENTRYPOINT ["/docker-entrypoint.sh"]

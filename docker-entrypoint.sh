#!/bin/sh
set -e

# Substitute environment variables into the nginx config template
envsubst '${API_BACKEND_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf

# Generate runtime config for the Angular app
cat > /usr/share/nginx/html/runtime-config.json <<EOF
{
  "apiBaseUrl": "${API_BACKEND_URL:-/api}"
}
EOF

echo "Starting nginx with API_BACKEND_URL=${API_BACKEND_URL}"

exec nginx -g 'daemon off;'

# Insurance Product Contract Management UI

Angular + Material UI frontend for managing insurance product sign-up contracts. The backend API is provided by a separate service.

## Project Structure

```
├── frontend/          # Angular 21 + Material UI
├── nginx.conf.template # Nginx config (reverse proxy to API backend)
├── Dockerfile         # Multi-stage build
└── .github/workflows/ # CI/CD pipeline
```

## Local Development

```bash
cd frontend
npm install
npm start            # Starts on http://localhost:4200 (proxies /api to localhost:3000)
```

Set the proxy target in `proxy.conf.json` if your backend runs on a different port.

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `API_BACKEND_URL` | Backend API base URL. Nginx reverse-proxies `/api/` requests to this URL. | `http://localhost:3000` |

## Docker

```bash
# Build
docker build -t insurance-product-management-ui .

# Run (pointing to your API backend)
docker run -p 8080:8080 -e API_BACKEND_URL=http://api-backend:3000 insurance-product-management-ui
```

## CI/CD

The GitHub Actions workflow (`.github/workflows/build-and-push.yml`) automatically builds and pushes the Docker image to GitHub Container Registry (`ghcr.io`) on pushes to `main`.
# Docker Configuration

## Services Overview

The application runs three main services orchestrated by Docker Compose:

### PostgreSQL Database

- **Image**: `postgres:15-alpine`
- **Port**: 5432
- **Credentials**: strapi/strapi/strapi
- **Data Persistence**: Named volume `postgres_data`

### Strapi CMS

- **Build**: `./strapi/Dockerfile.dev`
- **Port**: 1337
- **Environment**: Development mode
- **Volumes**: Source code, node_modules, uploads

### Next.js Frontend

- **Build**: `./next/Dockerfile.dev`
- **Port**: 3000
- **Environment**: Development mode
- **Volumes**: Source code, node_modules

## Docker Compose Configuration

```yaml
services:
  postgres:
    image: postgres:15-alpine
    ports: ["5432:5432"]
    volumes: [postgres_data:/var/lib/postgresql/data]

  strapi:
    build: ./strapi/Dockerfile.dev
    ports: ["1337:1337"]
    volumes: [./strapi:/app, strapi_node_modules:/app/node_modules]
    depends_on: [postgres]

  next:
    build: ./next/Dockerfile.dev
    ports: ["3000:3000"]
    volumes: [./next:/app, next_node_modules:/app/node_modules]
    depends_on: [strapi]
```

## Volumes

### Named Volumes

- `postgres_data`: Database persistence
- `strapi_node_modules`: Strapi dependencies
- `next_node_modules`: Next.js dependencies
- `strapi_uploads`: Media file storage

### Bind Mounts

- `./strapi:/app`: Live code editing for Strapi
- `./next:/app`: Live code editing for Next.js

## Network

All services communicate through the `gossamer-network` bridge network:

- Services can reach each other by container name
- External access via exposed ports
- Isolated from other Docker networks

## Data Persistence

### ✅ Data Survives

- Container restarts
- Container recreation
- Image rebuilds
- `docker compose down && up`

### ⚠️ Data Lost When

- `docker compose down -v` (removes volumes)
- Manual volume deletion: `docker volume rm gossamer_postgres_data`
- `docker system prune --volumes`

## Environment Variables

Environment variables are managed through:

1. `.env` file (Docker Compose)
2. `docker-compose.yml` environment sections
3. Strapi auto-generated `.env` file

### Key Variables

```env
# Database Connection
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432

# Security
JWT_SECRET=your-jwt-secret
ADMIN_JWT_SECRET=your-admin-jwt-secret

# Development
NODE_ENV=development
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

## Container Management

```bash
# Basic operations
docker compose up          # Start services
docker compose down        # Stop services
docker compose ps          # Check status
docker compose logs        # View logs

# Building
docker compose build       # Build images
docker compose up --build  # Build and start

# Individual services
docker compose up strapi          # Start only Strapi
docker compose restart postgres   # Restart database
docker compose exec strapi sh     # Shell access

# Volume management
docker volume ls                   # List volumes
docker volume inspect gossamer_postgres_data
```

## Development vs Production

### Development (Current Setup)

- Source code mounted as volumes
- Hot reload enabled
- Development dependencies included
- Simple environment variables

### Production Considerations

- Multi-stage Docker builds
- Optimized images (no dev dependencies)
- Environment-specific secrets
- Health checks and restart policies
- SSL/TLS termination
- Resource limits

# Development Guide

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Git

### Initial Setup

1. **Clone and Setup Environment**
   ```bash
   git clone <repository-url>
   cd gossamer
   cp .env.example .env
   ```

2. **Start Services**
   ```bash
   docker compose up --build
   ```

3. **Access Services**
   - Frontend: http://localhost:3000
   - Strapi Admin: http://localhost:1337/admin
   - API: http://localhost:1337/api

### Daily Development

```bash
# Start services (fast)
docker compose up

# Stop services
docker compose down

# View logs
docker compose logs -f [service-name]

# Restart specific service
docker compose restart [service-name]
```

### When to Rebuild

Use `docker compose up --build` when:
- First time setup
- Modified Dockerfile.dev files
- Added new dependencies to package.json
- Need a clean rebuild

### Hot Reload

Both Next.js and Strapi support hot reload:
- Code changes automatically trigger rebuilds
- No need to restart containers for code changes
- Database changes require container restart

## Environment Configuration

### Environment Files
- `.env.example` - Template with safe defaults
- `.env` - Your local configuration (not in git)
- `strapi/.env` - Strapi-specific environment (auto-generated)

### Important Variables
```env
# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_NAME=strapi

# Security (change in production!)
JWT_SECRET=your-jwt-secret-key-here
ADMIN_JWT_SECRET=your-admin-jwt-secret-here

# API URLs
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

## Project Structure

```
gossamer/
├── next/                    # Next.js frontend
│   ├── app/                # App router pages
│   ├── components/         # Reusable components
│   └── Dockerfile.dev      # Development container
├── strapi/                 # Strapi CMS
│   ├── src/               # Source code
│   ├── config/            # Configuration files
│   └── Dockerfile.dev     # Development container
├── docs/                  # Documentation
├── .env.example           # Environment template
└── docker-compose.yml     # Service orchestration
```

## Troubleshooting

### Container Issues
```bash
# Check container status
docker compose ps

# Rebuild everything
docker compose down
docker compose up --build

# Clear everything and start fresh
docker compose down -v
docker compose up --build
```

### Common Commands
```bash
# Enter container shell
docker compose exec strapi sh
docker compose exec next sh

# Check logs
docker compose logs strapi
docker compose logs next
docker compose logs postgres

# View all running containers
docker ps
```

### Database Issues
```bash
# Reset database (warning: deletes all data)
docker compose down
docker volume rm gossamer_postgres_data
docker compose up --build

# Access database directly
docker compose exec postgres psql -U strapi -d strapi
```

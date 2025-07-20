# Gossamer Development Environment

This project uses Docker Compose for easy development setup.

## Quick Start

### Prerequisites
- Docker and Docker Compose installed on your system

### Start Development

Run this single command to start everything:

```bash
./dev-start.sh
```

This will start:
- PostgreSQL database (port 5432)
- Strapi CMS (port 1337)
- Next.js frontend (port 3000)

### Access Your Applications

- **Next.js Frontend**: http://localhost:3000
- **Strapi Admin Panel**: http://localhost:1337/admin
- **Strapi API**: http://localhost:1337/api

### Stop Development

```bash
./dev-stop.sh
```

Or press `Ctrl+C` in the terminal where docker-compose is running.

## Features

✅ **Live Code Reloading**: Changes in your code are automatically reflected
✅ **Persistent Data**: Database and uploaded files are preserved between restarts
✅ **Hot Module Replacement**: Next.js with Turbopack for fast development
✅ **Auto-restart**: Services restart automatically if they crash

## Development Workflow

1. Start the environment: `./dev-start.sh`
2. Edit code in `./next/` or `./strapi/` directories
3. Changes are automatically applied
4. Access Strapi admin to manage content
5. View changes on the Next.js frontend

## Environment Variables

Edit `.env` file to customize:
- Database credentials
- JWT secrets
- API URLs

## Volumes

- `postgres_data`: Database data persistence
- `strapi_uploads`: Uploaded files persistence
- Code directories are mounted for live editing

## Troubleshooting

### Reset Database
If you need to reset the database:
```bash
docker compose down -v
./dev-start.sh
```

### View Logs
```bash
docker compose logs -f [service_name]
```

### Rebuild Services
```bash
docker compose up --build
```

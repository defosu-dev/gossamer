# Database Configuration

## PostgreSQL Setup

The project uses PostgreSQL 15 in an Alpine Linux container for optimal performance and size.

### Connection Details
- **Host**: `postgres` (container name) or `localhost` (external)
- **Port**: 5432
- **Database**: strapi
- **Username**: strapi
- **Password**: strapi

### Data Persistence

Database data is stored in a Docker named volume:
```yaml
volumes:
  postgres_data:/var/lib/postgresql/data
```

This ensures data survives container restarts and rebuilds.

### Strapi Configuration

Strapi connects to PostgreSQL using these environment variables:
```env
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
```

## Database Management

### Access Database
```bash
# Connect via Docker
docker compose exec postgres psql -U strapi -d strapi

# Connect externally (requires PostgreSQL client)
psql -h localhost -U strapi -d strapi

# Basic SQL commands
\l          # List databases
\dt         # List tables
\d table    # Describe table
\q          # Quit
```

### Backup and Restore
```bash
# Backup database
docker compose exec postgres pg_dump -U strapi strapi > backup.sql

# Restore database
docker compose exec -i postgres psql -U strapi -d strapi < backup.sql

# Backup with compression
docker compose exec postgres pg_dump -U strapi -Fc strapi > backup.dump
docker compose exec -i postgres pg_restore -U strapi -d strapi backup.dump
```

### Reset Database
```bash
# Warning: This will delete all data
docker compose down
docker volume rm gossamer_postgres_data
docker compose up --build
```

### Database Logs
```bash
# View PostgreSQL logs
docker compose logs postgres

# Follow logs in real-time
docker compose logs -f postgres
```

## Strapi Database Features

### Automatic Setup
- Database tables created automatically by Strapi
- Migrations handled by Strapi
- Admin user setup on first run at http://localhost:1337/admin

### Content Types
- Dynamic content types via Strapi admin panel
- Automatic API generation for content types
- Relations and media handling built-in
- GraphQL and REST APIs auto-generated

### Authentication & Security
- JWT token-based authentication
- Role-based access control (RBAC)
- API token management
- User permissions and content access control

## Environment Configuration

### Development Settings
```env
# Current development setup
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
```

### Production Considerations
- Use strong, unique passwords
- Enable SSL/TLS connections
- Set up connection pooling
- Configure regular backups
- Monitor database performance
- Set up read replicas if needed

## Common Database Tasks

### Initial Setup
1. First run creates database schema automatically
2. Access Strapi admin at http://localhost:1337/admin
3. Create your first admin user
4. Start building content types

### Content Management
- Create content types in Strapi admin
- APIs are automatically generated
- Use the Content Manager to add data
- APIs available at http://localhost:1337/api

### Monitoring
```bash
# Check database size
docker compose exec postgres psql -U strapi -d strapi -c "SELECT pg_size_pretty(pg_database_size('strapi'));"

# Check active connections
docker compose exec postgres psql -U strapi -d strapi -c "SELECT count(*) FROM pg_stat_activity;"

# Check table sizes
docker compose exec postgres psql -U strapi -d strapi -c "SELECT schemaname,tablename,pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size FROM pg_tables ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;"
```

## Troubleshooting

### Connection Issues
- Ensure PostgreSQL container is running: `docker compose ps`
- Check logs: `docker compose logs postgres`
- Verify network connectivity between containers

### Performance Issues
- Monitor PostgreSQL logs for slow queries
- Check container resource usage: `docker stats`
- Consider adjusting PostgreSQL configuration for development

### Data Issues
- Use Strapi's built-in database migration system
- Always backup before major changes
- Use version control for content type definitions

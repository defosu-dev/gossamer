# Gossamer

A modern full-stack application template built with Next.js, Strapi CMS, and PostgreSQL.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd gossamer

# Setup environment variables
cp .env.example .env

# Start development environment
docker compose up

# First time or after dependency changes
docker compose up --build
```

## 📁 Project Structure

```
gossamer/
├── next/          # Next.js frontend application
├── strapi/        # Strapi CMS backend
├── docs/          # Project documentation
├── .env.example   # Environment variables template
└── docker-compose.yml
```

## 🌐 Services

- **Frontend**: http://localhost:3000 (Next.js)
- **Admin Panel**: http://localhost:1337/admin (Strapi)
- **API**: http://localhost:1337/api (Strapi API)
- **Database**: localhost:5432 (PostgreSQL)

## 📚 Documentation

- [Development Setup](./docs/development.md)
- [Docker Configuration](./docs/docker.md)
- [Database](./docs/database.md)

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Strapi v5, Node.js
- **Database**: PostgreSQL 15
- **Container**: Docker & Docker Compose

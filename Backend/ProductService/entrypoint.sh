#!/bin/bash
set -e

echo "⏳ Waiting for PostgreSQL..."
until pg_isready -h postgres -p 5432; do
  sleep 1
done

echo "⚙️ Applying EF Core migrations..."
cd /app
dotnet ef database update --startup-project /app

echo "🚀 Starting API..."
exec dotnet ProductService.API.dll

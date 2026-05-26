Docker Compose (Backend + Frontend)

Basic instructions to build and run the services with Docker Compose. Edit `.env` to change host ports.

Run (build and start):

```bash
docker compose up --build
```

Run in background (detached):

```bash
docker compose up --build -d
```

Stop and remove containers, networks:

```bash
docker compose down
```

Defaults (in `.env`):
- `BACKEND_PORT=5000` -> maps to container port 80 (ASP.NET Core)
- `FRONTEND_PORT=8080` -> maps to container port 80 (nginx)

Files:
- `docker-compose.yml` — compose definition.
- `.env` — override `BACKEND_PORT` and `FRONTEND_PORT`.

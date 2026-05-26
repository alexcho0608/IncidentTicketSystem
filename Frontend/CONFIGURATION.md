# Frontend Configuration

The Angular frontend application loads its configuration from `src/assets/config.json` at startup.

## Configuration File

The `config.json` file contains the API base URL:

```json
{
  "apiBaseUrl": "http://localhost:5000"
}
```

### Environment-Specific Settings

**Development** (with `ng serve`):
- Keep `config.json` empty (`apiBaseUrl: ""`) to use relative URLs with proxy
- The `proxy.conf.json` handles proxying `/api/*` requests to the backend
- Backend should be running at `http://localhost:5197` (configured in `proxy.conf.json`)

**Docker/Production**:
- `config.json` is set to `apiBaseUrl: "http://localhost:5000"` (matches `BACKEND_PORT` in `.env`)
- The `docker-compose.yml` mounts this config into the container
- Frontend can access backend via the mapped port on the host machine

## How It Works

1. **ConfigService** (`src/app/services/config.service.ts`)
   - Loads configuration from `/assets/config.json` at app startup
   - Uses `APP_INITIALIZER` to ensure config is loaded before services run

2. **IncidentService** (`src/app/services/incident.service.ts`)
   - Uses `ConfigService` to get the API base URL
   - Constructs full API endpoint: `${apiBaseUrl}/api/incidents`

## Customizing the API URL

Edit `src/assets/config.json` to change the backend URL:

```json
{
  "apiBaseUrl": "https://api.example.com"
}
```

## Running

```bash
# Development with ng serve (uses proxy)
ng serve

# Docker Compose (uses config.json mounted into container)
docker compose up --build
```


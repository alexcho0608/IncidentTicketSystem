# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies early for better caching
COPY package.json package-lock.json* ./
RUN npm install

# Copy source and build app
COPY . .
RUN npm run build -- --configuration production

# Production stage
FROM nginx:stable-alpine AS runtime
COPY --from=build /app/dist/ticket-system-frontend/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# === ----------- Stage 1: Frontend | Build  ---------- === #
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar pnpm
RUN corepack enable

# Copiar Dependencies (Dependencias)
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

# Copy Code 
COPY . .

# build Vite
RUN pnpm build

## === ----- Stage 2: Runtime ----- === ##
FROM nginx:alpine

# copiar build generado
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
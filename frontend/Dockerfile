# === ----------- Stage 1: Frontend | Build  ---------- === #
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar pnpm (lo usas según tu lock file)
RUN npm install -g pnpm

# Copiar Dependencies (Dependencias)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy Code 
COPY . .

# build Vite
RUN pnpm build


## === ----- Stage 2: Runtime (Nginx sirve el build) ----- === ##
FROM nginx:alpine

# copiar build generado
COPY --from=builder /app/dist /usr/share/nginx/html

# Config de Nginx para SPA (React Router)
COPY nginx-spa.conf /etc/nginx/conf.d/default.conf

# Port (Only Nginx)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
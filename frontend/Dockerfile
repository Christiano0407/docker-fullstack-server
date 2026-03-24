# === ----------------------- Stage 1: Frontend | Build  ----------------------------- === #
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

## === -------------------------- Stage 2: Runtime --------------------------- === ##
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx-spa.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
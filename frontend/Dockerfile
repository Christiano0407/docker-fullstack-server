# === ----------------------- Stage 1: Frontend | Build  ----------------------------- === #
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar pnpm
RUN corepack enable

# Copiar Dependencies (Dependencias)
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

# Copy Code 
COPY . .

# Build args para variables VITE
ARG VITE_API_URL=/api/v1
ARG VITE_ENVIRONMENT=production

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_ENVIRONMENT=$VITE_ENVIRONMENT

# build Vite
RUN pnpm build

## === -------------------------- Stage 2: Runtime --------------------------- === ##
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx-spa.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
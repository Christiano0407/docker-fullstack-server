# === Stage 1: Backend | Builder === #
FROM python:3.12-slim AS builder

WORKDIR /app

# Instalar UV
RUN pip install uv 

# Copiar metadata del proyecto 
COPY pyproject.toml uv.lock ./

# Crear ENV e Instalar Deps
RUN uv sync

# Copy code 
COPY . .

## === Stage 2: Backend | Runtime === ##
FROM python:3.12-slim

WORKDIR /app

# === Copiar Entorno desde Builder 
COPY --from=builder /app /app

# PORT | Expose
EXPOSE 5000

# Execute FastAPI
CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]
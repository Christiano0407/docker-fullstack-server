# === Stage 1: Backend | Builder === #
FROM python:3.12-slim AS builder

WORKDIR /app

# instalar uv
RUN pip install uv

# copiar metadata
COPY pyproject.toml uv.lock ./

# instalar deps (crea .venv)
RUN uv sync --no-dev

# copiar código
COPY . .

## ===== Stage 2: Runtime =====
FROM python:3.12-slim

WORKDIR /app

# copiar app y venv
COPY --from=builder /app /app

# usar el entorno virtual
ENV PATH="/app/.venv/bin:$PATH"

EXPOSE 5000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]
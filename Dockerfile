FROM python:3.12-slim
WORKDIR /app
COPY pyproject.toml README.md requirements.txt ./
COPY neuro_ml ./neuro_ml
RUN pip install --no-cache-dir .
CMD ["python", "-m", "neuro_ml", "--help"]

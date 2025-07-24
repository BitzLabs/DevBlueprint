# MkDocs + Material for MkDocs 開発環境
FROM python:3.11-slim

# 作業ディレクトリを設定
WORKDIR /docs

# システムの依存関係をインストール
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Pythonの依存関係をインストール
COPY Docker/mkdocs/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ポート8000を公開
EXPOSE 8000

# MkDocsサーバーを起動（デフォルトコマンド）
CMD ["mkdocs", "serve", "--dev-addr=0.0.0.0:8000", "--site-dir=Docker/mkdocs/site"]

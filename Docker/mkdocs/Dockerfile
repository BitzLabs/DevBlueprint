# MkDocs + Material for MkDocs 開発環境
FROM python:3.11-slim

# 作業ディレクトリを設定
WORKDIR /docs


# システムの依存関係をインストール
RUN apt-get update && apt-get install -y \
    git \
    curl \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# 非ルートユーザー(vscode)を作成し、sudo権限を付与
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && echo "$USERNAME ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME


# Pythonの依存関係をインストール
COPY Docker/mkdocs/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


# ポート8000を公開
EXPOSE 8000

# ユーザーを切り替え、デフォルトコマンドを設定
USER $USERNAME
CMD ["mkdocs", "serve", "--dev-addr=0.0.0.0:8000"]

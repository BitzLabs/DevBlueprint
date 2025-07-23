# Docker 環境構成

このディレクトリには、DevBlueprintプロジェクトのDocker環境設定が含まれています。

## ディレクトリ構成

```text
Docker/
├── docker-compose.yml          # 統合Docker Compose設定
├── manage.sh                   # 管理スクリプト (WSL2/Linux用)
├── mkdocs/                     # MkDocsドキュメント環境
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── requirements.txt
├── api/                        # APIサーバー環境 (今後実装)
│   ├── Dockerfile
│   └── docker-compose.yml
└── database/                   # データベース環境 (今後実装)
    └── docker-compose.yml
```

## 使用方法

### 1. MkDocsドキュメント環境

```bash
# 個別起動
cd Docker/mkdocs
docker compose up -d

# 統合起動
cd Docker
docker compose up mkdocs -d

# 管理スクリプト使用 (WSL2推奨)
./manage.sh mkdocs up
```

### 2. 全サービス統合管理

```bash
# 全サービス起動
cd Docker
docker compose up -d

# 特定サービスのみ
docker compose up mkdocs -d

# サービス停止
docker compose down
```

### 3. 管理スクリプト

WSL2環境では管理スクリプトが便利です：

```bash
# 実行権限付与
chmod +x Docker/manage.sh

# MkDocs起動
./Docker/manage.sh mkdocs up

# ログ確認
./Docker/manage.sh mkdocs logs

# 停止
./Docker/manage.sh mkdocs down
```

## 環境別設定

### MkDocs環境

- **ポート**: 8000
- **URL**: <http://localhost:8000/DevBlueprint/>
- **ライブリロード**: 有効
- **自動ビルド**: ファイル変更時

### 今後の拡張予定

- APIサーバー (Node.js/Express)
- PostgreSQLデータベース
- Nginxリバースプロキシ
- Redis (キャッシュ/セッション)

## トラブルシューティング

### ポート競合

```bash
# 使用中ポートの確認
netstat -an | findstr :8000  # Windows
ss -tulpn | grep :8000       # WSL2/Linux
```

### コンテナ状態確認

```bash
docker ps                    # 実行中コンテナ
docker compose ps           # プロジェクトコンテナ
docker compose logs mkdocs  # サービスログ
```

### 強制再ビルド

```bash
docker compose build --no-cache mkdocs
docker compose up --force-recreate mkdocs
```

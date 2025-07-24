# Docker 環境構成

このディレクトリには、DevBlueprintプロジェクトのDocker環境設定が含まれています。

## ディレクトリ構成

```text
Docker/
├── docker-compose.yml          # 統合Docker Compose設定
├── mkdocs/                     # MkDocsドキュメント環境
│   ├── Dockerfile
│   └── requirements.txt
├── api/                        # APIサーバー環境 (今後実装)
│   └── Dockerfile
└── database/                   # データベース環境 (今後実装)
    └── docker-compose.yml
```

## 使用方法

### 1. MkDocsドキュメント環境

```bash
# 統合起動 (推奨)
cd Docker
docker compose up mkdocs -d

# 停止
docker compose down
```

### 2. WSL2環境での管理

WSL2環境では、プロジェクトルートの `Scripts/mkdocs.sh` スクリプトが便利です：

```bash
# MkDocs起動
bash Scripts/mkdocs.sh up

# ログ確認
bash Scripts/mkdocs.sh logs

# 停止
bash Scripts/mkdocs.sh down
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

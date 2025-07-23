# 06. Dockerフォルダ

`Docker/`フォルダは、プロジェクトで使用するDockerコンテナ関連のファイルを整理して格納するフォルダです。プロジェクトの拡張性を考慮し、複数のサービスに対応できる構成になっています。

---

## フォルダ構成

```text
Docker/
├── docker-compose.yml      # 統合Docker Compose設定
├── manage.sh               # Docker管理用スクリプト
├── README.md              # Docker環境の説明
└── mkdocs/                # MkDocs専用設定
    ├── docker-compose.yml # MkDocs用Docker Compose
    ├── Dockerfile         # MkDocs用Dockerfile
    ├── requirements.txt   # Python依存関係
    └── site/             # 生成されたサイト（.gitignore済み）
```

---

## 各ファイルの役割

### `docker-compose.yml`

プロジェクト全体の統合Docker Compose設定ファイルです。将来的に複数のサービス（データベース、API、フロントエンドなど）を追加する場合、このファイルで管理します。

現在は以下のサービスを定義しています：

- `mkdocs`: ドキュメント生成・配信サービス

### `manage.sh`

Docker環境を簡単に管理するためのBashスクリプトです。以下のような操作を提供します：

```bash
# 使用例
./Docker/manage.sh mkdocs up      # MkDocsサーバーを起動
./Docker/manage.sh mkdocs down    # MkDocsサーバーを停止
./Docker/manage.sh mkdocs restart # MkDocsサーバーを再起動
./Docker/manage.sh mkdocs logs    # ログを表示
```

### `README.md`

Docker環境の詳細な説明と使用方法を記載したドキュメントです。

### `mkdocs/` サブフォルダ

MkDocsに特化したDocker設定を格納するサブフォルダです。

#### `Dockerfile`

MkDocs実行環境を構築するためのDockerfileです。以下の要素を含みます：

- Python 3.11-slim ベースイメージ
- 必要なシステム依存関係（git, curlなど）
- Python依存関係のインストール
- MkDocsサーバーの起動設定

#### `docker-compose.yml`

MkDocs専用のDocker Compose設定ファイルです。開発時の利便性を考慮した設定が含まれています：

- ボリュームマウント（ドキュメントソースとサイト出力）
- ポートマッピング（8000番ポート）
- ネットワーク設定

#### `requirements.txt`

MkDocsとその関連プラグインのPython依存関係を定義したファイルです。以下のパッケージが含まれています：

- `mkdocs`: 静的サイトジェネレータ
- `mkdocs-material`: Material Design テーマ
- 各種プラグイン（awesome-pages, minify, mermaid2など）

#### `site/`

MkDocsによって生成されるサイトの出力先フォルダです。`.gitignore`で追跡対象外に設定されており、コンテナ実行時に自動生成されます。

---

## 使用方法

### 基本的な使い方

1. **MkDocsサーバーの起動**

   ```bash
   ./Docker/manage.sh mkdocs up
   ```

2. **ブラウザでアクセス**

   ```text
   http://localhost:8000/DevBlueprint/
   ```

3. **サーバーの停止**

   ```bash
   ./Docker/manage.sh mkdocs down
   ```

### 開発時の活用

- **ライブリロード**: ドキュメントファイルを編集すると、自動的にサイトが更新されます
- **ログ確認**: `./Docker/manage.sh mkdocs logs` でコンテナのログを確認できます
- **環境の再構築**: `docker-compose up --build` でイメージを再ビルドできます

---

## 設計原則

### 1. 拡張性の確保

`Docker/`フォルダ構成は、将来的な拡張を考慮して設計されています：

- サービスごとのサブフォルダ（`mkdocs/`, 将来的に`api/`, `database/`など）
- 統合Docker Compose設定による複数サービスの管理
- 共通の管理スクリプトによる操作の統一

### 2. 開発効率の向上

- 管理スクリプト（`manage.sh`）による簡単な操作
- ライブリロード対応による開発体験の向上
- 明確な責任分離による保守性の確保

### 3. 環境の一貫性

- Dockerコンテナによる環境の統一
- 依存関係の明示的な管理
- クロスプラットフォーム対応

---

## 注意事項

- `site/`フォルダは`.gitignore`で除外されており、Gitで追跡されません
- Python依存関係を変更した場合は、Dockerイメージの再ビルドが必要です
- WSL2環境では、Docker CEを使用することを推奨します（ライセンスの問題を回避）

---

## 関連ドキュメント

- **[MkDocs開発環境セットアップガイド](../00_セットアップガイド/08_MkDocs開発環境セットアップ.md)**: Docker環境の詳細なセットアップ手順
- **[Docker環境README](../../../Docker/README.md)**: 実際のDocker設定ファイルの説明

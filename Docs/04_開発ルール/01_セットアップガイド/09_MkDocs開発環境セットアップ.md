# MkDocs開発環境セットアップガイド

このガイドでは、構築済みのDocker環境を利用してMkDocs開発環境をセットアップし、ドキュメントサイトのライブプレビューを行う手順を説明します。

## 📋 前提条件

以下のセットアップが完了していることを確認してください：

- **[08_Docker環境セットアップ](./08_Docker環境セットアップ.md)** の完了
- WSL2上でDockerが正常に動作している
- VS CodeでDev Containersが利用可能

## 🚀 MkDocs環境の起動

### 方法1: Dev Container を使用（推奨）

#### 1. WSL内でプロジェクトを開く

```bash
# WSL2内でプロジェクトディレクトリに移動
cd /mnt/c/Work/DevBlueprint

# VS Codeを起動
code .
```

#### 2. Dev Containerで開く

1. VS Code右下に表示される「**Reopen in Container**」の通知をクリック
2. または、コマンドパレット（`Ctrl+Shift+P`）から `Dev Containers: Reopen in Container` を実行
3. 初回実行時は、Dockerイメージのビルドが行われます（数分かかる場合があります）

#### 3. MkDocsサーバーの起動

Dev Container内のターミナルで：

```bash
# MkDocsサーバーを起動
mkdocs serve --dev-addr=0.0.0.0:8000
```

ブラウザで `http://localhost:8000` にアクセスして、ドキュメントサイトが表示されることを確認してください。

### 方法2: VS Codeタスクを使用

#### 1. MkDocsサーバーの起動

1. `Ctrl+Shift+P` でコマンドパレットを開く
2. `Tasks: Run Task` を選択
3. `mkdocs:start` タスクを実行

これにより、WSL内でMkDocsコンテナが起動し、`http://localhost:8000` でサイトにアクセスできます。

#### 2. その他の利用可能なタスク

- `mkdocs:stop` - MkDocsサーバーを停止
- `mkdocs:restart` - MkDocsサーバーを再起動
- `mkdocs:logs` - ログを表示
- `mkdocs:build` - 静的サイトをビルド

### 方法3: スクリプトを直接使用

WSL2内で、管理スクリプトを直接実行：

```bash
# プロジェクトルートに移動
cd /mnt/c/Work/DevBlueprint

# MkDocsコンテナを起動
bash Scripts/mkdocs.sh up

# サーバーの停止
bash Scripts/mkdocs.sh down

# ログの確認
bash Scripts/mkdocs.sh logs
```

## 🛠️ 利用可能なコマンド

### mkdocs.sh スクリプトのコマンド

```bash
./Scripts/mkdocs.sh [command]

# 利用可能なコマンド:
build     - Dockerイメージをビルド
up        - MkDocsサーバーを起動
down      - MkDocsサーバーを停止
restart   - MkDocsサーバーを再起動
logs      - ログを表示
shell     - コンテナ内でシェルを起動
clean     - 生成されたサイトファイルを削除
install   - 依存関係を再インストール
help      - ヘルプを表示
```

### 直接のDocker Composeコマンド

```bash
# Docker/docker-compose.yml を使用
cd /mnt/c/Work/DevBlueprint

# バックグラウンドで起動
docker compose -f Docker/docker-compose.yml up -d

# 停止
docker compose -f Docker/docker-compose.yml down

# ログをフォロー
docker compose -f Docker/docker-compose.yml logs -f
```

## 📁 ファイル構成と設定

### プロジェクト構成

```text
DevBlueprint/
├── .devcontainer/
│   ├── devcontainer.json          # Dev Container設定
│   └── README.md                  # Dev Container環境の説明
├── .vscode/
│   ├── tasks.json                 # VS Codeタスク定義
│   └── settings.json              # ワークスペース設定
├── Docker/
│   ├── docker-compose.yml         # Docker Compose設定
│   └── mkdocs/
│       ├── Dockerfile             # MkDocs用Dockerfile
│       ├── requirements.txt       # Python依存関係
│       └── site/                  # 生成されたサイト（.gitignore済み）
├── Docs/                          # ドキュメントソース
├── Scripts/
│   └── mkdocs.sh                  # MkDocs管理スクリプト
└── mkdocs.yml                     # MkDocs設定
```

### 重要な設定ファイル

#### mkdocs.yml

```yaml
site_name: DevBlueprint
site_url: https://bitzlabs.github.io/DevBlueprint/
docs_dir: Docs
site_dir: Docker/mkdocs/site

theme:
  name: material
  language: ja

plugins:
  - search:
      lang: ja
  - mermaid2

markdown_extensions:
  - admonition
  - codehilite
  - toc:
      permalink: true
```

#### Docker/mkdocs/requirements.txt

```text
mkdocs>=1.5.0
mkdocs-material>=9.4.0
mkdocs-mermaid2-plugin>=1.1.0
```

## 🔧 開発ワークフロー

### 1. ドキュメント編集のワークフロー

1. **Dev Containerでプロジェクトを開く**
2. **MkDocsサーバーを起動**（ライブリロード有効）
3. **`Docs/` フォルダ内のMarkdownファイルを編集**
4. **ブラウザで自動更新されることを確認**
5. **変更をコミット・プッシュ**

### 2. ライブリロード機能

MkDocsサーバーは、以下のファイル変更を自動検出し、ブラウザを自動更新します：

- `Docs/` フォルダ内の `.md` ファイル
- `mkdocs.yml` 設定ファイル
- テーマやプラグインの設定

### 3. サイトのビルドとプレビュー

```bash
# 本番用サイトをビルド
bash Scripts/mkdocs.sh build

# 生成されたサイトの確認
ls -la Docker/mkdocs/site/
```

## 🎨 カスタマイズとプラグイン

### 新しいプラグインの追加

1. **`Docker/requirements.txt` にプラグインを追加**:

   ```text
   mkdocs-awesome-pages-plugin>=2.8.0
   ```

2. **`mkdocs.yml` でプラグインを有効化**:

   ```yaml
   plugins:
     - awesome-pages
   ```

3. **コンテナを再ビルド**:

   ```bash
   bash Scripts/mkdocs.sh build
   bash Scripts/mkdocs.sh restart
   ```

### テーマのカスタマイズ

```yaml
# mkdocs.yml
theme:
  name: material
  custom_dir: Docs/overrides
  palette:
    - scheme: default
      primary: indigo
      accent: indigo
```

## 🔧 トラブルシューティング

### MkDocs関連の問題

#### サーバーが起動しない

```bash
# Dockerコンテナの状態確認
docker ps -a

# MkDocsコンテナのログ確認
docker compose -f Docker/docker-compose.yml logs mkdocs

# ポート競合の確認
sudo lsof -i :8000
```

#### サイトが更新されない

```bash
# MkDocsサーバーを再起動
bash Scripts/mkdocs.sh restart

# ブラウザのキャッシュをクリア（Ctrl+Shift+R）

# 生成済みサイトをクリア
bash Scripts/mkdocs.sh clean
```

#### 依存関係のエラー

```bash
# 依存関係を再インストール
bash Scripts/mkdocs.sh install

# またはコンテナを再ビルド
docker compose -f Docker/docker-compose.yml build --no-cache
```

### Dev Container関連の問題

#### コンテナがビルドできない

1. **Dockerが正常に動作しているか確認**:

   ```bash
   docker info
   ```

2. **Docker Composeファイルの構文確認**:

   ```bash
   docker compose -f Docker/docker-compose.yml config
   ```

3. **キャッシュをクリアして再ビルド**:

   ```bash
   docker system prune -a
   ```

#### VS CodeでDev Containerが開けない

1. **VS Codeの出力パネルを確認**（`Ctrl+Shift+U`）
2. **「Dev Containers」を選択してエラーログを確認**
3. **WSL内からVS Codeを起動**:

   ```bash
   cd /mnt/c/Work/DevBlueprint
   code .
   ```

### ポート競合の解決

#### Windows側でポート8000を使用している場合

```powershell
# Windows側でポート8000を使用しているプロセスを確認
netstat -ano | findstr :8000

# プロセスを終了（PIDを指定）
taskkill /PID <PID> /F
```

#### WSL側でポート8000を使用している場合

```bash
# WSL内でポート8000を使用しているプロセスを確認
sudo lsof -i :8000

# プロセスを終了
sudo kill -9 <PID>
```

## 📚 参考資料

- [MkDocs公式ドキュメント](https://www.mkdocs.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [MkDocsプラグイン一覧](https://github.com/mkdocs/mkdocs/wiki/MkDocs-Plugins)
- [Mermaid記法](https://mermaid-js.github.io/mermaid/)

## 次のステップ

MkDocs開発環境のセットアップが完了したら、以下を参照してプロジェクトの理解を深めてください：

- **[04.開発ルール/04.ドキュメント規定](../04_ドキュメント規定/README.md)** - ドキュメント作成のルールとガイドライン
- **[00.はじめに/02.ドキュメント作成ガイド](../../00_はじめに/02_ドキュメント作成ガイド/README.md)** - ドキュメント作成のベストプラクティス

問題が発生した場合は、**[07.トラブルシューティング.md](./07_トラブルシューティング.md)** も参照してください。

# MkDocs開発環境セットアップガイド

このガイドでは、WSL2とDockerを使用してMkDocsのリモート開発環境を構築する手順を説明します。

## 📋 前提条件

- Windows 10/11 (WSL2対応版)
- Visual Studio Code
- インターネット接続

## 🚀 セットアップ手順

### 1. WSL2のセットアップ

```powershell
# WSL2をインストール（管理者権限で実行）
wsl --install

# システムを再起動
```

再起動後、Ubuntuディストリビューションをインストール：

```powershell
# 利用可能なディストリビューションを確認
wsl --list --online

# Ubuntu 24.04（推奨）をインストール
wsl --install -d Ubuntu-24.04
```

### 2. Docker CE のインストール（WSL2内）

**重要**: Docker Desktopではなく、WSL2内に直接Docker CEをインストールします。

```bash
# WSL2（Ubuntu）内で実行
# 古いDockerの削除
sudo apt-get remove docker docker-engine docker.io containerd runc

# 必要なパッケージのインストール
sudo apt-get update
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# DockerのGPGキーを追加
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Dockerリポジトリを追加
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Docker CEのインストール
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Dockerサービスの開始と自動起動設定
sudo systemctl start docker
sudo systemctl enable docker

# 現在のユーザーをdockerグループに追加
sudo usermod -aG docker $USER

# WSLを再起動してグループ変更を反映
exit
```

PowerShellから：

```powershell
wsl --shutdown
wsl -d Ubuntu-24.04
```

### 3. VSCode拡張機能のインストール

このプロジェクトを開いた際に、推奨拡張機能のインストールを促されます：

- Remote - WSL
- Dev Containers
- Docker
- Python
- Markdown関連拡張機能

または手動でインストール：

```bash
# 拡張機能を一括インストール
code --install-extension ms-vscode-remote.remote-wsl
code --install-extension ms-vscode-remote.remote-containers
code --install-extension ms-azuretools.vscode-docker
```

### 4. 開発環境の起動

#### 方法1: Docker管理スクリプトを使用（推奨）

WSL2内で：

```bash
# プロジェクトディレクトリに移動
cd /mnt/c/Work/DevBlueprint

# MkDocsコンテナを起動
./Docker/manage.sh mkdocs up

# ブラウザで http://localhost:8000/DevBlueprint/ にアクセス
```

#### 方法2: Dev Container

1. **WSL2にリモート接続**

   ```bash
   # WSL2内でVSCodeを起動
   cd /mnt/c/Work/DevBlueprint
   code .
   ```

2. **Dev Containerで開く**
   - `Ctrl+Shift+P` → `Dev Containers: Reopen in Container`
   - 自動的にコンテナがビルドされ、MkDocsサーバーが起動

## 🛠️ 使用可能なコマンド

### Docker管理スクリプト（推奨）

```bash
./Docker/manage.sh [service] [command]

# MkDocs関連:
./Docker/manage.sh mkdocs up      # MkDocsサーバーを起動
./Docker/manage.sh mkdocs down    # MkDocsサーバーを停止
./Docker/manage.sh mkdocs restart # MkDocsサーバーを再起動
./Docker/manage.sh mkdocs logs    # ログを表示

# 全サービス:
./Docker/manage.sh all up         # 全サービスを起動
./Docker/manage.sh all down       # 全サービスを停止
```

### 直接のDocker Composeコマンド

```bash
# MkDocs専用のDocker Compose
cd Docker/mkdocs
docker compose up -d              # バックグラウンドで起動
docker compose down               # 停止
docker compose logs -f            # ログをフォロー

# 統合Docker Compose
cd Docker
docker compose up mkdocs -d       # MkDocsサービスのみ起動
docker compose down               # 全サービス停止
```

## 📁 ファイル構成

```text
├── .devcontainer/
│   └── devcontainer.json          # VSCode Dev Container設定
├── .vscode/
│   ├── extensions.json            # 推奨拡張機能
│   ├── settings.json              # ワークスペース設定
│   └── tasks.json                 # VSCodeタスク
├── Docker/                        # Docker関連ファイル
│   ├── docker-compose.yml         # 統合Docker Compose設定
│   ├── manage.sh                  # Docker管理スクリプト
│   ├── README.md                  # Docker環境の説明
│   └── mkdocs/                    # MkDocs専用設定
│       ├── docker-compose.yml     # MkDocs用Docker Compose
│       ├── Dockerfile             # MkDocs用Dockerfile
│       ├── requirements.txt       # Python依存関係
│       └── site/                  # 生成されたサイト（.gitignore済み）
├── Docs/                          # ドキュメントソース
├── mkdocs.yml                     # MkDocs設定
└── .gitignore                     # サイト出力の除外設定
```

## 🔧 トラブルシューティング

### WSL2関連

```powershell
# WSL2の状態確認
wsl --status

# ディストリビューションの確認
wsl --list --verbose

# WSL2をデフォルトに設定
wsl --set-default-version 2

# 特定のディストリビューションをWSL2に変換
wsl --set-version Ubuntu-24.04 2
```

### Docker関連

```bash
# WSL2内でDockerの状態確認
docker info

# コンテナの状態確認
docker ps -a

# イメージの確認
docker images

# Dockerサービスの再起動
sudo systemctl restart docker
```

### Dev Containers関連

**「WSLにDockerをインストールしますか？」と聞かれた場合：**

1. **「いいえ」を選択** - 既にDockerはインストール済み
2. **WSL内からVSCodeを起動**してください：

   ```bash
   cd /mnt/c/Work/DevBlueprint
   code .
   ```

3. その後、Dev Containersを使用

### ポート競合の解決

```bash
# WSL2内でポート8000を使用しているプロセスを確認
sudo lsof -i :8000

# プロセスを終了
sudo kill -9 <PID>
```

```powershell
# Windows側でポート8000を使用しているプロセスを確認
netstat -ano | findstr :8000

# プロセスを終了（PIDを指定）
taskkill /PID <PID> /F
```

### サイトアクセスの問題

- **正しいURL**: `http://localhost:8000/DevBlueprint/`
- **site_dir設定**: `Docker/mkdocs/site` に出力される
- **.gitignore**: `/site/` と `/Docker/mkdocs/site/` が除外設定済み

## 📚 参考資料

- [MkDocs公式ドキュメント](https://www.mkdocs.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [Docker公式ドキュメント](https://docs.docker.com/)
- [WSL2公式ドキュメント](https://docs.microsoft.com/en-us/windows/wsl/)
- [VSCode Remote Development](https://code.visualstudio.com/docs/remote/remote-overview)
- [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)

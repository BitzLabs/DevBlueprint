# Docker環境セットアップガイド

このガイドでは、WSL2上にDockerをインストールし、VS CodeからWSL内のDockerを利用するための環境構築手順を説明します。

## 📋 前提条件

以下のセットアップが完了していることを確認してください：

- Windows 10/11 (WSL2対応版)
- **[01\_開発環境の基本セットアップ](./01_開発環境の基本セットアップ.md)** の完了
- **[02_VSCode拡張機能とワークスペース設定](./02_VSCode拡張機能とワークスペース設定.md)** の完了
- インターネット接続

## 🚀 WSL2環境の準備

### 1. WSL2のインストール（未インストールの場合）

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

### 2. WSL2の設定確認

```powershell
# WSL2の状態確認
wsl --status

# ディストリビューションの確認
wsl --list --verbose

# WSL2をデフォルトに設定
wsl --set-default-version 2

# 特定のディストリビューションをWSL2に変換（必要な場合）
wsl --set-version Ubuntu-24.04 2
```

## 🐳 Docker CE のインストール（WSL2内）

**重要**: Docker Desktopではなく、WSL2内に直接Docker CEをインストールします。これにより、より軽量で高速な環境を構築できます。

### 1. 古いDockerの削除

```bash
# WSL2（Ubuntu）内で実行
sudo apt-get remove docker docker-engine docker.io containerd runc
```

### 2. 必要なパッケージのインストール

```bash
# パッケージリストを更新
sudo apt-get update

# 必要なパッケージをインストール
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

### 3. DockerのGPGキーとリポジトリの追加

```bash
# DockerのGPGキーを追加
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Dockerリポジトリを追加
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 4. Docker CEのインストール

```bash
# パッケージリストを更新
sudo apt-get update

# Docker CEとDocker Composeをインストール
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# インストール確認
docker --version
docker compose version
```

### 5. Dockerサービスの設定

```bash
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

### 6. Docker動作確認

WSL2内で以下のコマンドを実行し、Dockerが正常に動作することを確認：

```bash
# Dockerの状態確認
docker info

# テストコンテナの実行
docker run hello-world

# Docker Composeの動作確認
docker compose version
```

## 🔧 VS CodeとWSL/Dockerの連携設定

### 1. 必要な拡張機能のインストール

VS Codeで以下の拡張機能をインストール（まだの場合）：

```bash
# Remote - WSL
code --install-extension ms-vscode-remote.remote-wsl

# Dev Containers
code --install-extension ms-vscode-remote.remote-containers

# Docker
code --install-extension ms-azuretools.vscode-docker
```

### 2. VS Code設定の調整

VS Codeの `settings.json` に以下の設定を追加：

```json
{
  // Dev Containers がWSL上のDockerを使用するように設定
  "dev.containers.executeInWSL": true,
  "dev.containers.executeInWSLDistro": "Ubuntu-24.04",

  // Docker拡張機能の設定
  "docker.host": "unix:///var/run/docker.sock"
}
```

**注意**: `executeInWSLDistro` の値は、実際にインストールしたWSLディストリビューション名に合わせてください。

### 3. WSLディストリビューション名の確認

```powershell
# インストールされているディストリビューション一覧を確認
wsl -l -v
```

出力例：

```text
  NAME            STATE           VERSION
* Ubuntu-24.04    Running         2
```

この例では、`Ubuntu-24.04` が正しいディストリビューション名です。

## 🛠️ Docker環境の動作確認

### 1. WSL内からVS Codeを起動

```bash
# WSL2内でプロジェクトディレクトリに移動
cd /mnt/c/Work/DevBlueprint

# VS Codeを起動
code .
```

### 2. Dev Containers機能の確認

1. VS Codeでプロジェクトを開いた状態で、右下に「Reopen in Container」の通知が表示されることを確認
2. または、コマンドパレット（`Ctrl+Shift+P`）から `Dev Containers: Reopen in Container` を実行
3. 正常にコンテナがビルドされ、Dev Container環境で開かれることを確認

## 🔧 トラブルシューティング

### Docker関連の問題

#### 「WSLにDockerをインストールしますか？」と表示される場合

**原因**: VS CodeがWSL内のDockerを検出できていない

**解決方法**:

1. **「いいえ」を選択** - 既にDockerはインストール済み

2. VS Codeの設定で `dev.containers.executeInWSL` が `true` に設定されているか確認
3. WSL内からVS Codeを起動：

   ```bash
   cd /mnt/c/Work/DevBlueprint
   code .
   ```

#### Dockerサービスが起動しない

```bash
# Dockerサービスの状態確認
sudo systemctl status docker

# Dockerサービスの再起動
sudo systemctl restart docker

# ログの確認
sudo journalctl -u docker.service
```

#### 権限エラーが発生する

```bash
# 現在のユーザーがdockerグループに追加されているか確認
groups $USER

# dockerグループが表示されない場合は、再度追加
sudo usermod -aG docker $USER

# WSLを再起動
exit
# PowerShellから: wsl --shutdown
# 再度WSLを起動: wsl -d Ubuntu-24.04
```

### WSL関連の問題

#### WSLの状態確認

```powershell
# WSL2の状態確認
wsl --status

# ディストリビューションの状態確認
wsl --list --verbose

# 特定のディストリビューションを再起動
wsl --terminate Ubuntu-24.04
wsl -d Ubuntu-24.04
```

#### WSLとWindowsのファイルシステム間のパフォーマンス問題

**推奨**: プロジェクトファイルをWSLファイルシステム内に配置することで、パフォーマンスが向上します。

```bash
# WSLホームディレクトリにプロジェクトをクローン
cd ~
git clone https://github.com/BitzLabs/DevBlueprint.git
cd DevBlueprint
code .
```

### VS Code関連の問題

#### Remote - WSL拡張機能が動作しない

1. **拡張機能の再インストール**:

   ```bash
   code --uninstall-extension ms-vscode-remote.remote-wsl
   code --install-extension ms-vscode-remote.remote-wsl
   ```

2. **VS Codeの再起動**

3. **WSLからの直接起動**:

   ```bash
   cd /mnt/c/Work/DevBlueprint
   code .
   ```

## 📚 参考資料（Docker/WSL/VSCode）

- [Docker CE インストールガイド（Ubuntu）](https://docs.docker.com/engine/install/ubuntu/)
- [WSL2 公式ドキュメント](https://docs.microsoft.com/en-us/windows/wsl/)
- [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview)
- [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)

## 次のステップ

Docker環境の構築が完了したら、次はMkDocs開発環境のセットアップに進みます：

→ **[09_MkDocs開発環境セットアップ.md](./09_MkDocs開発環境セットアップ.md)**

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

## 🔧 追加トラブルシューティング

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

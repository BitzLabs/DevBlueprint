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

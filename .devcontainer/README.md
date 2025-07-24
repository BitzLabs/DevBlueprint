# DevBlueprint 開発コンテナ環境

このフォルダには、[Visual Studio Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers) を使用して、プロジェクト用の隔離された開発環境を構築するための設定ファイルが含まれています。

## 概要

この開発コンテナは、プロジェクトのドキュメントサイトを生成するための [MkDocs](https://www.mkdocs.org/) 環境を提供します。Dev Containers を利用することで、ローカルマシンに直接ツールをインストールすることなく、誰でも同じ構成の開発環境を簡単に利用できます。

## 利用方法

1. [Docker Desktop](https://www.docker.com/products/docker-desktop/) または、WSL 上に Docker がインストールされていることを確認してください。
2. Visual Studio Code でこのリポジトリを開きます。
3. VS Code の右下に表示される「Reopen in Container」の通知をクリックします。
   （通知が表示されない場合は、`F1` キーを押してコマンドパレットを開き、
   `Dev Containers: Reopen in Container` を実行してください。）
4. コンテナのビルドが完了すると、VS Code がコンテナ内の環境に接続された状態で再起動します。

## 含まれるツール

この開発コンテナには、以下の主要なツールが含まれています。

- Python
- pip
- MkDocs と関連プラグイン（`Docker/requirements.txt` を参照）
- 基本的なシェルツール

## 環境の拡張方法

この開発環境は、**Dev Container Features** を利用して簡単に拡張できます。
新しいツールやランタイムを追加したい場合は、Dockerfile を直接編集する代わりに、
`.devcontainer/devcontainer.json` ファイルに機能を追加することを推奨します。

例えば、C/C++ のビルドツール（GCC, G++, GDB など）を追加するには、`devcontainer.json` に以下の `features` ブロックを追加します。

```jsonc
"features": {
  "ghcr.io/devcontainers/features/cpp-build-essentials:2": {}
}
```

設定を変更した後は、コマンドパレットから `Dev Containers: Rebuild Container` を実行してコンテナを再構築してください。

利用可能な Feature の一覧は、[公式リポジトリ](https://github.com/devcontainers/features)で確認できます。

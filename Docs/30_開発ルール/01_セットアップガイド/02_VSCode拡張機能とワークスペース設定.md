# 02 VS Code 拡張機能とワークスペース設定

このドキュメントでは、DevBlueprint プロジェクトの開発効率を最大化するための VS Code 拡張機能のインストールとワークスペース設定を行います。

## 1. 必須拡張機能

以下の拡張機能は、プロジェクトでの開発に **必須** です。全てインストールしてください。

### 1.1 コード品質・フォーマット関連

| 拡張機能名                    | Extension ID                     | 用途                                 |
| ----------------------------- | -------------------------------- | ------------------------------------ |
| **Prettier - Code formatter** | `esbenp.prettier-vscode`         | コードの自動フォーマット             |
| **ESLint**                    | `dbaeumer.vscode-eslint`         | JavaScript/TypeScript の構文チェック |
| **markdownlint**              | `davidanson.vscode-markdownlint` | Markdown の文法チェック              |
| **EditorConfig for VS Code**  | `editorconfig.editorconfig`      | エディタ設定の統一                   |

### 1.2 開発支援関連

| 拡張機能名                     | Extension ID                   | 用途                  |
| ------------------------------ | ------------------------------ | --------------------- |
| **Git History**                | `donjayamanne.githistory`      | Git 履歴の可視化      |
| **GitLens — Git supercharged** | `eamodio.gitlens`              | Git の拡張機能        |
| **Thunder Client**             | `rangav.vscode-thunder-client` | API テスト            |
| **REST Client**                | `humao.rest-client`            | HTTP リクエストテスト |

### 1.3 ドキュメント関連

| 拡張機能名                               | Extension ID                                           | 用途                                 |
| ---------------------------------------- | ------------------------------------------------------ | ------------------------------------ |
| **Markdown All in One**                  | `yzhang.markdown-all-in-one`                           | Markdown 編集支援                    |
| **Markdown Preview Enhanced**            | `shd101wyy.markdown-preview-enhanced`                  | Markdown プレビュー機能強化          |
| **Mermaid Markdown Syntax Highlighting** | `bpruitt-goddard.mermaid-markdown-syntax-highlighting` | Mermaid 図表のシンタックスハイライト |

## 2. 推奨拡張機能

以下の拡張機能は必須ではありませんが、開発効率向上のために推奨します。

### 2.1 JavaScript/TypeScript 開発

| 拡張機能名                         | Extension ID                         | 用途                        |
| ---------------------------------- | ------------------------------------ | --------------------------- |
| **JavaScript (ES6) code snippets** | `xabikos.javascriptsnippets`         | JavaScript コードスニペット |
| **TypeScript Hero**                | `rbbit.typescript-hero`              | TypeScript 開発支援         |
| **Auto Rename Tag**                | `formulahendry.auto-rename-tag`      | HTML/XML タグの自動リネーム |
| **Bracket Pair Colorizer 2**       | `coenraads.bracket-pair-colorizer-2` | 括弧の色分け                |

### 2.2 生産性向上

| 拡張機能名                          | Extension ID                         | 用途                      |
| ----------------------------------- | ------------------------------------ | ------------------------- |
| **Path Intellisense**               | `christian-kohler.path-intellisense` | ファイルパスの自動補完    |
| **Auto Import - ES6, TS, JSX, TSX** | `steoates.autoimport`                | インポート文の自動追加    |
| **TODO Highlight**                  | `wayou.vscode-todo-highlight`        | TODO コメントのハイライト |
| **Better Comments**                 | `aaron-bond.better-comments`         | コメントの視認性向上      |

## 3. 拡張機能のインストール方法

### 3.1 VS Code 内からインストール

1. VS Code を起動
2. サイドバーの拡張機能アイコン（四角形のアイコン）をクリック
3. 検索バーに Extension ID を入力
4. 該当する拡張機能の "Install" ボタンをクリック

### 3.2 コマンドラインからインストール

必須拡張機能をまとめてインストールする場合は、以下のコマンドを実行してください：

```bash
# 必須拡張機能
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension davidanson.vscode-markdownlint
code --install-extension editorconfig.editorconfig
code --install-extension donjayamanne.githistory
code --install-extension eamodio.gitlens
code --install-extension rangav.vscode-thunder-client
code --install-extension humao.rest-client
code --install-extension yzhang.markdown-all-in-one
code --install-extension shd101wyy.markdown-preview-enhanced
code --install-extension bpruitt-goddard.mermaid-markdown-syntax-highlighting
```

推奨拡張機能も必要に応じてインストール：

```bash
# 推奨拡張機能
code --install-extension xabikos.javascriptsnippets
code --install-extension rbbit.typescript-hero
code --install-extension formulahendry.auto-rename-tag
code --install-extension coenraads.bracket-pair-colorizer-2
code --install-extension christian-kohler.path-intellisense
code --install-extension steoates.autoimport
code --install-extension wayou.vscode-todo-highlight
code --install-extension aaron-bond.better-comments
```

### 3.3 インストール確認

拡張機能が正しくインストールされているか確認：

```bash
code --list-extensions
```

## 4. ワークスペース設定

### 4.1 settings.json の設定

プロジェクトルートに `.vscode/settings.json` ファイルを作成し、以下の設定を追加します：

```json
{
    // エディタの基本設定
    "editor.fontSize": 14,
    "editor.tabSize": 2,
    "editor.insertSpaces": true,
    "editor.detectIndentation": false,
    "editor.wordWrap": "on",
    "editor.renderWhitespace": "boundary",

    // フォーマット設定
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
        "source.fixAll.markdownlint": true
    },

    // ファイル設定
    "files.eol": "\n",
    "files.encoding": "utf8",
    "files.trimFinalNewlines": true,
    "files.trimTrailingWhitespace": true,
    "files.insertFinalNewline": true,

    // 言語固有の設定
    "[markdown]": {
        "editor.defaultFormatter": "yzhang.markdown-all-in-one",
        "editor.wordWrap": "on",
        "editor.quickSuggestions": {
            "comments": "off",
            "strings": "off",
            "other": "off"
        }
    },

    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },

    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },

    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },

    // Git 設定
    "git.enableSmartCommit": true,
    "git.confirmSync": false,
    "git.autofetch": true,

    // 統合ターミナル設定
    "terminal.integrated.fontSize": 14,
    "terminal.integrated.fontFamily": "Consolas, 'Courier New', monospace",

    // エクスプローラー設定
    "explorer.confirmDelete": false,
    "explorer.confirmDragAndDrop": false,

    // 検索設定
    "search.exclude": {
        "**/node_modules": true,
        "**/dist": true,
        "**/build": true,
        "**/.git": true,
        "**/.DS_Store": true
    },

    // Emmet 設定
    "emmet.includeLanguages": {
        "markdown": "html"
    }
}
```

### 4.2 tasks.json の設定

`.vscode/tasks.json` ファイルを作成し、よく使用するタスクを定義します：

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "npm: install",
            "type": "shell",
            "command": "npm",
            "args": ["install"],
            "group": "build",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "shared"
            },
            "problemMatcher": []
        },
        {
            "label": "lint: all",
            "type": "shell",
            "command": "npm",
            "args": ["run", "lint"],
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "shared"
            },
            "problemMatcher": ["$eslint-stylish"]
        },
        {
            "label": "format: all",
            "type": "shell",
            "command": "npm",
            "args": ["run", "format"],
            "group": "build",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "shared"
            },
            "problemMatcher": []
        },
        {
            "label": "docs: serve",
            "type": "shell",
            "command": "mkdocs",
            "args": ["serve"],
            "group": "build",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "shared"
            },
            "problemMatcher": []
        }
    ]
}
```

### 4.3 launch.json の設定（デバッグ設定）

`.vscode/launch.json` ファイルでデバッグ設定を行います：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Node.js: Current File",
            "type": "node",
            "request": "launch",
            "program": "${file}",
            "console": "integratedTerminal",
            "skipFiles": ["<node_internals>/**"]
        },
        {
            "name": "Jest: Current File",
            "type": "node",
            "request": "launch",
            "program": "${workspaceFolder}/node_modules/.bin/jest",
            "args": ["${relativeFile}"],
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "disableOptimisticBPs": true,
            "windows": {
                "program": "${workspaceFolder}/node_modules/jest/bin/jest"
            }
        }
    ]
}
```

### 4.4 extensions.json の設定

`.vscode/extensions.json` ファイルで推奨拡張機能を定義します：

```json
{
    "recommendations": [
        "esbenp.prettier-vscode",
        "dbaeumer.vscode-eslint",
        "davidanson.vscode-markdownlint",
        "editorconfig.editorconfig",
        "donjayamanne.githistory",
        "eamodio.gitlens",
        "yzhang.markdown-all-in-one",
        "shd101wyy.markdown-preview-enhanced",
        "bpruitt-goddard.mermaid-markdown-syntax-highlighting",
        "rangav.vscode-thunder-client",
        "humao.rest-client"
    ]
}
```

## 5. 設定の確認

### 5.1 フォーマッターの動作確認

1. JavaScript ファイルを作成し、わざと不適切なフォーマットで記述
2. `Ctrl+S` で保存
3. Prettier により自動的にフォーマットされることを確認

### 5.2 リンターの動作確認

1. JavaScript ファイルでわざと構文エラーを記述
2. 問題パネル（`Ctrl+Shift+M`）にエラーが表示されることを確認
3. Markdown ファイルで文法エラーを記述し、同様に確認

### 5.3 タスクの動作確認

1. `Ctrl+Shift+P` でコマンドパレットを開く
2. "Tasks: Run Task" を選択
3. 定義したタスクが表示されることを確認

## 6. トラブルシューティング

### よくある問題と解決方法

#### 拡張機能が正しく動作しない

1. VS Code を再起動
2. 拡張機能を一度無効にしてから再度有効化
3. 設定ファイルの構文エラーを確認

#### フォーマッターが動作しない

1. `.prettierrc` ファイルが正しく配置されているか確認
2. settings.json で正しいフォーマッターが設定されているか確認
3. 競合する他のフォーマッター拡張機能がないか確認

#### リンターのエラーが表示されない

1. ESLint 拡張機能が有効化されているか確認
2. `.eslintrc` ファイルが正しく配置されているか確認
3. 出力パネルで ESLint のログを確認

## 次のステップ

VS Code の設定が完了したら、次はフォーマッターの詳細設定を行います：

→ **[03\_フォーマッター設定.md](./03_フォーマッター設定.md)**

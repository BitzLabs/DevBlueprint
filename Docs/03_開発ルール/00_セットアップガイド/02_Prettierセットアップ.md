# Prettier セットアップガイド

## 概要

このプロジェクトではPrettierを使用してコードの一貫したフォーマットを行います。

## セットアップ手順

### 1. Node.js と npm の確認

```powershell
node --version
npm --version
```

### 2. 依存関係のインストール

```powershell
npm install
```

### 3. 推奨拡張機能のインストール

VS Codeで以下の拡張機能をインストールしてください：

- **Prettier - Code formatter** (`esbenp.prettier-vscode`)
- **markdownlint** (`davidanson.vscode-markdownlint`)
- **YAML** (`redhat.vscode-yaml`)

または、VS Codeで推奨拡張機能の通知が表示された場合は「Install All」をクリックしてください。

### 4. VS Code設定の確認

`.vscode/settings.json`で以下が設定されています：

- 保存時の自動フォーマット有効
- ファイル形式別のフォーマット設定
- 末尾空白の自動削除

## 使用方法

### コマンドラインでのフォーマット

```powershell
# 全ファイルのフォーマット
npm run format

# フォーマットのチェックのみ
npm run format:check

# Markdownファイルのlint
npm run lint:markdown

# YAMLファイルのlint
npm run lint:yaml
```

### VS Codeでのフォーマット

- **Ctrl+S** (保存時): 自動フォーマット
- **Shift+Alt+F**: 手動フォーマット
- **Ctrl+Shift+P** → "Format Document": 手動フォーマット

## 設定ファイル

| ファイル             | 説明                   |
| -------------------- | ---------------------- |
| `.prettierrc.json`   | Prettierの設定         |
| `.prettierignore`    | Prettierの除外ファイル |
| `.markdownlint.json` | Markdownlintの設定     |
| `.yamllint.yml`      | YAMLlintの設定         |

## トラブルシューティング

### フォーマットが効かない場合

1. Prettier拡張機能がインストールされているか確認
2. VS Codeの設定で`editor.formatOnSave`が`true`になっているか確認
3. ファイルがPrettierの対象外（`.prettierignore`）になっていないか確認

### CIでフォーマットエラーが発生する場合

```powershell
# ローカルでフォーマットを実行
npm run format

# 変更をコミット
git add -A
git commit -m "feat: apply prettier formatting"
```

## 設定のカスタマイズ

`.prettierrc.json`を編集することで、フォーマット設定を変更できます：

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

設定変更後は`npm run format`でプロジェクト全体に適用してください。

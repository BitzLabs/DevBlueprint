# Scripts Directory

このディレクトリには、プロジェクトで使用する各種スクリプトが含まれています。

## ファイル構成

```text
Scripts/
├── README.md                 # このファイル
├── .eslintrc.js             # Scripts用ESLint設定
├── create-labels.js         # GitHubラベル作成スクリプト
├── lint-all.js             # 全リンター実行スクリプト
├── lint-css.js             # CSS/SCSSリンタースクリプト
├── lint-js.js              # JavaScript/TypeScriptリンタースクリプト
├── lint-json.js            # JSONリンタースクリプト
├── lint-md.js              # Markdownリンタースクリプト
├── lint-yaml.js            # YAMLリンタースクリプト
├── Templates/              # 各種テンプレートファイル
└── utils/
    └── file-finder.js      # ファイル検索ユーティリティ
```

## リンタースクリプト

### 個別実行

各リンターは個別に実行できます：

```bash
# JavaScript/TypeScript
node Scripts/lint-js.js

# CSS/SCSS
node Scripts/lint-css.js

# Markdown
node Scripts/lint-md.js

# YAML
node Scripts/lint-yaml.js

# JSON
node Scripts/lint-json.js
```

### 一括実行

全てのリンターを一括で実行：

```bash
node Scripts/lint-all.js
```

または npm script 経由：

```bash
npm run lint
```

## 特徴

- **ファイル検索の最適化**: 対象ファイルが存在しない場合はスキップ
- **エラーハンドリング**: 適切なエラーメッセージと終了コード
- **進行状況表示**: 絵文字を使った分かりやすい進行状況
- **自動修正**: 可能な場合は自動でコード修正を実行

## 拡張方法

新しいリンターを追加する場合：

1. `lint-[type].js` ファイルを作成
2. `utils/file-finder.js` を使用してファイル検索を実装
3. `lint-all.js` に新しいリンターを追加
4. `package.json` の scripts に追加

## ユーティリティ

### file-finder.js

ファイル検索とフィルタリングのためのユーティリティ関数を提供：

- `findFiles(dir, extensions, ignorePatterns)`: 指定された拡張子のファイルを再帰検索
- `hasFiles(rootDir, extensions, ignorePatterns)`: ファイルの存在確認

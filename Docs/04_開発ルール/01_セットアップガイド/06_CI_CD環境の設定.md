# 06 CI/CD 環境の設定

このドキュメントでは、継続的インテグレーション（CI）と継続的デプロイメント（CD）のための自動化環境の設定について説明します。

## 1. CI/CD の概要

### 1.1 CI/CD とは

**継続的インテグレーション (CI)**

- コードの変更を頻繁にメインブランチに統合
- 自動テスト・ビルド・品質チェックの実行
- 問題の早期発見と修正

**継続的デプロイメント (CD)**

- テスト済みコードの自動デプロイ
- 本番環境への安全で迅速な配信
- リリースプロセスの標準化

### 1.2 使用するツール

| ツール             | 用途                         | 設定ファイル              |
| ------------------ | ---------------------------- | ------------------------- |
| **GitHub Actions** | CI/CD パイプライン           | `.github/workflows/*.yml` |
| **Husky**          | Git hooks管理                | `.husky/*`                |
| **lint-staged**    | ステージされたファイルの処理 | `package.json`            |

## 2. GitHub Actions の設定

### 2.1 ワークフローの基本構造

GitHub Actions のワークフローは `.github/workflows/` ディレクトリ内の YAML ファイルで定義します。

### 2.2 コード品質チェックワークフロー

`.github/workflows/quality-check.yml` を作成：

```yaml
name: Code Quality Check

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality-check:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint:all

      - name: Check code formatting
        run: npm run format:check

      - name: Run tests
        run: npm run test:ci

      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          fail_ci_if_error: true
```

### 2.3 ドキュメントデプロイワークフロー

`.github/workflows/deploy-docs.yml` を作成：

```yaml
name: Deploy Documentation

on:
  push:
    branches: [main]
    paths: ['Docs/**']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: |
          pip install mkdocs-material
          pip install mkdocs-git-revision-date-localized-plugin
          pip install mkdocs-mermaid2-plugin

      - name: Build documentation
        run: mkdocs build --strict

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './site'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 2.4 セキュリティチェックワークフロー

`.github/workflows/security-check.yml` を作成：

```yaml
name: Security Check

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * 1' # 毎週月曜日 2:00 AM

jobs:
  security:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.x'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run security audit
        run: npm audit --audit-level=moderate

      - name: Run CodeQL Analysis
        uses: github/codeql-action/analyze@v3
        with:
          languages: javascript

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
```

### 2.5 リリースワークフロー

`.github/workflows/release.yml` を作成：

```yaml
name: Release

on:
  push:
    tags: ['v*']

jobs:
  release:
    runs-on: ubuntu-latest

    permissions:
      contents: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.x'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:ci

      - name: Build project
        run: npm run build

      - name: Generate changelog
        id: changelog
        run: |
          # CHANGELOG.md から最新バージョンの内容を抽出
          VERSION=${GITHUB_REF#refs/tags/}
          echo "version=$VERSION" >> $GITHUB_OUTPUT

      - name: Create GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ steps.changelog.outputs.version }}
          draft: false
          prerelease: false
```

## 3. Husky の設定（Git Hooks）

### 3.1 Husky のインストール

```bash
# Husky をインストール
npm install --save-dev husky

# Husky を初期化
npx husky install

# package.json に prepare スクリプトを追加
npm pkg set scripts.prepare="husky install"
```

### 3.2 pre-commit フックの設定

コミット前に品質チェックを実行：

```bash
# pre-commit フックを作成
npx husky add .husky/pre-commit "npm run precommit"
```

`.husky/pre-commit` ファイルの内容：

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# staged ファイルに対してリントとフォーマットを実行
npx lint-staged
```

### 3.3 commit-msg フックの設定

コミットメッセージの形式をチェック：

```bash
# commit-msg フックを作成
npx husky add .husky/commit-msg "npx commitlint --edit \$1"
```

### 3.4 pre-push フックの設定

プッシュ前にテストを実行：

```bash
# pre-push フックを作成
npx husky add .husky/pre-push "npm test"
```

`.husky/pre-push` ファイルの内容：

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🧪 Running tests before push..."
npm run test:ci

echo "🔍 Running security audit..."
npm audit --audit-level=moderate
```

## 4. lint-staged の設定

### 4.1 パッケージのインストール

```bash
npm install --save-dev lint-staged
```

### 4.2 設定の追加

`package.json` に lint-staged の設定を追加：

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,scss,less}": ["stylelint --fix", "prettier --write"],
    "*.{json,yaml,yml}": ["prettier --write"],
    "*.md": ["markdownlint --fix", "prettier --write"]
  }
}
```

### 4.3 precommit スクリプトの設定

`package.json` にスクリプトを追加：

```json
{
  "scripts": {
    "precommit": "lint-staged",
    "postinstall": "husky install"
  }
}
```

## 5. commitlint の設定

### 5.1 パッケージのインストール

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

### 5.2 設定ファイルの作成

`commitlint.config.js` を作成：

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新機能
        'fix', // バグ修正
        'docs', // ドキュメント
        'style', // スタイリング
        'refactor', // リファクタリング
        'perf', // パフォーマンス改善
        'test', // テスト
        'chore', // その他
        'ci', // CI/CD
        'build', // ビルド
      ],
    ],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['upper-case']],
    'subject-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 150],
  },
};
```

## 6. 環境変数とシークレットの管理

### 6.1 GitHub Secrets の設定

GitHub リポジトリの Settings → Secrets and variables → Actions で設定：

| シークレット名  | 用途                        |
| --------------- | --------------------------- |
| `CODECOV_TOKEN` | Codecov連携用トークン       |
| `SNYK_TOKEN`    | Snyk セキュリティスキャン用 |
| `NPM_TOKEN`     | npm パッケージ公開用        |

### 6.2 環境変数の使用例

```yaml
# ワークフロー内での使用例
env:
  NODE_ENV: production
  API_URL: ${{ secrets.API_URL }}

steps:
  - name: Deploy to production
    env:
      DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
    run: npm run deploy
```

## 7. CI/CD の監視とメンテナンス

### 7.1 ワークフローの監視

1. **GitHub Actions タブでの実行状況確認**
2. **失敗時の通知設定**
3. **実行時間の最適化**

### 7.2 キャッシュの活用

依存関係のキャッシュでビルド時間を短縮：

```yaml
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### 7.3 並列実行の活用

複数のジョブを並列実行して時間を短縮：

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps: [...]

  test:
    runs-on: ubuntu-latest
    steps: [...]

  security:
    runs-on: ubuntu-latest
    steps: [...]
```

## 8. トラブルシューティング

### よくある問題と解決方法

#### ワークフローが失敗する

1. **ログの確認**: GitHub Actions の詳細ログを確認
2. **ローカル環境での再現**: 同じコマンドをローカルで実行
3. **依存関係の確認**: package.json とlock ファイルの整合性

#### Git フックが動作しない

1. **Husky の初期化確認**: `npx husky install`
2. **ファイルの実行権限**: `.husky/*` ファイルの権限確認
3. **スクリプトの構文確認**: シェルスクリプトの構文エラー

#### パフォーマンスの問題

1. **キャッシュの活用**: 依存関係とビルド結果のキャッシュ
2. **並列実行**: 独立したジョブの並列実行
3. **テストの最適化**: 不要なテストの除外

## 9. ベストプラクティス

### 9.1 セキュリティ

- **シークレットの適切な管理**
- **権限の最小化**
- **定期的なセキュリティスキャン**

### 9.2 効率性

- **キャッシュの活用**
- **条件付き実行**
- **リソース使用量の最適化**

### 9.3 保守性

- **ワークフローの文書化**
- **定期的な依存関係の更新**
- **モニタリングとアラート**

## 10. 高度な設定

### 10.1 マトリックス戦略

複数環境でのテスト：

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
    node-version: [16.x, 18.x, 20.x]
```

### 10.2 コンディショナル実行

条件に基づく実行：

```yaml
- name: Deploy to production
  if: github.ref == 'refs/heads/main'
  run: npm run deploy:prod
```

### 10.3 再利用可能なワークフロー

共通処理の再利用：

```yaml
# .github/workflows/reusable-quality-check.yml
on:
  workflow_call:
    inputs:
      node-version:
        required: true
        type: string

jobs:
  quality:
    runs-on: ubuntu-latest
    steps: [...]
```

## 次のステップ

CI/CD 環境の設定が完了したら、最後にトラブルシューティングガイドを確認しましょう：

→ **[07\_トラブルシューティング.md](./07_トラブルシューティング.md)**

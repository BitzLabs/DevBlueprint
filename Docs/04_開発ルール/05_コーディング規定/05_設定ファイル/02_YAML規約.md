# 02.YAML コーディング規約

このドキュメントでは、YAML (YAML Ain't Markup
Language) 形式のデータを記述する際のスタイルと規約を定めます。主に、`mkdocs.yml`やGitHub
Actionsのワークフローファイル (`.yml`) などでの利用を想定しています。

!!! danger "インデントが構文そのものである"
YAMLにおいて、インデントは単なる見た目ではなく、**データの階層構造を定義する**ための構文そのものです。インデントの誤りは、アプリケーションの予期せぬ動作や、設定の読み込みエラーに直結します。

---

## 1. 基本フォーマット (Basic Format)

- **ファイル拡張子:** `.yml`
  を推奨します。（`.yaml`でも可だが、プロジェクト内で統一）
- **文字エンコーディング:** UTF-8を標準とします。

---

## 2. レイアウトと書式設定 (Layout and Formatting)

手作業でのスタイル遵守は非効率であり、レビューのノイズとなるため、本プロジェクトではツールによる規約の遵守を強制します。各ツールの設定は、リポジトリのルートに配置された
**`.yamllint.yml`** ファイル（リンター設定）、**`.prettierrc.json`**
ファイル（フォーマッター設定）、および **`package.json`**
ファイル（依存関係・スクリプト管理）で一元管理します。また、エディタレベルでの基本的な設定は
**[.editorconfig](/.editorconfig)** ファイルで統一します。

- **フォーマッター: `Prettier`**
  - **役割:**
    インデント、スペース、クォーテーションのスタイルなどを自動で統一します。手作業でのフォーマットは行わず、ツールに一任します。
- **リンター: `yamllint`**
  - **役割:**
    フォーマットだけでなく、文法エラーやスタイル違反（例: 真偽値の不適切な表現、キーの重複）を検出します。
  - **運用:** CI/CDプロセスに`yamllint`のチェックを組み込むことを推奨します。

!!! success "CI/CDによる自動チェック" - GitHub
Actionsのワークフローに`prettier --check **/*.{yml,yaml}`および`yamllint **/*.{yml,yaml}`を組み込むことで、YAMLファイルのフォーマットと文法が規約に違反しているコードのマージを自動的にブロックします。-
VSCode拡張機能を導入し、ファイル保存時に自動でフォーマットとリント修正が適用されるよう設定することを**必須**とします。

---

## 3. スタイルガイド (Style Guide)

`Prettier`によって自動整形される内容が主ですが、手動で記述する際の指針として以下を定めます。

- **インデント:**
  - **半角スペース2つ**を標準とします。
  - **タブ文字は絶対に使用しないでください。**
    タブとスペースの混在は、見た目では分からない致命的なエラーの最大の原因です。
- **ブロックシーケンス (リスト/配列):**
  - ハイフン (`-`) の後には、**必ず半角スペースを1つ**入れます。

  ```yaml
  # 良い例
  fruits:
    - apple
    - orange
    - banana
  # 悪い例
  # fruits:
  #   -apple
  #   - orange # インデントが不揃い
  ```

- **文字列 (Strings):**
  - 通常、文字列をクォーテーションで囲む必要はありません。
  - ただし、`:`、`{}`、`[]`などの**特殊文字を含む場合**や、意図しない解釈（例:
    `no`がブーリアン値の`false`になる）を防ぎたい場合は、**シングルクォーテーション (`'`)**
    で囲むことを推奨します。
  - 文字列内にエスケープシーケンス（例:
    `\n`）を含めたい場合は、**ダブルクォーテーション (`"`)** を使用します。
- **ブーリアン値 (Booleans):**
  - `true` / `false` を使用します。（`True`, `False`, `yes`, `no`, `on`, `off`
    などは避ける）
- **空の値:**
  - `null`またはチルダ (`~`) を使用します。（プロジェクト内で統一）

---

## 4. ドキュメントの構成 (Document Structure)

- **ドキュメントの開始と終了:**
  - YAMLドキュメントの開始は`---`で、終了は`...`で明示することができます。必須ではありませんが、一つのファイルに複数のYAMLドキュメントを含める場合や、境界を明確にしたい場合に利用します。
- **コメント:**
  - `#`
    から行末までがコメントとなります。設定値の意味や、変更する際の注意点などを記述するために活用してください。

  ```yaml
  # サイト全体の情報
  site_name: 'DevBlueprint' # ここにはサイトのタイトルを記述
  site_author: 'Bitz Lab'

  # テーマ設定
  theme:
    name: material
    # features:
    #  - navigation.tabs # この機能は現在無効
  ```

---

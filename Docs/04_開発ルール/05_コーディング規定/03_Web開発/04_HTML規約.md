# 04.HTML コーディング規約

このドキュメントでは、HTMLの記述に関するスタイルと規約を定めます。セマンティックで、アクセシブル、かつ保守性の高いマークアップを目指します。

!!! note
"共通原則との関係" 本規約は、**[01.共通コーディング原則](../01_共通規則/01_共通コーディング原則.md)**
をHTMLに特化・具体化したものです。必ず共通原則にも目を通してください。

---

## 1. 基本方針 (Guiding Principles)

- **HTML5標準:**
  全てのHTMLドキュメントは、HTML5のDOCTYPE宣言 (`<!DOCTYPE html>`) から始め、その仕様に準拠します。
- **セマンティクスの重視:**
  タグを、単なる「見た目」のためではなく、その**「意味」や「役割」**に応じて正しく使用します。
- **アクセシビリティの確保:**
  全てのユーザーが情報にアクセスできるよう、WAI-ARIA仕様などを参考に、アクセシビリティを確保したマークアップを心がけます。

---

## 2. レイアウトと書式設定 (Layout and Formatting)

手作業でのスタイル遵守は非効率であり、レビューのノイズとなります。本プロジェクトでは、ツールによって規約の遵守を強制します。各ツールの設定は、リポジトリのルートに配置された
**`.prettierrc.json`** ファイル（フォーマッター設定）および **`package.json`**
ファイル（依存関係・スクリプト管理）で一元管理します。また、エディタレベルでの基本的な設定は
**[.editorconfig](/.editorconfig)** ファイルで統一します。

- **フォーマッター: `Prettier`**
  - **役割:**
    コードの見た目（インデント、クォーテーション、改行など）を自動で統一します。手作業でのフォーマットは行いません。
- **バリデーター / リンター:**
  - **役割:**
    W3Cの[Markup Validation Service](https://validator.w3.org/)などで、最終的なHTMLが文法的に正しいことを確認することを推奨します。
  - 開発中は、`htmlhint`や、フレームワークに統合されたリンターを利用して、潜在的な問題を検出します。

!!! success "CI/CDによる自動チェック" - GitHub
Actionsのワークフローに`prettier --check .`および`htmlhint **/*.html`を組み込むことで、フォーマットとHTMLマークアップが規約に違反しているコードのマージを自動的にブロックします。-
VSCode拡張機能を導入し、ファイル保存時に自動でフォーマットが適用されるよう設定することを**必須**とします。

---

## 3. ドキュメント構造 (Document Structure)

全てのHTMLファイルは、以下の基本的な構造に従います。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ページのタイトル</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <!-- ページのコンテンツ -->

    <script src="main.js"></script>
  </body>
</html>
```

- **`lang`属性:** `<html>`タグには、ページの主要な言語を示す`lang`属性（例:
  `lang="ja"`）を必ず指定します。
- **`viewport`:**
  レスポンシブデザインを正しく機能させるため、`<meta name="viewport" ...>`を必ず指定します。
- **`<title>`:**
  ページの主題を示す、ユニークで分かりやすい`<title>`を必ず指定します。

---

## 4. セマンティック・マークアップ (Semantic Markup)

### 4.1. ランドマークとセクション

- `<header>`, `<nav>`, `<main>`, `<footer>`
  などのランドマーク要素を適切に使い、ページの構造を明確にします。
- 見出し (`<h1>`〜`<h6>`) は、その階層を正しく使用します。`<h1>`はページに1つだけとし、見出しレベルを飛ばさないでください。（例:
  `<h2>`の次に`<h4>`を置かない）

```html
<!-- 良い例 -->
<h2>セクション1</h2>
<h3>サブセクション1-1</h3>
<h3>サブセクション1-2</h3>
<h2>セクション2</h2>

<!-- 悪い例: h2からh4に飛んでいる -->
<!-- <h2>セクション1</h2> -->
<!--   <h4>サブセクション1-1</h4> -->
```

### 4.2. インタラクティブ要素

- **リンク vs ボタン:**
  - **`<a>` (アンカー):**
    他のページや、ページ内の特定箇所への**ナビゲーション**に使用します。
  - **`<button>`:**
    クリックによって何らかの**アクション**（フォームの送信、UIの表示切り替えなど）を実行する場合に使用します。
- `div`や`span`に`onclick`属性を付けて、ボタンやリンクの代わりとして使用することは**禁止**します。

```html
<!-- 良い例 -->
<a href="/about">会社概要へ</a>
<button type="button" id="open-modal-button">モーダルを開く</button>

<!-- 悪い例 -->
<!-- <div onclick="location.href='/about'">会社概要へ</div> -->
<!-- <span onclick="openModal()">モーダルを開く</span> -->
```

---

## 5. アクセシビリティ (Accessibility)

### 5.1. 画像

- 全ての`<img>`タグには、その画像の内容を説明する適切な`alt`属性を必ず指定します。
- 画像が純粋な装飾目的で、情報を持たない場合は、`alt=""`のように空の値を設定します。

### 5.2. フォーム

- `<input>`, `<textarea>`,
  `<select>`などのフォームコントロールには、必ず対応する`<label>`要素を`for`属性で関連付けます。
- `for`属性の値は、対応するコントロールの`id`属性の値と一致させる必要があります。

```html
<!-- 良い例: labelとinputが関連付けられている -->
<label for="user-name">ユーザー名:</label>
<input type="text" id="user-name" name="userName" />

<!-- 悪い例: labelとinputが関連付けられていない -->
<!-- <span>ユーザー名:</span> -->
<!-- <input type="text" name="userName"> -->
```

---

## 6. その他 (Miscellaneous)

- **Boolean属性:** `disabled`, `checked`, `required`
  のようなブーリアン属性には、値を指定しません。（例:
  `disabled="disabled"`ではなく`disabled`と記述）
- **CSSとJavaScriptの読み込み:**
  - CSSは、ページのレンダリングがブロックされるのを避けるため、`<head>`内で読み込みます。
  - JavaScriptは、DOMの解析をブロックしないように、原則として`</body>`の直前で読み込みます。（`defer`属性の利用も可）

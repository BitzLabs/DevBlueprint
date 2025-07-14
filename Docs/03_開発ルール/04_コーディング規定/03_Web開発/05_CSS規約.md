# 05.CSS コーディング規約

このドキュメントでは、CSSおよびSass/SCSSの記述に関するスタイルと規約を定めます。
予測可能で、再利用性が高く、破綻しにくいスタイリングを目指します。

!!! note "共通原則との関係"
    本規約は、**[01.共通コーディング原則](../01_共通規則/01_共通コーディング原則.md)** をCSSに特化・具体化したものです。必ず共通原則にも目を通してください。

---

## 1. 基本方針 (Guiding Principles)

*   **予測可能性:** あるクラスがどのようなスタイルを持ち、他の要素にどう影響するかが予測しやすいこと。
*   **再利用性:** 複数の場所で利用できる、汎用的なコンポーネントを設計すること。
*   **保守性:** スタイルを追加・変更・削除するのが容易であること。
*   **拡張性:** 新しいコンポーネントやスタイルを追加しても、既存のスタイルが壊れないこと。

---

## 2. ツールによる規約の強制 (Tool-Enforced Regulations)

*   **フォーマッター: `Prettier`**
    *   **役割:** インデント、スペース、改行などを自動で統一します。
*   **リンター: `Stylelint`**
    *   **役割:** 潜在的なエラーやアンチパターン、規約違反を検出します。
    *   **運用:** CIプロセスに`stylelint`のチェックを組み込み、規約違反をブロックします。

---

## 3. CSS設計の基本原則 (Core CSS Design Principles)

CSSは、その名の通り「カスケーディング（Cascading）」する性質を持っており、意図しないスタイルの上書きや、詳細度の戦いが破綻の原因となります。これを防ぐため、以下の設計原則を採用します。

### 3.1. カスケードレイヤー (`@layer`) の活用
*   **目的:** スタイルシートを「層（レイヤー）」に分割し、その**適用優先順位を明示的に定義**します。これにより、ソースコードの記述順や詳細度に依存しない、予測可能なカスケードを実現します。
*   **基本ルール:**
    1.  スタイルシートの冒頭で、`@layer`を使って層の順序を定義します。後に定義された層ほど優先度が高くなります。
    2.  各スタイルは、対応する`@layer`ブロック内に記述します。

```css
/* 1. レイヤーの順序を定義 (後にあるものほど強い) */
@layer reset, base, components, utilities;

/* 2. 各レイヤーにスタイルを定義 */
@layer reset {
  /* リセットCSS (最も弱い) */
  * { box-sizing: border-box; margin: 0; padding: 0; }
}

@layer base {
  /* HTML要素の基本スタイル */
  body { font-family: sans-serif; line-height: 1.6; }
  a { color: blue; text-decoration: none; }
}

@layer components {
  /* BEMなどで定義されたコンポーネント */
  .card { 
    display: block;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  .card__title { font-size: 1.5rem; }
}

@layer utilities {
  /* 上書き用のユーティリティクラス (最も強い) */
  .u-margin-top-large { margin-top: 2rem !important; } /* ユーティリティは!importantを許容する場合がある */
  .u-text-center { text-align: center; }
}
```

!!! success "カスケードレイヤーのメリット"
    詳細度が低いセレクタでも、**後のレイヤーに記述すれば、前のレイヤーの詳細度が高いセレクタを上書きできます。** これにより、「詳細度を上げるためにセレクタを複雑にする」というアンチパターンを回避できます。

### 3.2. 詳細度（Specificity）の低減
*   **目的:** スタイルの上書きを容易にし、意図しない副作用を防ぐため、セレクタの詳細度は可能な限り低く保ちます。
*   **基本ルール:**
    *   原則として、**単一のクラスセレクタ**を基本とします。
    *   IDセレクタ (`#my-id`) や、過度な要素セレクタのネストは、原則として使用を禁止します。

```css
/* 良い例: 単一クラスで完結しており、詳細度が低い */
.header__nav-link {
  color: #333;
}
.header__nav-link--active {
  color: #007bff;
}

/* 悪い例: 詳細度が高く、上書きが困難になる */
#main-header nav > ul.main-menu li.menu-item a.active {
  color: #007bff;
}
```

### 3.3. `!important` の原則禁止
*   **理由:** `!important`はカスケードのルールを破壊し、デバッグを著しく困難にするため、原則として**使用を禁止**します。
*   **例外:** `@layer`で定義されたユーティリティクラスのように、**「常に他の全てのスタイルを上書きする」という明確な役割**を持つ場合にのみ、その使用を限定的に許容します。

---

## 4. 命名規則: BEM (Block, Element, Modifier)

クラス名の命名には、厳格な**BEM**を採用することを強く推奨します。これは、詳細度を低く保ちつつ、各クラスの役割を明確にする上で非常に効果的な手法です。

*   **Block:** 独立した部品 (`.card`, `.form`)
*   **Element:** Blockを構成する要素 (`.card__title`, `.form__input`)
*   **Modifier:** BlockやElementの状態やバリエーション (`.card--featured`, `.form__input--error`)

```html
<form class="form form--login">
  <div class="form__group">
    <label for="username" class="form__label">Username</label>
    <input type="text" id="username" class="form__input">
  </div>
  
  <div class="form__group">
    <label for="password" class="form__label">Password</label>
    <input type="password" id="password" class="form__input form__input--error">
  </div>

  <button type="submit" class="form__button form__button--primary">Login</button>
</form>
``````css
/* Block */
.form { /* ... */ }
.form--login { /* ... */ }

/* Element */
.form__group { /* ... */ }
.form__label { /* ... */ }
.form__input { /* ... */ }
.form__button { /* ... */ }

/* Modifier */
.form__input--error { border-color: red; }
.form__button--primary { background-color: blue; }
```

---

## 5. スタイルシートの構成 (SCSS/Sass利用時)

CSSプリプロセッサとしてSCSS/Sassを利用する場合、[**7-1 Pattern**](https://sass-guidelin.es/#the-7-1-pattern)のような、役割ごとにファイルを分割するアーキテクチャを推奨します。

```
sass/
|– abstracts/      # 変数, 関数, mixinなど
|– base/           # HTML要素のデフォルトスタイル
|– components/     # ボタン, カードなどの部品
|– layout/         # ヘッダー, フッターなど
|– pages/          # 特定のページ固有のスタイル
`– main.scss       # 全てのファイルをインポートするエントリーポイント
```

```scss
/* main.scss の記述例 */

// 1. カスケードレイヤーの順序を宣言
@layer reset, base, components, utilities;

// 2. 変数やmixinなど、レイヤーに属さないものをインポート
@import 'abstracts/variables';
@import 'abstracts/mixins';

// 3. 各レイヤーに対応するファイルをインポート
@layer reset {
  @import 'base/reset';
}

@layer base {
  @import 'base/typography';
}

@layer components {
  @import 'components/button';
  @import 'components/card';
  @import 'components/form';
}

@layer utilities {
  @import 'abstracts/utilities';
}
```

---

## 6. プロパティの記述順序

関連するプロパティをグループ化して記述することで、可読性を高めます。（`Stylelint`で強制可能）

1.  **位置指定 (Positioning):** `position`, `top`, `z-index` ...
2.  **ボックスモデル (Box Model):** `display`, `width`, `height`, `margin`, `padding` ...
3.  **タイポグラフィ (Typography):** `font-family`, `font-size`, `color` ...
4.  **見た目 (Visual):** `background`, `border-radius`, `box-shadow` ...
5.  **その他 (Misc):** `animation`, `transition`, `cursor` ...
```css
.example-button {
  /* 1. Positioning */
  position: absolute;
  top: 10px;
  left: 10px;

  /* 2. Box Model */
  display: inline-block;
  padding: 10px 20px;
  border: 1px solid #ccc;
  
  /* 3. Typography */
  font-size: 1rem;
  color: #333;

  /* 4. Visual */
  background-color: #f0f0f0;
  border-radius: 4px;

  /* 5. Misc */
  cursor: pointer;
  transition: background-color 0.3s;
}
```

---

## 7. その他 (Miscellaneous)

*   **単位:** `font-size`には`rem`、`padding`や`border`には`px`や`rem`を基本とするなど、単位の使い分けルールをプロジェクトで定めます。
*   **マジックナンバーの回避:** `z-index: 9999;` のような、根拠の不明な数値は避け、SCSSの変数として管理することを推奨します。


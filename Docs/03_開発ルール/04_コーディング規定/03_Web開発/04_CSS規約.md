# 04.CSS コーディング規約

このドキュメントでは、CSSおよびSass/SCSSの記述に関するスタイルと規約を定めます。
予測可能で、再利用性が高く、破綻しにくいスタイリングを目指します。

---

## 1. 基本方針

*   **リンティング:** [Stylelint](https://stylelint.io/)を導入し、規約違反や潜在的なエラーを自動的に検出します。
*   **フォーマット:** HTMLやTypeScriptと同様に、**`Prettier`**による自動整形を前提とします。

---

## 2. 命名規則: BEM (Block, Element, Modifier)

クラス名の命名には、厳格な**BEM**を採用することを推奨します。これにより、スタイルの影響範囲が予測しやすくなり、詳細度（Specificity）の衝突を防ぎます。

*   **Block:** UIを構成する独立した部品 (`.card`, `.nav`)
*   **Element:** Blockを構成する要素 (`.card__title`, `.nav__item`)
*   **Modifier:** BlockやElementの状態や見た目のバリエーション (`.card--dark`, `.nav__item--active`)

**例:**
```html
<div class="card card--featured">
  <h2 class="card__title">タイトル</h2>
  <p class="card__description">説明文です。</p>
  <button class="card__button card__button--primary">詳細を見る</button>
</div>
```

!!! note "コンポーネントフレームワークの場合"
    Vue.jsやReactのScoped CSSを利用する場合は、BEMを厳密に適用する必要はありません。その場合は、コンポーネント内で閉じた、よりシンプルなクラス命名規則を定義します。

---

## 3. スタイルシートの構成 (SCSS/Sass利用時)

CSSプリプロセッサとしてSCSS/Sassを利用する場合、[**7-1 Pattern**](https://sass-guidelin.es/#the-7-1-pattern)のような、役割ごとにファイルを分割するアーキテクチャを推奨します。

---

## 4. プロパティの記述順序

関連するプロパティをグループ化して記述することで、可読性を高めます。推奨される順序は以下の通りです。

1.  **位置指定 (Positioning):** `position`, `top`, `z-index` ...
2.  **ボックスモデル (Box Model):** `display`, `width`, `height`, `margin`, `padding` ...
3.  **タイポグラフィ (Typography):** `font-family`, `font-size`, `color` ...
4.  **見た目 (Visual):** `background`, `border`, `border-radius` ...
5.  **その他 (Misc):** `animation`, `transition` ...

---

## 5. その他

*   **単位:** `font-size`には`rem`、`padding`や`margin`には`px`や`rem`を基本とするなど、単位の使い分けルールをプロジェクトで定めます。
*   **`!important`の禁止:** 原則として`!important`の使用は禁止します。これが必要になる場合、CSSの設計（詳細度）に問題がある可能性が高いです。

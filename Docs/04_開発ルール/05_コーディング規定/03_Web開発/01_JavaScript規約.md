# 01.JavaScript コーディング規約

このドキュメントでは、ECMAScript 2015
(ES6) 以降のモダンなJavaScriptを記述する際の、コーディングスタイルと規約について定めます。本規約は、主にブラウザ環境での実行を想定しています。

!!! note
"共通原則との関係" 本規約は、**[01.共通コーディング原則](../01_共通規則/01_共通コーディング原則.md)**
をJavaScript言語に特化・具体化したものです。必ず共通原則にも目を通してください。

---

## 1. 基本方針 (Guiding Principles)

- 本プロジェクトのJavaScriptコードは、世界的に広く採用されている**[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)**に準拠することを基本とします。
- これは、モダンなJavaScriptのベストプラクティスを網羅した、非常に包括的で信頼性の高いスタイルガイドです。

---

## 2. レイアウトと書式設定 (Layout and Formatting)

手作業でのスタイル遵守は非効率であり、レビューのノイズとなります。本プロジェクトでは、ツールによって規約の遵守を強制します。各ツールの設定は、リポジトリのルートに配置された
**`.eslintrc.js`** ファイル（リンター設定）、**`.prettierrc.json`**
ファイル（フォーマッター設定）、および **`package.json`**
ファイル（依存関係・スクリプト管理）で一元管理します。また、エディタレベルでの基本的な設定は
**[.editorconfig](/.editorconfig)** ファイルで統一します。

- **リンター: `ESLint`**
  - **役割:**
    コードの品質をチェックし、潜在的なバグやスタイル違反を検出します。Airbnbの規約セット (`eslint-config-airbnb-base`) をベースとして使用することを推奨します。
- **フォーマッター: `Prettier`**
  - **役割:**
    コードの見た目（インデント、スペース、改行など）を、議論の余地なく統一します。
  - **運用:**
    `ESLint`と連携させ、フォーマットに関するルールは`Prettier`に一任します。

!!! success "CI/CDによる自動チェック" - GitHub
Actionsのワークフローに`eslint .`および`prettier --check .`を組み込むことで、コード品質とフォーマットが規約に違反しているコードのマージを自動的にブロックします。-
VSCode拡張機能を導入し、ファイル保存時に自動でフォーマットとリント修正が適用されるよう設定することを**必須**とします。

---

## 3. 命名規則 (Naming Conventions)

- **`PascalCase`**: クラス名 (`class UserService { ... }`)
- **`camelCase`**: 変数名、関数名、プロパティ名、メソッド名 (`const userName = ...`,
  `function getUser() {}`)
- **ファイル名**: **`kebab-case.js`** (例: `user-service.js`) を推奨します。

---

## 4. コメント (Comments)

- **JSDocコメントの不使用:**
  - 本プロジェクトでは、「仕様は`Docs/`フォルダに集約する」という原則に基づき、JSDoc形式のようなAPIドキュメント自動生成のためのコメントは**原則として使用しません。**
- **通常のコメント (`//` または `/* ... */`)**:
  - コードが「何をしているか」よりも「**なぜそうしているのか**」という設計意図や背景を説明するために使用します。
- **機能IDとの連携**:
  - 機能の実装には、対応する機能IDをコメントとして明記します。

  ```javascript
  // API-USER-3-1: 全てのユーザーリストを取得する
  const fetchAllUsers = async () => {
    // ...
  };
  ```

---

## 5. 言語機能の利用方針 (Language Feature Usage)

### 5.1. 変数宣言

- **`var`は禁止:**
  `var`が持つ関数スコープや巻き上げといった問題のある挙動を避けるため、使用を**禁止**します。
- **`const`を基本とする:**
  再代入しない変数は、必ず**`const`**で宣言します。これにより、意図しない値の変更を防ぎ、コードの予測可能性を高めます。
- **`let`は限定的に使用:**
  再代入が必要な変数（ループカウンターなど）にのみ、**`let`**を使用します。

### 5.2. 関数とモジュール

- **アロー関数の推奨:**
  `function`キーワードよりも、簡潔で`this`の挙動が直感的なアロー関数 (`=>`) の使用を推奨します。
- **ESM構文の徹底:**
  CommonJSの`require`/`module.exports`は使用せず、必ずESM（ECMAScript
  Modules）の**`import`/`export`構文**を使用します。

### 5.3. その他

- **テンプレートリテラル:**
  文字列の結合や変数展開には、`+`演算子ではなく、可読性の高いテンプレートリテラル (`` `...` ``) を使用します。
- **分割代入:**
  オブジェクトや配列から値を取り出す際は、分割代入を積極的に利用してコードを簡潔にします。

  ```javascript
  // 良い例
  const { name, age } = user;
  const [first, second] = anArray;

  // 悪い例
  // const name = user.name;
  // const age = user.age;
  ```

---

## 6. エラー処理と例外 (Error Handling and Exceptions)

- エラーハンドリングは `try...catch` ブロックを用いて行います。
- Promiseを直接扱う場合は、`.catch()`メソッドでエラーを捕捉します。
- `throw` する際は、組み込みの `Error`
  オブジェクト（またはその派生クラス）を使用します。

```javascript
async function fetchUser(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch operation failed:', error);
    throw error; // エラーを再スローして呼び出し元に伝える
  }
}
```

---

## 7. 非同期処理 (`async`/`await`)

- **基本方針:**
  非同期処理は、Promiseチェーン (`.then()`) よりも、同期的コードに近い形で記述できる
  **`async/await`** の使用を強く推奨します。
- **`Promise.all`の活用:**
  互いに依存しない複数の非同期処理を並行して実行する場合は、`Promise.all` や
  `Promise.allSettled` を利用して効率化します。

```javascript
// 逐次実行（非効率）
// const user = await fetchUser(1);
// const articles = await fetchArticles(1);

// 並行実行（効率的）
const [user, articles] = await Promise.all([fetchUser(1), fetchArticles(1)]);
```

---

## 8. パフォーマンスに関する考慮事項 (Performance Considerations)

- **(内容は今後拡充予定)**

---

## 9. その他 (Miscellaneous)

- **イミュータビリティ (Immutability):**
  - `Object.freeze()`やイミュータブルなライブラリ（Immer.jsなど）の利用を検討し、意図しない副作用を防ぎます。
- **コメントアウトされたコードの禁止:**
  - 不要になったコードは、コメントアウトして残さずに削除してください。コードの履歴はGitのバージョン管理システムで追跡します。

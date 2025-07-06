# 02.TypeScript コーディング規約

このドキュメントでは、`DevBlueprint`を利用するプロジェクトでTypeScriptを記述する際の、コーディングスタイルと規約について定めます。

!!! note "共通原則との関係"
    本規約は、**[01.共通/01_共通コーディング原則](../../../01_共通/01_共通コーディング原則.md)**を、TypeScript言語に特化・具体化したものです。必ず共通原則にも目を通してください。

---

## 1. 基本方針: Airbnb Style Guide準拠

*   本プロジェクトのTypeScriptコードは、世界的に広く採用されている**[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)**および、そのTypeScript拡張である**[TypeScript-specific rules](https://github.com/airbnb/javascript/tree/master/typescript)**に準拠することを基本とします。
*   これにより、グローバルスタンダードで、かつリーダブルなコードベースを維持します。

---

## 2. 自動フォーマットとリンティングの強制

手作業でのスタイル遵守は非効率なため、ツールによって規約の遵守を強制します。

*   **リンター: `ESLint`**
    *   **役割:** コードの品質をチェックし、潜在的なバグやスタイル違反を検出します。Airbnbの規約セット(`eslint-config-airbnb-typescript`)をベースとして使用します。
*   **フォーマッター: `Prettier`**
    *   **役割:** コードの見た目（インデント、スペース、改行など）を、議論の余地なく統一します。
    *   `ESLint`と連携させ、フォーマットに関するルールは`Prettier`に一任します。

!!! success "`.editorconfig`とツールの連携"
    `ESLint`と`Prettier`は、リポジトリルートの`.editorconfig`ファイルの設定を尊重するように構成します。
    また、VSCode拡張機能を導入し、ファイル保存時に自動でフォーマットがかかるように設定することを強く推奨します。

---

## 3. 命名規則

*   **`PascalCase`**: クラス名、インターフェース名、型エイリアス名、enum名。（例: `class UserService`, `interface IUser`, `type UserId`）
*   **`camelCase`**: 変数名、関数名、プロパティ名、メソッド名。（例: `const userName = ...`, `function getUser() {}`）
*   **ファイル名**:
    *   通常の`.ts`ファイルは **`kebab-case.ts`** (例: `user-service.ts`) を推奨。
    *   React/Vueコンポーネントファイルは **`PascalCase.tsx` / `PascalCase.vue`** を推奨。

---

## 4. 型定義のベストプラクティス

*   **`any`の禁止:**
    *   `any`型はTypeScriptの型チェックを無効にするため、原則として**使用を禁止**します。リンタールール（`@typescript-eslint/no-explicit-any`）でこれを強制します。
    *   型が不明な場合は、より安全な`unknown`型を使用し、型ガードで絞り込んでから扱います。
*   **`interface` vs `type`:**
    *   **`interface`:** オブジェクトの形状を定義する場合に推奨します。（`extends`による拡張が可能で、宣言のマージも行われるため）
    *   **`type`:** プリミティブ型のエイリアス、ユニオン型、タプル型など、`interface`で表現できない、より複雑な型を定義する場合に使用します。
*   **DOMの型:**
    *   `HTMLElement`, `HTMLInputElement`など、具体的なDOM要素の型を適切に使用します。`document.getElementById`などの戻り値は、アサーションや型ガードで絞り込みます。

---

## 5. モジュールとインポート/エクスポート

*   **ESM構文の徹底:** CommonJSの`require`/`module.exports`は使用せず、必ずESM（ECMAScript Modules）の`import`/`export`構文を使用します。
*   **`export default`の扱い:**
    *   原則として、1ファイル1コンポーネント（または1クラス）とし、**`export default`** を使用することを推奨します。これにより、インポート側での名前の自由度が高まります。

---

## 6. 要求IDとの連携

*   **[01.共通コーディング原則](../../../01_共通/01_共通コーディング原則.md)**で定められた通り、機能の実装に対応する要求IDを、関数やメソッドのコメントとして明記します。

    ```typescript
    // REQ-AUTH-1.1: ユーザー名とパスワードで認証を行う
    async function login(user: UserCredentials): Promise<LoginResult> {
      // ...
    }
    ```
    
# 02.TypeScript コーディング規約

このドキュメントでは、`DevBlueprint`を利用するプロジェクトでTypeScriptを記述する際の、コーディングスタイルと規約について定めます。本規約は、主にブラウザ環境での実行を想定しています。

!!! note "共通原則との関係"
    - 本規約は、**[01.共通コーディング原則](../01_共通規則/01_共通コーディング原則.md)** をTypeScript言語に特化・具体化したものです。必ず共通原則にも目を通してください。
    - また、本規約は **[01.JavaScript規約](./01_JavaScript規約.md)** を包含し、そのルールを継承します。

---

## 1. 基本方針 (Guiding Principles)

*   本プロジェクトのTypeScriptコードは、世界的に広く採用されている**[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)**および、そのTypeScript拡張である**[TypeScript-specific rules](https://github.com/airbnb/javascript/tree/master/typescript)**に準拠することを基本とします。
*   **静的な型付けを最大限に活用**し、コンパイル時にエラーを検出し、コードの堅牢性と保守性を高めることを目指します。

---

## 2. レイアウトと書式設定 (Layout and Formatting)

手作業でのスタイル遵守は非効率なため、ツールによって規約の遵守を強制します。

*   **リンター: `ESLint`**
    *   **役割:** `@typescript-eslint/parser`と`eslint-plugin-@typescript-eslint`を組み合わせ、TypeScriptのコード品質をチェックし、潜在的なバグやスタイル違反を検出します。
*   **フォーマッター: `Prettier`**
    *   **役割:** コードの見た目（インデント、スペース、改行など）を、議論の余地なく統一します。
    *   **運用:** `ESLint`と連携させ、フォーマットに関するルールは`Prettier`に一任します。
*   **型チェッカー: `TypeScript Compiler (tsc)`**
    *   **役割:** `tsconfig.json`の`strict`モードを有効にし、厳密な型チェックを行います。
    *   **運用:** CIプロセスで`tsc --noEmit`を実行し、型エラーがないことを保証します。

---

## 3. 命名規則 (Naming Conventions)

**[01.JavaScript規約](./01_JavaScript規約.md)** に加え、以下のルールを適用します。

*   **`PascalCase`**: インターフェース名、型エイリアス名、enum名。（例: `interface User`, `type UserId`）
*   **インターフェース名のプレフィックス `I` は不要:**
    *   `IUser`のようなプレフィックスは付けず、`User`のように命名することを推奨します。これは、現代のTypeScriptコミュニティの主流のスタイルです。
*   **ファイル名**:  
    *   React/Vueコンポーネントファイルは **`PascalCase.tsx` / `PascalCase.vue`** を推奨します。  

---

## 4. コメント (Comments)

**[01.JavaScript規約](./01_JavaScript規約.md)** と同様の方針を適用します。APIドキュメント自動生成のためのコメントは原則として使用しません。

---

## 5. 言語機能の利用方針 (Language Feature Usage)

**[01.JavaScript規約](./01_JavaScript規約.md)** の全項目に加え、以下のTypeScript固有のルールを適用します。

### 5.1. 型定義のベストプラクティス
*   **`any`の禁止:**
    *   `any`型はTypeScriptの型チェックを無効にするため、原則として**使用を禁止**します。リンタールール（`@typescript-eslint/no-explicit-any`）でこれを強制します。
    *   型が不明な場合は、より安全な`unknown`型を使用し、型ガードで絞り込んでから扱います。
    ```typescript
    // 悪い例
    function process(data: any) {
        data.doSomething(); // 型安全でない呼び出しができてしまう
    }

    // 良い例
    function process(data: unknown) {
        if (typeof data === 'string') {
            console.log(data.toUpperCase()); // 型ガード後なので安全
        }
    }
    ```
*   **`interface` vs `type`:**
    *   **`interface`:** オブジェクトの形状を定義する場合に推奨します。（`extends`による拡張が可能で、宣言のマージも行われるため）
    *   **`type`:** プリミティブ型のエイリアス、ユニオン型、タプル型など、`interface`で表現できない、より複雑な型を定義する場合に使用します。
    ```typescript
    // オブジェクトの形状定義には interface
    interface User {
        id: number;
        name: string;
    }

    // 拡張も可能
    interface AdminUser extends User {
        role: 'admin';
    }

    // ユニオン型やプリミティブのエイリアスには type
    type UserId = number | string;
    type Theme = 'light' | 'dark';
    ```
*   **ユーティリティ型の活用:**
    *   `Partial<T>`, `Readonly<T>`, `Pick<T, K>`, `Omit<T, K>` などの組み込みユーティリティ型を積極的に活用し、冗長な型定義を避けます。
    ```typescript
    interface Todo {
      title: string;
      description: string;
      completed: boolean;
    }

    // Todoの一部プロパティだけを使って更新する関数
    function updateTodo(id: number, fieldsToUpdate: Partial<Todo>) {
      // ...
    }
    ```

---

## 6. エラー処理と例外 (Error Handling and Exceptions)

**[01.JavaScript規約](./01_JavaScript規約.md)** と同様の方針を適用します。

---

## 7. 非同期処理 (`async`/`await`) (Asynchronous Processing)

**[01.JavaScript規約](./01_JavaScript規約.md)** と同様の方針を適用します。関数の戻り値の型として、`Promise<T>`を明示的に記述します。

```typescript
async function fetchUser(userId: number): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    // response.json()の戻り値は Promise<any> なので型アサーションが必要
    const user = await response.json() as User;
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}
```

---

## 8. パフォーマンスに関する考慮事項 (Performance Considerations)

**[01.JavaScript規約](./01_JavaScript規約.md)** と同様の方針を適用します。

---

## 9. その他 (Miscellaneous)

**[01.JavaScript規約](./01_JavaScript規約.md)** と同様の方針を適用します。


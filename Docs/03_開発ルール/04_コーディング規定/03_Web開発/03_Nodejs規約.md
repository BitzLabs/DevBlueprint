# 03.Node.js コーディング規約

このドキュメントでは、Node.js環境でJavaScriptまたはTypeScriptを記述する際の、コーディングスタイルと規約について定めます。本規約は、Webサーバー、CLIツール、バッチ処理などのサーバーサイドアプリケーション開発を想定しています。

!!! note "共通原則との関係"
    - 本規約は、**[01.共通コーディング原則](../../01_共通規則/01_共通コーディング原則.md)** をNode.js実行環境に特化・具体化したものです。
    - また、本規約は **[01.JavaScript規約](./01_JavaScript規約.md)** および **[02.TypeScript規約](./02_TypeScript規約.md)** を包含し、そのルールを継承します。

---

## 1. 基本方針 (Guiding Principles)

*   **非同期・ノンブロッキングI/Oの徹底:** Node.jsのパフォーマンスを最大化するため、I/O処理は原則として非同期・ノンブロッキングな方法で実装します。
*   **堅牢なエラーハンドリング:** サーバーアプリケーションの安定稼働のため、予期せぬエラーがプロセス全体をクラッシュさせないよう、堅牢なエラーハンドリング機構を構築します。
*   **セキュリティの考慮:** ファイルシステムやネットワークへのアクセス権限を持つため、セキュリティ上の脅威を常に意識してコーディングを行います。

---

## 2. ツールによる規約の強制 (Tool-Enforced Regulations)

**[01.JavaScript規約](./01_JavaScript規約.md)**/**[02.TypeScript規約](./02_TypeScript規約.md)**で定義された`ESLint`および`Prettier`の利用を基本とします。

---

## 3. 命名規則 (Naming Conventions)

**[01.JavaScript規約](./01_JavaScript規約.md)**/**[02.TypeScript規約](./02_TypeScript規約.md)**と同様の方針を適用します。

---

## 4. コメント (Comments)

*   **JSDocの限定的な許容:**
    *   自己完結したユーティリティスクリプトや、複雑な関数など、**ソースコード内での説明が保守性を高める**と判断される場合に限り、JSDoc形式のコメントの使用を許容します。
    *   ただし、プロジェクト全体の仕様は **[02.設計仕様](../../../02_設計仕様/README.md)** に集約するという原則は維持します。
*   **要求IDとの連携**:
    *   機能の実装には、対応する要求IDをコメントとして明記します。

---

## 5. 言語機能の利用方針 (Language Feature Usage)

### 5.1. モジュールシステム
*   **ES Modules (ESM) を推奨:** プロジェクト全体で、原則としてCommonJS (`require`/`module.exports`) ではなく、ES Modules (`import`/`export`) を使用します。
    *   **理由:** ESMはJavaScriptの公式な標準仕様であり、静的解析が容易で、トップレベル`await`などのモダンな機能を利用できます。
    *   **設定:** `package.json`に`"type": "module"`を設定し、ファイル拡張子は`.js`（または`.ts`）を使用します。

### 5.2. 環境変数
*   **`process.env`の直接参照を避ける:**
    *   コードの様々な場所で`process.env.YOUR_VARIABLE`を直接参照するのではなく、設定情報を一元的に管理・検証する専用のモジュールを作成することを推奨します。
    *   **理由:** 必要な環境変数が定義されているかを起動時に一括で検証でき、型安全（TypeScriptの場合）を保ち、設定の出所を明確にすることができます。
    ```typescript
    // 例: config.ts
    import 'dotenv/config';

    const getEnv = (key: string): string => {
      const value = process.env[key];
      if (!value) throw new Error(`環境変数 ${key} が設定されていません。`);
      return value;
    };
    
    export const config = {
      nodeEnv: getEnv('NODE_ENV'),
      databaseUrl: getEnv('DATABASE_URL'),
    } as const;
    ```

---

## 6. エラー処理と例外 (Error Handling and Exceptions)

### 6.1. 操作エラー vs プログラマーエラー
*   **操作エラー (Operational Errors):**
    *   **定義:** 予期される実行時エラー（例: APIタイムアウト、DB接続断、入力バリデーションエラー）。
    *   **対処:** 適切に捕捉し、ログを記録した上で、正常なエラーフローで処理します。**プロセスを終了させるべきではありません。**
*   **プログラマーエラー (Programmer Errors):**
    *   **定義:** コードのバグ（例: `undefined`な変数のプロパティにアクセス）。
    *   **対処:** 原則として捕捉せず、発生した場合は即座に**プロセスをクラッシュ（終了）**させ、PM2やコンテナ等の自動再起動に任せます。
    *   **理由:** 不整合な状態でプロセスを継続させるより、クリーンな状態で再起動する方が安全です（Fail-fast思想）。

### 6.2. 未捕捉の例外のハンドリング
*   万一のプログラマーエラーを検知し、ログに残してからプロセスを終了させるために、アプリケーションの起動時にグローバルな例外ハンドラを設定します。
```javascript
process.on('uncaughtException', (error) => {
  console.error('未捕捉の例外が発生しました:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未処理のPromiseリジェクション:', reason);
  throw reason;
});
```

---

## 7. 同期処理 (Synchronous Processing)

*   **基本方針:** Node.jsのイベントループをブロックするため、**原則として使用を避けるべき**です。
*   **許容されるケース:**
    *   **CLIツールやワンタイムスクリプト:** Webサーバーのように多数のリクエストを捌く必要がなく、逐次的な処理でコードの可読性が向上する場合（例: `execFileSync`, `readFileSync`）。
    *   **アプリケーションの初期化時:** サーバーがリクエストを受け付け始める前に、設定ファイルなどを一度だけ同期的に読み込む場合。
*   これらのケース以外で同期APIを使用すると、サーバー全体のパフォーマンスに深刻な影響を与えます。

```javascript
// CLIツールでの許容例
import { readFileSync } from 'fs';
import { execFileSync } from 'child_process';

console.log('設定ファイルを同期的に読み込みます...');
const config = JSON.parse(readFileSync('config.json', 'utf8'));

console.log('同期的にコマンドを実行します...');
const result = execFileSync('git', ['rev-parse', '--short', 'HEAD']);
console.log('Current Git Hash:', result.toString().trim());
```

---

## 8. 非同期処理 (Asynchronous Processing)

*   **基本方針:** I/Oバウンドな処理には、常に非同期APIを使用します。最新の**PromiseベースのAPI**（例: `fs/promises`）と**`async/await`構文**を第一選択とします。

*   **コールバックベースの古いAPIの利用:**
    *   古いライブラリがコールバックスタイルの非同期APIしか提供していない場合は、`util.promisify`を使ってPromiseベースの関数に変換してから利用することを推奨します。

```javascript
import { readFile } from 'fs/promises';
import { promisify } from 'util';
import oldApi from 'some-old-library';

const oldApiAsync = promisify(oldApi.doSomething);

async function main() {
  // PromiseベースのAPI
  const content = await readFile('my-file.txt', 'utf8');

  // PromisifyしたAPI
  const result = await oldApiAsync('some-arg');
}
main();
```

---

## 9. セキュリティに関する考慮事項 (Security Considerations)

*   **コマンドインジェクション対策:** `child_process.exec`のようにシェルを介してコマンドを実行する関数は、ユーザー入力を直接渡さないでください。`child_process.execFile`や`spawn`のように、コマンドと引数を分離して渡す安全な代替手段を使用します。
*   **パス・トラバーサル対策:** ユーザー入力からファイルパスを構築する際は、`path.join`や`path.resolve`を使い、意図しないディレクトリへのアクセス（例: `../../...`）を防ぎます。
*   **依存関係の監査:** 定期的に`npm audit`を実行し、プロジェクトの依存関係に既知の脆弱性がないかを確認します。CIプロセスに`npm audit --audit-level=high`のようなコマンドを組み込むことを推奨します。

---

## 10. その他 (Miscellaneous)

*   **ロギング:** 本番環境ではJSON形式で出力できる構造化ロギングライブラリ（例: `pino`, `winston`）の利用を推奨します。これにより、ログの検索や集計が容易になります。


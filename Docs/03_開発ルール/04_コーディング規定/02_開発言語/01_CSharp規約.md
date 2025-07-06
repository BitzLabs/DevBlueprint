# 01.C# コーディング規約

このドキュメントでは、`DevBlueprint`を利用するプロジェクトでC#を記述する際の、コーディングスタイルと規約について定めます。

!!! note "共通原則との関係"
    本規約は、**[01.共通/01_共通コーディング原則](../../01_共通/01_共通コーディング原則.md)**を、C#言語に特化・具体化したものです。必ず共通原則にも目を通してください。

---

## 1. 基本方針

*   本プロジェクトのコーディングスタイルは、基本的に**Microsoftが提唱するC#のコーディング規則**に準拠します。
    *   **公式ガイド:** [C# のコーディング規則 - Microsoft Docs](https://learn.microsoft.com/ja-jp/dotnet/csharp/fundamentals/coding-style/coding-conventions)
    *   **命名ガイドライン:** [名前付けのガイドライン - Microsoft Docs](https://learn.microsoft.com/ja-jp/dotnet/standard/design-guidelines/naming-guidelines)

## 2. 命名規則 (抜粋)

*   **`PascalCase`**: クラス名、メソッド名、プロパティ名、enum型名など、全ての`public`メンバー。
*   **`camelCase`**: メソッドの引数名、ローカル変数名。
*   **インターフェース名**: 接頭辞 `I` を付け、`PascalCase`。（例: `IUserService`）
*   **プライベートフィールド**: 接頭辞 `_` を付け、`camelCase`。（例: `_logger`）

## 3. フォーマット

*   コードのフォーマットは、.NET公式のフォーマットツールである**`dotnet format`**によって、機械的に統一します。
*   `dotnet format`は、リポジトリのルートに配置された**`.editorconfig`**ファイルで定義されたルールを読み込み、それに従ってコードを自動整形します。
*   開発者は、コミット前に`dotnet format`コマンドを実行するか、エディタのフォーマット機能（Visual Studioの`Ctrl+K, D`など）を利用して、ファイルが規約通りであることを保証してください。

!!! success "CI/CDによる自動チェック"
    GitHub Actionsのワークフローに`dotnet format --verify-no-changes`コマンドを組み込むことで、フォーマットが規約に違反しているコードのマージを自動的にブロックできます。

## 4. 言語機能の利用方針 (.NET 6.0以降)

最新のC#言語機能を積極的に活用し、コードの簡潔性、可読性、安全性を高めます。

*   **`var` の使用:** 型が右辺から自明な場合は積極的に使用します。
*   **null許容参照型 (`#nullable enable`):** 全てのプロジェクトで**有効化**します。
*   **ファイルスコープ名前空間:** 新しいファイルでは、必ずファイルスコープ名前空間を使用します。
*   **`global using` ディレクティブ:** プロジェクト全体で共通して使用する名前空間は、`GlobalUsings.cs`のような専用ファイルにまとめて定義します。
*   **レコード型 (`record`):** DTO（データ転送オブジェクト）や、不変性（Immutability）が重要な型には、`record class`または`record struct`の利用を第一候補とします。

## 5. APIのドキュメンテーション

*   **XMLドキュメントコメント (`///`) は使用しない:**
    *   公開APIの仕様や説明は、ソースコード内ではなく、**[02.設計仕様/01.API仕様書/](../../../02_設計仕様/01_API仕様書/README.md)**で定義されるMarkdown形式のAPI仕様書に記述します。
*   これにより、ドキュメントとコードの関心を分離し、ソースコードの可読性を保ちます。

## 6. 要求IDとの連携

*   **[01.共通/01_共通コーディング原則](../../01_共通/01_共通コーディング原則.md)**で定められた通り、機能の実装やテストコードには、対応する要求IDをコメントとして明記します。
*   特にテストコードでは、可読性と機械的な処理のしやすさを考慮し、**カスタムアトリビュート**の利用を推奨します。
    ```csharp
    // REQ-AUTH-1.2: アカウントロックのロジック
    public void LockUserAccount(User user)
    {
        // ...
    }
    
    [Fact]
    [Requirement("REQ-AUTH-1.2")] // テストコードではアトリビュートを推奨
    public void LockUserAccount_WhenLoginAttemptsExceeded_ShouldLockAccount()
    {
        // ...
    }
    ```

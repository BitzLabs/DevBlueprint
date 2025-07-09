# 01.C# コーディング規約

このドキュメントでは、本プロジェクトでC#を記述する際の、コーディングスタイルと規約について定めます。

!!! note "共通原則との関係"
    本規約は、**[01.共通コーディング原則](../../01_共通規則/01_共通コーディング原則.md)** をC#言語に特化・具体化したものです。必ず共通原則にも目を通してください。

---

## 1. 基本方針 (Guiding Principles)

*   本プロジェクトのコーディングスタイルは、基本的に**Microsoftが提唱するC#のコーディング規則**に準拠します。
    *   **公式ガイド:** [C# のコーディング規則 - Microsoft Docs](https://learn.microsoft.com/ja-jp/dotnet/csharp/fundamentals/coding-style/coding-conventions)
    *   **命名ガイドライン:** [名前付けのガイドライン - Microsoft Docs](https://learn.microsoft.com/ja-jp/dotnet/standard/design-guidelines/naming-guidelines)

## 2. 命名規則 (Naming Conventions)

*   **PascalCase**: クラス名、メソッド名、プロパティ名、イベント名、enum型名、enumメンバー名、定数 (`const`)、読み取り専用静的フィールド (`static readonly`)。
*   **camelCase**: メソッドの引数名、ローカル変数名。
*   **インターフェース名**: 接頭辞 `I` を付け、PascalCase。例: `IBufferProvider`。
*   **プライベートインスタンスフィールド**: 接頭辞 `_` を付け、camelCase。例: `_internalBuffer`。
*   **非公開の静的フィールド**: `s_` プレフィックス (camelCase) または `t_` プレフィックス (スレッド静的な場合、camelCase)。

## 3. レイアウトと書式設定 (Layout and Formatting)

### 3.1. ツールによる自動適用

*   手作業でのスタイル遵守は非効率であり、レビューのノイズとなるため、本プロジェクトではツールによる規約の遵守を強制します。
*   各ツールの設定は、リポジトリのルートに配置された **[.editorconfig](/.editorconfig)** ファイルで一元管理します。

*   **フォーマッター: `dotnet format`**
    *   **役割:** .NET公式のフォーマッター。コードの見た目（インデント、スペース、改行など）を、議論の余地なく統一します。
*   **リンター: Roslyn Analyzers**
    *   **役割:** .NETコンパイラプラットフォーム（Roslyn）に統合された静的コード解析機能です。フォーマッターが「見た目」を整えるのに対し、リンターは**「コードの品質」**をチェックします。
    *   **検出内容の例:**
        *   潜在的なバグ（例: `Dispose`されるべきオブジェクトがされていない）
        *   パフォーマンスの問題（例: LINQの非効率な使い方）
        *   C#のベストプラクティスに反するコード（例: `async void`の不適切な使用）
    *   **推奨パッケージ:** `StyleCop.Analyzers` などのアナライザーパッケージを導入し、より詳細なルールを適用することを推奨します。

!!! success "CI/CDによる自動チェック"
    GitHub Actionsのワークフローに`dotnet format --verify-no-changes`を組み込むことで、フォーマットが規約に違反しているコードのマージを自動的にブロックします。ビルド時にアナライザーの警告をエラーとして扱う設定も推奨されます。

### 3.2. 主要な書式ルール

以下に示す主要な書式ルールは、`.editorconfig` の設定に基づき、`dotnet format` や Roslyn Analyzer によって自動的に適用・チェックされます。

*   **インデント**: 半角スペース4つ。タブは使用せず、エディタの設定でスペースに自動変換することを推奨します。
*   **波括弧 `{}`**:
    *   型定義、名前空間、メソッド、制御構文など、全てのブロックで波括弧は次の行に配置します (Allmanスタイル)。
    *   1行のステートメントでも、常に波括弧を使用します。
*   **`using`ディレクティブの順序**:
    *   `using`ディレクティブは、ファイルの先頭にまとめて配置します。
    *   `System`名前空間を常に先頭に配置し、その後はアルファベット順にソートすることを推奨します。
    *   この順序は、Visual Studioの機能や`dotnet format`によって自動的に整理できます。
*   **1行の長さ**: 約120文字以内を目安とします。
*   **空行**: メソッド間、論理ブロック間に適切に挿入します。
*   **スペース**: 演算子、カンマの前後などに適切に挿入します。
*   **`this.` の使用**: 原則として、曖昧さがない限り `this.` は省略します。

## 4. コメント (Comments)

*   **XMLドキュメントコメント (`///`) の不使用:**
    *   本プロジェクトでは、ソースコードの可読性を優先するため、**公開APIに対するXMLドキュメントコメント (`///`) は原則として使用しません。**
    *   公開APIの仕様や説明は、ソースコード内ではなく、**[02.設計仕様/01.API仕様](../../../02_設計仕様/01_API仕様/README.md)** に記述します。
*   **通常のコメント (`//` または `/* ... */`)**:
    *   コードの意図が自明でない場合、複雑なロジック、将来の改善点（`// TODO:`）などを説明するために使用します。
    *   コードが「何をしているか」よりも「**なぜそうしているのか**」という設計意図や背景を説明するように心がけます。
    *   コメントは、コードの変更に合わせて常に最新の状態に保ちます。
*   **要求IDとの連携**:

    *   **[01.共通コーディング原則](../../01_共通規則/01_共通コーディング原則.md)** で定められた通り、機能の実装やテストコードには、対応する要求IDをコメントとして明記します。
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

## 5. 言語機能の利用方針 (Language Feature Usage)


ターゲットフレームワークは .NET 6 以上であるため、最新のC#言語機能を適切に活用し、コードの簡潔性、可読性、安全性を高めることを目指します。
このセクションでは、利用を推奨する主要な言語機能を目的別に分類して解説します。

### 5.1. 基本的なスタイルと構文 (Basic Style and Syntax)

*   **`var` の使用**:
    *   **目的**: 型が右辺から明らかな場合（`new()`やLINQクエリなど）は、`var`を積極的に使用し、コードの冗長性を減らします。
    *   **注意**: `var number = 10;` のように、右辺の型が曖昧になる可能性がある場合は、可読性のために型を明示します (例: `int number = 10;`)。

*   **プロパティ**:
    *   **目的**: フィールドは原則 `private` とし、外部への公開はプロパティ経由で行います。
    *   **理由**: これにより、クラスの内部実装を隠蔽する**カプセル化**が促進されます。将来的に値の取得・設定時にバリデーションやロギングなどのロジックを追加したくなった場合でも、クラスの利用側に影響を与えることなく変更できます。

*   **式形式メンバー**:
    *   **目的**: 単一の式で構成される単純なメソッドやプロパティは、`=>` を使った式形式メンバーで簡潔に記述することを推奨します。
    *   **理由**: `{ return ...; }` のような定型的なコードを削減し、コードの可読性を高めます。

*   **`using` ステートメント/宣言**:
    *   **目的**: `IDisposable` を実装したリソース（ファイルストリーム、DB接続など）を扱う際は、`using` ステートメントまたは `using` 宣言を必ず使用し、リソースの確実な解放を保証します。
    *   **推奨**: C# 8.0以降で利用可能な `using` 宣言 (`using var ...;`) は、`{}`によるネストを減らせるため、より推奨されます。

*   **ファイルスコープ名前空間**:
    *   **目的**: C# 10.0以降で利用可能です。新しいファイルでは、ネストを一段階減らせるファイルスコープ名前空間 (`namespace MyNamespace;`) を積極的に採用します。
    *   **理由**: コード全体のインデントを浅くし、視覚的なノイズを減らします。

*   **`global using` ディレクティブ**:
    *   **目的**: C# 10.0以降で利用可能です。プロジェクト全体で共通して使用する名前空間（例: `System`, `System.Linq`など）は、専用のファイル (例: `GlobalUsings.cs`) にまとめて定義します。
    *   **理由**: 各ファイルの先頭にある反復的な `using` ディレクティブを削減し、ファイルを本来のロジックに集中させます。

### 5.2. データ構造と不変性 (Data Structures and Immutability)

*   **レコード型 (`record class`, `record struct`)**:
    *   **目的**: 主にデータを保持することを目的とし、不変性（イミュータビリティ）が重要な場合に、クラスの代わりにレコードを強く推奨します。特に、DTO (Data Transfer Object) や、状態を表すモデルに最適です。
    *   **理由**: レコードは、コンパイラが自動的にコンストラクタ、プロパティ、値ベースの等価性比較 (`Equals`, `GetHashCode`)、`ToString()`、そして非破壊的な変更を可能にする `with` 式を生成してくれるため、ボイラープレートコードを大幅に削減し、コードの意図を明確にします。

    *   **基本的な使い方**:
        ```csharp
        // 良い例: 簡潔で不変なデータ構造を定義できる
        public record User(int Id, string Name, string Email);
        ```

    *   **クラスとの比較**:
        ```csharp
        // 悪い例: 従来のクラスで不変性と値の等価性を実現しようとすると、多くのコードが必要
        public class OldUser
        {
            public int Id { get; }
            public string Name { get; }

            public OldUser(int id, string name)
            {
                Id = id;
                Name = name;
            }

            // Equals, GetHashCode, ToString() などのオーバーライドが別途必要...
        }
        ```

    *   **非破壊的な変更 (`with` 式)**:
        `with` 式を使うことで、元のオブジェクトを変更せずに、一部のプロパティだけが異なる新しいインスタンスを安全に作成できます。
        ```csharp
        var user1 = new User(1, "Alice", "alice@example.com");
        var user2 = user1 with { Name = "Bob" }; // user1は変更されない

        // user2 は Id=1, Name="Bob", Email="alice@example.com" の新しいレコードです
        ```

    *   **`record class` vs `record struct`**:
        *   デフォルトの `record` は `record class` と同じで、参照型です。
        *   `record struct` を使うと、値型のレコードを定義できます。
        *   基本的な使い分けは、通常の `class` と `struct` の使い分けの指針に従います。
*   **`init` アクセサ**:
    *   **目的**: オブジェクトの不変性（イミュータビリティ）を確保しつつ、オブジェクト初期化子 (`{ ... }`) を使った柔軟なインスタンス生成を可能にするために使用します。
    *   **理由**: `init` アクセサを持つプロパティは、**コンストラクタまたはオブジェクト初期化子でのみ**値を設定できます。インスタンス化された後は、その値を変更できなくなります。これにより、`readonly` フィールドのような堅牢性と、プロパティを使った初期化の利便性を両立できます。
    *   **基本的な使い方**:
        ```csharp
        // 良い例: 初期化後は変更不可能なプロパティを定義できる
        public class Person
        {
            public string FirstName { get; init; } = string.Empty;
            public string LastName { get; init; } = string.Empty;
        }

        // オブジェクト初期化子で設定可能
        var person = new Person { FirstName = "Taro", LastName = "Yamada" };

        // 初期化後の変更はコンパイルエラーになる
        // person.FirstName = "Jiro"; // Error!
        ```
    *   **レコード型との組み合わせ**:
        `init` アクセサは、位置指定レコードだけでなく、通常の `record class` や `record struct` でも明示的に使用でき、不変なデータ構造を柔軟に定義する上で中心的な役割を果たします。
        ```csharp
        public record class User
        {
            public int Id { get; init; }
            public string Name { get; init; } = "";
            public DateTime CreatedAt { get; } = DateTime.UtcNow; // initではなくgetのみでもOK
        }
        ```
*   **タプル**: メソッドから複数の値を返す、シンプルで軽量な方法としてタプルを適切に利用します。

### 5.3. 安全性と堅牢性 (Safety and Robustness)

*   **null許容参照型 (`#nullable enable`)**: プロジェクト全体で有効化し、`null`参照に起因するバグをコンパイル時に検出できるようにします。

### 5.4. クエリと制御フロー (Query and Control Flow)

*   **LINQ (Language-Integrated Query)**:
    *   **基本方針**: コレクション操作には、`for`や`foreach`ループよりも宣言的で可読性の高いLINQを積極的に利用します。

    *   **メソッド構文を推奨**:
        *   **理由**: メソッド構文 (`.Where(...).Select(...)`) は、他の多くの言語のコレクション操作（例: JavaScriptの配列メソッド）と一貫性があり、メソッドチェーンとして自然に記述できます。
        *   **例外**: 複数の `from` や `let` が絡む複雑なクエリで、クエリ構文の方が可読性が向上する場合にのみ、その使用を許容します。

    *   **遅延実行 (Deferred Execution)**:
        *   **概要**: `Where`や`Select`などの多くのLINQメソッドは、`ToList()`や`foreach`などで結果が実際に必要になるまで実行されません。この「遅延実行」の特性を常に意識してください。
        *   **注意点**: この特性を理解せずに同じクエリを複数回列挙すると、その都度クエリが再実行され、意図しないパフォーマンス低下を招きます。特にデータベースクエリ（Entity Frameworkなど）では、複数回のDBアクセスが発生する原因となります。
        *   **対策**: 結果を一度だけ評価し、キャッシュしたい場合は、**`ToList()`**, **`ToArray()`**, **`ToDictionary()`** などを明示的に呼び出します。
            ```csharp
            // 悪い例: ループのたびにusers.Whereが再実行される
            var activeUsers = users.Where(u => u.IsActive);
            Console.WriteLine(activeUsers.Count()); // 1回目の実行
            foreach (var user in activeUsers) // 2回目の実行
            {
                // ...
            }

            // 良い例: ToList()で一度だけ評価し、結果をキャッシュする
            var activeUsersList = users.Where(u => u.IsActive).ToList();
            Console.WriteLine(activeUsersList.Count); // キャッシュされたリストの件数を取得
            foreach (var user in activeUsersList) // キャッシュされたリストをループ
            {
                // ...
            }
            ```

    *   **適切なメソッドの選択**:
        *   **`Any()` vs `Count()`**:
            *   コレクションに要素が1つ以上存在するかをチェックする場合、`Count() > 0` ではなく、より効率的な **`Any()`** を使用します。
            *   **理由**: `Any()` は条件に合う要素を1つ見つけた時点で評価を終了しますが、`Count()` はコレクションの全要素を数えるため、パフォーマンスに差が出ます。
        *   **`First()` vs `Single()`**:
            *   **`First()`**: シーケンスの最初の要素を取得します。要素が存在しない場合は例外をスローします。
            *   **`FirstOrDefault()`**: 最初の要素を取得しますが、存在しない場合はデフォルト値（通常は`null`）を返します。**例外を避けたい場合に推奨されます。**
            *   **`Single()`**: シーケンスに要素が**ちょうど1つだけ**存在することを期待する場合に使用します。要素が0個または2個以上の場合は例外をスローします。
            *   **`SingleOrDefault()`**: `Single()`と同様ですが、要素が0個の場合はデフォルト値を返します（2個以上の場合は例外）。

    *   **可読性**: 長いメソッドチェーンは、各メソッドの呼び出しで改行し、インデントを揃えることで可読性を高めます。
        ```csharp
        // 良い例
        var activeUserNames = users
            .Where(user => user.IsActive)
            .OrderBy(user => user.LastName)
        var userNames = users
            .Where(user => user.Email.EndsWith("@example.com"))
            .OrderBy(user => user.Name)
            .Select(user => user.Name);
        ```
        
*   **パターンマッチング**:
    *   **目的**: 複雑な型チェックや条件分岐を、より宣言的で可読性の高いコードで記述するために、`is` や `switch` 式を使ったパターンマッチングを積極的に活用します。
    *   **理由**: 従来の `if-else` の連鎖や `switch` ステートメントに比べ、コードのネストを浅くし、ボイラープレートコードを削減できます。

    *   **型パターンとプロパティパターン (`is`)**:
        `is` キーワードを使うことで、型チェックと同時にプロパティの検証も簡潔に行えます。
        ```csharp
        // Before: 従来の型チェックとキャスト
        if (shape is Rectangle)
        {
            var rect = (Rectangle)shape;
            if (rect.Height > 100)
            {
                // ...
            }
        }

        // After: isを使った型パターンとプロパティパターン
        if (shape is Rectangle { Height: > 100 } rect)
        {
            // rect は既に Rectangle 型としてキャスト済み
            // ...
        }
        ```

    *   **`switch` 式**:
        複数の条件分岐を、より関数的なスタイルで記述できます。
        ```csharp
        // 従来の switch ステートメントよりも簡潔で、網羅性のチェックも効きやすい
        var message = shape switch
        {
            Circle { Radius: < 10 } => "小さな円です",
            Rectangle { Width: > 1000 } => "巨大な長方形です",
            _ => "その他の図形です" // _ は default ケース
        };
        ```

## 6. エラー処理と例外 (Error Handling and Exceptions)

*   **基本方針**: エラーは握りつぶさず、例外を用いて明確に通知します。ただし、パフォーマンスが重要な場面では、例外を通常の制御フローとして使用することは避けます。

*   **`try-catch` の使い方**:
    *   `catch` ブロックでは、処理可能な特定の例外型を捕捉します。`catch (Exception)` のような汎用的な例外の捕捉は、意図しないエラーを隠蔽する可能性があるため、最上位のハンドラなど、限定的な場面でのみ使用します。
    *   例外を再スローする場合は、スタックトレースを維持するために `throw;` を使用します。

*   **標準例外の使い分け**:
    *   フレームワークが提供する標準的な例外を、その目的に合わせて適切に使用します。
    *   **`ArgumentNullException`**: メソッドの引数が `null` で、それが許容されない場合にスローします。
    *   **`ArgumentException`**: 引数の値が不正である場合にスローします。
    *   **`InvalidOperationException`**: オブジェクトが現在の状態ではメソッドを呼び出せない場合にスローします。

*   **カスタム例外の定義**:
    *   ドメイン固有のエラー状態を表すために、カスタム例外を定義することができます。
    *   カスタム例外は、`Exception` クラス（またはより具体的な例外クラス）を継承し、クラス名には `Exception` 接尾辞を付けます。
    *   標準のコンストラクタパターン（メッセージ、内部例外を受け取る）を実装することを推奨します。

## 7. 非同期処理 (`async`/`await`)

*   **基本方針**: I/Oバウンドな操作（ファイルアクセス、ネットワーク通信など）や、長時間実行される可能性のある処理では、スレッドをブロックしないように `async` と `await` を積極的に利用します。

*   **命名規則**: 非同期メソッドには、必ず `Async` 接尾辞を付けます。
    *   例: `public Task<User> GetUserAsync(int id);`

*   **戻り値の型**:
    *   **原則: `Task` / `Task<T>` を使用:**
        *   **理由:** `Task`は参照型であり、複数回 `await` したり、複数の待機コンシューマーに渡したりする操作が安全かつ直感的に行えます。ほとんどのアプリケーションコードでは、このシンプルさと安全性を優先し、`Task` / `Task<T>` を使用します。
    *   **例外: `ValueTask` / `ValueTask<T>` の利用を検討するケース:**
        *   **目的:** パフォーマンスが非常にクリティカルなライブラリコードで、かつ、メソッドが**同期的に完了する可能性が高い**場合に、不要なヒープアロケーションを避けるために `ValueTask` / `ValueTask<T>` の利用を検討します。
        *   **具体例 (キャッシュからのデータ取得):**
            ```csharp
            // ValueTask を効果的に使える例
            public ValueTask<User> GetUserByIdAsync(int id)
            {
                // キャッシュにデータがあれば、Taskを生成せずに同期的に結果を返す
                if (_cache.TryGetValue(id, out User user))
                {
                    return new ValueTask<User>(user);
                }

                // キャッシュになければ、非同期にDBから取得する
                // この時だけ Task が生成される
                return new ValueTask<User>(FetchUserFromDbAsync(id));
            }
            ```
    *   **`ValueTask` の厳格なルール:**
        *   `ValueTask` は **一度しか `await` できません。** 複数回 `await` すると、予期しない動作を引き起こす可能性があります。
            ```csharp
            // 悪い例: ValueTask を複数回 await している
            var userValueTask = GetUserByIdAsync(1);
            var user1 = await userValueTask; // 1回目: OK
            var user2 = await userValueTask; // 2回目: NG! 未定義の動作を引き起こす
            ```
        *   複数回 `await` する必要がある場合や、複数のコンシューマーに渡す場合は、`.AsTask()` を呼び出して `Task` に変換してください。
        *   `ValueTask` は構造体（struct）であるため、意図しないコピーによるバグを防ぐため、`readonly` 修飾子を付けて宣言することを推奨します。
    *   **`.Result` や `.GetAwaiter().GetResult()` の使用禁止**:
        *   **理由:** これらの同期的な待機は、UIスレッドやASP.NET Coreのリクエストスレッドのような、単一スレッドの同期コンテキストを持つ環境で**デッドロック**を引き起こす可能性があります。`await` がコンテキストを解放するのを待機中のスレッドが、`.Result` によってブロックされ、結果として `await` が完了できなくなるためです。
        *   **規則:** `Task` や `ValueTask` のいずれに対しても、原則として使用を禁止します。

*   **`async void` の禁止**:
    *   **理由:** `async void` メソッド内で発生した例外は、呼び出し元で `try-catch` しても捕捉できず、アプリケーション全体のクラッシュに繋がる可能性があります。
    *   **規則:** イベントハンドラなど、呼び出し元が待機する必要のないごく一部の特殊なケースを除き、`async void` の使用は**原則として禁止**します。非同期処理が必要な場合は、必ず `async Task` を使用してください。
    *   **具体例 (例外が捕捉できないケース):**
        ```csharp
        // 悪い例: async void 内の例外は呼び出し元でキャッチできない
        public async void RunOperation()
        {
            await Task.Delay(100);
            throw new InvalidOperationException("This exception will crash the application.");
        }

        public void Caller()
        {
            try
            {
                RunOperation(); // 例外はここでは捕捉されない
            }
            catch (Exception ex)
            {
                // このブロックには到達しない
                Console.WriteLine("Caught: " + ex.Message);
            }
        }
        ```

*   **`ConfigureAwait(false)` の利用**:
    *   **目的**: **汎用的なライブラリコード**内では、デッドロックを避けるために `await` の後には必ず **`.ConfigureAwait(false)`** を付けます。
    *   **理由**: UIスレッドやASP.NETの旧リクエストコンテキストなど、特定の「同期コンテキスト」を持つ環境では、`await`後の処理を元のスレッドで再開しようとします。もしライブラリを呼び出したコードが、非同期タスクの完了を同期的に (`.Result` や `.Wait()`) 待っていると、UIスレッドがブロックされ、`await`後の処理が再開できずにデッドロックが発生します。`.ConfigureAwait(false)` は、この「元のコンテキストに戻る」という挙動を抑制し、デッドロックを防ぎます。
    *   **使い分け**:
        *   **ライブラリコードでは必須**:
            ```csharp
            // 良い例: ライブラリ内の非同期メソッド
            public async Task<string> GetDataFromApiAsync(string url)
            {
                using (var client = new HttpClient())
                {
                    // 呼び出し元のコンテキストを意識しない
                    var content = await client.GetStringAsync(url).ConfigureAwait(false);
                    return ProcessData(content);
                }
            }
            ```
        *   **アプリケーションコード（UIイベントハンドラ等）では不要**:
            UI要素の更新など、元のコンテキストで処理を続ける必要がある場合は使用しません。

*   **キャンセルのサポート (`CancellationToken`)**:
    *   完了までに時間がかかる可能性のある非同期操作には、**`CancellationToken`** を引数として受け取り、キャンセルの要求を適切に処理できるように設計することを強く推奨します。
    ```csharp
    public async Task LongRunningOperationAsync(CancellationToken cancellationToken)
    {
        // ...
        cancellationToken.ThrowIfCancellationRequested();
        // ...
    }
    ```

*   **`Task.Run` との使い分け**:
    *   `async`/`await` は主に **I/Oバウンド**な処理の非同期化に用います。
    *   CPUを長時間占有する**CPUバウンド**な処理をUIスレッドなどからオフロードする場合は、`Task.Run` を使用して、処理をバックグラウンドのスレッドプールに委譲します。
    ```csharp
    // CPUバウンドな重い処理
    private int HeavyCalculation() { /* ... */ return 42; }
    // UIスレッドなどから呼び出す場合
        int result = await Task.Run(() => HeavyCalculation()).ConfigureAwait(false);
        // UIスレッドに戻ってきて結果を表示
        resultLabel.Content = result.ToString();
    }
    ```

## 8. パフォーマンスに関する考慮事項 (Performance Considerations)

*   **文字列結合**: ループ内で多数の文字列を結合する場合は、`+`演算子や文字列補間ではなく、`StringBuilder`クラスを使用します。
*   **`struct` vs `class`**: 小さなデータ構造で、不変性が高く、コピーのコストが低い場合は、ヒープ割り当てを避けるために`struct`（特に`readonly struct`）の利用を検討します。
*   **例外処理のコスト**: パフォーマンスが非常にクリティカルなコードパスでは、例外を通常の制御フローとして使用しないでください。`try-catch`ブロックはオーバーヘッドを伴います。
*   **ボックス化の回避**: 値型を`object`型やインターフェース型として扱う際に発生するボックス化（Boxing）は、パフォーマンスに影響を与える可能性があります。ジェネリクスを適切に利用して、不要なボックス化を避けてください。
*   **LINQの再確認**:
    *   LINQは可読性に優れますが、内部的には多くのオブジェクトを生成する場合があります。
    *   パフォーマンスが最重要視されるループ内などでは、従来の`for`ループや`foreach`ループの方が高速な場合があります。
    *   必ずしもLINQを避ける必要はありませんが、ボトルネックになっている場合は、プロファイリングを行った上で最適な方法を選択してください。

## 9. その他

*   **イミュータビリティ**: 可能な限り、イミュータブルな型やデータ構造の利用を検討します。
*   **コメントアウトされたコード**: 不要なコードは残さず、Gitで履歴を管理します。
*   **警告の扱い**: コンパイラの警告は原則として全て修正します。意図的な抑制は理由を明記し最小範囲で。

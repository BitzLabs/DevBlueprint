# 02.Python コーディング規約

このドキュメントでは、本プロジェクトでPythonを記述する際の、コーディングスタイルと規約について定めます。
Webアプリケーション開発から、CI/CDの補助スクリプトまで、幅広い用途を想定しています。

!!! note "共通原則との関係"
    本規約は、**[01.共通コーディング原則](../../01_共通規則/01_共通コーディング原則.md)** をPython言語に特化・具体化したものです。必ず共通原則にも目を通してください。

---

## 1. 基本方針 (Guiding Principles): PEP 8 準拠

*   本プロジェクトのコーディングスタイルは、基本的にPythonの公式スタイルガイドである **PEP 8** に準拠します。
*   コードの可読性と一貫性を保つため、全てのPythonコードはPEP 8で定められたルールに従って記述してください。

---

## 2. 命名規則 (Naming Conventions)

*   **`snake_case` (スネークケース):**
    *   関数名 (`def my_function():`)
    *   変数名 (`my_variable = 1`)
    *   モジュール名 (`my_module.py`)
*   **`PascalCase` (パスカルケース):**
    *   クラス名 (`class MyClass:`)
*   **`UPPER_SNAKE_CASE` (大文字のスネークケース):**
    *   定数 (`MY_CONSTANT = 100`)

---

## 3. レイアウトと書式設定 (Layout and Formatting)

### 3.1. ツールによる自動適用

*   コードのフォーマットは、以下のツールによって機械的に統一します。手作業でのスタイル遵守は非効率であり、レビューのノイズとなるため、ツールによる規約の遵守を強制します。
*   各ツールの設定は、リポジトリのルートに配置された **`pyproject.toml`** ファイルで一元管理します。
*   インデントスタイルや文字コードなど、エディタ間で共通の設定は **`.editorconfig`** ファイルにも記述し、ツールと連携させます。

*   **フォーマッター: `Black`**
    *   **役割:** 「議論の余地なく（uncompromising）」コードを整形するフォーマッター。細かいスタイルについて議論する時間をなくします。
    *   **公式サイト:** Black - The Uncompromising Code Formatter
*   **リンター: `Ruff`**
    *   **役割:** 非常に高速なリンター兼フォーマッター。PEP 8違反だけでなく、未使用の変数、未整理のimport、潜在的なバグやアンチパターンを検出します。`Flake8`など多くのツールの機能を内包しています。`Ruff`は`Black`互換のフォーマッターも内蔵しているため、`Ruff`のみで完結させることも可能です。
    *   **公式サイト:** Ruff - An extremely fast Python linter and code formatter

### 3.2. 主要な書式ルール

以下に示す主要な書式ルールは、`Black`や`Ruff`によって自動的に適用されます。

*   **インデント (Indentation):**
    *   PEP 8に従い、**半角スペース4つ**を使用します。タブ文字は使用しません。
*   **1行の長さ (Line Length):**
    *   `Black`のデフォルトである**88文字**を基準とします。これは`pyproject.toml`で変更可能です。
*   **クォーテーション (Quotes):**
    *   `Black`は、文字列を囲む引用符を**ダブルクォーテーション (`"`)** に統一します。
*   **空行 (Blank Lines):**
    *   トップレベルの関数やクラス定義の間には2行、クラス内のメソッド定義の間には1行など、PEP 8の規約に従って適切な空行が挿入されます。
*   **importの順序 (Import Order):**
    *   `Ruff`が`isort`互換の機能で、**標準ライブラリ → サードパーティライブラリ → プロジェクト内モジュール** の順に、アルファベット順で自動的に並び替えます。

!!! success "CI/CDによる自動チェック"
    GitHub Actionsのワークフローに`black --check`や`ruff check`コマンドを組み込むことで、フォーマットが規約に違反しているコードのマージを自動的にブロックします。

---

## 4.コメント (Comments)

*   **Docstring (`"""..."""`) の役割:**
    *   本プロジェクトでは、**02.設計仕様/01.API仕様** を仕様の正とし、ソースコードのDocstringは補助的な役割と位置づけます。
    *   型ヒントで自明な引数や戻り値の型を繰り返すような、冗長なDocstringは避けてください。
    *   公開APIの仕様や説明は、ソースコード内ではなく、**02.設計仕様/01.API仕様** に記述します。
    *   関数の目的や、複雑なロジックの概要を説明するための、**簡潔な一行Docstring**を記述することを推奨します。

*   **通常のコメント (`#`)**:
    *   コードが「何をしているか」よりも「**なぜそうしているのか**」という設計意図や背景を説明するために使用します。
    *   複雑なアルゴリズムや、一見して意図が分かりにくいコードには、簡潔なコメントを付与してください。

*   **要求IDとの連携**:
    *   **01.共通コーディング原則** で定められた通り、機能の実装やテストコードには、対応する要求IDをコメントとして明記します。
    *   テストコードでは、可読性と機械的な処理のしやすさを考慮し、**カスタムマーカー**の利用を推奨します。

    ```python
    # REQ-API-2.1: ユーザー情報を返すAPI
    def get_user_by_id(user_id: int) -> dict | None:
        """ユーザーIDに紐づくユーザー情報を取得する。"""
        # ...
        return None
    
    # REQ-API-2.1 のテストコード例
    import pytest
    
    @pytest.mark.requirement("REQ-API-2.1")
    def test_get_user_by_id_returns_correct_user():
        # ...
        pass
    ```

---

## 5.言語機能の利用方針 (Language Feature Usage)

Pythonのモダンな機能を適切に活用し、コードの簡潔性、可読性、安全性を高めることを目指します。

*   **型ヒント (Type Hinting) の積極的利用:**
    *   **全ての関数定義（引数と戻り値）**で、Python 3.9以降で導入された**型ヒント**を積極的に利用します。
    *   これにより、コードの可読性が向上し、`mypy`や`Ruff`のような静的解析ツールによる型チェックが可能になり、コードの堅牢性が高まります。
    *   `|` を使ったユニオン型や、`list[str]` のような組み込みジェネリック型の利用を推奨します。
    ```python
    # 良い例
    def greet(name: str) -> str:
        return f"Hello, {name}"

    def process_data(data: list[str] | None) -> int:
        if data is None:
            return 0
        return len(data)

    # 悪い例 (型ヒントがない)
    # def greet(name):
    #    return "Hello, " + name
    ```

*   **f-stringの利用:**
    *   文字列のフォーマットには、簡潔で可読性の高い**f-string**を第一選択とします。
    ```python
    # 良い例
    name = "World"
    message = f"Hello, {name}!"

    # 悪い例
    # message = "Hello, " + name + "!"
    # message = "Hello, {}!".format(name)
    ```

*   **`with`文によるリソース管理:**
    *   ファイルやソケット、データベース接続など、後処理が必要なリソースを扱う場合は、必ず**`with`文**を使用します。
    *   これにより、ブロックを抜ける際に自動的にリソースが解放され、`try...finally`ブロックを記述する手間を省き、コードを安全かつ簡潔に保ちます。
    ```python
    # 良い例
    with open("data.txt", "r", encoding="utf-8") as f:
        content = f.read()
    # ここでファイルは自動的にクローズされる

    # 悪い例
    # f = open("data.txt", "r", encoding="utf-8")
    # content = f.read()
    # f.close() # クローズし忘れる可能性がある
    ```

*   **データクラス (`dataclasses`):**
    *   主にデータを保持することを目的とするクラスには、Python 3.7で導入された**`@dataclass`デコレータ**の利用を推奨します。
    *   これにより、`__init__`、`__repr__`、`__eq__`などの特殊メソッドが自動で生成され、ボイラープレートコードを削減できます。
    ```python
    from dataclasses import dataclass

    @dataclass(frozen=True) # frozen=Trueでイミュータブルにできる
    class User:
        id: int
        name: str
        is_active: bool = True
    ```

*   **構造的パターンマッチング (`match`文):**
    *   Python 3.10以降で利用可能な場合、複雑な`if/elif/else`の連鎖を、より可読性の高い**`match`文**で置き換えることを検討します。
    *   特に、辞書やオブジェクトの構造に基づいた分岐に適しています。
    ```python
    def process_command(command: dict):
        match command:
            case {"type": "create", "user": name}:
                print(f"Creating user {name}...")
            case {"type": "delete", "user_id": user_id}:
                print(f"Deleting user {user_id}...")
            case _:
                print("Unknown command.")
    ```

---

## 6.エラー処理と例外 (Error Handling and Exceptions)

*   APIの境界では、不正な引数などに対して標準的な例外 (`ValueError`, `TypeError`等) をスローします。
*   エラーハンドリングに関する詳細な戦略は、今後専用のドキュメント（例: `03_エラーハンドリング戦略.md`）で定義・拡充される予定です。

---

## 7.非同期処理 (`async`/`await`)

### 7.1. 基本方針 (Basic Policy)

*   I/Oバウンドな操作（ネットワーク通信、データベースアクセスなど）や、長時間待機が発生する可能性のある処理では、スレッドをブロックしないように `async` と `await` を積極的に利用します。
*   Pythonの非同期処理は、単一のスレッド上でイベントループを用いて、多数のタスクを効率的に切り替えながら実行する**協調的マルチタスク**に基づいています。

### 7.2. コルーチンの定義と実行 (Defining and Running Coroutines)

*   **定義 (Definition):**
    *   非同期関数（コルーチン）は `async def` を使って定義します。
*   **実行 (Execution):**
    *   コルーチンは `await` キーワードを使って呼び出します。`await` は `async def` で定義された関数内でのみ使用できます。
    *   トップレベルで非同期処理を開始するには、`asyncio.run()` を使用します。
*   **タスクの並行実行 (Concurrent Execution):**
    *   複数のコルーチンを並行して実行したい場合は、`asyncio.gather()` や `asyncio.create_task()` を利用します。

```python
import asyncio

async def fetch_data(url: str) -> str:
    print(f"Fetching {url}...")
    # 実際には aiohttp などで非同期なネットワークリクエストを行う
    await asyncio.sleep(1) # I/O処理をシミュレート
    return f"Data from {url}"

async def main():
    # 複数のタスクを並行実行
    results = await asyncio.gather(
        fetch_data("https://example.com/1"),
        fetch_data("https://example.com/2"),
    )
    print(results)

if __name__ == "__main__":
    asyncio.run(main())
```

### 7.3. キャンセルのサポート (`asyncio.CancelledError`) (Cancellation Support)

*   完了までに時間がかかる可能性のある非同期操作は、キャンセル要求を適切に処理できるように設計することを推奨します。
*   `asyncio.Task` オブジェクトの `cancel()` メソッドを呼び出すことで、タスクにキャンセルを要求できます。
*   キャンセルされたタスクは、`await` された箇所で `asyncio.CancelledError` を送出します。この例外を `try...except` ブロックで捕捉し、クリーンアップ処理を行うことができます。

```python
import asyncio

async def long_running_task():
    try:
        for i in range(10):
            print(f"Working... {i}")
            await asyncio.sleep(1)
    except asyncio.CancelledError:
        print("Task was cancelled. Cleaning up...")
        # ここでリソースの解放などのクリーンアップ処理を行う
        raise

async def main():
    task = asyncio.create_task(long_running_task())
    await asyncio.sleep(3)
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        print("Main caught cancellation.")

if __name__ == "__main__":
    asyncio.run(main())
```

### 7.4. CPUバウンドな処理との使い分け (Distinction from CPU-bound operations)

*   `async`/`await` は主に **I/Oバウンド**な処理の効率化に用います。
*   CPUを長時間占有する**CPUバウンド**な処理（重い計算など）を非同期コード内で実行すると、イベントループ全体がブロックされてしまいます。
*   このような処理は、`loop.run_in_executor()` (またはPython 3.9以降の `asyncio.to_thread()`) を使用して、別のスレッドやプロセスに処理を委譲することを強く推奨します。

```python
import asyncio
import time

def cpu_bound_operation(duration: int):
    """CPUを長時間占有する同期関数"""
    print("CPU-bound operation started.")
    end_time = time.time() + duration
    while time.time() < end_time:
        pass # CPUを消費する重い計算をシミュレート
    print("CPU-bound operation finished.")

async def main():
    loop = asyncio.get_running_loop()
    # CPUバウンドな処理を別スレッドで実行し、イベントループをブロックしない
    await loop.run_in_executor(None, cpu_bound_operation, 2)
    print("Async operations can continue.")

if __name__ == "__main__":
    asyncio.run(main())
```

## 8.パフォーマンスに関する考慮事項 (Performance Considerations)

*   **文字列結合 (String Concatenation):**
    *   ループ内で多数の文字列を結合する場合は、`+`演算子やf-stringを繰り返し使用するのではなく、リストに一度追加してから**`"".join()`**メソッドを使用します。これは、文字列がイミュータブルであるため、`+`演算子では毎回新しい文字列オブジェクトが生成されるのを防ぐためです。
    ```python
    # 良い例
    parts = ["a", "b", "c", "d"]
    result = "".join(parts)

    # 悪い例
    # result = ""
    # for part in parts:
    #     result += part
    ```

*   **データ構造の選択 (Data Structure Choice):**
    *   **`tuple` vs `list`:** 変更の必要がないシーケンスには、イミュータブルな`tuple`を使用することを検討します。`tuple`は`list`よりもメモリ効率が良く、若干高速です。
    *   **`__slots__`の利用:** インスタンスが多数生成されるクラスでは、`__slots__`を定義することで、インスタンスごとの`__dict__`の作成を防ぎ、メモリ使用量を削減できます。
    ```python
    class Point:
        __slots__ = ["x", "y"]
        def __init__(self, x, y):
            self.x = x
            self.y = y
    ```

*   **例外処理のコスト (Exception Cost):**
    *   パフォーマンスが非常にクリティカルなコードパスでは、例外を通常の制御フローとして使用しないでください。`try-except`ブロックは、特に例外が実際に発生した場合にオーバーヘッドを伴います。
    *   例えば、辞書のキー存在チェックには、`try-except KeyError`よりも`key in dict`や`dict.get(key, default)`を使用する方が高速です。

*   **リスト内包表記とジェネレータ (List Comprehensions and Generators):**
    *   単純な`for`ループでリストを作成するよりも、**リスト内包表記**を使用する方が一般的に高速で、可読性も高くなります。
    *   非常に大きなデータセットを扱う場合は、一度に全ての要素をメモリに展開するリスト内包表記の代わりに、**ジェネレータ式** `(x for x in iterable)` を使用します。これにより、メモリ使用量を大幅に削減できます。
    ```python
    # 良い例 (リスト内包表記)
    squares = [x * x for x in range(1000)]

    # 良い例 (ジェネレータ式: メモリ効率が良い)
    squares_generator = (x * x for x in range(1000))
    for square in squares_generator:
        # ...
    ```

*   **適切な組み込み関数の利用 (Using Appropriate Built-in Functions):**
    *   Pythonの多くの組み込み関数（例: `sum()`, `map()`, `filter()`）はC言語で実装されており、非常に高速です。
    *   自前でループを実装する前に、同等の機能を持つ組み込み関数がないか検討してください。

## 9. その他 (Miscellaneous)

*   **イミュータビリティ (Immutability):**
    *   可能な限り、イミュータブルなデータ構造の利用を検討します。
    *   変更されるべきでないシーケンスには、`list`の代わりに`tuple`を使用します。
    *   `@dataclass`を使用する際は、`frozen=True`を指定することでイミュータブルなデータクラスを作成できます。

*   **コメントアウトされたコード (Commented-out code):**
    *   不要になったコードは、コメントアウトして残さずに、Gitのバージョン管理で履歴を追跡してください。リポジトリをクリーンに保ちます。

*   **リンターの警告の扱い (Handling Linter Warnings):**
    *   `Ruff`や`mypy`が出力する警告やエラーは、原則として全て修正します。
    *   これらは潜在的なバグや、規約違反、非効率なコードを示唆しているため、無視せずに対応してください。
    *   意図的に特定の警告を抑制する場合は、`# noqa: [エラーコード]` のように、理由を明記し、影響範囲を最小限に留めてください。

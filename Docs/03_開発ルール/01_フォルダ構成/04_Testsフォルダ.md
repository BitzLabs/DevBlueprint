# 04. Testsフォルダ

`Tests/`（または`tests/`）フォルダは、アプリケーションの品質を保証するための**自動テストコード**を格納する場所です。

ここに格納されるテストは、開発者がコードの変更を行うたびに実行され、リグレッション（意図しない機能の破壊）がないことを継続的に確認します。

!!! success
"テストは品質のセーフティネット" 充実した自動テストは、自信を持ってリファクタリングや機能追加を行うための強力なセーフティネットとなります。全てのコード変更は、対応するテストと共にコミットされるべきです。

---

## フォルダ構成の基本原則

`Tests/`フォルダ内の構成は、`Src/`フォルダの構成と鏡合わせ（ミラーリング）になるように、以下の原則に従うことを強く推奨します。

- **テスト対象プロジェクトごとにテストプロジェクトを作成:**
  - `Src/`内のテストしたいプロジェクト（例:
    `MyApi.Application`）一つに対して、`Tests/`内に対応するテストプロジェクト（例:
    `MyApi.Application.Tests`）を一つ作成します。
- **命名規則の統一:**
  - テストプロジェクトの名前は、テスト対象のプロジェクト名に `.Tests`
    という接尾辞を付けることを標準とします。（例: `BitzLabs.MyLibrary` →
    `BitzLabs.MyLibrary.Tests`）
- **内部のフォルダ構造も合わせる:**
  - テストプロジェクト内のフォルダ構造も、可能であればテスト対象の構造に合わせます。これにより、どのクラスのテストがどこにあるかが見つけやすくなります。（例:
    `Services/UserService.cs`のテストは`Services/UserServiceTests.cs`に）

---

## 構成パターン例

`Src/`フォルダの構成例に対応する形で、`Tests/`フォルダの構成例を示します。

### 例1: Web API + クラスライブラリ (C# .NET)

テスト対象のプロジェクト（`Api`, `Application`,
`Domain`）それぞれに対応するテストプロジェクトを作成します。

```
Tests/
├── MyApi.Api.Tests/
│   ├── Controllers/
│   └── MyApi.Api.Tests.csproj
│
├── MyApi.Application.Tests/
│   ├── Services/
│   └── MyApi.Application.Tests.csproj
│
└── MyApi.Domain.Tests/
    ├── Entities/
    └── MyApi.Domain.Tests.csproj
```

### 例2: Webフロントエンド (Node.js/TypeScript)

`__tests__`フォルダや`.test.ts` /
`.spec.ts`といった命名規則で、テスト対象のファイルの隣にテストファイルを置く構成も一般的ですが、テストを分離する場合は以下のような構成になります。

```
Tests/
├── components/
│   └── Button.test.ts
├── pages/
│   └── Index.test.ts
└── setup.ts  # テスト全体のセットアップファイル
```

### 例3: ライブラリ開発

ライブラリ本体のテストに加え、異なる種類のテスト（単体、結合、パフォーマンス）をフォルダで分ける構成も有効です。

```
Tests/
├── BitzLabs.MyLibrary.UnitTests/     # 単体テストプロジェクト
│   └── ...
│
├── BitzLabs.MyLibrary.IntegrationTests/ # 結合テストプロジェクト
│   └── ...
│
└── BitzLabs.MyLibrary.Benchmarks/    # パフォーマンステストプロジェクト
    └── ...
```

---

!!!
note自動テストの具体的な戦略や種類（単体、結合、E2Eなど）については、**[04.テスト仕様/01.テスト戦略](../../04_テスト仕様/01_テスト戦略.md)**
で別途定義します。このドキュメントは、あくまでテストコードの「配置場所」に関するルールを定めるものです。

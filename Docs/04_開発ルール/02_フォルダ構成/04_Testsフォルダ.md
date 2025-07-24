# 04. Testsフォルダ

`Tests/`（または `tests/`）フォルダは、アプリケーションの品質を保証するための**自動テストコード**を一元的に格納する場所です。

ここに格納されるテストは、CI/CDパイプラインによってコード変更のたびに自動実行され、リグレッション（意図しない機能の劣化や破壊）の発生を早期に検知するためのセーフティネットとして機能します。

!!! success "テストは品質のセーフティネット"
充実した自動テストは、開発者が自信を持ってリファクタリングや機能追加を行うための強力な基盤となります。
原則として、全ての機能追加やバグ修正は、対応するテストコードと共にバージョン管理されるべきです。

---

## フォルダ構成の基本原則

`Tests/` フォルダの内部構成は、テスト対象である `Src/` フォルダの構成と対応関係が明確であることが理想です。以下の原則に従うことを強く推奨します。

- **テスト対象とのミラーリング**:
  `Src/` 内のテスト対象プロジェクト（例: `YourProject.Api`）一つに対して、`Tests/` 内に対応するテストプロジェクト（例: `YourProject.Api.Tests`）を一つ作成します。これにより、どのコードがどのテストによって検証されているかが一目瞭然になります。

- **命名規則の統一**:
  テストプロジェクトの名前は、テスト対象のプロジェクト名に `.Tests` や `.UnitTests` のような一貫した接尾辞を付けることを標準とします。（例: `YourProject.Core` → `YourProject.Core.Tests`）

- **内部構造の反映**:
  テストプロジェクト内のフォルダ構造も、可能な限りテスト対象の構造に合わせます。
  これにより、テスト対象のクラスや関数に対応するテストコードを容易に特定できます。
  （例: `Services/UserService.cs` のテストは `Services/UserServiceTests.cs` に記述する）

---

## 構成パターン例

`Src/` フォルダの構成例に対応する形で、`Tests/` フォルダの構成例を示します。

### 例1: C#/.NET プロジェクトの場合

テスト対象の各プロジェクト（`.Api`, `.Application`, `.Domain`）に対応するテストプロジェクトを作成します。

```text
Tests/
├── YourProject.Api.Tests/
│   ├── Controllers/
│   └── YourProject.Api.Tests.csproj
│
├── YourProject.Application.Tests/
│   ├── Services/
│   └── YourProject.Application.Tests.csproj
│
└── YourProject.Domain.Tests/
    ├── Entities/
    └── YourProject.Domain.Tests.csproj
```

### 例2: JavaScript/TypeScript プロジェクトの場合

テストファイルを `Src/` 内に配置する (`__tests__` フォルダや `*.spec.ts` ファイル) 方法も一般的ですが、テストコードを分離する場合は以下のような構成が考えられます。

```text
Tests/
├── components/
│   └── Button.spec.ts
├── features/
│   └── Auth.spec.ts
└── setup.ts  # テスト全体の初期設定を行うファイル
```

### 例3: テストの種類による分割

単体テスト、結合テスト、E2E（End-to-End）テストなど、テストの種類ごとにプロジェクトやフォルダを分割するアプローチも有効です。

```text
Tests/
├── YourProject.UnitTests/          # 単体テスト
│   └── ...
│
├── YourProject.IntegrationTests/   # 結合テスト
│   └── ...
│
└── YourProject.E2ETests/           # E2Eテスト
    └── ...
```

---

!!! note
本ドキュメントは、あくまでテストコードの「配置場所」に関するルールを定めるものです。具体的なテスト戦略や種類（単体、結合、E2Eなど）については、別途 **テスト戦略** に関するドキュメントで定義します。

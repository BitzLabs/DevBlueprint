# 03. Srcフォルダ

`Src/`（または`src/`）フォルダは、このプロジェクトで開発される**全てのアプリケーションソースコード**を格納する、中心的な場所です。

!!! note "なぜ `Src` フォルダに置くのか？"
ソースコードをルートディレクトリに直接置かず、`Src/`フォルダにまとめることには、以下のようなメリットがあります。
ドキュメント(`Docs/`)、CI設定(`.github/`)、ソースコード(`Src/`)が明確に分離され、リポジトリの見通しが良くなります。-
**ビルドの安定化:**
ビルドスクリプトやCI/CDパイプラインが、常に`Src/`を起点として動作するため、設定がシンプルかつ安定します。-
**クリーンなルート:**
リポジトリのルートディレクトリが、設定ファイルやREADMEなど、プロジェクトの入り口となる情報だけで構成され、クリーンに保たれます。

---

## 構成の基本原則

`Src/`フォルダ内の構成は、開発するアプリケーションのアーキテクチャや種類によって異なりますが、以下の原則に従うことを推奨します。

- **ソリューション/ワークスペースを配置:**
  - 複数のプロジェクトで構成される場合、`Src/`フォルダ直下にVisual
    Studioのソリューションファイル (`.sln`) や、VSCodeのワークスペースファイル (`.code-workspace`) を配置します。
- **プロジェクトごとにフォルダを分割:**
  - 各プロジェクト（ライブラリ、Web
    API、UI層など）は、それぞれ専用のフォルダに格納します。
- **命名規則の統一:**
  - プロジェクト名やフォルダ名は、組織やチームの命名規則に従います。（例:
    `BitzLabs.ProjectName.Core`, `BitzLabs.ProjectName.Api`）

---

## 構成パターン例

以下に、典型的なプロジェクトの種類ごとの構成パターン例を示します。

### 例1: Web API + クラスライブラリ (C# .NET)

```text
Src/
├── BitzLabs.MyApi.sln
│
├── MyApi.Api/
│   ├── Controllers/
│   ├── Program.cs
│   └── MyApi.Api.csproj
│
├── MyApi.Application/
│   ├── Services/
│   └── MyApi.Application.csproj
│
└── MyApi.Domain/
    ├── Entities/
    └── MyApi.Domain.csproj
```

### 例2: Webフロントエンド (Node.js/TypeScript)

```
Src/
├── app/                  # React, Vue, Svelteなどのメインコード
│   ├── components/
│   ├── pages/ or routes/
│   └── main.ts
│
├── lib/                  # 共通のライブラリやユーティリティ
│   └── ...
│
├── public/               # 画像やフォントなどの静的アセット
│   └── favicon.ico
│
├── package.json
└── tsconfig.json
```

### 例3: ライブラリ開発

```
Src/
├── BitzLabs.MyLibrary/       # ライブラリ本体のプロジェクト
│   ├── BitzLabs.MyLibrary.csproj
│   └── ...
│
├── BitzLabs.MyLibrary.Tests/ # (Testsフォルダに置く場合もある)
│   ├── BitzLabs.MyLibrary.Tests.csproj
│   └── ...
│
└── samples/                  # ライブラリの使い方を示すサンプルプロジェクト
    └── SampleApp/
        └── SampleApp.csproj
```

---

!!!
note上記はあくまで一般的な例です。プロジェクトのアーキテクチャ（例: クリーンアーキテクチャ、レイヤードアーキテクチャなど）に合わせて、最適なフォルダ構成を選択してください。重要なのは、**一貫したルールに基づいて構成されていること**です。

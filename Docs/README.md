# DevBlueprint ドキュメント体系へようこそ！

このドキュメントサイトには、`DevBlueprint`、およびこれを用いて開始される全てのプロジェクトの設計、開発、利用を理解するために必要なドキュメントが集約されています。

これらのドキュメントは、プロジェクトの透明性を高め、貢献や利用を容易にすることを目的としています。

!!! info
"このサイトについて" このドキュメントサイトは、[MkDocs](https://www.mkdocs.org/)と
[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)を使用して構築されており、リポジトリの`main`ブランチへの変更をトリガーに、
[GitHub Actions](https://github.com/BitzLabs/DevBlueprint/actions)によって自動的にデプロイされます。

---

## ドキュメントの歩き方 (推奨される読み進め方)

プロジェクトを深く理解するためには、以下の順序でドキュメントを読み進めることをお勧めします。

1. **プロジェクトの全体像:**
   - まずはリポジトリルートの
     **[README.md](https://github.com/BitzLabs/DevBlueprint)** をご覧ください。

2. **プロジェクトの目標と進捗:**
   - **[00.プロジェクト管理](./00_プロジェクト管理/README.md)**: プロジェクトのロードマップや進捗状況がまとめられています。

3. **プロジェクトで「何が」できるか (要求):**
   - **[01.要求仕様](./01_要求仕様/README.md)**: このプロジェクトが解決しようとする課題、提供する機能、目標とする品質などが定義されています。

4. **プロジェクトを「どうやって」作るか (設計):**
   - **[02.設計仕様](./02_設計仕様/README.md)**: 要求仕様を実現するための、UI/UX、API、データ構造などの技術的な設計が記述されています。

5. **開発への参加や貢献:**
   - **[03.開発ルール](./03_開発ルール/README.md)**: ブランチ戦略、コーディング規約など、開発に参加するための基本的な「お作法」がまとめられています。

6. **品質を「どうやって」保証するか (テスト):**
   - **[04.テスト仕様](./04_テスト仕様/README.md)**: システムの品質を保証するための、テスト計画や具体的なテストケースがまとめられています。

---

## ドキュメントカテゴリ一覧と役割

### 1. [00.プロジェクト管理](./00_プロジェクト管理/README.md)

- **目的**: プロジェクト全体の「進め方」と「目標」を管理します。
- **内容**: 開発ロードマップ、マイルストーン、進捗状況など、プロジェクトの航海図となるドキュメントです。

### 2. [01.要求仕様](./01_要求仕様/README.md)

- **目的**: プロジェクト全体の「何を」作るかを定義します。
- **内容**: プロジェクトの目的、範囲、主要機能、ユーザー要件、ユースケースなどを記述します。プロジェクトの憲法であり、全ての開発活動の基礎となります。

### 3. [02.設計仕様](./02_設計仕様/README.md)

- **目的**: 「要求仕様」で定義された要件を、「どのように」技術的に実現するかを詳細に記述します。
- **内容**:
  UI/UX仕様、API仕様、データ仕様など、実装の設計図となる技術ドキュメント群です。

### 4. [03.開発ルール](./03_開発ルール/README.md)

- **目的**: プロジェクトを「どのように」進めるか、開発プロセスと規約を定義します。
- **内容**: ブランチ戦略、コーディング規約、セットアップガイドなど、開発の一貫性と品質を保つためのガイドラインです。

### 5. [04.テスト仕様](./04_テスト仕様/README.md)

- **目的**: システムの品質を「どのように」保証するかを定義します。
- **内容**: テスト計画、具体的なテストケース、テスト結果の報告などを管理します。

---

## ドキュメントの更新について

これらのドキュメントは、プロジェクトの進行や仕様変更に伴い、継続的に更新・メンテナンスされることが重要です。変更が生じた場合は、関連する全てのドキュメントを適切に修正してください。（詳細は
**[03.開発ルール/04.ドキュメント規則.md](./03_開発ルール/04_ドキュメント規則.md)**
を参照 ※このファイルは今後作成します）

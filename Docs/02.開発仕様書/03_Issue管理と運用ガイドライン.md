# 03_Issue管理と運用ガイドライン

このドキュメントは、BitzBufferプロジェクトにおけるGitHub Issueの効果的な管理と運用に関するガイドラインを定めます。

GitHub Issueは、本プロジェクトにおけるタスク管理、バグ追跡、機能要望の受付、そして関連する議論を行うための中心的なプラットフォームです。一貫性のあるIssueの運用は、プロジェクトの透明性を高め、開発作業の優先順位付けを助け、スムーズなコミュニケーションと進捗管理を促進します。

## 1. Issueラベルの規約

Issueの分類、優先度付け、進捗管理を効率的に行うため、以下のカテゴリと命名規則に基づいたラベルを使用します。Issue作成時および更新時には、適切なラベルを付与してください。

### 1.1. Issueの種類 (Type)

Issueが何についてのものかを示します。

*   `Type: Bug(バグ/不具合)` - Color: `#d73a4a` (赤系)
*   `Type: Feature Request(機能要望)` - Color: `#a2eeef` (水色系)
*   `Type: Enhancement(機能改善)` - Color: `#a2eeef` (水色系)
*   `Type: Documentation(ドキュメント)` - Color: `#0075ca` (青系)
*   `Type: Question(質問)` - Color: `#d876e3` (紫系)
*   `Type: Task(タスク)` - Color: `#fbca04` (黄色系)
*   `Type: Refactor(リファクタリング)` - Color: `#fbca04` (黄色系)
*   `Type: Chore(雑務)` - Color: `#cfd3d7` (グレー系)
*   `Type: Spike(調査/実験)` - Color: `#fef2c0` (薄黄色系)

### 1.2. 優先度 (Priority)

Issueの対応優先度を示します。

*   `Priority: Critical(最重要/緊急)` - Color: `#b60205` (濃い赤)
*   `Priority: High(高)` - Color: `#e99695` (薄い赤)
*   `Priority: Medium(中)` - Color: `#f9d0c4` (オレンジ系)
*   `Priority: Low(低)` - Color: `#c2e0c6` (緑系)

### 1.3. 状態 (Status) - (オプション)

Issueの進捗状況を示します。

*   `Status: To Do(未着手)`
*   `Status: In Progress(作業中)`
*   `Status: Blocked(障害あり)`
*   `Status: Needs Review(レビュー待ち)`
*   `Status: Done(完了)`
*   `Status: Wontfix(対応しない)`
*   `Status: Duplicate(重複)`

### 1.4. 影響範囲/モジュール (Scope)

Issueが関連するプロジェクトの範囲やモジュールを示します。

*   **BitzBufferコア関連:**
    *   `Scope: Core Interfaces`: `IBuffer<T>` や関連インターフェースの設計・変更。
    *   `Scope: Managed Buffer`: `ManagedBuffer<T>`, `SegmentedManagedBuffer<T>` の実装。
    *   `Scope: Native Buffer`: `NativeBuffer<T>`, `SegmentedNativeBuffer<T>` の実装。
    *   `Scope: Pooling`: プーリング戦略、ライフサイクルフック関連。
    *   `Scope: Buffer Manager`: `BufferManager` と `IBufferProvider` 関連。
    *   `Scope: GPU Support`: GPUサポートの拡張設計。
*   **BitzBuffer.Pipelines関連:**
    *   `Scope: Pipelines Core`: `BitzPipe<T>`, `Reader`, `Writer` のコア機能。
    *   `Scope: Pipelines Transport`: IPC, Network, Serial などのトランスポート層。
    *   `Scope: Pipelines Patterns`: PUB/SUB, RPC などの高レベル通信パターン。
*   **横断的な項目:**
    *   `Scope: Documentation`: ドキュメント全般。
    *   `Scope: Tests`: テストコード。
    *   `Scope: Build`: ビルドプロセス、CI/CD。

### 1.5. その他ラベル
*   `good first issue` (初心者向け)
*   `help wanted` (協力者募集)
*   `discussion` (議論が必要)

## 3. Issue作成のガイドライン

*   **明確なタイトル:** Issueの内容が一目でわかるような、具体的で簡潔なタイトルを付けます。
    *   例(悪い): パーサーが動かない
    *   例(良い): `[Bug] LL(1)パーサが特定の左再帰文法で無限ループする`
*   **詳細な説明:**
    *   **バグ報告の場合:** 再現手順、期待される動作、実際の動作（エラーメッセージ等）、環境情報、再現コード例を記述。([バグ報告テンプレート](/.github/ISSUE_TEMPLATE/bug_report.md)参照)
    *   **機能要望/改善提案の場合:** どのような機能/改善か、なぜ必要か、具体的なユースケースや実現イメージを記述。([機能要望テンプレート](/.github/ISSUE_TEMPLATE/feature_request.md)または[機能改善テンプレート](/.github/ISSUE_TEMPLATE/enhancement_proposal.md)参照)
    *   **タスク/ドキュメントの場合:** 行うべき作業内容、完了の定義を記述。([一般的タスクテンプレート](/.github/ISSUE_TEMPLATE/task.md)または[ドキュメント関連テンプレート](/.github/ISSUE_TEMPLATE/documentation_issue.md)参照)
*   **適切なラベルの付与:** 上記「[2. Issueラベルの規約](#2-issueラベルの規約)」に従います。
*   **関連Issue/PRへのリンク:** 既存の関連するIssueやプルリクエストがあれば、説明文中にリンクを記述します。
*   **担当者 (Assignee) の割り当て:** 自分自身で対応する場合は自分を割り当てます。
*   **マイルストーン (Milestone) の利用 (オプション):** 特定のリリースや目標に関連するIssueを紐付けます。
*   **プロジェクトボード (Projects) の利用 (オプション):** カンバンなどで視覚的に進捗を管理する場合に利用します。
*   **テンプレートの利用 (強く推奨):** GitHubのIssueテンプレート機能を利用し、バグ報告用、機能要望用などのテンプレートを作成・使用します。これにより、Issue作成時の情報記載漏れを防ぎ、質を向上させます。
    *   テンプレートはリポジトリの `.github/ISSUE_TEMPLATE` ディレクトリにMarkdown形式で配置します。
    *   **利用可能なテンプレート:**
        *   [**バグ報告 (Bug Report)**](/.github/ISSUE_TEMPLATE/bug_report.md)
        *   [**機能要望 (Feature Request)**](/.github/ISSUE_TEMPLATE/feature_request.md)
        *   [**機能改善 (Enhancement Proposal)**](/.github/ISSUE_TEMPLATE/enhancement_proposal.md)
        *   [**ドキュメント関連 (Documentation Issue)**](/.github/ISSUE_TEMPLATE/documentation_issue.md)
        *   [**質問・議論 (Question / Discussion)**](/.github/ISSUE_TEMPLATE/question_or_discussion.md)
        *   [**一般的なタスク (General Task)**](/.github/ISSUE_TEMPLATE/task.md)

## 3. Issueのライフサイクルと更新

*   **定期的な確認と更新:** 状況に変化があればコメントで更新。
*   **作業開始時の通知:** 作業開始時にコメントやラベルで状況を示す。
*   **プルリクエスト (PR) との連携:**
    *   PRの説明文に `Closes #<Issue番号>` などを記述し、自動で連携させる。
    *   ブランチ名にもIssue番号を含める（詳細は [`./02_ブランチ戦略と命名規則.md`](./02_ブランチ戦略と命名規則.md)）。
*   **議論:** Issueに関する質問や議論は、そのIssueのコメント欄で行う。
*   **Issueのクローズ:** 問題が解決・実装された、または対応しないと判断された場合にクローズ。理由をコメントに残す。

## 4. Issueの優先順位付けと棚卸し (トリアージ)

*   **優先度の見直し:** 定期的に未解決Issueの優先度を見直す。
*   **棚卸し:** 長期間更新がないIssueは、クローズするか最新情報に更新するかを検討。


# 04. インターフェイス仕様書 (APIリファレンス)

このフォルダには、BitzBufferライブラリが外部に公開するC# API (Application Programming Interface) の詳細なリファレンスドキュメントが格納されています。
これらのドキュメントは、ライブラリ利用者が各公開APIの機能、使用方法、パラメータ、戻り値、制約、例外条件などを正確かつ容易に理解できるようにすることを目的としています。

このAPI仕様書は、ソースコード内のXMLドキュメントコメントの代替となる公式リファレンスです。

## 1. ドキュメントの構成

API仕様書は、名前空間ごとにサブフォルダを作成し、その中に型（クラス、インターフェース、構造体、enum）ごとのMarkdownファイルを配置することを基本とします。

**構成例:**

```
Docs/04.インターフェイス仕様書/
├── README.md                 (このファイル)
├── Z1_テンプレート.md          (API仕様書作成用テンプレート)
├── BitzBuffer/
│   ├── IBuffer_T.md
│   ├── IReadOnlyBuffer_T.md
│   ├── IWritableBuffer_T.md
│   ├── IBufferProvider.md
│   └── ...
└── BitzBuffer.Pipelines/
    ├── BitzPipe_T.md
    ├── BitzPipeReader_T.md
    ├── BitzPipeWriter_T.md
    └── ...
```

## 2. APIリファレンス一覧

*(このセクションは、各APIドキュメントが作成され次第、目次として更新されます)*

### 2.1. BitzBuffer (コア)

*   **インターフェース**
    *   `IBufferState`
    *   `IOwnedResource`
    *   [`IReadOnlyBuffer<T>`](./BitzBuffer/IReadOnlyBuffer_T.md)
    *   [`IWritableBuffer<T>`](./BitzBuffer/IWritableBuffer_T.md)
    *   [`IBuffer<T>`](./BitzBuffer/IBuffer_T.md)
    *   `IBufferProvider`
    *   `IBufferManager`
    *   ...
*   **クラス**
    *   `BufferManager`
    *   ...
*   **enum**
    *   `AttachmentResult`
    *   ...

### 2.2. BitzBuffer.Pipelines

*   **クラス**
    *   [`BitzPipe<T>`](./BitzBuffer.Pipelines/BitzPipe_T.md)
    *   ...
*   ...

## 3. 作成ガイドライン

API仕様書を作成・編集する際は、以下の点に留意してください。

*   **[`Z1_テンプレート.md`](./Z1_テンプレート.md)** に従ってください。
*   型名、メソッド名、プロパティ名、パラメータ名などは、ソースコードと完全に一致させてください。
*   変更はプルリクエストを通じて行い、セルフレビューを行ってください。
*   関連する設計仕様書（`../03.詳細仕様書/` 配下）との整合性を確認してください。


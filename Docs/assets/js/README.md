# JavaScriptライブラリ

このフォルダには、MkDocsサイトで使用するJavaScriptライブラリが含まれています。

## ファイル一覧

### mermaid.min.js
Mermaid図表ライブラリ
- **ダウンロード元**: https://unpkg.com/mermaid@10.6.1/dist/mermaid.min.js
- **バージョン**: 10.6.1
- **用途**: Markdown内でMermaid図を表示

### mathjax-config.js
MathJax設定ファイル
- **用途**: 数式レンダリングの設定
- **機能**: インライン数式とブロック数式のサポート

## ライブラリの更新方法

### Mermaidライブラリの更新
```powershell
Invoke-WebRequest -Uri "https://unpkg.com/mermaid@10.6.1/dist/mermaid.min.js" -OutFile "Docs\assets\js\mermaid.min.js"
```

### ローカル参照の利点
1. **オフライン対応**: インターネット接続なしでも動作
2. **パフォーマンス**: CDNの遅延がない
3. **バージョン管理**: 使用ライブラリのバージョンを確実に管理
4. **セキュリティ**: 外部CDNの障害や変更に依存しない

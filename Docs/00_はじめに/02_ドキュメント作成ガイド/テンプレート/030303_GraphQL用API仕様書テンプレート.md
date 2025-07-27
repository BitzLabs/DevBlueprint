# [章番号]: GraphQL API仕様書

!!! note "このテンプレートの使い方"
このファイルは、GraphQL APIの仕様を定義するためのテンプレートです。
GraphQLの仕様はスキーマ定義が中心となるため、このドキュメントはスキーマへの参照と、主要なクエリ/ミューテーションの具体的な使用例を示すことに重点を置きます。
詳しい使い方は「[設計仕様の書き方ガイド](ここにガイドへのパスを記述してください)」を参照してください。

## 1. はじめに

### 1.1. 目的

<!-- このGraphQL APIが提供するデータと操作、そしてその目的を簡潔に記述します。 -->

### 1.2. 対象読者

<!-- 例: フロントエンド開発者、モバイルアプリ開発者など -->

## 2. 基本情報

| 項目                               | 内容                                            |
| :--------------------------------- | :---------------------------------------------- |
| **エンドポイントURL (Production)** | `https://api.example.com/graphql`               |
| **エンドポイントURL (Staging)**    | `https://staging.api.example.com/graphql`       |
| **認証方式**                       | [例: AuthorizationヘッダにBearerトークンを設定] |

## 3. スキーマ定義

<!-- GraphQLスキーマ定義ファイル (.graphql) へのリンクを記載します。あるいは、主要な型定義をここに直接記述することも可能です。 -->

スキーマ全体の定義は以下のファイルを参照してください。

- **[schema.graphql](ここにスキーマファイルへのパスを記述してください)**

### 3.1. 主要な型 (Types)

<!-- 特に重要、または複雑な型について、ここで補足説明を行います。 -->

- **`User`**: ユーザー情報を表す型。
- **`Post`**: 投稿情報を表す型。

---

## 4. クエリ (Queries)

<!-- データの取得を行う主要なクエリについて記述します。 -->

### 4.1. `user`

- **概要:** IDを指定して単一のユーザー情報を取得する。
- **スキーマ:**

```graphql
user(id: ID!): User
```

- **使用例:**

```graphql
query GetUserById($userId: ID!) {
  user(id: $userId) {
    id
    name
    email
    posts {
      id
      title
    }
  }
}
```

- **変数例:**

```json
{
  "userId": "user-001"
}
```

---

## 5. ミューテーション (Mutations)

<!-- データの作成、更新、削除を行う主要なミューテーションについて記述します。 -->

### 5.1. `createPost`

- **概要:** 新しい投稿を作成する。
- **スキーマ:**

```graphql
createPost(title: String!, content: String!): Post
```

- **使用例:**

```graphql
mutation CreateNewPost($title: String!, $content: String!) {
  createPost(title: $title, content: $content) {
    id
    title
    content
    author {
      id
      name
    }
  }
}
```

- **変数例:**

```json
{
  "title": "GraphQLは素晴らしい",
  "content": "スキーマ駆動開発は最高です..."
}
```

---

## 6. サブスクリプション (Subscriptions)

<!-- データのリアルタイム更新を受け取るためのサブスクリプションについて記述します。 -->

### 6.1. `postAdded`

- **概要:** 新しい投稿が作成された際にリアルタイムで通知を受け取る。
- **スキーマ:**

```graphql
postAdded: Post
```

- **使用例:**

```graphql
subscription OnPostAdded {
  postAdded {
    id
    title
    author {
      name
    }
  }
}
```

## 7. エラーハンドリング

<!-- GraphQL APIのエラーレスポンス形式について説明します。 -->

GraphQLの標準的な`errors`配列形式で返されます。

```json
{
  "errors": [
    {
      "message": "Post with ID 'post-999' not found.",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["post"],
      "extensions": {
        "code": "NOT_FOUND",
        "timestamp": "2025-07-28T12:00:00Z"
      }
    }
  ],
  "data": {
    "post": null
  }
}
```

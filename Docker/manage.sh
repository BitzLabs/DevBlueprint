#!/bin/bash

# DevBlueprint Docker 管理スクリプト
# WSL2環境での使用を想定

DOCKER_DIR="Docker"
PROJECT_NAME="devblueprint"

# 関数定義
show_help() {
    echo "DevBlueprint Docker 管理スクリプト"
    echo ""
    echo "使用方法:"
    echo "  $0 [サービス] [アクション]"
    echo ""
    echo "サービス:"
    echo "  mkdocs    - ドキュメントサイト"
    echo "  api       - APIサーバー (今後実装)"
    echo "  db        - データベース (今後実装)"
    echo "  all       - 全サービス"
    echo ""
    echo "アクション:"
    echo "  up        - サービス起動"
    echo "  down      - サービス停止"
    echo "  build     - イメージビルド"
    echo "  logs      - ログ表示"
    echo "  restart   - サービス再起動"
    echo ""
    echo "例:"
    echo "  $0 mkdocs up      # MkDocsを起動"
    echo "  $0 all down       # 全サービス停止"
    echo "  $0 mkdocs logs    # MkDocsのログ表示"
}

# サービス名とアクションの検証
SERVICE=$1
ACTION=$2

if [ -z "$SERVICE" ] || [ -z "$ACTION" ]; then
    show_help
    exit 1
fi

# Docker Composeファイルの選択
case $SERVICE in
    mkdocs)
        COMPOSE_FILE="$DOCKER_DIR/mkdocs/docker-compose.yml"
        SERVICE_NAME="mkdocs"
        ;;
    api)
        COMPOSE_FILE="$DOCKER_DIR/docker-compose.yml"
        SERVICE_NAME="api"
        ;;
    db)
        COMPOSE_FILE="$DOCKER_DIR/docker-compose.yml"
        SERVICE_NAME="database"
        ;;
    all)
        COMPOSE_FILE="$DOCKER_DIR/docker-compose.yml"
        SERVICE_NAME=""
        ;;
    *)
        echo "エラー: 不明なサービス '$SERVICE'"
        show_help
        exit 1
        ;;
esac

# アクションの実行
case $ACTION in
    up)
        echo "🚀 $SERVICE を起動しています..."
        docker compose -f $COMPOSE_FILE up -d $SERVICE_NAME
        ;;
    down)
        echo "⏹️  $SERVICE を停止しています..."
        docker compose -f $COMPOSE_FILE down $SERVICE_NAME
        ;;
    build)
        echo "🔨 $SERVICE をビルドしています..."
        docker compose -f $COMPOSE_FILE build $SERVICE_NAME
        ;;
    logs)
        echo "📋 $SERVICE のログを表示しています..."
        docker compose -f $COMPOSE_FILE logs -f $SERVICE_NAME
        ;;
    restart)
        echo "🔄 $SERVICE を再起動しています..."
        docker compose -f $COMPOSE_FILE restart $SERVICE_NAME
        ;;
    *)
        echo "エラー: 不明なアクション '$ACTION'"
        show_help
        exit 1
        ;;
esac

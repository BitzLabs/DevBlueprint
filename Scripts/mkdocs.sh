#!/bin/bash

# MkDocs 開発環境管理スクリプト
# Usage: ./scripts/mkdocs.sh [command]

set -e

# 色付き出力用の定数
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ヘルプ表示
show_help() {
    echo -e "${BLUE}MkDocs 開発環境管理スクリプト${NC}"
    echo ""
    echo "使用方法: $0 [command]"
    echo ""
    echo "コマンド:"
    echo "  build     - Dockerイメージをビルド"
    echo "  up        - MkDocsサーバーを起動"
    echo "  down      - MkDocsサーバーを停止"
    echo "  restart   - MkDocsサーバーを再起動"
    echo "  logs      - ログを表示"
    echo "  shell     - コンテナ内でシェルを起動"
    echo "  clean     - 生成されたサイトファイルを削除"
    echo "  install   - 依存関係を再インストール"
    echo "  help      - このヘルプを表示"
}

# Dockerが利用可能かチェック
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}エラー: Dockerがインストールされていません${NC}"
        exit 1
    fi

    if ! docker info &> /dev/null; then
        echo -e "${RED}エラー: Dockerが起動していません${NC}"
        exit 1
    fi
}

# Dockerイメージのビルド
build_image() {
    echo -e "${YELLOW}MkDocsイメージをビルド中...${NC}"
    docker-compose -f docker-compose.mkdocs.yml build
    echo -e "${GREEN}ビルドが完了しました${NC}"
}

# MkDocsサーバーの起動
start_server() {
    echo -e "${YELLOW}MkDocsサーバーを起動中...${NC}"
    docker-compose -f docker-compose.mkdocs.yml up -d
    echo -e "${GREEN}MkDocsサーバーが起動しました${NC}"
    echo -e "${BLUE}アクセス: http://localhost:8000${NC}"
}

# MkDocsサーバーの停止
stop_server() {
    echo -e "${YELLOW}MkDocsサーバーを停止中...${NC}"
    docker-compose -f docker-compose.mkdocs.yml down
    echo -e "${GREEN}MkDocsサーバーが停止しました${NC}"
}

# MkDocsサーバーの再起動
restart_server() {
    stop_server
    start_server
}

# ログの表示
show_logs() {
    docker-compose -f docker-compose.mkdocs.yml logs -f mkdocs
}

# コンテナ内でシェルを起動
start_shell() {
    echo -e "${YELLOW}コンテナ内でシェルを起動中...${NC}"
    docker-compose -f docker-compose.mkdocs.yml exec mkdocs /bin/bash
}

# 生成ファイルのクリーンアップ
clean_site() {
    echo -e "${YELLOW}生成されたサイトファイルを削除中...${NC}"
    docker-compose -f docker-compose.mkdocs.yml exec mkdocs rm -rf site/
    echo -e "${GREEN}クリーンアップが完了しました${NC}"
}

# 依存関係の再インストール
reinstall_dependencies() {
    echo -e "${YELLOW}依存関係を再インストール中...${NC}"
    docker-compose -f docker-compose.mkdocs.yml exec mkdocs pip install -r requirements-docs.txt
    echo -e "${GREEN}依存関係の再インストールが完了しました${NC}"
}

# メイン処理
main() {
    check_docker

    case "${1:-help}" in
        build)
            build_image
            ;;
        up|start)
            start_server
            ;;
        down|stop)
            stop_server
            ;;
        restart)
            restart_server
            ;;
        logs)
            show_logs
            ;;
        shell|bash)
            start_shell
            ;;
        clean)
            clean_site
            ;;
        install)
            reinstall_dependencies
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            echo -e "${RED}エラー: 不明なコマンド '$1'${NC}"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

main "$@"

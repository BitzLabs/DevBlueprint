# MkDocs 開発環境管理スクリプト (PowerShell版)
# Usage: .\Scripts\mkdocs.ps1 [command]

param(
    [string]$Command = "help"
)

# 色付き出力用の関数
function Write-ColoredOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

# ヘルプ表示
function Show-Help {
    Write-ColoredOutput "MkDocs 開発環境管理スクリプト" "Blue"
    Write-Host ""
    Write-Host "使用方法: .\Scripts\mkdocs.ps1 [command]"
    Write-Host ""
    Write-Host "コマンド:"
    Write-Host "  build     - Dockerイメージをビルド"
    Write-Host "  up        - MkDocsサーバーを起動"
    Write-Host "  down      - MkDocsサーバーを停止"
    Write-Host "  restart   - MkDocsサーバーを再起動"
    Write-Host "  logs      - ログを表示"
    Write-Host "  shell     - コンテナ内でシェルを起動"
    Write-Host "  clean     - 生成されたサイトファイルを削除"
    Write-Host "  install   - 依存関係を再インストール"
    Write-Host "  help      - このヘルプを表示"
}

# Dockerが利用可能かチェック
function Test-Docker {
    try {
        docker info | Out-Null
        return $true
    }
    catch {
        Write-ColoredOutput "エラー: Dockerが利用できません" "Red"
        return $false
    }
}

# Dockerイメージのビルド
function New-Image {
    Write-ColoredOutput "MkDocsイメージをビルド中..." "Yellow"
    docker-compose -f docker-compose.mkdocs.yml build
    Write-ColoredOutput "ビルドが完了しました" "Green"
}

# MkDocsサーバーの起動
function Start-Server {
    Write-ColoredOutput "MkDocsサーバーを起動中..." "Yellow"
    docker-compose -f docker-compose.mkdocs.yml up -d
    Write-ColoredOutput "MkDocsサーバーが起動しました" "Green"
    Write-ColoredOutput "アクセス: http://localhost:8000" "Blue"
}

# MkDocsサーバーの停止
function Stop-Server {
    Write-ColoredOutput "MkDocsサーバーを停止中..." "Yellow"
    docker-compose -f docker-compose.mkdocs.yml down
    Write-ColoredOutput "MkDocsサーバーが停止しました" "Green"
}

# MkDocsサーバーの再起動
function Restart-Server {
    Stop-Server
    Start-Server
}

# ログの表示
function Show-Logs {
    docker-compose -f docker-compose.mkdocs.yml logs -f mkdocs
}

# コンテナ内でシェルを起動
function Start-Shell {
    Write-ColoredOutput "コンテナ内でシェルを起動中..." "Yellow"
    docker-compose -f docker-compose.mkdocs.yml exec mkdocs /bin/bash
}

# 生成ファイルのクリーンアップ
function Clear-Site {
    Write-ColoredOutput "生成されたサイトファイルを削除中..." "Yellow"
    docker-compose -f docker-compose.mkdocs.yml exec mkdocs rm -rf site/
    Write-ColoredOutput "クリーンアップが完了しました" "Green"
}

# 依存関係の再インストール
function Install-Dependencies {
    Write-ColoredOutput "依存関係を再インストール中..." "Yellow"
    docker-compose -f docker-compose.mkdocs.yml exec mkdocs pip install -r requirements-docs.txt
    Write-ColoredOutput "依存関係の再インストールが完了しました" "Green"
}

# メイン処理
if (-not (Test-Docker)) {
    exit 1
}

switch ($Command.ToLower()) {
    "build" { New-Image }
    "up" { Start-Server }
    "start" { Start-Server }
    "down" { Stop-Server }
    "stop" { Stop-Server }
    "restart" { Restart-Server }
    "logs" { Show-Logs }
    "shell" { Start-Shell }
    "bash" { Start-Shell }
    "clean" { Clear-Site }
    "install" { Install-Dependencies }
    "help" { Show-Help }
    default {
        Write-ColoredOutput "エラー: 不明なコマンド '$Command'" "Red"
        Write-Host ""
        Show-Help
        exit 1
    }
}

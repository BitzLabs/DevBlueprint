#!/usr/bin/env node
/**
 * Markdown リンティングスクリプト
 */
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

import { hasFiles } from './utils/file-finder.js';

const EXTENSIONS = ['.md'];
const IGNORE_PATTERNS = ['node_modules', 'dist', 'build'];

function lintMarkdown() {
    console.log('🔍 Markdown ファイルをチェック中...');

    if (!hasFiles('.', EXTENSIONS, IGNORE_PATTERNS)) {
        console.log('✅ Markdown ファイルが見つかりませんでした。markdownlint をスキップします。');
        return;
    }

    console.log('🧹 markdownlint を自動修正付きで実行中...');
    try {
        execSync('npx markdownlint "**/*.md" --ignore-path .markdownlintignore --fix', {
            stdio: 'inherit',
            cwd: process.cwd(),
        });
        console.log('✅ markdownlint が正常に完了しました。');
    } catch (err) {
        console.error('❌ markdownlint が失敗しました:', err.message);
        throw err; // エラーを上位に投げる
    }
}

// 直接呼び出された場合に実行
if (fileURLToPath(import.meta.url) === process.argv[1]) {
    lintMarkdown();
}

export default lintMarkdown;

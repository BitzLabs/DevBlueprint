#!/usr/bin/env node
/**
 * Markdown リンティングスクリプト
 */
const { execSync } = require('child_process');

const { hasFiles } = require('./utils/file-finder');

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
    execSync('markdownlint "**/*.md" --ignore-path .markdownlintignore --fix', {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    console.log('✅ markdownlint が正常に完了しました。');
  } catch (err) {
    console.error('❌ markdownlint が失敗しました:', err.message);
    process.exit(1);
  }
}

// 直接呼び出された場合に実行
if (require.main === module) {
  lintMarkdown();
}

module.exports = lintMarkdown;

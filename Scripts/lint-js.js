#!/usr/bin/env node
/**
 * JavaScript/TypeScript リンティングスクリプト
 */
const { execSync } = require('child_process');

const { hasFiles } = require('./utils/file-finder');

const EXTENSIONS = ['.js', '.ts', '.tsx'];
const IGNORE_PATTERNS = ['node_modules', 'dist', 'build'];

function lintJavaScript() {
  console.log('🔍 JavaScript/TypeScript ファイルをチェック中...');

  if (!hasFiles('.', EXTENSIONS, IGNORE_PATTERNS)) {
    console.log('✅ JS/TS ファイルが見つかりませんでした。ESLint をスキップします。');
    return;
  }

  console.log('🧹 ESLint を自動修正付きで実行中...');
  try {
    execSync('eslint . --ext .js,.ts,.tsx --fix', {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    console.log('✅ ESLint が正常に完了しました。');
  } catch (err) {
    console.error('❌ ESLint が失敗しました:', err.message);
    process.exit(1);
  }
}

// 直接呼び出された場合に実行
if (require.main === module) {
  lintJavaScript();
}

module.exports = lintJavaScript;

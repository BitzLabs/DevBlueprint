#!/usr/bin/env node
/**
 * JavaScript/TypeScript リンティングスクリプト
 */
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

import { hasFiles } from './utils/file-finder.js';

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
    execSync('npx eslint . --ext .js,.ts,.tsx --fix', {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    console.log('✅ ESLint が正常に完了しました。');
  } catch (err) {
    console.error('❌ ESLint が失敗しました:', err.message);
    throw err; // エラーを上位に投げる
  }
}

// 直接呼び出された場合に実行
if (fileURLToPath(import.meta.url) === process.argv[1]) {
  lintJavaScript();
}

export default lintJavaScript;

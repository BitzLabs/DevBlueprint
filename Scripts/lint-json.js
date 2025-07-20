#!/usr/bin/env node
/**
 * JSON リンティングスクリプト
 */
import { execSync } from 'child_process';

import { hasFiles } from './utils/file-finder.js';

const EXTENSIONS = ['.json'];
const IGNORE_PATTERNS = ['node_modules', 'dist', 'build', '.vscode'];

function lintJSON() {
  console.log('🔍 JSON ファイルをチェック中...');

  if (!hasFiles('.', EXTENSIONS, IGNORE_PATTERNS)) {
    console.log('✅ JSON ファイルが見つかりませんでした。JSON lint をスキップします。');
    return;
  }

  console.log('🧹 JSON ファイルに対して Prettier チェックを実行中...');
  try {
    execSync('prettier --check "**/*.json"', {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    console.log('✅ JSON lint が正常に完了しました。');
  } catch (err) {
    console.error('❌ JSON lint が失敗しました:', err.message);
    process.exit(1);
  }
}

// 直接呼び出された場合に実行
if (import.meta.url === `file://${process.argv[1]}`) {
  lintJSON();
}

export default lintJSON;

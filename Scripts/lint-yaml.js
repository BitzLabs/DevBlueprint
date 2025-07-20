#!/usr/bin/env node
/**
 * YAML リンティングスクリプト
 */
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

import { hasFiles } from './utils/file-finder.js';

const EXTENSIONS = ['.yml', '.yaml'];
const IGNORE_PATTERNS = ['node_modules', 'dist', 'build'];

function lintYAML() {
  console.log('🔍 YAML ファイルをチェック中...');

  if (!hasFiles('.', EXTENSIONS, IGNORE_PATTERNS)) {
    console.log('✅ YAML ファイルが見つかりませんでした。yaml-lint をスキップします。');
    return;
  }

  console.log('🧹 yaml-lint を実行中...');
  try {
    execSync('npx yaml-lint **/*.{yml,yaml}', {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    console.log('✅ yaml-lint が正常に完了しました。');
  } catch (err) {
    console.error('❌ YAML lint が失敗しました:', err.message);
    process.exit(1);
  }
}

// 直接呼び出された場合に実行
if (fileURLToPath(import.meta.url) === process.argv[1]) {
  lintYAML();
}

export default lintYAML;

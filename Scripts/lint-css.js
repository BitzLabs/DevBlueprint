#!/usr/bin/env node
/**
 * CSS/SCSS リンティングスクリプト
 */
import { execSync } from 'child_process';

import { hasFiles } from './utils/file-finder.js';

const EXTENSIONS = ['.css', '.scss'];
const IGNORE_PATTERNS = ['node_modules', 'dist', 'build'];

function lintCSS() {
  console.log('🔍 CSS/SCSS ファイルをチェック中...');

  if (!hasFiles('.', EXTENSIONS, IGNORE_PATTERNS)) {
    console.log('✅ CSS/SCSS ファイルが見つかりませんでした。Stylelint をスキップします。');
    return;
  }

  console.log('🧹 Stylelint を自動修正付きで実行中...');
  try {
    execSync('stylelint "**/*.{css,scss}" --fix --allow-empty-input', {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    console.log('✅ Stylelint が正常に完了しました。');
  } catch (err) {
    console.error('❌ Stylelint が失敗しました:', err.message);
    process.exit(1);
  }
}

// 直接呼び出された場合に実行
if (import.meta.url === `file://${process.argv[1]}`) {
  lintCSS();
}

export default lintCSS;

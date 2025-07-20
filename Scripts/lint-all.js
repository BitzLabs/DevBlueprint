#!/usr/bin/env node
/**
 * 全リンターを実行するメインスクリプト
 */
import lintCSS from './lint-css.js';
import lintJS from './lint-js.js';
import lintJSON from './lint-json.js';
import lintMarkdown from './lint-md.js';
import lintYAML from './lint-yaml.js';

async function runAllLints() {
  console.log('🚀 包括的なコード品質チェックを開始中...\n');

  const linters = [
    { name: 'JavaScript/TypeScript', fn: lintJS },
    { name: 'CSS/SCSS', fn: lintCSS },
    { name: 'Markdown', fn: lintMarkdown },
    { name: 'YAML', fn: lintYAML },
    { name: 'JSON', fn: lintJSON },
  ];

  let hasErrors = false;

  for (const { name, fn } of linters) {
    try {
      console.log(`\n📋 ${name} リンティングを実行中...`);
      await fn();
    } catch (error) {
      console.error(`❌ ${name} リンティングが失敗しました:`, error.message);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.log('\n❌ 一部のリンティングチェックが失敗しました。上記の問題を修正してください。');
    process.exit(1);
  } else {
    console.log('\n✅ 全てのリンティングチェックが正常に完了しました！');
  }
}

// 直接呼び出された場合に実行
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllLints().catch(error => {
    console.error('❌ リンティング中に予期しないエラーが発生しました:', error);
    process.exit(1);
  });
}

export default runAllLints;

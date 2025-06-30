#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');
const { execFileSync } = require('child_process');
const readline = require('readline');

// ラベル定義ファイルのパス
const LABEL_FILE_PATH = path.join(__dirname, 'templates', 'labels.json');

/**
 * 依存ツールがインストールされているかチェックする関数
 */
function checkDependency(command) {
  try {
    execFileSync(command, ['--version'], { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * ユーザーにY/Nの質問を投げかける関数
 * @param {string} query - 質問の文字列
 * @returns {Promise<boolean>} - Yesならtrue, Noならfalse
 */
async function askYesNo(query) {
  const rl = require('readline/promises').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const ans = await rl.question(query);
    return ans.toLowerCase().trim() === 'y';
  } finally {
    rl.close();
  }
}


/**
 * メインの非同期関数
 */
async function main() {
  console.log('--- DevBlueprint ラベルセットアップ ---');
  let hasErrors = false;

  // 1. 依存関係のチェック
  console.log('\n[1/4] 依存ツールの確認中...');
  if (!checkDependency('gh')) {
    console.error("❌ エラー: GitHub CLI (gh) がインストールされていません。インストールしてから再実行してください。");
    console.error("詳細: https://cli.github.com/");
    process.exit(1);
  }
  console.log("✅ GitHub CLI (gh) がインストールされています。");
  
  // 2. ラベル定義ファイルを読み込む
  console.log(`\n[2/4] ラベル定義ファイルを読み込み中...`);
  let labelDefs;
  try {
    labelDefs = JSON.parse(await fs.readFile(LABEL_FILE_PATH, 'utf8'));
    console.log(`✅ ${labelDefs.length} 件のラベルが見つかりました。`);
  } catch (error) {
    console.error(`❌ エラー: ${LABEL_FILE_PATH} の読み込みまたは解析に失敗しました。`);
    process.exit(1);
  }

  // 3. 各ラベルを作成・更新
  console.log("\n[3/4] GitHub上のラベルを作成・更新中...");
  for (const label of labelDefs) {
    const { name, color, description } = label;
    try {
      console.log(`  - ラベル処理中: "${name}"`);
      execFileSync('gh', [
        'label', 'create', name,
        '--color', color,
        '--description', description,
        '--force'
      ], { stdio: 'pipe' });
    } catch (error) {
      console.error(`  ❌ ラベルの処理に失敗: "${name}"\n     ${error.stderr?.toString() || error.message}`);
      hasErrors = true;
    }
  }
  console.log("✅ ラベルの作成・更新が完了しました。");

  // 4. 古いラベルのクリーンアップ確認と実行
  console.log("\n[4/4] 古いラベルのクリーンアップ...");
  let cleanup = await askYesNo("GitHub上に存在し、`labels.json`にないラベルを削除しますか？ (y/N): ");

  if (cleanup && labelDefs.length === 0) {
    console.warn("  ⚠️  警告: `labels.json` が空のため、クリーンアップはすべての既存ラベルを削除しようとします。");
    cleanup = await askYesNo("  本当にすべてのラベルを削除してよろしいですか？ (y/N): ");
  }

  if (cleanup) {
    console.log("  - クリーンアップを開始します...");
    try {
      // 現在のリポジトリの全ラベルを取得
      const existingLabelsJson = execFileSync('gh', ['label', 'list', '--json', 'name']).toString();
      const existingLabels = JSON.parse(existingLabelsJson).map(l => l.name);
      // 定義ファイルにあるラベル名のセットを作成
      const definedLabelNames = new Set(labelDefs.map(l => l.name));
      
      let deletedCount = 0;
      for (const labelName of existingLabels) {
        if (!definedLabelNames.has(labelName)) {
          console.log(`    - 古いラベルを削除: "${labelName}"`);
          try {
            execFileSync('gh', ['label', 'delete', labelName, '--yes'], { stdio: 'pipe' });
            deletedCount++;
          } catch (error) {
            console.error(`    ❌ ラベルの削除に失敗: "${labelName}"\n     ${error.stderr?.toString() || error.message}`);
            hasErrors = true;
          }
        }
      }
      if (deletedCount > 0) {
        console.log(`  ✅ ${deletedCount} 件の古いラベルを削除しました。`);
      } else {
        console.log("  ✅ 削除対象の古いラベルはありません。すべて同期されています！");
      }
    } catch (error) {
      console.error(`  ❌ GitHubから既存ラベルの取得に失敗しました。クリーンアップを中止します。\n     ${error.stderr?.toString() || error.message}`);
      hasErrors = true;
    }
  } else {
    console.log("  - クリーンアップはスキップされました。");
  }

  if (hasErrors) {
    console.error("\n❌ いくつかの処理でエラーが発生しました。スクリプトを異常終了します。");
    process.exit(1);
  } else {
    console.log("\n✅ すべてのセットアップ作業が正常に完了しました！");
  }
}

// スクリプトを実行
main().catch(err => {
  console.error('予期しないエラー:', err);
  process.exit(1);
});

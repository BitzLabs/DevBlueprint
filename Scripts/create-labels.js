#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// ラベル定義ファイルのパス
const LABEL_FILE_PATH = path.join(__dirname, 'templates', 'labels.json');

/**
 * 依存ツールがインストールされているかチェックする関数
 */
function checkDependency(command) {
  try {
    execSync(`${command} --version`, { stdio: 'ignore' });
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
function askYesNo(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans.toLowerCase().trim() === 'y');
  }));
}


/**
 * メインの非同期関数
 */
async function main() {
  console.log('--- DevBlueprint Label Setup ---');

  // 1. 依存関係のチェック
  console.log('\n[1/4] Checking for dependencies...');
  if (!checkDependency('gh')) {
    console.error("❌ Error: GitHub CLI (gh) is not installed. Please install it to continue.");
    console.error("See: https://cli.github.com/");
    process.exit(1);
  }
  console.log("✅ GitHub CLI (gh) is installed.");
  
  // 2. ラベル定義ファイルを読み込む
  console.log(`\n[2/4] Reading label definitions...`);
  let labelDefs;
  try {
    labelDefs = JSON.parse(await fs.readFile(LABEL_FILE_PATH, 'utf8'));
    console.log(`✅ Found ${labelDefs.length} labels to process.`);
  } catch (error) {
    console.error(`❌ Error: Could not read or parse ${LABEL_FILE_PATH}`);
    process.exit(1);
  }

  // 3. 各ラベルを作成・更新
  console.log("\n[3/4] Creating/Updating labels on GitHub...");
  for (const label of labelDefs) {
    const { name, color, description } = label;
    const command = `gh label create "${name}" --color "${color}" --description "${description}" --force`;
    try {
      console.log(`  - Processing: "${name}"`);
      execSync(command, { stdio: 'pipe' }); 
    } catch (error) {
      console.error(`  ❌ Failed to process label: "${name}"\n     ${error.stderr.toString()}`);
    }
  }
  console.log("✅ Label creation/update completed.");

  // 4. 古いラベルのクリーンアップ確認と実行
  console.log("\n[4/4] Cleaning up old labels...");
  const cleanup = await askYesNo("Do you want to delete labels that are on GitHub but not in your local `labels.json` file? (y/N): ");

  if (cleanup) {
    console.log("  - Starting cleanup...");
    // 現在のリポジトリの全ラベルを取得
    const existingLabelsJson = execSync('gh label list --json name').toString();
    const existingLabels = JSON.parse(existingLabelsJson).map(l => l.name);
    // 定義ファイルにあるラベル名のセットを作成
    const definedLabelNames = new Set(labelDefs.map(l => l.name));
    
    let deletedCount = 0;
    for (const labelName of existingLabels) {
      if (!definedLabelNames.has(labelName)) {
        console.log(`    - Deleting old label: "${labelName}"`);
        try {
          execSync(`gh label delete "${labelName}" --yes`);
          deletedCount++;
        } catch (error) {
          console.error(`    ❌ Failed to delete label: "${labelName}"`);
        }
      }
    }
    if (deletedCount > 0) {
      console.log(`  ✅ Deleted ${deletedCount} old labels.`);
    } else {
      console.log("  ✅ No old labels to delete. Everything is in sync!");
    }
  } else {
    console.log("  - Cleanup skipped by user.");
  }

  console.log("\n✅ All setup tasks completed successfully!");
}

// スクリプトを実行
main();

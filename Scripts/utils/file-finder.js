/**
 * リンタースクリプト用のファイル検索ユーティリティ
 */
const fs = require('fs');
const path = require('path');

/**
 * 特定の拡張子を持つファイルを再帰的に検索し、指定されたディレクトリを無視する
 * @param {string} dir - 検索対象のディレクトリ
 * @param {string[]} extensions - 検索対象のファイル拡張子（ドット付き、例：['.js', '.ts']）
 * @param {string[]} ignorePatterns - 無視するディレクトリ/ファイルのパターン
 * @returns {string[]} ファイルパスの配列
 */
function findFiles(dir, extensions, ignorePatterns = []) {
  let files = [];

  try {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      // このアイテムが無視対象かチェック
      if (ignorePatterns.some(pattern => item.includes(pattern))) {
        continue;
      }

      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // サブディレクトリを再帰的に検索
        files = files.concat(findFiles(fullPath, extensions, ignorePatterns));
      } else if (extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // エラーを静かに無視する（例：アクセス権限なし）
    console.warn(`警告: ディレクトリ ${dir} を読み取れませんでした: ${error.message}`);
  }

  return files;
}

/**
 * 特定の拡張子を持つファイルがプロジェクトに存在するかチェック
 * @param {string} rootDir - 検索開始のルートディレクトリ
 * @param {string[]} extensions - 検索対象のファイル拡張子
 * @param {string[]} ignorePatterns - 無視するパターン
 * @returns {boolean} ファイルが見つかった場合はtrue
 */
function hasFiles(rootDir, extensions, ignorePatterns = []) {
  return findFiles(rootDir, extensions, ignorePatterns).length > 0;
}

module.exports = {
  findFiles,
  hasFiles,
};

const obsidian = require('obsidian');

class SimpleWindowClosePlugin extends obsidian.Plugin {
    async onload() {
        try {
            // プラグインが読み込まれたときの処理
            console.log('Simple Window Close Plugin loaded');

            // リボンアイコンを追加
            this.addRibbonIcon('x-circle', 'すべてのタブを閉じる', () => {
                this.closeAllTabs();
            });

            // コマンドを追加
            this.addCommand({
                id: 'close-all-tabs',
                name: 'すべてのタブを閉じる',
                callback: () => {
                    this.closeAllTabs();
                }
            });
        } catch (error) {
            console.error('Simple Window Close Plugin load error:', error);
        }
    }

    async closeAllTabs() {
        try {
            // 現在開いているすべてのタブを取得
            const leaves = this.app.workspace.getLeavesOfType('markdown');
            
            // 各タブを閉じる
            for (const leaf of leaves) {
                if (leaf && !leaf.isPinned) {  // ピン留めされていないタブのみを閉じる
                    await leaf.detach();
                }
            }
        } catch (error) {
            console.error('Error closing tabs:', error);
            // エラーメッセージを表示
            new obsidian.Notice('タブを閉じる際にエラーが発生しました');
        }
    }

    onunload() {
        try {
            // プラグインがアンロードされたときの処理
            console.log('Simple Window Close Plugin unloaded');
        } catch (error) {
            console.error('Simple Window Close Plugin unload error:', error);
        }
    }
}

module.exports = SimpleWindowClosePlugin;
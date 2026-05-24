/**
 * assets/js/utils/ui.js
 * 共享 UI 工具库
 */

(function() {
  const GenieUI = {
    /**
     * 更新空状态区域的内容
     * @param {object} cfg {title, sub, flow}
     */
    updateEmptyState(cfg) {
      const emptyTitle = document.getElementById('emptyTitle');
      const emptySub = document.getElementById('emptySub');
      const emptyFlowLbl = document.getElementById('emptyFlowLbl');
      
      if (emptyTitle && cfg.title) emptyTitle.textContent = cfg.title;
      if (emptySub && cfg.sub) emptySub.innerHTML = cfg.sub;
      if (emptyFlowLbl && cfg.flow) emptyFlowLbl.textContent = cfg.flow;
    },

    /**
     * 重置右侧 Tab 的文本
     */
    resetTabs(resultText = '生成结果', caseText = '优秀案例') {
      const rtabResult = document.getElementById('rtabResult');
      const rtabCases = document.getElementById('rtabCases');
      if (rtabResult) rtabResult.textContent = resultText;
      if (rtabCases) rtabCases.textContent = caseText;
    },

    /**
     * 准备场景：重置通用 UI 状态
     */
    prepareScene(sceneId) {
      this.toggleAreas({ 'batchEditWrap': false, 'standardRightArea': true });
      
      const imgEditFeats = document.getElementById('imgEditFeats');
      const emptyFlow = document.querySelector('.empty-state .flow');
      const platformRow = document.querySelector('.empty-state .platform-row');
      
      if (sceneId === 'imgEdit') {
        if (imgEditFeats) imgEditFeats.style.display = 'flex';
        if (emptyFlow) emptyFlow.style.display = 'none';
        if (platformRow) platformRow.style.display = 'none';
        this.resetTabs('上传图片', '历史记录');
      } else {
        if (imgEditFeats) imgEditFeats.style.display = 'none';
        if (emptyFlow) emptyFlow.style.display = 'flex';
        if (platformRow) platformRow.style.display = 'flex';
        this.resetTabs();
      }
    },

    /**
     * 切换区域显示
     * @param {object} areas {areaId: boolean}
     */
    toggleAreas(areas) {
      for (const [id, show] of Object.entries(areas)) {
        const el = document.getElementById(id);
        if (el) el.style.display = show ? '' : 'none';
      }
    },

    /**
     * 显示 Toast 提示
     */
    showToast(msg, icon = '✨') {
      if (typeof window.showToast === 'function') {
        window.showToast(msg, icon);
      } else {
        console.log(`[Toast] ${icon} ${msg}`);
      }
    },

    /**
     * 切换右侧面板 Tab
     */
    switchRightTab(key) {
      const rtab = document.getElementById(key === 'result' ? 'rtabResult' : 'rtabCases');
      if (rtab && typeof window.switchRightTab === 'function') {
        window.switchRightTab(rtab, key);
      }
    },

    /**
     * 切换主 Tab
     */
    switchMainTab(el, index) {
      if (typeof window.switchMainTab === 'function') {
        window.switchMainTab(el, index);
      }
    }
  };

  window.GenieUI = GenieUI;
})();

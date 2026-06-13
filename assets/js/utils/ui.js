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
      const emptyState = document.getElementById('emptyState');
      const emptyFlow = document.querySelector('.empty-state .flow');
      const platformRow = document.querySelector('.empty-state .platform-row');
      
      if (sceneId === 'imgEdit') {
        if (imgEditFeats) imgEditFeats.style.display = 'flex';
        if (emptyState) emptyState.style.display = 'flex';
        if (emptyFlow) emptyFlow.style.display = 'none';
        if (platformRow) platformRow.style.display = 'none';
        this.resetTabs('上传图片', '历史记录');
      } else {
        if (imgEditFeats) imgEditFeats.style.display = 'none';
        if (emptyState) emptyState.style.display = 'flex';
        if (emptyFlow) emptyFlow.style.display = 'flex';
        if (platformRow) platformRow.style.display = 'flex';
        this.resetTabs();
      }
      
      // 隐藏结果区和案例区，确保看到的是空态引导
      const resArea = document.getElementById('resultArea');
      const casesArea = document.getElementById('casesArea');
      const jewelryWorkspace = document.getElementById('jewelryWorkspace');
      if (resArea) resArea.style.display = 'none';
      if (casesArea) casesArea.style.display = 'none';
      if (jewelryWorkspace) jewelryWorkspace.style.display = 'none';
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
    },

    /**
     * 预览大图
     */
    previewImage(url) {
      if (!url) return;
      let overlay = document.getElementById('geniePreviewOverlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'geniePreviewOverlay';
        overlay.style = `
          position: fixed; inset: 0; background: rgba(0,0,0,0.85); 
          z-index: 10000; display: flex; align-items: center; justify-content: center; 
          backdrop-filter: blur(10px); cursor: zoom-out; opacity: 0; transition: opacity 0.3s;
        `;
        overlay.innerHTML = `
          <img id="geniePreviewImg" style="max-width: 90%; max-height: 90%; border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); transform: scale(0.9); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
          <div style="position: absolute; top: 20px; right: 20px; color: #fff; font-size: 24px; cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); border-radius: 50%;">×</div>
        `;
        overlay.onclick = () => {
          overlay.style.opacity = '0';
          overlay.querySelector('img').style.transform = 'scale(0.9)';
          setTimeout(() => overlay.style.display = 'none', 300);
        };
        document.body.appendChild(overlay);
      }
      const img = overlay.querySelector('img');
      img.src = url;
      overlay.style.display = 'flex';
      setTimeout(() => {
        overlay.style.opacity = '1';
        img.style.transform = 'scale(1)';
      }, 10);
    }
  };

  window.GenieUI = GenieUI;
})();

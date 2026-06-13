(function() {
  const AplusModule = {
    state: {
      genMode: 'direct', // 'direct' or 'preview'
    },

    init() {
      // 模块初始化逻辑
    },

    onActivate(id, params) {
      if (window.GenieUI) {
        window.GenieUI.prepareScene(id);
        window.GenieUI.updateEmptyState({
          title: id === 'aplus' ? 'AI 详情页生成' : 'AI 电商套图',
          sub: id === 'aplus' ? '上传产品图，AI 自动生成高转化详情页' : '上传产品图，AI 自动生成全套 listing 图片',
          flow: '开始生成'
        });
      }
      
      // 详情页 legacy 初始化
      if (id === 'aplus') {
        if (typeof window.renderMods === 'function') window.renderMods();
      }
      
      // 电商套图 legacy 初始化
      if (id === 'aplusAdv') {
        if (typeof window._initBgGrid === 'function') window._initBgGrid();
      }
    },

    setAplusMode(mode, el) {
      this.state.genMode = mode;
      this.updateModeUI();
      console.log(`[AplusModule] 生成模式已切换为: ${mode}`);
    },

    toggleAplusMode(el) {
      const newMode = this.state.genMode === 'direct' ? 'preview' : 'direct';
      this.setAplusMode(newMode);
      if (window.GenieUI) {
        window.GenieUI.showToast(newMode === 'direct' ? '已切换至直接生成模式' : '已切换至预览生成模式', '⚙️');
      }
    },

    updateModeUI() {
      const isDirect = this.state.genMode === 'direct';
      const labels = [document.getElementById('genModeLabel'), document.getElementById('genModeLabelAdv')];
      const btnTexts = [document.getElementById('genBtnTxt'), document.getElementById('genBtnTxtAdv')];
      
      labels.forEach(lbl => {
        if (lbl) {
          lbl.innerHTML = isDirect ? '✨ 直接生成' : '🎯 规划模式';
          lbl.style.color = isDirect ? 'var(--primary)' : '#f59e0b';
          lbl.style.background = isDirect ? '#f5f3ff' : '#fffbeb';
          // 触发进入动画
          lbl.style.animation = 'none';
          lbl.offsetHeight; // 触发回流
          lbl.style.animation = null;
        }
      });

      btnTexts.forEach(txt => {
        if (txt) {
          txt.textContent = isDirect ? '立即生成' : '立即规划';
        }
      });
    },

    handleAplusGen() {
      if (this.state.genMode === 'preview') {
        if (typeof window.openStepModal === 'function') {
          window.openStepModal();
        }
      } else {
        this.startGen();
      }
    },

    /**
     * 开始生成 A+ 或 套图
     */
    startGen() {
      if (window.GenieUI) {
        window.GenieUI.showToast('正在为您规划并生成内容...', '🚀');
        setTimeout(() => {
          window.GenieUI.showToast('生成成功！', '✅');
          window.GenieUI.switchRightTab('result');
        }, 3000);
      }
    },

    /**
     * 处理图片上传结果 (A+ 场景)
     */
    addAplusImg(url) {
      const list = document.getElementById(window.ModuleManager.getActiveModuleId() === 'aplusAdv' ? 'imgListAdv' : 'imgList');
      const wrap = document.getElementById(window.ModuleManager.getActiveModuleId() === 'aplusAdv' ? 'uploadWrapAdv' : 'uploadWrap');
      if (!list || !wrap) return;
      
      list.style.display = 'flex';
      wrap.style.display = 'none';
      
      const div = document.createElement('div');
      div.className = 'img-item';
      div.innerHTML = `
        <img src="${url}">
        <div class="img-del" onclick="this.parentElement.remove(); if(document.querySelectorAll('.img-item').length===0) { document.getElementById('${list.id}').style.display='none'; document.getElementById('${wrap.id}').style.display='block'; }">×</div>
      `;
      list.appendChild(div);
      
      if (window.GenieUI) window.GenieUI.showToast('产品图上传成功', '📸');
    }
  };

  // 暴露给全局以便 CommonModule 调用
  window.addAplusImg = (...args) => AplusModule.addAplusImg(...args);

  if (window.ModuleManager) {
    window.ModuleManager.register('aplus', AplusModule);
    window.ModuleManager.register('aplusAdv', AplusModule);
  }

  window.AplusModule = AplusModule;
})();

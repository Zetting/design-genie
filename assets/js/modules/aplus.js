(function() {
  const AplusModule = {
    state: {
      // 可以在此处存储模块状态
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
      // 激活时调用 legacy 的渲染逻辑（如果存在）
      if (id === 'aplus' && typeof window.renderMods === 'function') {
        window.renderMods();
      }
    },

    /**
     * 开始生成 A+ 或 套图
     */
    startAplusGen() {
      if (window.GenieUI) {
        window.GenieUI.showToast('正在为您规划并生成内容...', '🚀');
        setTimeout(() => {
          window.GenieUI.showToast('生成成功！', '✅');
          window.GenieUI.switchRightTab('result');
        }, 3000);
      }
    }
  };

  if (window.ModuleManager) {
    window.ModuleManager.register('aplus', AplusModule);
    window.ModuleManager.register('aplusAdv', AplusModule);
  }

  window.AplusModule = AplusModule;
})();

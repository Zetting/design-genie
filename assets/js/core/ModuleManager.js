/**
 * assets/js/core/ModuleManager.js
 * 核心模块管理器：负责模块注册、激活、生命周期管理及全局事件路由
 */

(function() {
  const modules = {};
  let activeModuleId = null;

  const ModuleManager = {
    /**
     * 注册模块
     * @param {string} id 模块唯一标识
     * @param {object} module 模块实例
     */
    register(id, module) {
      if (modules[id]) {
        console.warn(`[ModuleManager] 模块 ${id} 已存在，正在覆盖。`);
      }
      modules[id] = module;
      if (typeof module.init === 'function') {
        module.init();
      }
      // 自动暴露全局方法以兼容旧代码
      this.exposeGlobals(module);
    },


    /**
     * 激活模块并切换 UI 面板
     * @param {string} id 模块ID
     * @param {HTMLElement} sidebarEl 侧边栏按钮元素
     */
    activate(id, sidebarEl = null) {
      if (!modules[id]) {
        console.warn(`[ModuleManager] 模块 ${id} 未注册，但尝试切换 UI。`);
      }

      // 切换侧边栏激活状态
      if (sidebarEl) {
        const sidebar = sidebarEl.closest('.sidebar');
        if (sidebar) {
          sidebar.querySelectorAll('.si').forEach(s => s.classList.remove('active'));
        }
        sidebarEl.classList.add('active');
      }

      // 切换左侧面板显示状态
      const leftPanels = document.querySelectorAll('.left');
      leftPanels.forEach(p => {
        // 约定：面板 ID 为 "left" + 首字母大写的模块 ID (或者直接使用 id 映射)
        // 这里我们优先寻找匹配 id 的面板，如果没有则全部隐藏
        const panelId = modules[id]?.panelId || `left${id.charAt(0).toUpperCase() + id.slice(1)}`;
        if (p.id === panelId) {
          p.style.display = '';
        } else {
          p.style.display = 'none';
        }
      });

      if (activeModuleId === id) return;

      // 停用旧模块
      if (activeModuleId && modules[activeModuleId] && typeof modules[activeModuleId].onDeactivate === 'function') {
        modules[activeModuleId].onDeactivate();
      }

      activeModuleId = id;

      // 激活新模块
      if (modules[id] && typeof modules[id].onActivate === 'function') {
        modules[id].onActivate(id);
      }

      console.log(`[ModuleManager] 模块已激活: ${id}`);
    },

    /**
     * 获取当前激活的模块ID
     */
    getActiveModuleId() {
      return activeModuleId;
    },

    /**
     * 获取指定模块
     */
    getModule(id) {
      return modules[id];
    },

    /**
     * 全局事件路由：用于处理 index.html 中无法直接移除的传统 onclick 属性
     * 将事件分发给当前激活的模块
     * @param {string} action 动作名称
     * @param {...any} args 参数
     */
    dispatch(action, ...args) {
      // 1. 首先尝试当前激活的模块
      if (activeModuleId && modules[activeModuleId]) {
        const module = modules[activeModuleId];
        if (typeof module[action] === 'function') {
          return module[action](...args);
        }
      }
      
      // 2. 尝试在所有已注册模块中寻找（处理跨模块调用或未激活模块的方法）
      for (const id in modules) {
        if (typeof modules[id][action] === 'function') {
          return modules[id][action](...args);
        }
      }

      // 3. 兜底：如果都没有找到，尝试在 CommonModule 或全局寻找
      if (window.CommonModule && typeof window.CommonModule[action] === 'function') {
        return window.CommonModule[action](...args);
      }
      
      console.warn(`[ModuleManager] 没有任何模块支持动作: ${action}`);
    },

    /**
     * 暴露一个兼容层，将模块方法映射到全局，解决 HTML 中 onclick 的引用问题
     */
    exposeGlobals(module) {
      for (const key in module) {
        if (typeof module[key] === 'function' && !['init', 'onActivate', 'onDeactivate'].includes(key)) {
          // 如果全局不存在，或者已经是一个桥接函数，则建立/更新映射
          if (!window[key] || window[key].__isBridge) {
            const bridge = (...args) => this.dispatch(key, ...args);
            bridge.__isBridge = true;
            window[key] = bridge;
          }
        }
      }
    }
  };

  // 暴露一个全局 switchScene 兼容函数
  window.switchScene = (id, el) => ModuleManager.activate(id, el);

  window.ModuleManager = ModuleManager;
})();


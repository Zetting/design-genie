(function() {
  const CommonModule = {
    onActivate(id) {
      if (window.GenieUI) {
        window.GenieUI.prepareScene(id);
        
        if (id === 'home') {
          window.GenieUI.updateEmptyState({
            title: '欢迎来到设计精灵',
            sub: '请在左侧选择您要进行的工作场景',
            flow: '了解更多'
          });
        } else if (id === 'copy') {
          window.GenieUI.updateEmptyState({
            title: '爆款复刻',
            sub: '上传参考图，AI 自动解析风格并为您 <strong>1:1 还原</strong> 爆款视觉',
            flow: '开始复刻'
          });
        } else if (id === 'imgEdit') {
          window.GenieUI.updateEmptyState({
            title: 'AI 图片编辑',
            sub: '上传图片并输入指令，AI 深度理解需求<br><strong>精准执行</strong> 背景替换、消除、重绘等高级编辑任务',
            flow: '上传图片'
          });
        } else if (id === 'imgTrans') {
          window.GenieUI.updateEmptyState({
            title: 'AI 图片翻译',
            sub: '自动识别图片中的文字并保留原风格翻译<br><strong>一键生成</strong> 多语言版本的商品图',
            flow: '立即翻译'
          });
        }
      }
    },


    /**
     * 全局图片上传路由
     */
    addImg() {
      const activeId = window.ModuleManager.getActiveModuleId();
      console.log(`[CommonModule] 为 ${activeId} 路由上传图片事件`);
      
      // 路由到特定模块的上传逻辑
      if (activeId === 'jewelryWear') {
        return window.ModuleManager.dispatch('jewelryAddImg');
      } else if (activeId === 'imgEdit') {
        if (typeof window.uploadBatchImgs === 'function') {
          return window.uploadBatchImgs();
        }
      } else if (activeId === 'aplus') {
        // A+ 场景下的上传逻辑
        this.genericUpload(url => {
          if (typeof window.addAplusImg === 'function') {
            window.addAplusImg(url);
          } else {
            console.log('A+ image uploaded:', url);
          }
        });
      } else {
        this.genericUpload(url => console.log('Generic image uploaded:', url));
      }
    },

    genericUpload(callback) {
      const inp = document.createElement('input');
      inp.type = 'file'; inp.accept = 'image/*';
      inp.onchange = () => {
        const file = inp.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
          if (callback) callback(ev.target.result);
        };
        reader.readAsDataURL(file);
      };
      inp.click();
    }
  };

  if (window.ModuleManager) {
    window.ModuleManager.register('home', CommonModule);
    window.ModuleManager.register('copy', CommonModule);
    window.ModuleManager.register('imgEdit', CommonModule);
    window.ModuleManager.register('imgTrans', CommonModule);
  }

  window.CommonModule = CommonModule;
})();

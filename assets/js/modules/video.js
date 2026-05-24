(function() {
  const VDO_MODELS = [
    'https://sc01.alicdn.com/kf/A31cb120e0749445d8185cf16abdf16d5f.png',
    'https://sc01.alicdn.com/kf/A782fda6103d441fea26aca3880c0abe4b.png',
    'https://sc01.alicdn.com/kf/A13a52a95127c4fedb72e6f7c6aae6653Z.png',
    'https://sc01.alicdn.com/kf/Aa5cbb14087a64bb8a13268d6e86741bbQ.png'
  ];

  const VideoModule = {
    state: {
      selectedModelUrl: null,
      selectedRatio: '9:16',
      selectedStyle: 'ugc'
    },

    init() {
      // 一次性初始化
    },

    onActivate(id, params) {
      if (window.GenieUI) {
        window.GenieUI.prepareScene(id);
        window.GenieUI.updateEmptyState({
          title: 'AI+ 商品视频',
          sub: '上传产品图，AI 自动规划脚本并生成<br><strong>高转化、符合市场审美</strong> 的爆款短视频',
          flow: '生成短视频'
        });
      }
      this.renderVdoModels();
    },

    switchVdoModelTab(el, key) {
      const wrap = el.parentElement;
      wrap.querySelectorAll('.vdo-tab').forEach(t => t.classList.remove('active'));
      el.classList.add('active');
      const lib = document.getElementById('vdoModelGrid');
      const mine = document.getElementById('vdoMyModelPanel');
      if(key === 'lib') {
        lib.style.display = 'flex';
        mine.style.display = 'none';
        this.renderVdoModels();
      } else {
        lib.style.display = 'none';
        mine.style.display = 'block';
      }
    },

    renderVdoModels() {
      const grid = document.getElementById('vdoModelGrid');
      if(!grid) return;
      grid.innerHTML = VDO_MODELS.map(url => `
        <div class="j-model-item" onclick="window.ModuleManager.dispatch('selectVdoModel', this, '${url}')">
          <div style="background:url('${url}') center/cover; width:100%; height:100%;"></div>
          <div class="j-check-overlay"></div>
        </div>
      `).join('');
      const first = grid.querySelector('.j-model-item');
      if(first) this.selectVdoModel(first, VDO_MODELS[0]);
    },

    vdoAddMyModel() {
      var inp=document.createElement('input');
      inp.type='file'; inp.accept='image/*';
      inp.onchange = () => {
        const file = inp.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
          const url = ev.target.result;
          const grid = document.getElementById('vdoMyModelGrid');
          const newItem = document.createElement('div');
          newItem.className = 'j-model-item';
          newItem.innerHTML = `
            <div style="background:url('${url}') center/cover; width:100%; height:100%;"></div>
            <div class="j-check-overlay"></div>
          `;
          newItem.onclick = () => this.selectVdoModel(newItem, url);
          grid.insertBefore(newItem, grid.firstChild);
          this.selectVdoModel(newItem, url);
        };
        reader.readAsDataURL(file);
      };
      inp.click();
    },

    selectVdoModel(el, url) {
      const grids = [document.getElementById('vdoModelGrid'), document.getElementById('vdoMyModelGrid')];
      grids.forEach(g => {
        if(g) g.querySelectorAll('.j-check-overlay').forEach(o => o.style.display = 'none');
      });
      const overlay = el.querySelector('.j-check-overlay');
      if(overlay) overlay.style.display = 'flex';
      this.state.selectedModelUrl = url;
    },

    setVdoRatio(ratio, el) {
      this.state.selectedRatio = ratio;
      el.parentElement.querySelectorAll('.vdo-ratio-item').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
    },

    setVdoStyle(style, el) {
      this.state.selectedStyle = style;
      el.parentElement.querySelectorAll('.vdo-style-card').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
    }
  };

  // 注册模块
  if (window.ModuleManager) {
    window.ModuleManager.register('vdoProd', VideoModule);
    window.ModuleManager.register('vdoReplicate', VideoModule);
  }

  window.VideoModule = VideoModule;

})();


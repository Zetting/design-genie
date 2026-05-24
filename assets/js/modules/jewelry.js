(function() {
  const JEWELRY_DATA = {
    ring: [
      'https://sc01.alicdn.com/kf/A23de92a4dce7473ab9ca70c955cd7b34s.png',
      'https://sc01.alicdn.com/kf/A5a137d6359ac4757963406c0da65c9cbq.png'
    ],
    neck: [
      'https://sc01.alicdn.com/kf/A782fda6103d441fea26aca3880c0abe4b.png',
      'https://sc01.alicdn.com/kf/A13a52a95127c4fedb72e6f7c6aae6653Z.png',
      'https://sc01.alicdn.com/kf/Aa5cbb14087a64bb8a13268d6e86741bbQ.png',
      'https://sc01.alicdn.com/kf/A31cb120e0749445d8185cf16abdf16d5f.png'
    ],
    ear: [
      'https://sc01.alicdn.com/kf/A696dc8b68a204c669013969e04f97513m.png'
    ],
    wrist: [
      'https://sc01.alicdn.com/kf/A23de92a4dce7473ab9ca70c955cd7b34s.png',
      'https://sc01.alicdn.com/kf/A5a137d6359ac4757963406c0da65c9cbq.png'
    ],
    foot: [
      'https://sc01.alicdn.com/kf/A5d0c1208456a4885918fc16d557671fbf.png'
    ]
  };

  const JewelryModule = {
    state: {
      selectedCat: 'ring',
      _mode: 'auto',
      _jewelryState: { x: 50, y: 50, scale: 0.5, rotate: 0 },
      _isDragging: false,
      _startX: 0, _startY: 0, _startPosX: 0, _startPosY: 0,
      _canvasZoom: 1.0,
      _selectedModel: 'gpt-image2',
      _selectedRes: '1K'
    },

    init() {
      // 可以在此处执行一次性 DOM 事件绑定（非 onclick）
    },

    onActivate(id, params) {
      if (window.GenieUI) {
        window.GenieUI.prepareScene(id);
        window.GenieUI.updateEmptyState({
          title: 'AI 珠宝佩戴',
          sub: '上传裸石与模特图，AI 自动完成 <strong>高保真佩戴融合</strong><br>生成极具商业价值的珠宝上身效果图',
          flow: '生成佩戴图'
        });
      }
      this.renderJewelryModels(this.state.selectedCat);
    },

    renderJewelryModels(cat, genderFilter = 'all') {
      this.state.selectedCat = cat;
      const grid = document.getElementById('jewelryModelGrid');
      if (!grid) return;
      
      let baseData = JEWELRY_DATA[cat] || [];
      let displayData = [];
      for(let i=0; i<18; i++) {
        const url = baseData[i % baseData.length];
        const gender = (i % 3 === 0) ? 'male' : 'female';
        if(genderFilter === 'all' || genderFilter === gender) {
          displayData.push({url, gender});
        }
      }

      grid.innerHTML = displayData.map(item => `
        <div class="j-model-item" onclick="window.ModuleManager.dispatch('selectJewelryModel', this, '${item.url}')" style="border-radius:12px; overflow:hidden; position:relative;">
          <div style="background:url('${item.url}') center/cover no-repeat; background-color:#f8fafc; width:100%; height:100%;"></div>
          <div class="j-check-overlay"></div>
          <div style="position:absolute; bottom:8px; left:8px; font-size:10px; background:rgba(0,0,0,0.4); backdrop-filter:blur(4px); color:#fff; padding:4px 8px; border-radius:6px; display:flex; align-items:center; gap:4px;">
            <span style="font-size:12px;">ⓘ</span> 无需擦除
          </div>
        </div>
      `).join('');
      
      const first = grid.querySelector('.j-model-item');
      if(first && genderFilter === 'all') this.selectJewelryModel(first, displayData[0].url);
    },

    selectJewelryModel(el, url) {
      const grids = [document.getElementById('jewelryModelGrid'), document.getElementById('jewelryMyModelGrid')];
      grids.forEach(g => {
        if(g) g.querySelectorAll('.j-check-overlay').forEach(o => o.style.display = 'none');
      });
      
      const check = el.querySelector('.j-check-overlay');
      if (check) check.style.display = 'flex';
      
      window._selectedModelUrl = url;
      this.updateBgPreview(url);
    },


    renderModels(cat, genderFilter = 'all') {
      this.state.selectedCat = cat;
      const grid = document.getElementById('jewelryModelGrid');
      if (!grid) return;
      
      let baseData = JEWELRY_DATA[cat] || [];
      let displayData = [];
      for(let i=0; i<18; i++) {
        const url = baseData[i % baseData.length];
        const gender = (i % 3 === 0) ? 'male' : 'female';
        if(genderFilter === 'all' || genderFilter === gender) {
          displayData.push({url, gender});
        }
      }

      grid.innerHTML = displayData.map(item => `
        <div class="j-model-item" onclick="window.ModuleManager.dispatch('selectJewelryModel', this, '${item.url}')" style="border-radius:12px; overflow:hidden; position:relative;">
          <div style="background:url('${item.url}') center/cover no-repeat; background-color:#f8fafc; width:100%; height:100%;"></div>
          <div class="j-check-overlay"></div>
          <div style="position:absolute; bottom:8px; left:8px; font-size:10px; background:rgba(0,0,0,0.4); backdrop-filter:blur(4px); color:#fff; padding:4px 8px; border-radius:6px; display:flex; align-items:center; gap:4px;">
            <span style="font-size:12px;">ⓘ</span> 无需擦除
          </div>
        </div>
      `).join('');
      
      const first = grid.querySelector('.j-model-item');
      if(first && genderFilter === 'all') this.selectModel(first, displayData[0].url);
    },

    selectJewelryModel(el, url) {
      const grids = [document.getElementById('jewelryModelGrid'), document.getElementById('jewelryMyModelGrid')];
      grids.forEach(g => {
        if(g) g.querySelectorAll('.j-check-overlay').forEach(o => o.style.display = 'none');
      });
      
      const check = el.querySelector('.j-check-overlay');
      if (check) check.style.display = 'flex';
      
      window._selectedModelUrl = url;
      this.updateBgPreview(url);
    },

    updateBgPreview(url) {
      const bg = document.getElementById('jModelBg'); // 主预览
      const manualBg = document.getElementById('jManualBg'); // 弹窗预览
      const sideBg = document.getElementById('jewelrySidebarPreviewBg'); // 侧边预览
      
      const updateEl = (el) => {
        if(el && url) {
          el.style.backgroundImage = `url('${url}')`;
          this.applyAutoZoom(el);
        }
      };

      updateEl(bg);
      updateEl(manualBg);
      updateEl(sideBg);
    },

    applyAutoZoom(el) {
      if(!el) return;
      const cat = this.state.selectedCat;
      if(cat === 'ring') el.style.transform = 'scale(1.5) translateY(15%)';
      else if(cat === 'neck') el.style.transform = 'scale(1.2) translateY(-5%)';
      else if(cat === 'ear') el.style.transform = 'scale(1.8) translateY(-10%) translateX(5%)';
      else if(cat === 'wrist') el.style.transform = 'scale(1.4) translateY(20%)';
      else el.style.transform = 'scale(1)';
    },

    setPosMode(mode, el) {
      this.state._mode = mode;
      el.parentElement.querySelectorAll('.vdo-model-mode-btn').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
      
      const tips = document.getElementById('manualPosTips');
      if(tips) tips.style.display = mode === 'manual' ? 'block' : 'none';
      
      const previewArea = document.getElementById('jewelryManualPreviewArea');
      if(previewArea) previewArea.style.display = mode === 'manual' ? 'block' : 'none';

      if(mode === 'manual') {
        this.openManual();
      }
    },

    openManual() {
      const mask = document.getElementById('jewelryManualMask');
      if(mask) mask.classList.add('show');
      this.updateBgPreview(window._selectedModelUrl);
      
      const thumb = document.querySelector('#jManualThumb img');
      if(thumb && window._selectedJewelry) thumb.src = window._selectedJewelry;
      
      this.updateManualOverlay();
    },

    closeManual(e) {
      if(e && e.target !== document.getElementById('jewelryManualMask')) return;
      document.getElementById('jewelryManualMask').classList.remove('show');
    },

    confirmManual() {
      document.getElementById('jewelryManualMask').classList.remove('show');
      if(window.GenieUI) window.GenieUI.showToast('已保存手动调整位置', '📍');
    },

    adjustCanvasZoom(delta) {
      this.state._canvasZoom = Math.max(0.5, Math.min(2.0, this.state._canvasZoom + delta));
      const canvas = document.getElementById('jManualCanvas');
      if(canvas) canvas.style.transform = `scale(${this.state._canvasZoom})`;
      const val = document.getElementById('jCanvasZoomVal');
      if(val) val.textContent = Math.round(this.state._canvasZoom * 100) + '%';
    },

    syncManualState(key, val) {
      if(key === 'scale') {
        this.state._jewelryState.scale = val / 100;
        document.getElementById('jManualScaleVal').textContent = val + '%';
      } else if(key === 'rotate') {
        this.state._jewelryState.rotate = parseInt(val);
        document.getElementById('jManualRotateVal').textContent = val + '°';
      }
      this.updateManualOverlay();
    },

    updateManualOverlay() {
      const container = document.getElementById('jManualOverlay');
      const sideContainer = document.getElementById('jewelrySidebarPreviewOverlay');
      if(!container) return;
      
      container.innerHTML = '';
      if(sideContainer) sideContainer.innerHTML = '';
      
      if(!window._selectedJewelry) {
        container.innerHTML = '<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-size:14px; background:rgba(255,255,255,0.4);">请先上传珠宝图片</div>';
        return;
      }
      
      const createJewelryEl = (isSidebar = false) => {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'absolute';
        wrapper.style.left = this.state._jewelryState.x + '%';
        wrapper.style.top = this.state._jewelryState.y + '%';
        wrapper.style.width = (200 * this.state._jewelryState.scale) + 'px';
        wrapper.style.transform = `translate(-50%, -50%) rotate(${this.state._jewelryState.rotate}deg)`;
        if(!isSidebar) {
          wrapper.style.cursor = 'move';
          wrapper.style.border = '2px dashed var(--primary)';
        }
        wrapper.style.userSelect = 'none';

        const img = document.createElement('img');
        img.src = window._selectedJewelry;
        img.style.width = '100%';
        img.style.pointerEvents = 'none';
        wrapper.appendChild(img);
        return wrapper;
      };

      const mainWrapper = createJewelryEl(false);
      
      mainWrapper.onmousedown = (e) => {
        this.state._isDragging = true;
        this.state._startX = e.clientX;
        this.state._startY = e.clientY;
        const rect = container.getBoundingClientRect();
        this.state._startPosX = (this.state._jewelryState.x / 100) * rect.width;
        this.state._startPosY = (this.state._jewelryState.y / 100) * rect.height;

        const onMove = (em) => {
          if(!this.state._isDragging) return;
          const dx = (em.clientX - this.state._startX) / this.state._canvasZoom;
          const dy = (em.clientY - this.state._startY) / this.state._canvasZoom;
          this.state._jewelryState.x = ((this.state._startPosX + dx) / rect.width) * 100;
          this.state._jewelryState.y = ((this.state._startPosY + dy) / rect.height) * 100;
          mainWrapper.style.left = this.state._jewelryState.x + '%';
          mainWrapper.style.top = this.state._jewelryState.y + '%';
          
          if(sideContainer) {
            const sideWrapper = sideContainer.firstChild;
            if(sideWrapper) {
              sideWrapper.style.left = this.state._jewelryState.x + '%';
              sideWrapper.style.top = this.state._jewelryState.y + '%';
            }
          }
        };

        const onUp = () => {
          this.state._isDragging = false;
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onUp);
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
      };

      container.appendChild(mainWrapper);
      if(sideContainer) sideContainer.appendChild(createJewelryEl(true));
    },

    jewelryAddImg() {
      const inp = document.createElement('input');
      inp.type = 'file'; inp.accept = 'image/*';
      inp.onchange = () => {
        const file = inp.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
          this.addJewelry(ev.target.result);
        };
        reader.readAsDataURL(file);
      };
      inp.click();
    },

    addJewelry(url) {
      window._selectedJewelry = url;
      const uz = document.querySelector('#leftJewelryWear .upload-zone');
      if (uz) {
        uz.innerHTML = `
          <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
            <img src="${url}" style="width:60px; height:60px; object-fit:contain; border-radius:12px; border:1px solid #e2e8f0; background:#fff;">
            <span style="font-size:10px; color:var(--primary); font-weight:600;">点击更换图片</span>
          </div>`;
      }
      this.updateManualOverlay();
    },

    jewelryAddMyModel() {
      var inp=document.createElement('input');
      inp.type='file'; inp.accept='image/*';
      inp.onchange = () => {
        const file = inp.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
          this.pushToMyModels(ev.target.result);
        };
        reader.readAsDataURL(file);
      };
      inp.click();
    },

    pushToMyModels(url) {
      const grid = document.getElementById('jewelryMyModelGrid');
      const newItem = document.createElement('div');
      newItem.className = 'j-model-item';
      newItem.style = 'border-radius:12px; overflow:hidden; background:#f8fafc; position:relative;';
      newItem.innerHTML = `<div style="background:url('${url}') center/contain no-repeat; width:100%; height:100%;"></div><div class="j-check-overlay"></div>`;
      newItem.onclick = () => this.selectModel(newItem, url);
      grid.insertBefore(newItem, grid.firstChild);
      this.selectModel(newItem, url);
    },

    switchJewelryModelTab(el, key) {
      el.parentElement.querySelectorAll('.vdo-tab').forEach(t => t.classList.remove('active'));
      el.classList.add('active');
      document.getElementById('jewelryModelLibPanel').style.display = key === 'lib' ? 'block' : 'none';
      document.getElementById('jewelryMyModelPanel').style.display = key === 'mine' ? 'block' : 'none';
    },

    switchJewelryCat(el, cat) {
      el.parentElement.querySelectorAll('.jewelry-cat-tab').forEach(t => {
        t.classList.remove('active');
        t.style.fontWeight = '400';
        t.style.color = 'var(--text-sub)';
      });
      el.classList.add('active');
      el.style.fontWeight = '700';
      el.style.color = 'var(--primary)';
      this.renderModels(cat);
    },

    filterJewelryModels(el, gender) {
      el.parentElement.querySelectorAll('.tag-mini').forEach(t => t.classList.remove('active'));
      el.classList.add('active');
      this.renderModels(this.state.selectedCat, gender);
    },

    setJModel(m, el) {
      this.state._selectedModel = m;
      el.parentElement.querySelectorAll('.tag-mini').forEach(t => t.classList.remove('active'));
      el.classList.add('active');
    },

    setJRes(res, el) {
      this.state._selectedRes = res;
      el.parentElement.querySelectorAll('.vdo-model-mode-btn').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
    },

    showJewelryAiGen() {
      const form = document.getElementById('jewelryAiGenForm');
      form.style.display = form.style.display === 'none' ? 'block' : 'none';
    },

    genJewelryModel() {
      if(window.GenieUI) {
        window.GenieUI.showToast('正在为您生成 AI 专属模特...', '🪄');
        setTimeout(() => {
          this.pushToMyModels('https://sc04.alicdn.com/kf/A8f1a4a4962914619b165b6f3c4c9e761O.png');
          window.GenieUI.showToast('AI 模特生成成功！', '✨');
          this.showJewelryAiGen();
        }, 2000);
      }
    },

    startJewelryGen() {
      if(!window._selectedJewelry) {
        if(window.GenieUI) window.GenieUI.showToast('请先上传珠宝图', '⚠️');
        return;
      }
      if(!window._selectedModelUrl) {
        if(window.GenieUI) window.GenieUI.showToast('请先选择模特图', '⚠️');
        return;
      }
      
      const scroll = document.querySelector('#leftJewelryWear .left-scroll');
      if (scroll) scroll.scrollTo({ top: 0, behavior: 'smooth' });
      
      if(window.GenieUI) {
        window.GenieUI.showToast('AI 正在为您融合珠宝...', '💎');
        setTimeout(() => {
          const res = {
            url: window._selectedModelUrl,
            res: this.state._selectedRes,
            time: new Date().toLocaleTimeString()
          };
          window._jewelryHistory = window._jewelryHistory || [];
          window._jewelryHistory.unshift(res);
          this.renderHistory();
          window.GenieUI.showToast('生成成功！', '✅');
          
          window.GenieUI.switchRightTab('result');
          const tab = document.querySelector('.main-tab[onclick*="GenieUI.switchMainTab(this, 0)"]');
          if(tab) tab.click();
        }, 2500);
      }
    },

    renderHistory() {
      const grid = document.getElementById('resultGrid');
      if(!grid) return;
      const history = window._jewelryHistory || [];
      if(history.length === 0) {
        grid.innerHTML = '<div style="grid-column:span 2; padding:40px; color:#bbb; text-align:center;">暂无生成记录</div>';
        return;
      }
      grid.innerHTML = history.map(item => `
        <div class="case-card" style="aspect-ratio:3/4; background:url('${item.url}') center/cover; border-radius:12px; position:relative;">
          <div style="position:absolute; top:8px; right:8px; background:rgba(0,0,0,0.5); color:#fff; font-size:10px; padding:2px 6px; border-radius:4px;">${item.res}</div>
        </div>
      `).join('');
    }
  };

  // 注册模块
  if (window.ModuleManager) {
    window.ModuleManager.register('jewelryWear', JewelryModule);
  }

  // 暴露一个局部引用以便调试（可选）
  window.JewelryModule = JewelryModule;

})();


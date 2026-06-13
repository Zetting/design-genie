(function() {
  const JEWELRY_DATA = {
    ring: [
      'https://sc01.alicdn.com/kf/A23de92a4dce7473ab9ca70c955cd7b34s.png',
      'https://sc01.alicdn.com/kf/A5a137d6359ac4757963406c0da65c9cbq.png',
      'https://sc04.alicdn.com/kf/Hb1640a3e8e784587895f54366a70a80eE.png',
      'https://sc04.alicdn.com/kf/He528d227447e4529a8a65c2b3e895827R.png',
      'https://sc04.alicdn.com/kf/H95156a64483b4b88880608e68406f527H.png',
      'https://sc04.alicdn.com/kf/H4a895a94429e469ea76c024564c70f27T.png',
      'https://sc04.alicdn.com/kf/H7e644a44e45e45a8a8a65c2b3e895827R.png',
      'https://sc04.alicdn.com/kf/Ha5cbb14087a64bb8a13268d6e86741bbQ.png',
      'https://sc04.alicdn.com/kf/H8d55d787747e4529a8a65c2b3e895827R.png'
    ],
    neck: [
      'https://sc01.alicdn.com/kf/A782fda6103d441fea26aca3880c0abe4b.png',
      'https://sc01.alicdn.com/kf/A13a52a95127c4fedb72e6f7c6aae6653Z.png',
      'https://sc01.alicdn.com/kf/Aa5cbb14087a64bb8a13268d6e86741bbQ.png',
      'https://sc01.alicdn.com/kf/A31cb120e0749445d8185cf16abdf16d5f.png',
      'https://sc01.alicdn.com/kf/A696dc8b68a204c669013969e04f97513m.png',
      'https://sc01.alicdn.com/kf/A23de92a4dce7473ab9ca70c955cd7b34s.png',
      'https://sc01.alicdn.com/kf/A5a137d6359ac4757963406c0da65c9cbq.png',
      'https://sc01.alicdn.com/kf/A5d0c1208456a4885918fc16d557671fbf.png',
      'https://sc04.alicdn.com/kf/Hb1640a3e8e784587895f54366a70a80eE.png'
    ],
    ear: [
      'https://sc01.alicdn.com/kf/A696dc8b68a204c669013969e04f97513m.png',
      'https://sc01.alicdn.com/kf/A23de92a4dce7473ab9ca70c955cd7b34s.png',
      'https://sc01.alicdn.com/kf/A5a137d6359ac4757963406c0da65c9cbq.png',
      'https://sc01.alicdn.com/kf/A5d0c1208456a4885918fc16d557671fbf.png',
      'https://sc04.alicdn.com/kf/Hb1640a3e8e784587895f54366a70a80eE.png',
      'https://sc04.alicdn.com/kf/He528d227447e4529a8a65c2b3e895827R.png',
      'https://sc04.alicdn.com/kf/H95156a64483b4b88880608e68406f527H.png',
      'https://sc04.alicdn.com/kf/H4a895a94429e469ea76c024564c70f27T.png',
      'https://sc04.alicdn.com/kf/H7e644a44e45e45a8a8a65c2b3e895827R.png'
    ],
    wrist: [
      'https://sc01.alicdn.com/kf/A23de92a4dce7473ab9ca70c955cd7b34s.png',
      'https://sc01.alicdn.com/kf/A5a137d6359ac4757963406c0da65c9cbq.png',
      'https://sc01.alicdn.com/kf/A5d0c1208456a4885918fc16d557671fbf.png',
      'https://sc04.alicdn.com/kf/Hb1640a3e8e784587895f54366a70a80eE.png',
      'https://sc04.alicdn.com/kf/He528d227447e4529a8a65c2b3e895827R.png',
      'https://sc04.alicdn.com/kf/H95156a64483b4b88880608e68406f527H.png',
      'https://sc04.alicdn.com/kf/H4a895a94429e469ea76c024564c70f27T.png',
      'https://sc04.alicdn.com/kf/H7e644a44e45e45a8a8a65c2b3e895827R.png',
      'https://sc04.alicdn.com/kf/Ha5cbb14087a64bb8a13268d6e86741bbQ.png'
    ],
    foot: [
      'https://sc01.alicdn.com/kf/A5d0c1208456a4885918fc16d557671fbf.png',
      'https://sc04.alicdn.com/kf/Hb1640a3e8e784587895f54366a70a80eE.png',
      'https://sc04.alicdn.com/kf/He528d227447e4529a8a65c2b3e895827R.png',
      'https://sc04.alicdn.com/kf/H95156a64483b4b88880608e68406f527H.png',
      'https://sc04.alicdn.com/kf/H4a895a94429e469ea76c024564c70f27T.png',
      'https://sc04.alicdn.com/kf/H7e644a44e45e45a8a8a65c2b3e895827R.png',
      'https://sc04.alicdn.com/kf/Ha5cbb14087a64bb8a13268d6e86741bbQ.png',
      'https://sc04.alicdn.com/kf/H8d55d787747e4529a8a65c2b3e895827R.png',
      'https://sc01.alicdn.com/kf/A23de92a4dce7473ab9ca70c955cd7b34s.png'
    ]
  };

  const JewelryModule = {
    state: {
      selectedCat: 'ring',
      selectedSize: '1:1',
      _mode: 'auto',
      _jewelryState: { x: 50, y: 50, scale: 0.5, rotate: 0 },
      _isDragging: false,
      _startX: 0, _startY: 0, _startPosX: 0, _startPosY: 0,
      _canvasZoom: 1.0,
      _selectedModel: 'gpt-image2',
      _selectedRes: '2K',
      _genCount: 1
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
      for(let i=0; i<9; i++) {
        const url = baseData[i % baseData.length];
        const gender = (i % 3 === 0) ? 'male' : 'female';
        if(genderFilter === 'all' || genderFilter === gender) {
          displayData.push({url, gender});
        }
      }

      grid.innerHTML = displayData.map(item => `
        <div class="j-model-item" 
          onclick="window.ModuleManager.dispatch('selectJewelryModel', this, '${item.url}')" 
          style="border-radius:12px; overflow:hidden; position:relative; cursor:pointer; transition: all 0.2s;">
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
        if(g) {
          g.querySelectorAll('.j-model-item').forEach(i => i.classList.remove('active'));
          g.querySelectorAll('.j-check-overlay').forEach(o => o.style.display = 'none');
        }
      });
      
      el.classList.add('active');
      const check = el.querySelector('.j-check-overlay');
      if (check) check.style.display = 'flex';
      
      window._selectedModelUrl = url;
      this.updateBgPreview(url);
    },

    setJModel(m, el) {
      this.state._selectedModel = m;
      el.parentElement.querySelectorAll('.j-model-opt').forEach(t => t.classList.remove('active'));
      el.classList.add('active');
    },

    setJSize(size, el) {
      this.state.selectedSize = size;
      el.parentElement.querySelectorAll('.vdo-ratio-item').forEach(t => t.classList.remove('active'));
      el.classList.add('active');
    },

    setJBatch(num, el) {
      this.state._genCount = num;
      el.parentElement.querySelectorAll('.segment-item').forEach(t => t.classList.remove('active'));
      el.classList.add('active');
    },

    setJRes(res, el) {
      this.state._selectedRes = res;
      el.parentElement.querySelectorAll('.segment-item').forEach(t => t.classList.remove('active'));
      el.classList.add('active');
    },

    startGen() {
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
        const count = this.state._genCount;
        window.GenieUI.showToast(`AI 正在为您生成 ${count} 张图...`, '💎');
        
        setTimeout(() => {
          window._jewelryHistory = window._jewelryHistory || [];
          for(let i=0; i<count; i++) {
            const res = {
              url: window._selectedModelUrl,
              res: this.state._selectedRes,
              time: new Date().toLocaleTimeString(),
              batchIdx: i + 1,
              isBatch: count > 1
            };
            window._jewelryHistory.unshift(res);
          }
          this.renderHistory();
          window.GenieUI.showToast('生成成功！', '✅');
          
          window.GenieUI.switchRightTab('result');
          const tab = document.querySelector('.main-tab[onclick*="GenieUI.switchMainTab(this, 0)"]');
          if(tab) tab.click();
        }, 2500);
      }
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
    },

    /**
     * 上传珠宝原图
     */
    jewelryAddImg() {
      if (window.CommonModule) {
        window.CommonModule.genericUpload(url => {
          this.setJewelryImage(url);
        });
      }
    },

    setJewelryImage(url) {
      window._selectedJewelry = url;
      const zone = document.querySelector('#leftJewelryWear .upload-zone');
      if (zone) {
        zone.innerHTML = `
          <img src="${url}" style="max-width:100%; max-height:100px; object-fit:contain; border-radius:8px; margin-bottom:8px;">
          <div style="font-size:12px; color:var(--primary); font-weight:700;">已上传珠宝</div>
          <div style="font-size:10px; color:var(--text-sub); margin-top:2px;">点击更换</div>
        `;
        zone.style.borderColor = 'var(--primary)';
        zone.style.background = '#F5F3FF';
      }
      if (window.GenieUI) window.GenieUI.showToast('珠宝上传成功', '💍');
    },

    updateBgPreview(url) {
      const bg = document.getElementById('jModelBg');
      if (bg) bg.style.backgroundImage = `url('${url}')`;
      
      const sidePreview = document.getElementById('jewelrySidebarPreview');
      if (sidePreview) {
        sidePreview.innerHTML = `<div style="background:url('${url}') center/cover no-repeat; width:100%; height:100%;"></div>`;
      }
    },

    switchJewelryCat(el, cat) {
      if (el && el.parentElement) {
        el.parentElement.querySelectorAll('.jewelry-cat-tab').forEach(t => {
          t.classList.remove('active');
          t.style.fontWeight = '400';
          t.style.color = 'var(--text-sub)';
        });
        el.classList.add('active');
        el.style.fontWeight = '700';
        el.style.color = 'var(--primary)';
      }
      this.renderJewelryModels(cat);
    },

    addMyModel() {
      if (window.CommonModule) {
        window.CommonModule.genericUpload(url => {
          this.pushToMyModels(url);
        });
      }
    },

    pushToMyModels(url) {
      const grid = document.getElementById('jewelryMyModelGrid');
      if (!grid) return;
      
      const div = document.createElement('div');
      div.className = 'j-model-item';
      div.onclick = () => this.selectJewelryModel(div, url);
      div.style = 'border-radius:12px; overflow:hidden; position:relative; cursor:pointer; transition: all 0.2s; aspect-ratio:3/4;';
      div.innerHTML = `
        <div style="background:url('${url}') center/cover no-repeat; background-color:#f8fafc; width:100%; height:100%;"></div>
        <div class="j-check-overlay" style="display:none;"></div>
      `;
      grid.prepend(div);
      this.selectJewelryModel(div, url);
    },

    setPosMode(mode, el) {
      this.state._mode = mode;
      if (el && el.parentElement) {
        el.parentElement.querySelectorAll('.vdo-model-mode-btn').forEach(b => b.classList.remove('active'));
        el.classList.add('active');
      }
      if (mode === 'manual') this.openManual();
    },

    openManual() {
      const mask = document.getElementById('jewelryManualMask');
      if (mask) mask.style.display = 'flex';
    },

    closeManual(e) {
      if (e && e.target.id !== 'jewelryManualMask' && !e.target.classList.contains('btn-primary')) return;
      const mask = document.getElementById('jewelryManualMask');
      if (mask) mask.style.display = 'none';
    }
  };

  // 注册模块
  if (window.ModuleManager) {
    window.ModuleManager.register('jewelryWear', JewelryModule);
  }

  // 暴露一个局部引用以便调试（可选）
  window.JewelryModule = JewelryModule;

})();

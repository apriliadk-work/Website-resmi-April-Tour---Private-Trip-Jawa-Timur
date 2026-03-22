// LANGUAGE SWITCHER
(function() {
  const saved = localStorage.getItem('at-lang');
  const currentPath = window.location.pathname;
  const isEn = currentPath.includes('/en/') || currentPath.endsWith('/en');
  const isRoot = !isEn;

  // If language already chosen, redirect if on wrong version
  if (saved === 'en' && isRoot) {
    const newPath = currentPath.replace(/\/(index\.html)?$/, '/en/index.html')
      .replace(/\/pages\/(\w+)\.html/, '/en/pages/$1.html');
    if (currentPath !== newPath) window.location.replace('/en/' + (currentPath.split('/').pop() || 'index.html'));
    return;
  }
  if (saved === 'id' && isEn) {
    const page = currentPath.split('/').pop() || 'index.html';
    const isPages = currentPath.includes('/pages/');
    if (isPages) window.location.replace('../../pages/' + page);
    else window.location.replace('../../' + page);
    return;
  }

  // Show popup if no preference saved
  if (!saved) {
    document.addEventListener('DOMContentLoaded', showLangPopup);
  }

  function showLangPopup() {
    const overlay = document.createElement('div');
    overlay.id = 'lang-overlay';
    overlay.style.cssText = `position:fixed;inset:0;background:rgba(26,20,9,0.92);z-index:99999;display:flex;align-items:center;justify-content:center;`;
    overlay.innerHTML = `
      <div style="background:#faf7f0;padding:56px 48px;text-align:center;max-width:440px;width:90%;">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:2rem;letter-spacing:0.2em;color:#1a1409;margin-bottom:6px;">APRIL TOUR</div>
        <div style="font-size:0.62rem;letter-spacing:0.35em;text-transform:uppercase;color:#c4622d;margin-bottom:40px;">Private Trip Jawa Timur</div>
        <div style="font-size:0.72rem;letter-spacing:0.2em;text-transform:uppercase;color:#5a4e3a;margin-bottom:32px;">Choose your language / Pilih bahasa</div>
        <div style="display:flex;gap:16px;justify-content:center;">
          <button onclick="setLang('en')" style="flex:1;max-width:160px;padding:18px 24px;background:#c4622d;color:#faf7f0;border:none;cursor:pointer;font-size:0.78rem;letter-spacing:0.2em;text-transform:uppercase;font-family:inherit;">
            🇬🇧 English
          </button>
          <button onclick="setLang('id')" style="flex:1;max-width:160px;padding:18px 24px;background:#1a1409;color:#faf7f0;border:none;cursor:pointer;font-size:0.78rem;letter-spacing:0.2em;text-transform:uppercase;font-family:inherit;">
            🇮🇩 Indonesia
          </button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
  }

  window.setLang = function(lang) {
    localStorage.setItem('at-lang', lang);
    document.getElementById('lang-overlay')?.remove();
    if (lang === 'en' && isRoot) {
      const page = window.location.pathname.split('/').pop() || 'index.html';
      const isPages = window.location.pathname.includes('/pages/');
      if (isPages) window.location.replace('../en/pages/' + page);
      else window.location.replace('en/index.html');
    } else if (lang === 'id' && isEn) {
      const page = window.location.pathname.split('/').pop() || 'index.html';
      const isPages = window.location.pathname.includes('/pages/');
      if (isPages) window.location.replace('../../pages/' + page);
      else window.location.replace('../../index.html');
    }
  };
})();

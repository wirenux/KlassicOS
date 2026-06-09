import './style.css'

document.querySelector('#app').innerHTML = `
  <div id="desktop">
    <div id="topbar"></div>

    <div id="workspace"></div>

    <div id="taskbar">
      <button id="k-menu-btn">K</button>
      <div id="clock-widget">
        <div class="clock">--:--</div>
        <div class="date">--- --</div>
      </div>
    </div>
  </div>
`

let topZIndex = 10;

function updateClock() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  const month = now.toLocaleDateString('en-US', { month: 'short' });
  const day = String(now.getDate()).padStart(2, '0');

  document.querySelector('.clock').textContent = `${hours}:${minutes}`;
  document.querySelector('.date').textContent = `${month} ${day}`;
}

function spawnWindow(title, contentHTML, contentBgColor = '#ffffff') {
  const desktop = document.getElementById('workspace');
  const windowEl = document.createElement('div');
  windowEl.className = 'kde-window';

  topZIndex++;
  windowEl.style.zIndex = topZIndex;

  windowEl.innerHTML = `
    <div class="kde-titlebar">
      <div class="titlebar-title">${title}</div>
      <div class="titlebar-control">
        <button class="win-btn min-btn">_</button>
        <button class="win-btn max-btn">⃞</button>
        <button class="win-btn close-btn">×</button>
      </div>
    </div>
    <div class="kde-window-content" style="background-color: ${contentBgColor};">
      ${contentHTML}
    </div>
  `;

  windowEl.addEventListener('mousedown', () => {
    topZIndex++;
    windowEl.style.zIndex = topZIndex;
  })

  windowEl.querySelector('.close-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    windowEl.remove();
  });

  const titlebar = windowEl.querySelector('.kde-titlebar');

  titlebar.addEventListener('mousedown', (e) => {
    if (e.target.closest('.win-btn')) {
      return;
    }

    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = parseInt(windowEl.style.left) || 20;
    const startTop = parseInt(windowEl.style.top) || 20;

    const workspaceHeight = workspace.clientHeight;
    const titlebarHeight = titlebar.offsetHeight;

    function onMouseMove(moveEvent) {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newLeft = startLeft + deltaX;
      let newTop = startTop + deltaY;

      if (newTop < 0) {
        newTop = 0;
      }

      const maxTop = workspaceHeight - titlebarHeight;
      if (newTop > maxTop) {
        newTop = maxTop;
      }

      windowEl.style.left = `${newLeft}px`;
      windowEl.style.top = `${newTop}px`;
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  windowEl.style.top = '20px';
  windowEl.style.left = '20px';

  desktop.appendChild(windowEl);
}

document.getElementById('k-menu-btn').addEventListener('click', () => {
  spawnWindow('Terminal', '<p style="color: #00ff00; font-family: monospace; margin: 0;">wirenux@klassicOS:~$ echo "Hi Stardance !"</p>', '#000')
})

updateClock();
setInterval(updateClock, 1000);
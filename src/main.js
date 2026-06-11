import './style.css'
import { TerminalApp } from './apps/terminal.js';
import { AboutApp } from './apps/about.js';
import { EditorApp } from './apps/editor.js';

const APP_REGISTRY = {
  terminal: TerminalApp,
  about: AboutApp,
  editor: EditorApp,
};

document.querySelector('#app').innerHTML = `
  <div id="desktop">
    <div id="topbar"></div>

    <div id="workspace"></div>


    <div id="taskbar">
      <button id="k-menu-btn">K</button>

      <div id="taskbar-apps"></div>

      <div id="k-menu">
        <div class="k-menu-item" data-app="terminal">Terminal</div>
        <div class="k-menu-item" data-app="editor">Text Editor</div>
        <div class="k-menu-separator"></div>
        <div class="k-menu-item" data-app="about">System Info</div>
      </div>
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

function spawnWindow(appConfig) {
  const workspace = document.getElementById('workspace');
  const taskbarApps = document.getElementById('taskbar-apps');

  const windowId = 'win-' + Math.random().toString(36).substr(2, 9);

  const windowEl = document.createElement('div');
  windowEl.className = 'kde-window';
  windowEl.dataset.id = windowId;

  topZIndex++;
  windowEl.style.zIndex = topZIndex;

  windowEl.innerHTML = `
    <div class="kde-titlebar">
      <div class="titlebar-title">${appConfig.title}</div>
      <div class="titlebar-control">
        <button class="win-btn min-btn">_</button>
        <button class="win-btn max-btn">⃞</button>
        <button class="win-btn close-btn">×</button>
      </div>
    </div>
    <div class="kde-window-content" style="background-color: ${appConfig.contentBgColor || '#ffffff'};">
      ${appConfig.render()}
    </div>
  `;

  const taskBtn = document.createElement('button');
  taskBtn.className = 'taskbar-btn';
  taskBtn.id = `btn-${windowId}`;
  taskBtn.textContent = appConfig.title;
  taskbarApps.appendChild(taskBtn);

  function focusWindow() {
    document.querySelectorAll('.taskbar-btn').forEach(b => b.classList.remove('focused'));
    taskBtn.classList.add('focused');

    if (windowEl.classList.contains('minimized')) {
      windowEl.classList.remove('minimized');
    }

    topZIndex++;
    windowEl.style.zIndex = topZIndex;
  }

  windowEl.addEventListener('mousedown', focusWindow);

  taskBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isMinimized = windowEl.classList.contains('minimized');
    const isTop = windowEl.style.zIndex == topZIndex;

    if (!isMinimized && isTop) {
      windowEl.classList.add('minimized');
      taskBtn.classList.remove('focused');
    } else {
      focusWindow();
    }
  });

  windowEl.querySelector('.min-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    windowEl.classList.add('minimized');
    taskBtn.classList.remove('focused');
  });

  windowEl.querySelector('.max-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    windowEl.classList.toggle('maximized');
    focusWindow();
  });

  windowEl.querySelector('.close-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    windowEl.remove();
    taskBtn.remove();
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

  const openWindowsCount = workspace.querySelectorAll('.kde-window').length;
  windowEl.style.top = `${20 + (openWindowsCount * 25)}px`;
  windowEl.style.left = `${20 + (openWindowsCount * 25)}px`;

  workspace.appendChild(windowEl);
  focusWindow();

  if (typeof appConfig.init === 'function') {
    appConfig.init(windowEl);
  }

  return windowEl;
}

const kMenuBtn = document.getElementById('k-menu-btn');
const kMenu = document.getElementById('k-menu');

kMenuBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Stops immediate dismissal from window listener below
  kMenu.classList.toggle('show');
});

document.addEventListener('click', () => {
  kMenu.classList.remove('show');
});

kMenu.addEventListener('click', (e) => {
  const targetItem = e.target.closest('.k-menu-item');
  if (!targetItem) return;

  const appType = targetItem.dataset.app;
  const selectedApp = APP_REGISTRY[appType];

  if (selectedApp) {
    spawnWindow(selectedApp);
  }

  kMenu.classList.remove('show');
});

updateClock();
setInterval(updateClock, 1000);
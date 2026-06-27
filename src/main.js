import './style.css'
import kLogo from './assets/klogo-classic.svg';
import energyLogo from './assets/Energy_Star_logo.svg'
import { TerminalApp } from './apps/terminal.js';
import { AboutApp } from './apps/about.js';
import { EditorApp } from './apps/editor.js';
import { BrowserApp } from './apps/netscape.js';
import { CalculatorApp } from './apps/calculator.js';

const APP_REGISTRY = {
  terminal: TerminalApp,
  about: AboutApp,
  editor: EditorApp,
  browser: BrowserApp,
  calculator: CalculatorApp,
};

document.querySelector('#app').innerHTML = `
  <div id="bios-screen">
    <div id="bios-logo">
      <img src="${energyLogo}" height=256px/>
      <div class="epa-text">EPA POLLUTION PREVENTER</div>
    </div>
    <div id="bios-content"></div>
    <span class="bios-cursor"></span>
  </div>

  <div id="desktop">
    <div id="topbar">
      <div id="taskbar-apps"></div>
    </div>

    <div id="workspace">
      <div class="desktop-shortcut" data-app="browser">
        <div class="shortcut-icon icon-browser"></div>
        <div class="shortcut-label">Netscape Navigator</div>
      </div>

      <div class="desktop-shortcut" data-app="terminal">
        <div class="shortcut-icon icon-terminal"></div>
        <div class="shortcut-label">Konsole</div>
      </div>

      <div class="desktop-shortcut" data-app="editor">
        <div class="shortcut-icon icon-editor"></div>
        <div class="shortcut-label">KWrite</div>
      </div>

      <div class="desktop-shortcut" data-app="calculator">
        <div class="shortcut-icon icon-calculator"></div>
        <div class="shortcut-label">KCalc</div>
      </div>

      <div class="desktop-shortcut" data-app="about">
        <div class="shortcut-icon icon-about"></div>
        <div class="shortcut-label">System Info</div>
      </div>
    </div>

    <div id="taskbar">
      <button id="k-menu-btn" aria-label="Start Menu">
        <img class="k-menu-icon" src="${kLogo}" alt="K Menu" />
      </button>

      <div id="k-menu">
        <div class="k-menu-item" data-app="browser">Netscape Navigator</div>
        <div class="k-menu-item" data-app="terminal">Konsole</div>
        <div class="k-menu-item" data-app="editor">KWrite</div>
        <div class="k-menu-item" data-app="calculator">KCalc</div>
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

async function runBiosBoot() {
  const container = document.getElementById('bios-content');
  const biosScreen = document.getElementById('bios-screen');

  const lines = [
    { text: "AMIBIOS (C) 1998 American Megatrends, Inc.", delay: 400 },
    { text: "KDE-OS V1.00 Release E8.21.0X", delay: 300 },
    { text: "CPU: Retro-Processor core running at 233 MHz", delay: 500 },
    { text: "------------------------------------------------", delay: 100 },
    { text: "Checking RAM : <span id='bios-ram'>0KB</span>", delay: 0, isRam: true },
    { text: "Keyboard..... Detected <span class='bios-green'>[OK]</span>", delay: 400 },
    { text: "Mouse........ Detected <span class='bios-green'>[OK]</span>", delay: 300 },
    { text: "Detecting Primary Master ... IDE Hard Disk 2.1GB", delay: 600 },
    { text: "Detecting Secondary Master . CD-ROM Drive", delay: 400 },
    { text: "Loading Kernel Modules ..................... Done", delay: 500 },
    { text: "Starting Graphical Environment...", delay: 600 }
  ];

  for (const line of lines) {
    const div = document.createElement('div');
    div.innerHTML = line.text;
    container.appendChild(div);

    if (line.isRam) {
      const ramSpan = document.getElementById('bios-ram');
      for (let currentRam = 0; currentRam <= 65536; currentRam += 4096) {
        ramSpan.textContent = `${currentRam}KB OK`;
        await new Promise(res => setTimeout(res, 30)); 
      }
    } else {
      await new Promise(res => setTimeout(res, line.delay));
    }
  }

  await new Promise(res => setTimeout(res, 600));
  biosScreen.classList.add('fade-out');

  setTimeout(() => biosScreen.remove(), 500);
}

runBiosBoot();

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
    <div class="win-resize-handle"></div>
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
    if (e.target.closest('.win-btn') || windowEl.classList.contains('maximized')) {
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

  const resizeHandle = windowEl.querySelector('.win-resize-handle');
  resizeHandle.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (windowEl.classList.contains('maximized')) {
      return;
    }

    const startX = e.clientX
    const startY = e.clientY

    const startWidth = windowEl.offsetWidth
    const startHeight = windowEl.offsetHeight

    function onMouseMove(moveEvent) {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      const newWidth = Math.max(250, startWidth + deltaX);
      const newHeight = Math.max(150, startHeight + deltaY);

      windowEl.style.width = `${newWidth}px`;
      windowEl.style.height = `${newHeight}px`;
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

  windowEl.style.width = appConfig.width || '400px';
  windowEl.style.height = appConfig.height || '300px';

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

const workspace = document.getElementById('workspace');
workspace.addEventListener('dblclick', (e) => {
  const shortcut = e.target.closest('.desktop-shortcut');

  if (!shortcut) {
    return;
  }

  const appType = shortcut.dataset.app;
  const selectedApp = APP_REGISTRY[appType];

  if (selectedApp) {
    spawnWindow(selectedApp);
  }

});

const contextMenu = document.createElement('div');
contextMenu.id = 'desktop-context-menu';
document.body.appendChild(contextMenu);

const workspaceEl = document.getElementById('workspace');

workspaceEl.addEventListener('contextmenu', (e) => {
  if (e.target !== workspaceEl) {
    return;
  }
  e.preventDefault();

  contextMenu.innerHTML = `
    <div class="menu-section-title">Applications</div>
    <div class="context-item" data-action="launch" data-app="browser">Netscape Navigator</div>
    <div class="context-item" data-action="launch" data-app="terminal">Konsole</div>
    <div class="context-item" data-action="launch" data-app="editor">KWrite</div>
    <div class="context-item" data-action="launch" data-app="calculator">KCalc</div>

    <div class="context-separator"></div>

    <div class="menu-section-title">Workspace View</div>

    <div class="context-item" data-action="toggle-view" data-target="hide-icons">Hide/Show Icons</div>

    <div class="context-item" data-action="toggle-view" data-target="compact-grid">Toggle Compact Icon Spacing</div>

    <div class="context-separator"></div>

    <div class="menu-section-title">Color Themes</div>
    <div class="context-item" data-action="wallpaper" data-color="linear-gradient(180deg, rgba(6, 183, 169, 1) 0%, rgba(0, 170, 159, 1) 45%, rgba(0, 150, 141, 1) 65%, rgba(0, 131, 130, 1) 100%)">KDE Classic Teal</div>
    <div class="context-item" data-action="wallpaper" data-color="linear-gradient(0deg,rgba(128, 0, 0, 1) 15%, rgba(204, 155, 155, 1) 100%)">Retro Maroon</div>
    <div class="context-item" data-action="wallpaper" data-color="linear-gradient(0deg,rgba(74, 89, 99, 1) 0%, rgba(138, 152, 166, 1) 100%)">Linux Slate Gray</div>
  `;

  contextMenu.style.top = `${e.clientY}px`;
  contextMenu.style.left = `${e.clientX}px`;
  contextMenu.classList.add('show');
});

contextMenu.addEventListener('click', (e) => {
  const item = e.target.closest('.context-item');

  if (!item) {
    return;
  }

  const action = item.dataset.action;

  if (action === 'launch') {
    const appType = item.dataset.app;
    const selectedApp = APP_REGISTRY[appType];
    if (selectedApp) spawnWindow(selectedApp);
  }

  if (action === 'toggle-view') {
    const className = item.dataset.target;
    workspaceEl.classList.toggle(className);
  }

  if (action === 'wallpaper') {
    workspaceEl.style.background = item.dataset.color;
  }

  contextMenu.classList.remove('show');
});

document.addEventListener('click', (e) => {
  if (!contextMenu.contains(e.target)) {
    contextMenu.classList.remove('show');
  }
});

updateClock();
setInterval(updateClock, 1000);
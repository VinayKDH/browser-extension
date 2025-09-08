// AIML Gyan Browser Extension - Content Script
// Handles sidebar functionality and browser view integration
(() => {
  const LAUNCHER_ID = '__tens_ai_launcher__';
  const SIDEBAR_ID = '__tens_ai_sidebar__';
  let sidebarInstance = null;

  async function createLauncher() {
    if (document.getElementById(LAUNCHER_ID)) return;
    const { injectLauncher = true } = await chrome.storage.sync.get({ injectLauncher: true });
    if (!injectLauncher) return;
    
    const btn = document.createElement('button');
    btn.id = LAUNCHER_ID;
    btn.textContent = 'AIML Gyan';
    btn.style.position = 'fixed';
    btn.style.right = '16px';
    btn.style.bottom = '16px';
    btn.style.zIndex = '2147483647';
    btn.style.padding = '10px 14px';
    btn.style.borderRadius = '999px';
    btn.style.border = 'none';
    btn.style.color = '#fff';
    btn.style.background = '#111827';
    btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    btn.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji';
    btn.style.cursor = 'pointer';
    btn.title = 'Open AIML Gyan (Alt+Shift+T) | Sidebar (Alt+Shift+S)';
    
    // Add click handler for main button
    btn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ type: 'OPEN_TENS_WITH_QUERY', query: getSelectedText() });
    });
    
    // Add right-click context menu for sidebar
    btn.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      toggleSidebar();
    });
    
    document.documentElement.appendChild(btn);
  }

  function getSelectedText() {
    const sel = window.getSelection();
    return sel && String(sel).trim() ? String(sel).trim() : '';
  }

  function onKeydown(e) {
    if (e.altKey && e.shiftKey && (e.key === 'T' || e.key === 't')) {
      chrome.runtime.sendMessage({ type: 'OPEN_TENS_WITH_QUERY', query: getSelectedText() });
    }
    if (e.altKey && e.shiftKey && (e.key === 'S' || e.key === 's')) {
      toggleSidebar();
    }
  }

  function init() {
    console.log('Content script initializing...');
    createLauncher();
    window.addEventListener('keydown', onKeydown, { passive: true });
    setupMessageListener();
    console.log('Content script initialized successfully');
  }

  function toggleSidebar() {
    console.log('toggleSidebar called, current sidebarInstance:', sidebarInstance);
    if (sidebarInstance) {
      console.log('Removing existing sidebar');
      sidebarInstance.remove();
      sidebarInstance = null;
    } else {
      console.log('Creating new sidebar');
      createSidebar();
    }
  }

  function createSidebar() {
    if (sidebarInstance) return;
    
    console.log('Creating sidebar...');
    // Create sidebar iframe
    const sidebar = document.createElement('iframe');
    sidebar.id = SIDEBAR_ID;
    sidebar.src = chrome.runtime.getURL('sidebar.html');
    console.log('Sidebar iframe created with src:', sidebar.src);
    sidebar.style.cssText = `
      position: fixed;
      top: 0;
      right: 0;
      width: 400px;
      height: 100vh;
      border: none;
      z-index: 2147483646;
      box-shadow: -2px 0 10px rgba(0,0,0,0.1);
      background: white;
    `;
    
    document.documentElement.appendChild(sidebar);
    sidebarInstance = sidebar;
    console.log('Sidebar appended to document, sidebarInstance set');
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      position: fixed;
      top: 20px;
      right: 420px;
      width: 30px;
      height: 30px;
      border: none;
      background: #ef4444;
      color: white;
      border-radius: 50%;
      cursor: pointer;
      z-index: 2147483647;
      font-size: 18px;
      font-weight: bold;
    `;
    closeBtn.addEventListener('click', toggleSidebar);
    document.documentElement.appendChild(closeBtn);
    
    // Store reference to close button
    sidebarInstance.closeBtn = closeBtn;
  }

  function setupMessageListener() {
    console.log('Setting up message listener...');
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log('Content script received message:', message);
      if (message.type === 'TOGGLE_SIDEBAR') {
        console.log('Toggling sidebar...');
        toggleSidebar();
        sendResponse({ ok: true });
        return true; // Keep message channel open for async response
      }
      if (message.type === 'OPEN_BROWSER_VIEW') {
        console.log('Opening browser view:', message.url);
        openBrowserView(message.url, message.service);
        sendResponse({ ok: true });
        return true; // Keep message channel open for async response
      }
      if (message.type === 'PING') {
        console.log('Ping received');
        sendResponse({ pong: true });
        return true;
      }
    });
    console.log('Message listener set up successfully');
  }

  function openBrowserView(url, service) {
    // Create a browser view iframe overlay
    const browserViewId = `__browser_view_${service}__`;
    
    // Remove existing browser view if any
    const existingView = document.getElementById(browserViewId);
    if (existingView) {
      existingView.remove();
    }
    
    // Create new browser view
    const browserView = document.createElement('iframe');
    browserView.id = browserViewId;
    browserView.src = url;
    browserView.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      border: none;
      z-index: 2147483645;
      background: white;
    `;
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      border: none;
      background: #ef4444;
      color: white;
      border-radius: 50%;
      cursor: pointer;
      z-index: 2147483646;
      font-size: 20px;
      font-weight: bold;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    `;
    closeBtn.addEventListener('click', () => {
      browserView.remove();
      closeBtn.remove();
    });
    
    document.documentElement.appendChild(browserView);
    document.documentElement.appendChild(closeBtn);
    
    // Store references for cleanup
    browserView.closeBtn = closeBtn;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();



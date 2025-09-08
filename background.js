const PROD_URL = 'https://www.aimlgyan.com/';
const TEST_URL = chrome.runtime.getURL('test/test.html');

async function getOrCreateTensTab(url = PROD_URL) {
  const tabs = await chrome.tabs.query({ url: `${new URL(url).origin}/*` });
  const existing = tabs.find(t => t.url && t.url.startsWith(url));
  if (existing) {
    await chrome.tabs.update(existing.id, { active: true });
    if (existing.windowId) {
      await chrome.windows.update(existing.windowId, { focused: true });
    }
    return existing.id;
  }
  const created = await chrome.tabs.create({ url });
  return created.id;
}

async function isTestMode() {
  const { testMode = false } = await chrome.storage.sync.get({ testMode: false });
  return Boolean(testMode);
}

async function buildSearchUrl(query) {
  const useTest = await isTestMode();
  const base = useTest ? TEST_URL : PROD_URL;
  const u = new URL(base);
  // If Tens AI supports query params, adapt here. We'll use ?q= for now.
  if (query) {
    u.searchParams.set('q', query);
  }
  return u.toString();
}

async function openWithQuery(query) {
  const url = await buildSearchUrl(query);
  await getOrCreateTensTab(url);
}

async function toggleSidebar() {
  // Send message to content script to toggle sidebar
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tabs[0]) {
    try {
      console.log('Attempting to toggle sidebar on tab:', tabs[0].id, tabs[0].url);
      const response = await chrome.tabs.sendMessage(tabs[0].id, { type: 'TOGGLE_SIDEBAR' });
      console.log('Sidebar toggle response:', response);
    } catch (error) {
      console.log('Error toggling sidebar:', error);
      // If content script is not injected, try to inject it
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content.js']
        });
        // Wait a bit for the script to initialize
        setTimeout(async () => {
          try {
            await chrome.tabs.sendMessage(tabs[0].id, { type: 'TOGGLE_SIDEBAR' });
          } catch (retryError) {
            console.log('Retry failed:', retryError);
          }
        }, 100);
      } catch (injectionError) {
        console.log('Failed to inject content script:', injectionError);
      }
    }
  }
}

async function openInBrowserView(url, service) {
  // For browser view, we'll send a message to content script to create an iframe
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tabs[0]) {
    try {
      await chrome.tabs.sendMessage(tabs[0].id, { 
        type: 'OPEN_BROWSER_VIEW', 
        url: url, 
        service: service 
      });
    } catch (error) {
      console.log('Error opening browser view:', error);
      // Fallback to new tab if browser view fails
      await openInNewTab(url, service);
    }
  }
}

async function openInNewTab(url, service) {
  // Create a new tab for services that should open separately
  try {
    const tab = await chrome.tabs.create({ url: url });
    console.log(`Opened ${service} in new tab:`, tab.id);
    return tab.id;
  } catch (error) {
    console.error(`Error opening ${service} in new tab:`, error);
    throw error;
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'tens-open',
    title: 'Open AIML Gyan',
    contexts: ['action']
  });
  chrome.contextMenus.create({
    id: 'tens-search-selection',
    title: 'Search in AIML Gyan: "%s"',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === 'tens-open') {
    await openWithQuery('');
  }
  if (info.menuItemId === 'tens-search-selection') {
    const q = info.selectionText || '';
    await openWithQuery(q);
  }
});

chrome.action.onClicked.addListener(async () => {
  await toggleSidebar();
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'open-or-focus-tens') {
    await openWithQuery('');
  }
  if (command === 'toggle-sidebar') {
    await toggleSidebar();
  }
});

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg && msg.type === 'OPEN_TENS_WITH_QUERY') {
    openWithQuery(msg.query || '').then(() => sendResponse({ ok: true })).catch((err) => sendResponse({ ok: false, error: String(err) }));
    return true;
  }
  
  if (msg && msg.type === 'OPEN_IN_BROWSER_VIEW') {
    openInBrowserView(msg.url, msg.service).then(() => sendResponse({ ok: true })).catch((err) => sendResponse({ ok: false, error: String(err) }));
    return true;
  }
  
  if (msg && msg.type === 'OPEN_IN_NEW_TAB') {
    openInNewTab(msg.url, msg.service).then(() => sendResponse({ ok: true })).catch((err) => sendResponse({ ok: false, error: String(err) }));
    return true;
  }
});




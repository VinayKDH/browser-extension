const checkbox = document.getElementById('injectLauncher');
const testModeEl = document.getElementById('testMode');
const saveBtn = document.getElementById('save');
const status = document.getElementById('status');

async function load() {
  const { injectLauncher = true, testMode = false } = await chrome.storage.sync.get({ injectLauncher: true, testMode: false });
  checkbox.checked = Boolean(injectLauncher);
  testModeEl.checked = Boolean(testMode);
}

async function save() {
  await chrome.storage.sync.set({ injectLauncher: checkbox.checked, testMode: testModeEl.checked });
  status.textContent = 'Saved';
  setTimeout(() => (status.textContent = ''), 1200);
}

saveBtn.addEventListener('click', save);
load();




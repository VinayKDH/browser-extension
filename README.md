## Tens AI Browser Extension (Standalone)

This folder is a standalone, cross-browser WebExtension that integrates `https://www.tens-ai.com/`.

Features:
- Browser action button opens or focuses Tens AI
- Context menu: "Search in Tens AI" for selected text
- Keyboard shortcut: Alt+Shift+T
- Optional floating in-page launcher
- Test Mode with a built-in dummy page under `test/test.html`

### Run Locally (Firefox preferred for dev)
1. Install deps: `npm install` (in this folder)
2. Lint & try: `npm run lint`
3. Run: `npm start`

### Load Unpacked (Chrome/Edge)
1. Open `chrome://extensions` (or `edge://extensions`)
2. Enable Developer mode
3. Load unpacked → select this `browser-extension` folder

### Safari (via Xcode Conversion)
1. Xcode → File → New → Project → Safari Web Extension
2. Select this folder to convert
3. Build/run the host app, then enable the extension in Safari Preferences → Extensions

### Test Mode
- Toggle in Options → "Enable Test Mode"
- When enabled, the extension opens the bundled `test/test.html` instead of Tens AI
- Query is passed via `?q=...`



# 🧪 Local Testing Guide for AIML Gyan Extension

## 🚀 **Extension Loaded Successfully!**

The extension has been loaded in Chrome and test pages are open. Here's how to test all functionality:

## 📋 **Testing Checklist**

### **✅ Step 1: Verify Extension Loaded**
1. **Check Chrome Extensions Page**:
   - Go to `chrome://extensions/`
   - Look for "AIML Gyan Launcher"
   - Ensure it's **enabled** (toggle should be blue)
   - Check for any error messages

2. **Check Extension Icon**:
   - Look for the AIML Gyan icon in the Chrome toolbar
   - Hover over it to see tooltip: "AIML Gyan - Click to open sidebar"

### **✅ Step 2: Test Extension Icon Click**
1. **Click the extension icon** in the toolbar
2. **Expected Result**: Sidebar should slide in from the right
3. **Check Console**: Open DevTools (F12) → Console tab
4. **Look for logs**:
   ```
   Content script initializing...
   Setting up message listener...
   Message listener set up successfully
   Content script initialized successfully
   ```

### **✅ Step 3: Test Sidebar Features**
When sidebar is open, test all 6 services:

#### **Browser View Services** (Open in iframe overlay):
- **🤖 WebGPT** - Click to open in browser view
- **💼 Business Application** - Click to open in browser view

#### **Separate Tab Services** (Open in new tabs):
- **🌐 Translator** - Click to open in new tab
- **🔍 OmniQuest** - Click to open in new tab
- **🎨 MediaStudio** - Click to open in new tab
- **📝 Summarizer** - Click to open in new tab

### **✅ Step 4: Test Alternative Access Methods**

#### **Keyboard Shortcuts**:
- **Alt+Shift+S** - Toggle sidebar
- **Alt+Shift+T** - Open main AIML Gyan

#### **Floating Button**:
- Look for floating "AIML Gyan" button (bottom-right corner)
- **Left-click** - Open main AIML Gyan
- **Right-click** - Toggle sidebar

#### **Context Menu**:
- Right-click on page → "Open AIML Gyan"
- Select text → Right-click → "Search in AIML Gyan"

### **✅ Step 5: Test Chat Functionality**
1. **Open sidebar**
2. **Type in chat input**: "help"
3. **Expected**: AI assistant responds with service information
4. **Try other queries**: "webgpt", "translate", "summarize"

## 🔧 **Manual Testing Script**

### **Run in Browser Console**:
1. **Open DevTools** (F12)
2. **Go to Console tab**
3. **Copy and paste** the contents of `local-test.js`
4. **Press Enter**
5. **Type**: `testExtension.runAllTests()`
6. **Press Enter**

### **Individual Tests**:
```javascript
// Test extension loading
testExtension.testExtensionLoaded()

// Test sidebar toggle
testExtension.testSidebarToggle()

// Test browser view services
testExtension.testBrowserViewServices()

// Test new tab services
testExtension.testNewTabServices()

// Test floating button
testExtension.testFloatingButton()
```

## 🐛 **Debugging Console Logs**

### **Expected Content Script Logs**:
```
Content script initializing...
Setting up message listener...
Message listener set up successfully
Content script initialized successfully
```

### **Expected Extension Icon Click Logs**:
```
Attempting to toggle sidebar on tab: [tab_id] [url]
Content script received message: {type: "TOGGLE_SIDEBAR"}
Toggling sidebar...
toggleSidebar called, current sidebarInstance: null
Creating new sidebar
Creating sidebar...
Sidebar iframe created with src: chrome-extension://[id]/sidebar.html
Sidebar appended to document, sidebarInstance set
```

### **Expected Service Click Logs**:
```
Content script received message: {type: "OPEN_IN_BROWSER_VIEW", service: "webgpt", url: "https://www.aimlgyan.com/webgpt"}
Opening browser view: https://www.aimlgyan.com/webgpt
```

## 🚨 **Troubleshooting**

### **If Extension Icon Doesn't Work**:
1. **Check console for errors**
2. **Try keyboard shortcut Alt+Shift+S**
3. **Try floating button right-click**
4. **Refresh the page and try again**

### **If Sidebar Doesn't Appear**:
1. **Check if iframe is created** (look for `__tens_ai_sidebar__` in DOM)
2. **Check console for sidebar creation logs**
3. **Try on different website** (not chrome:// pages)

### **If Services Don't Open**:
1. **Browser View Services**: Check for iframe overlay
2. **New Tab Services**: Check if new tabs open
3. **Check console for service-specific logs**

## 📊 **Test Results**

### **✅ Working Features**:
- [ ] Extension loads without errors
- [ ] Extension icon appears in toolbar
- [ ] Extension icon click opens sidebar
- [ ] Sidebar displays all 6 service cards
- [ ] WebGPT opens in browser view
- [ ] Business App opens in browser view
- [ ] Translator opens in new tab
- [ ] OmniQuest opens in new tab
- [ ] MediaStudio opens in new tab
- [ ] Summarizer opens in new tab
- [ ] Chat functionality works
- [ ] Keyboard shortcuts work
- [ ] Floating button works
- [ ] Context menu works

### **❌ Issues Found**:
- [ ] List any issues here

## 🎯 **Expected Behavior Summary**

1. **Extension Icon Click** → Sidebar slides in from right
2. **Service Cards** → Different opening behaviors as specified
3. **Chat Interface** → AI assistant responds to queries
4. **Keyboard Shortcuts** → Alt+Shift+S toggles sidebar
5. **Floating Button** → Right-click opens sidebar
6. **Context Menu** → Right-click options work

## 📞 **If Issues Found**

### **Common Issues**:
1. **Content Script Not Loading** - Check console for injection errors
2. **Message Passing Failed** - Check console for connection errors
3. **Sidebar Not Creating** - Check console for iframe creation errors
4. **Services Not Opening** - Check console for service-specific errors

### **Debug Steps**:
1. **Check console logs** for specific error messages
2. **Try on different websites** (not chrome:// pages)
3. **Reload extension** in chrome://extensions/
4. **Refresh page** and try again

---

## 🎉 **Ready to Test!**

The extension is now loaded and ready for testing. Follow the checklist above to verify all functionality works correctly. Use the console logs to debug any issues that arise.

**🔍 Start with clicking the extension icon and check the console for logs!**



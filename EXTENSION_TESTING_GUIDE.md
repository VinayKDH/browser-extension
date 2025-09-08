# 🧪 Extension Testing & Debugging Guide

## 🚨 **Issue**: Extension icon click not working

## ✅ **Fixes Applied**

### **1. Enhanced Debugging**
- Added comprehensive console logging throughout the extension
- Added message response handling with `return true`
- Added initialization logging
- Added sidebar creation logging

### **2. Improved Error Handling**
- Enhanced background script error handling
- Added fallback content script injection
- Added retry mechanisms for failed operations

### **3. Message Passing Fixes**
- Fixed message listener setup
- Added proper response handling
- Added PING/PONG test functionality

## 🔍 **How to Test & Debug**

### **Step 1: Load the Extension**
1. **Open Chrome** and go to `chrome://extensions/`
2. **Enable Developer mode** (toggle in top-right)
3. **Click "Load unpacked"**
4. **Select the extension folder** (`/Users/vinaykumar/Desktop/browser-extension`)
5. **Verify extension appears** in the list

### **Step 2: Test on a Regular Website**
1. **Go to a regular website** (e.g., `google.com`, `github.com`)
2. **Open Chrome DevTools** (F12)
3. **Go to Console tab**
4. **Look for these messages**:

#### **Expected Content Script Logs:**
```
Content script initializing...
Setting up message listener...
Message listener set up successfully
Content script initialized successfully
```

### **Step 3: Test Extension Icon Click**
1. **Click the extension icon** in the toolbar
2. **Check console for these messages**:

#### **Expected Background Script Logs:**
```
Attempting to toggle sidebar on tab: [tab_id] [url]
Sidebar toggle response: {ok: true}
```

#### **Expected Content Script Logs:**
```
Content script received message: {type: "TOGGLE_SIDEBAR"}
Toggling sidebar...
toggleSidebar called, current sidebarInstance: null
Creating new sidebar
Creating sidebar...
Sidebar iframe created with src: chrome-extension://[id]/sidebar.html
Sidebar appended to document, sidebarInstance set
```

### **Step 4: Alternative Tests**

#### **Test 1: Keyboard Shortcut**
- **Press Alt+Shift+S** on any webpage
- **Should see sidebar appear**
- **If this works, content script is fine**

#### **Test 2: Floating Button**
- **Look for floating "AIML Gyan" button** (bottom-right corner)
- **Right-click the button**
- **Should see sidebar appear**

#### **Test 3: Manual Console Test**
- **Open DevTools Console**
- **Type**: `chrome.runtime.sendMessage({type: 'TOGGLE_SIDEBAR'})`
- **Press Enter**
- **Should see sidebar appear**

## 🛠️ **Troubleshooting Steps**

### **If No Logs Appear:**

#### **Check 1: Extension Status**
- Go to `chrome://extensions/`
- Find "AIML Gyan Launcher"
- Ensure it's **enabled**
- Check for any error messages

#### **Check 2: Content Script Injection**
- The content script should auto-inject on page load
- If not, the background script will try to inject it
- Check for any CSP (Content Security Policy) errors

#### **Check 3: Page Type**
- Some pages block content scripts:
  - ✅ `google.com` - Works
  - ✅ `github.com` - Works
  - ✅ `stackoverflow.com` - Works
  - ❌ `chrome://extensions/` - Blocked
  - ❌ `chrome://settings/` - Blocked

### **If Logs Show Errors:**

#### **Error: "Could not establish connection"**
- Content script not injected
- Background script will retry with dynamic injection
- Check if page allows script injection

#### **Error: "Extension context invalidated"**
- Extension was reloaded
- Refresh the page and try again

#### **Error: "Cannot access chrome://"**
- Chrome internal pages don't allow content scripts
- Try on a regular website

## 🚀 **Quick Fixes**

### **Fix 1: Reload Extension**
1. Go to `chrome://extensions/`
2. Find "AIML Gyan Launcher"
3. Click the **reload button** (🔄)
4. Try clicking the icon again

### **Fix 2: Refresh Page**
1. **Refresh the current webpage** (F5)
2. **Wait for page to load completely**
3. **Try clicking the extension icon**

### **Fix 3: Check Console**
1. **Open DevTools Console** (F12)
2. **Look for error messages**
3. **Check if content script loaded**

## 📋 **Debug Checklist**

- [ ] Extension is enabled in `chrome://extensions/`
- [ ] No error messages in extension details
- [ ] Testing on a regular website (not chrome://)
- [ ] Page is fully loaded
- [ ] Console shows content script initialization logs
- [ ] Console shows message listener setup logs
- [ ] Keyboard shortcut Alt+Shift+S works
- [ ] Floating button is visible
- [ ] No CSP errors in console

## 🔧 **Advanced Debugging**

### **Check Content Script Status**
```javascript
// In browser console on any webpage:
console.log('Content script loaded:', typeof chrome !== 'undefined');
```

### **Manual Sidebar Toggle**
```javascript
// In browser console:
chrome.runtime.sendMessage({type: 'TOGGLE_SIDEBAR'});
```

### **Test Message Passing**
```javascript
// In browser console:
chrome.runtime.sendMessage({type: 'PING'}, (response) => {
  console.log('Ping response:', response);
});
```

### **Check Extension Status**
```javascript
// In browser console:
chrome.runtime.sendMessage({type: 'PING'});
```

## 🎯 **Expected Behavior**

When working correctly:
1. **Click extension icon** → Console shows logs → Sidebar appears
2. **Click again** → Sidebar disappears
3. **Works on all regular websites**
4. **Keyboard shortcut Alt+Shift+S also works**
5. **Floating button right-click also works**

## 📞 **If Still Not Working**

### **Common Issues & Solutions**

1. **Extension Not Loaded**
   - Reload extension in `chrome://extensions/`
   - Check for manifest errors

2. **Content Script Blocked**
   - Try on different website
   - Check for CSP errors

3. **Permission Issues**
   - Check extension permissions
   - Ensure all required permissions granted

4. **Browser Compatibility**
   - Test in Chrome (recommended)
   - Check Chrome version (should be 88+)

## 🧪 **Test Files Created**

### **1. test-extension.html**
- Comprehensive test page with manual tests
- Debug information display
- Console logging

### **2. content-test.js**
- Simplified content script for testing
- Basic message handling
- Alert-based feedback

### **3. background-test.js**
- Simplified background script for testing
- Enhanced error handling
- Debug logging

### **4. manifest-test.json**
- Test manifest with simplified configuration
- Uses test scripts for debugging

---

## 🎉 **Next Steps**

1. **Load the extension** in Chrome
2. **Go to a regular website** (not chrome://)
3. **Open DevTools Console**
4. **Click the extension icon**
5. **Check the console logs**
6. **Report what you see**

**🔍 The enhanced debugging should now show exactly where the issue is occurring!**

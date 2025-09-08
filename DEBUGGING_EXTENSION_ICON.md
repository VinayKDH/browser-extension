# 🔧 Debugging Extension Icon Click Issue

## 🚨 **Issue**: Extension icon click not opening sidebar

## ✅ **Fixes Applied**

### **1. Enhanced Error Handling**
- Added comprehensive error handling in `background.js`
- Added debugging logs to track message flow
- Added fallback content script injection

### **2. Added Scripting Permission**
- Added `"scripting"` permission to `manifest.json`
- Enables dynamic content script injection if needed

### **3. Enhanced Debugging**
- Added console logs in both background and content scripts
- Added response tracking for message passing
- Added retry mechanism for failed injections

## 🔍 **How to Debug**

### **Step 1: Check Browser Console**
1. **Open Chrome DevTools** (F12)
2. **Go to Console tab**
3. **Click the extension icon**
4. **Look for these messages**:

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
```

### **Step 2: Check Extension Console**
1. **Go to** `chrome://extensions/`
2. **Find "AIML Gyan Launcher"**
3. **Click "Inspect views: service worker"**
4. **Check console for background script logs**

### **Step 3: Check Content Script Injection**
1. **Go to any webpage**
2. **Open DevTools Console**
3. **Type**: `chrome.runtime.sendMessage({type: 'TOGGLE_SIDEBAR'})`
4. **Press Enter**
5. **Should see sidebar appear**

## 🛠️ **Troubleshooting Steps**

### **If No Logs Appear:**

#### **Check 1: Extension Permissions**
- Go to `chrome://extensions/`
- Find "AIML Gyan Launcher"
- Ensure it's **enabled**
- Check if any permissions are blocked

#### **Check 2: Content Script Injection**
- The content script should auto-inject on page load
- If not, the background script will try to inject it
- Check for any CSP (Content Security Policy) errors

#### **Check 3: Tab Permissions**
- Some pages (chrome://, extension pages) block content scripts
- Try on a regular website like `google.com`

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

## 🔄 **Manual Testing Steps**

### **Test 1: Keyboard Shortcut**
1. **Go to any webpage**
2. **Press Alt+Shift+S**
3. **Sidebar should appear**
4. **If this works, the content script is fine**

### **Test 2: Floating Button**
1. **Look for floating "AIML Gyan" button** (bottom-right)
2. **Right-click the button**
3. **Sidebar should appear**
4. **If this works, the content script is fine**

### **Test 3: Extension Icon**
1. **Click the extension icon in toolbar**
2. **Check console logs**
3. **Sidebar should appear**

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

### **Fix 3: Check Page Type**
1. **Try on different websites**:
   - `google.com` ✅
   - `github.com` ✅
   - `stackoverflow.com` ✅
   - `chrome://extensions/` ❌
   - `chrome://settings/` ❌

## 📋 **Debug Checklist**

- [ ] Extension is enabled in `chrome://extensions/`
- [ ] No permission errors in extension details
- [ ] Testing on a regular website (not chrome://)
- [ ] Page is fully loaded
- [ ] Console shows expected logs
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

### **Check Extension Status**
```javascript
// In browser console:
chrome.runtime.sendMessage({type: 'PING'});
```

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

## 🎯 **Expected Behavior**

When working correctly:
1. **Click extension icon** → Console shows logs → Sidebar appears
2. **Click again** → Sidebar disappears
3. **Works on all regular websites**
4. **Keyboard shortcut Alt+Shift+S also works**

---

**🔍 Try the debugging steps above and let me know what logs you see in the console!**

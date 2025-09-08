# 🧪 Tens AI Browser Extension Testing Guide

This guide provides comprehensive instructions for testing the Tens AI browser extension across Safari, Chrome, and Firefox.

## 📋 Prerequisites

- Extension files loaded in the browser
- Access to the test suite at `test/test.html`
- Developer tools enabled in your browser

## 🌐 Browser-Specific Installation

### Chrome/Chromium
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked" and select the extension directory
4. Verify the extension appears in the extensions list

### Firefox
1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" tab
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file from the extension directory
5. Verify the extension appears in the list

### Safari
1. Open Safari and go to Safari > Preferences > Advanced
2. Check "Show Develop menu in menu bar"
3. Go to Develop > Show Extension Builder
4. Click the "+" button and select "Add Extension"
5. Choose the extension directory
6. Click "Run" to test the extension

## 🚀 Running the Test Suite

1. **Load the test page**: Open `test/test.html` in your browser
2. **Install the extension**: Follow the browser-specific installation steps above
3. **Run tests**: Click "Run All Tests" button on the test page
4. **Review results**: Check the test results grid and console output

## 🔧 Manual Testing Checklist

### 1. Extension Installation ✅
- [ ] Extension icon appears in browser toolbar
- [ ] Extension is enabled in browser extensions page
- [ ] No error messages in browser console
- [ ] Extension appears in browser's extension management

### 2. Popup Functionality ✅
- [ ] Click extension icon opens popup
- [ ] Search input field is present and functional
- [ ] "Go" button works correctly
- [ ] Enter key submits search query
- [ ] Popup closes after action

### 3. Content Script Injection ✅
- [ ] Floating "Tens AI" button appears on test page
- [ ] Button is positioned correctly (bottom-right)
- [ ] Button styling matches design
- [ ] Clicking button opens Tens AI in new tab

### 4. Keyboard Shortcuts ✅
- [ ] `Alt+Shift+T` opens Tens AI
- [ ] Shortcut works with text selected
- [ ] Selected text is passed to Tens AI
- [ ] Shortcut works on different pages

### 5. Context Menus ✅
- [ ] Right-click on extension icon shows context menu
- [ ] "Open Tens AI" option is available
- [ ] Text selection context menu works
- [ ] "Search in Tens AI" option appears

### 6. Tens AI Connection ✅
- [ ] Extension opens `https://www.tens-ai.com`
- [ ] Search queries are properly passed via URL parameters
- [ ] New tabs are created/focused correctly
- [ ] Existing Tens AI tabs are reused when possible

## 📊 Expected Test Results

### Chrome/Chromium
- **All tests should pass**
- Manifest V3 fully supported
- Service workers work correctly
- All Chrome extension APIs available

### Firefox
- **Most tests should pass**
- Manifest V3 support (Firefox 109+)
- Service workers supported
- Minor API differences possible

### Safari
- **Most tests should pass**
- Manifest V3 support (Safari 16.4+)
- Service workers supported
- Some API behavior differences
- Manual installation required

## 🐛 Common Issues & Solutions

### Extension Not Loading
- **Symptom**: Extension doesn't appear in browser
- **Solution**: Check manifest.json syntax, ensure all files are present

### Content Script Not Injecting
- **Symptom**: Floating button doesn't appear
- **Solution**: Check content script permissions, reload extension

### Popup Not Opening
- **Symptom**: Clicking extension icon does nothing
- **Solution**: Check popup.html/popup.js files, verify manifest configuration

### Keyboard Shortcuts Not Working
- **Symptom**: Alt+Shift+T doesn't trigger action
- **Solution**: Check content script event listeners, verify key combination

### Context Menus Missing
- **Symptom**: Right-click shows no custom options
- **Solution**: Check background script context menu creation

## 🔍 Debugging Tips

1. **Check Console**: Open browser developer tools and look for errors
2. **Extension Logs**: Check background script console in extension management
3. **Permissions**: Verify extension has required permissions
4. **File Paths**: Ensure all referenced files exist and are accessible
5. **Manifest Version**: Confirm browser supports Manifest V3

## 📱 Testing on Different Devices

### Desktop
- Test on Windows, macOS, and Linux
- Verify keyboard shortcuts work across operating systems
- Check responsive design on different screen sizes

### Mobile (if applicable)
- Test extension behavior on mobile browsers
- Verify touch interactions work correctly
- Check mobile-specific UI elements

## 🎯 Performance Testing

1. **Load Time**: Measure extension initialization time
2. **Memory Usage**: Monitor memory consumption during use
3. **Response Time**: Test extension response to user actions
4. **Background Activity**: Check for unnecessary background processes

## 🔒 Security Testing

1. **Permissions**: Verify extension only requests necessary permissions
2. **Data Handling**: Test how user data is processed and stored
3. **Network Requests**: Monitor network activity for unexpected requests
4. **Content Injection**: Ensure content scripts don't interfere with page security

## 📝 Test Report Template

```
Browser Extension Test Report
============================

Date: [Date]
Browser: [Browser Name & Version]
OS: [Operating System]
Extension Version: [Version]

Test Results:
- Extension Installation: [PASS/FAIL]
- Popup Functionality: [PASS/FAIL]
- Content Script Injection: [PASS/FAIL]
- Keyboard Shortcuts: [PASS/FAIL]
- Context Menus: [PASS/FAIL]
- Tens AI Connection: [PASS/FAIL]

Issues Found:
[List any issues encountered]

Performance Notes:
[Any performance observations]

Security Notes:
[Any security concerns]

Overall Status: [PASS/FAIL]
```

## 🚀 Next Steps

After testing:
1. Document any issues found
2. Test fixes and verify resolution
3. Test on different browser versions
4. Validate cross-platform compatibility
5. Prepare for production deployment

---

**Note**: This testing guide should be updated as the extension evolves and new features are added.

# 📚 Tens AI Browser Extension - Code Documentation

## 🏗️ **Architecture Overview**

The Tens AI browser extension is built using Manifest V3 architecture with a modular design that separates concerns across different components. The extension provides quick access to Tens AI services through multiple interfaces: popup, content script injection, and a new sidebar interface.

```
Extension Architecture:
├── background.js (Service Worker)
├── content.js (Content Script)
├── popup.html + popup.js (Extension Popup)
├── sidebar.html + sidebar.js (Sidebar Interface)
├── options.html + options.js (Settings Page)
├── manifest.json (Configuration)
└── test/ (Testing Framework)
```

## 📁 **File Structure & Purpose**

### **Core Extension Files**

#### **`manifest.json`** - Extension Configuration
```json
{
  "manifest_version": 3,
  "name": "Tens AI Launcher",
  "version": "1.0.0",
  "permissions": ["tabs", "storage", "contextMenus"],
  "host_permissions": ["https://dev2.tens-ai.com/*"],
  "commands": {
    "open-or-focus-tens": "Alt+Shift+T",
    "toggle-sidebar": "Alt+Shift+S"
  }
}
```

**Purpose**: Defines extension metadata, permissions, and browser integration points.

**Key Components**:
- **Manifest V3**: Modern extension architecture with service workers
- **Permissions**: Access to tabs, storage, and context menus
- **Host Permissions**: Access to Tens AI domain
- **Commands**: Keyboard shortcuts for quick access

#### **`background.js`** - Service Worker
**Purpose**: Handles extension lifecycle, background tasks, and message routing.

**Key Functions**:
```javascript
// Core functionality
async function getOrCreateTensTab(url) // Manages Tens AI tabs
async function openWithQuery(query)    // Opens Tens AI with search query
async function toggleSidebar()         // Toggles sidebar visibility

// Event listeners
chrome.runtime.onInstalled           // Extension installation
chrome.contextMenus.onClicked        // Context menu actions
chrome.action.onClicked              // Extension icon click
chrome.commands.onCommand            // Keyboard shortcuts
chrome.runtime.onMessage             // Message handling
```

**Service Worker Features**:
- **Tab Management**: Reuses existing Tens AI tabs or creates new ones
- **Context Menus**: Creates right-click menu options
- **Message Routing**: Handles communication between components
- **Command Processing**: Processes keyboard shortcuts

#### **`content.js` - Content Script**
**Purpose**: Injects UI elements into web pages and handles page-level interactions.

**Key Components**:
```javascript
const LAUNCHER_ID = '__tens_ai_launcher__';     // Floating button ID
const SIDEBAR_ID = '__tens_ai_sidebar__';       // Sidebar iframe ID
let sidebarInstance = null;                      // Sidebar reference

// Core functions
async function createLauncher()                  // Creates floating button
function toggleSidebar()                        // Shows/hides sidebar
function createSidebar()                        // Injects sidebar iframe
function setupMessageListener()                  // Listens for messages
```

**Content Script Features**:
- **Floating Launcher**: Injects a floating "Tens AI" button on every page
- **Sidebar Injection**: Creates and manages the sidebar iframe
- **Keyboard Shortcuts**: Listens for Alt+Shift+T and Alt+Shift+S
- **Message Handling**: Communicates with background script

### **User Interface Files**

#### **`popup.html` + `popup.js` - Extension Popup**
**Purpose**: Quick access interface when clicking the extension icon.

**Features**:
- **Search Input**: Direct query input for Tens AI
- **Go Button**: Submits search queries
- **Enter Key Support**: Keyboard-friendly interaction
- **Auto-close**: Closes after action completion

#### **`sidebar.html` + `sidebar.js` - Sidebar Interface**
**Purpose**: Full-featured sidebar that provides AI assistance without leaving the current page.

**Key Components**:
```javascript
class TensAISidebar {
  constructor() {
    this.chatHistory = [];           // Local chat storage
    this.isOpen = false;             // Sidebar state
  }
  
  // Core methods
  init()                              // Initialize sidebar
  setupEventListeners()               // Set up user interactions
  setupKeyboardShortcuts()            // Handle keyboard input
  
  // Action methods
  openTensAI()                        // Launch main Tens AI
  searchWithSelection()               // Search selected text
  summarizePage()                     // Generate page summary
  translatePage()                     // Translate content
  
  // Chat functionality
  sendMessage()                       // Process user input
  processMessage(message)             // Generate AI responses
  addChatMessage(type, content)       // Add to chat history
  
  // Utility methods
  getSelectedText()                   // Get page selection
  getPageContent()                    // Extract page content
  generateSummary(content)            // Create summaries
}
```

**Sidebar Features**:
- **Quick Actions**: One-click access to common functions
- **Chat Interface**: AI-powered conversation system
- **Context Awareness**: Understands current page content
- **Local Storage**: Saves chat history locally
- **Responsive Design**: Adapts to different screen sizes

#### **`options.html` + `options.js` - Settings Page**
**Purpose**: User configuration and extension preferences.

**Features**:
- **Extension Settings**: Customize behavior and appearance
- **Keyboard Shortcuts**: Modify default shortcuts
- **Storage Management**: Clear data and reset settings

### **Testing & Documentation**

#### **`test/` Directory**
**Purpose**: Comprehensive testing framework for extension functionality.

**Files**:
- **`test-suite.js`**: Automated test runner with 9 test categories
- **`run-tests.js`**: Node.js validation tests
- **`test.html`**: Interactive test interface
- **`TESTING_GUIDE.md`**: Step-by-step testing instructions

#### **Documentation Files**
- **`CODE_DOCUMENTATION.md`**: This comprehensive code guide
- **`SIDEBAR_FEATURES.md`**: Sidebar functionality overview
- **`TESTING_GUIDE.md`**: Testing procedures and troubleshooting
- **`TESTING_SUMMARY.md`**: Testing framework overview

## 🔄 **Data Flow & Communication**

### **Message Passing Architecture**

```
User Action → Content Script → Background Script → Chrome APIs
     ↓              ↓              ↓              ↓
  Keyboard     DOM Events    Service Worker   Browser
  Shortcut     Page Click    Message Handler  Extension
```

**Message Types**:
```javascript
// Open Tens AI
{ type: 'OPEN_TENS_WITH_QUERY', query: 'search term' }

// Toggle Sidebar
{ type: 'TOGGLE_SIDEBAR' }

// Test Messages
{ type: 'TEST_BACKGROUND' }
```

### **Storage Management**

**Chrome Storage**:
```javascript
// Settings storage
chrome.storage.sync.set({ testMode: false })
chrome.storage.sync.get({ testMode: false })

// Local storage (sidebar)
localStorage.setItem('tensAI_chatHistory', JSON.stringify(history))
localStorage.getItem('tensAI_chatHistory')
```

**Data Persistence**:
- **Extension Settings**: Synced across devices
- **Chat History**: Local to each device
- **User Preferences**: Customizable options

## 🎨 **User Interface Design**

### **Design Principles**

1. **Minimal Intrusion**: UI elements don't interfere with page content
2. **Consistent Branding**: Tens AI visual identity throughout
3. **Responsive Layout**: Works on all screen sizes
4. **Accessibility**: Keyboard navigation and screen reader support

### **Visual Elements**

**Floating Launcher Button**:
```css
position: fixed;
right: 16px;
bottom: 16px;
z-index: 2147483647;
background: #111827;
border-radius: 999px;
box-shadow: 0 4px 12px rgba(0,0,0,0.2);
```

**Sidebar Styling**:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
backdrop-filter: blur(10px);
border-radius: 12px;
box-shadow: 0 8px 25px rgba(0,0,0,0.15);
```

**Responsive Design**:
```css
@media (max-width: 480px) {
  .quick-actions { grid-template-columns: 1fr; }
  .header h1 { font-size: 20px; }
}
```

## 🔧 **Technical Implementation Details**

### **Content Script Injection**

**Injection Strategy**:
```javascript
// Check if launcher already exists
if (document.getElementById(LAUNCHER_ID)) return;

// Get user preferences
const { injectLauncher = true } = await chrome.storage.sync.get({ injectLauncher: true });

// Inject only if enabled
if (!injectLauncher) return;
```

**DOM Manipulation**:
```javascript
// Create and inject elements
const btn = document.createElement('button');
btn.id = LAUNCHER_ID;
document.documentElement.appendChild(btn);

// Add event listeners
btn.addEventListener('click', handleClick);
btn.addEventListener('contextmenu', handleRightClick);
```

### **Sidebar Management**

**Iframe Creation**:
```javascript
function createSidebar() {
  const sidebar = document.createElement('iframe');
  sidebar.id = SIDEBAR_ID;
  sidebar.src = chrome.runtime.getURL('sidebar.html');
  
  // Position and style
  sidebar.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    width: 400px;
    height: 100vh;
    z-index: 2147483646;
  `;
  
  document.documentElement.appendChild(sidebar);
}
```

**State Management**:
```javascript
let sidebarInstance = null;

function toggleSidebar() {
  if (sidebarInstance) {
    sidebarInstance.remove();
    sidebarInstance = null;
  } else {
    createSidebar();
  }
}
```

### **Keyboard Shortcut Handling**

**Event Listeners**:
```javascript
function onKeydown(e) {
  // Open Tens AI
  if (e.altKey && e.shiftKey && (e.key === 'T' || e.key === 't')) {
    chrome.runtime.sendMessage({ 
      type: 'OPEN_TENS_WITH_QUERY', 
      query: getSelectedText() 
    });
  }
  
  // Toggle Sidebar
  if (e.altKey && e.shiftKey && (e.key === 'S' || e.key === 's')) {
    toggleSidebar();
  }
}
```

**Browser Commands**:
```json
{
  "commands": {
    "open-or-focus-tens": {
      "suggested_key": { "default": "Alt+Shift+T" }
    },
    "toggle-sidebar": {
      "suggested_key": { "default": "Alt+Shift+S" }
    }
  }
}
```

## 🧪 **Testing Framework**

### **Test Categories**

1. **Extension Loading**: Chrome API availability
2. **Background Script**: Service worker functionality
3. **Content Script**: DOM injection and interaction
4. **Popup Functionality**: UI element validation
5. **Context Menus**: Right-click menu creation
6. **Keyboard Shortcuts**: Shortcut key handling
7. **Message Passing**: Component communication
8. **Storage API**: Data persistence
9. **Tens AI Connection**: External service connectivity

### **Test Execution**

**Node.js Tests**:
```bash
npm test  # Runs validation tests
```

**Browser Tests**:
1. Load extension in browser
2. Open `test/test.html`
3. Click "Run All Tests"
4. Review results and console output

### **Test Results**

**Success Indicators**:
- ✅ All tests pass
- 🎯 Functionality working as expected
- 🔒 Security measures in place
- 📱 Cross-browser compatibility

**Failure Indicators**:
- ❌ Tests failing
- 🐛 Functionality not working
- ⚠️ Browser compatibility issues
- 🔧 Configuration problems

## 🔒 **Security & Privacy**

### **Permission Model**

**Minimal Permissions**:
- **`tabs`**: Access to browser tabs for Tens AI integration
- **`storage`**: Save user preferences and settings
- **`contextMenus`**: Create right-click menu options

**Host Permissions**:
- **`https://www.tens-ai.com/*`**: Access to Tens AI services
- **`http://localhost/*`**: Development and testing support

### **Data Handling**

**Local Storage Only**:
- Chat history stored locally
- No external data transmission
- User preferences synced across devices (optional)

**Secure Communication**:
- Messages passed through Chrome extension APIs
- No direct external API calls
- HTTPS-only connections

## 🚀 **Performance Optimization**

### **Lazy Loading**

**Sidebar Loading**:
```javascript
// Sidebar only loads when needed
function toggleSidebar() {
  if (sidebarInstance) {
    // Remove existing sidebar
    sidebarInstance.remove();
    sidebarInstance = null;
  } else {
    // Create new sidebar
    createSidebar();
  }
}
```

**Event Delegation**:
```javascript
// Single event listener for all shortcuts
window.addEventListener('keydown', onKeydown, { passive: true });

// Efficient event handling
function onKeydown(e) {
  if (e.altKey && e.shiftKey) {
    switch(e.key.toLowerCase()) {
      case 't': openTensAI(); break;
      case 's': toggleSidebar(); break;
    }
  }
}
```

### **Memory Management**

**Chat History Limits**:
```javascript
// Limit chat history to prevent memory issues
if (this.chatHistory.length > 50) {
  this.chatHistory = this.chatHistory.slice(-50);
  this.saveChatHistory();
}
```

**DOM Cleanup**:
```javascript
// Clean up when sidebar is closed
function toggleSidebar() {
  if (sidebarInstance) {
    sidebarInstance.remove();
    sidebarInstance.closeBtn?.remove(); // Remove close button
    sidebarInstance = null;
  }
}
```

## 🔧 **Configuration & Customization**

### **User Settings**

**Storage Structure**:
```javascript
const defaultSettings = {
  injectLauncher: true,        // Show floating button
  sidebarWidth: 400,           // Sidebar width in pixels
  autoOpenSidebar: false,      // Auto-open on certain sites
  keyboardShortcuts: {         // Customizable shortcuts
    openTens: 'Alt+Shift+T',
    toggleSidebar: 'Alt+Shift+S'
  }
};
```

**Settings Access**:
```javascript
// Get user settings with defaults
const settings = await chrome.storage.sync.get(defaultSettings);

// Save user preferences
await chrome.storage.sync.set({ sidebarWidth: 500 });
```

### **Theme Support**

**CSS Variables**:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --background-color: #ffffff;
  --text-color: #1f2937;
}

.sidebar {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
}
```

**Theme Switching**:
```javascript
// Future implementation
function switchTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('tensAI_theme', theme);
}
```

## 🔮 **Future Enhancements**

### **Planned Features**

1. **AI Integration**: Direct API calls to Tens AI services
2. **Voice Support**: Speech-to-text and text-to-speech
3. **Custom Prompts**: User-defined prompt templates
4. **Multi-language**: Internationalization support
5. **Theme System**: Dark/light mode and custom themes

### **Advanced Capabilities**

1. **Context Memory**: Remember user preferences across sessions
2. **Smart Suggestions**: AI-powered action recommendations
3. **Workflow Automation**: Multi-step task automation
4. **Integration APIs**: Connect with other browser extensions

## 📚 **Development Guidelines**

### **Code Standards**

**JavaScript**:
- Use ES6+ features (async/await, arrow functions, destructuring)
- Follow consistent naming conventions
- Add comprehensive error handling
- Include JSDoc comments for complex functions

**CSS**:
- Use CSS Grid and Flexbox for layouts
- Implement responsive design principles
- Follow BEM naming methodology
- Use CSS custom properties for theming

**HTML**:
- Semantic HTML5 elements
- Accessibility attributes (aria-labels, roles)
- Proper form structure and validation
- SEO-friendly markup

### **Error Handling**

**Graceful Degradation**:
```javascript
try {
  const result = await chrome.storage.sync.get(['setting']);
  return result.setting || defaultValue;
} catch (error) {
  console.warn('Storage access failed:', error);
  return defaultValue;
}
```

**User Feedback**:
```javascript
function handleError(error, context) {
  console.error(`Tens AI Extension Error (${context}):`, error);
  
  // Show user-friendly error message
  if (window.tensAISidebar) {
    window.tensAISidebar.addChatMessage('assistant', 
      `Sorry, I encountered an error: ${error.message}`);
  }
}
```

### **Testing Strategy**

**Automated Testing**:
- Unit tests for individual functions
- Integration tests for component interaction
- End-to-end tests for user workflows
- Cross-browser compatibility testing

**Manual Testing**:
- User experience validation
- Performance testing on different devices
- Security testing and vulnerability assessment
- Accessibility testing with screen readers

## 🎯 **Conclusion**

The Tens AI browser extension represents a modern, well-architected browser extension that provides seamless access to AI services. The codebase demonstrates:

- **Clean Architecture**: Separation of concerns and modular design
- **Modern Standards**: Manifest V3 and ES6+ JavaScript
- **User Experience**: Intuitive interfaces and responsive design
- **Performance**: Efficient resource usage and lazy loading
- **Security**: Minimal permissions and secure data handling
- **Maintainability**: Comprehensive testing and documentation
- **Extensibility**: Easy to add new features and capabilities

The extension successfully bridges the gap between traditional browser functionality and modern AI services, providing users with quick, contextual access to Tens AI's capabilities while maintaining a professional, polished user experience.

---

**For Developers**: This codebase serves as a reference implementation for building modern browser extensions with advanced UI features and AI integration capabilities.

**For Users**: The extension provides a seamless way to access AI assistance without interrupting your browsing workflow, making AI tools more accessible and integrated into daily tasks.

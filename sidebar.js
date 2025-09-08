// Tens AI Sidebar JavaScript
// Provides sidebar functionality similar to Monica extension

class TensAISidebar {
    constructor() {
        this.chatHistory = [];
        this.isOpen = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadChatHistory();
        this.setupKeyboardShortcuts();
    }

    setupEventListeners() {
        // Chat input handling
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        // Auto-resize chat input
        if (chatInput) {
            chatInput.addEventListener('input', () => {
                this.autoResizeInput(chatInput);
            });
        }
    }

    setupKeyboardShortcuts() {
        // Listen for keyboard shortcuts from the main extension
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.shiftKey && (e.key === 'T' || e.key === 't')) {
                this.openTensAI();
            }
        });
    }

    // Quick Actions
    openWebGPT() {
        // Opens in browser view (iframe)
        this.sendMessageToExtension({ 
            type: 'OPEN_IN_BROWSER_VIEW', 
            service: 'webgpt',
            url: 'https://www.aimlgyan.com/webgpt'
        });
        this.addChatMessage('assistant', 'Opening WebGPT in browser view...');
    }

    openBusinessApp() {
        // Opens in browser view (iframe)
        this.sendMessageToExtension({ 
            type: 'OPEN_IN_BROWSER_VIEW', 
            service: 'business',
            url: 'https://www.aimlgyan.com/business'
        });
        this.addChatMessage('assistant', 'Opening Business Application in browser view...');
    }

    openTranslator() {
        // Opens in separate tab
        this.sendMessageToExtension({ 
            type: 'OPEN_IN_NEW_TAB', 
            service: 'translator',
            url: 'https://www.aimlgyan.com/translator'
        });
        this.addChatMessage('assistant', 'Opening Translator in new tab...');
    }

    openOmniQuest() {
        // Opens in separate tab
        this.sendMessageToExtension({ 
            type: 'OPEN_IN_NEW_TAB', 
            service: 'omniquest',
            url: 'https://www.aimlgyan.com/omniquest'
        });
        this.addChatMessage('assistant', 'Opening OmniQuest in new tab...');
    }

    openMediaStudio() {
        // Opens in separate tab
        this.sendMessageToExtension({ 
            type: 'OPEN_IN_NEW_TAB', 
            service: 'mediastudio',
            url: 'https://www.aimlgyan.com/mediastudio'
        });
        this.addChatMessage('assistant', 'Opening MediaStudio in new tab...');
    }

    openSummarizer() {
        // Opens in separate tab
        this.sendMessageToExtension({ 
            type: 'OPEN_IN_NEW_TAB', 
            service: 'summarizer',
            url: 'https://www.aimlgyan.com/summarizer'
        });
        this.addChatMessage('assistant', 'Opening Summarizer in new tab...');
    }

    // Legacy functions for backward compatibility
    openTensAI() {
        this.openWebGPT(); // Default to WebGPT
    }

    searchWithSelection() {
        const selectedText = this.getSelectedText();
        if (selectedText) {
            this.sendMessageToExtension({ 
                type: 'OPEN_IN_NEW_TAB', 
                service: 'webgpt',
                url: `https://www.aimlgyan.com/webgpt?q=${encodeURIComponent(selectedText)}`
            });
            this.addChatMessage('assistant', `Searching for: "${selectedText}"`);
        } else {
            this.addChatMessage('assistant', 'Please select some text first, then try again.');
        }
    }

    summarizePage() {
        const pageContent = this.getPageContent();
        if (pageContent) {
            this.sendMessageToExtension({ 
                type: 'OPEN_IN_NEW_TAB', 
                service: 'summarizer',
                url: `https://www.aimlgyan.com/summarizer?content=${encodeURIComponent(pageContent.substring(0, 1000))}`
            });
            this.addChatMessage('assistant', 'Opening Summarizer with page content...');
        } else {
            this.addChatMessage('assistant', 'Unable to get page content for summarization.');
        }
    }

    translatePage() {
        const pageContent = this.getPageContent();
        if (pageContent) {
            this.sendMessageToExtension({ 
                type: 'OPEN_IN_NEW_TAB', 
                service: 'translator',
                url: `https://www.aimlgyan.com/translator?text=${encodeURIComponent(pageContent.substring(0, 1000))}`
            });
            this.addChatMessage('assistant', 'Opening Translator with page content...');
        } else {
            this.addChatMessage('assistant', 'Unable to get page content for translation.');
        }
    }

    // Chat Functionality
    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message to chat
        this.addChatMessage('user', message);
        
        // Clear input
        input.value = '';
        this.autoResizeInput(input);

        // Process message and generate response
        this.processMessage(message);
    }

    processMessage(message) {
        // Simple message processing - in a real implementation, this would call AIML Gyan API
        let response = '';

        if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
            response = 'Hello! How can I help you with AIML Gyan today?';
        } else if (message.toLowerCase().includes('help')) {
            response = 'I can help you with:\n• 🤖 WebGPT - AI web search and chat\n• 💼 Business Application - Professional tools\n• 🌐 Translator - Multi-language support\n• 🔍 OmniQuest - Advanced search\n• 🎨 MediaStudio - Content creation\n• 📝 Summarizer - AI summarization';
        } else if (message.toLowerCase().includes('webgpt') || message.toLowerCase().includes('web gpt')) {
            response = 'WebGPT is our AI-powered web search and chat service. Click the WebGPT button to open it in browser view.';
        } else if (message.toLowerCase().includes('business') || message.toLowerCase().includes('app')) {
            response = 'Business Application provides professional tools and solutions. Click the Business Application button to access it.';
        } else if (message.toLowerCase().includes('translate') || message.toLowerCase().includes('translator')) {
            response = 'Our Translator service supports multi-language translation. Click the Translator button to open it in a new tab.';
        } else if (message.toLowerCase().includes('omniquest') || message.toLowerCase().includes('search')) {
            response = 'OmniQuest offers advanced search and discovery capabilities. Click the OmniQuest button to explore it.';
        } else if (message.toLowerCase().includes('media') || message.toLowerCase().includes('studio')) {
            response = 'MediaStudio helps you create and edit media content. Click the MediaStudio button to start creating.';
        } else if (message.toLowerCase().includes('summarize') || message.toLowerCase().includes('summary')) {
            response = 'Our Summarizer uses AI to create content summaries. Click the Summarizer button to get started.';
        } else if (message.toLowerCase().includes('aiml gyan') || message.toLowerCase().includes('aiml')) {
            response = 'AIML Gyan is an AI-powered platform with multiple services. Try WebGPT for AI chat, or explore our other tools!';
        } else {
            response = `I understand you're asking about "${message}". Try one of our services:\n• WebGPT for AI chat\n• Summarizer for content summaries\n• Translator for language help\n• Or ask me about any specific service!`;
        }

        // Simulate typing delay for better UX
        setTimeout(() => {
            this.addChatMessage('assistant', response);
        }, 500);
    }

    addChatMessage(type, content) {
        const chatHistory = document.getElementById('chatHistory');
        if (!chatHistory) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;
        messageDiv.textContent = content;

        chatHistory.appendChild(messageDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;

        // Store in local storage
        this.chatHistory.push({ type, content, timestamp: Date.now() });
        this.saveChatHistory();

        // Limit chat history to prevent memory issues
        if (this.chatHistory.length > 50) {
            this.chatHistory = this.chatHistory.slice(-50);
            this.saveChatHistory();
        }
    }

    // Utility Functions
    getSelectedText() {
        if (typeof window.getSelection !== 'undefined') {
            return window.getSelection().toString().trim();
        }
        return '';
    }

    getPageContent() {
        // Get main content from the page
        const selectors = [
            'main',
            'article',
            '.content',
            '.main-content',
            '#content',
            '#main',
            'p'
        ];

        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element && element.textContent.trim().length > 100) {
                return element.textContent.trim().substring(0, 1000) + '...';
            }
        }

        return document.body.textContent.trim().substring(0, 1000) + '...';
    }

    generateSummary(content) {
        // Simple summary generation - in real implementation, this would call AIML Gyan
        const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
        const summary = sentences.slice(0, 3).join('. ') + '.';
        return summary;
    }

    autoResizeInput(input) {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    }

    // Communication with Main Extension
    sendMessageToExtension(message) {
        if (typeof chrome !== 'undefined' && chrome.runtime) {
            chrome.runtime.sendMessage(message, (response) => {
                if (chrome.runtime.lastError) {
                    console.log('Extension message error:', chrome.runtime.lastError);
                } else {
                    console.log('Extension response:', response);
                }
            });
        } else {
            console.log('Chrome extension API not available');
        }
    }

    // Storage Functions
    saveChatHistory() {
        try {
            localStorage.setItem('tensAI_chatHistory', JSON.stringify(this.chatHistory));
        } catch (error) {
            console.log('Error saving chat history:', error);
        }
    }

    loadChatHistory() {
        try {
            const saved = localStorage.getItem('tensAI_chatHistory');
            if (saved) {
                this.chatHistory = JSON.parse(saved);
                // Restore recent messages (last 10)
                const recentMessages = this.chatHistory.slice(-10);
                recentMessages.forEach(msg => {
                    if (msg.type === 'assistant' && msg.content !== 'Hi! I\'m your Tens AI assistant. How can I help you today?') {
                        this.addChatMessage(msg.type, msg.content);
                    }
                });
            }
        } catch (error) {
            console.log('Error loading chat history:', error);
        }
    }

    // Sidebar Management
    toggle() {
        this.isOpen = !this.isOpen;
        // This would be handled by the main extension
        console.log('Sidebar toggle requested');
    }

    close() {
        this.isOpen = false;
        // This would be handled by the main extension
        console.log('Sidebar close requested');
    }

    // Context-Aware Features
    updateContext() {
        // Update sidebar based on current page context
        const url = window.location.href;
        const title = document.title;
        
        // Add context to chat
        if (url && title) {
            this.addChatMessage('assistant', `Current page: ${title}`);
        }
    }

    // Error Handling
    handleError(error, context) {
        console.error(`Tens AI Sidebar Error (${context}):`, error);
        this.addChatMessage('assistant', `Sorry, I encountered an error: ${error.message}`);
    }
}

// Initialize sidebar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tensAISidebar = new TensAISidebar();
    
    // Update context when page loads
    setTimeout(() => {
        window.tensAISidebar.updateContext();
    }, 1000);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TensAISidebar;
}

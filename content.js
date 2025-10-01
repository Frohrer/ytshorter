// Content script that runs on YouTube pages to detect Shorts viewing

let lastShortUrl = null;
let observer = null;

// Function to check if current page is a Short
function isOnShortsPage() {
  return window.location.pathname.includes('/shorts/');
}

// Extract the video ID from the URL
function getCurrentShortId() {
  const match = window.location.pathname.match(/\/shorts\/([^/?]+)/);
  return match ? match[1] : null;
}

// Notify background script about a new Short being watched
function notifyShortViewed(shortId) {
  if (shortId && shortId !== lastShortUrl) {
    lastShortUrl = shortId;
    console.log('YouTube Shorts Limiter: Detected new Short:', shortId);
    browser.runtime.sendMessage({
      type: 'SHORT_VIEWED',
      shortId: shortId,
      timestamp: Date.now()
    }).then(response => {
      console.log('YouTube Shorts Limiter: Response from background:', response);
    }).catch(err => console.error('YouTube Shorts Limiter: Error sending message:', err));
  }
}

// Monitor URL changes (YouTube is a single-page app)
function checkForShortsChange() {
  if (isOnShortsPage()) {
    const shortId = getCurrentShortId();
    notifyShortViewed(shortId);
  } else {
    lastShortUrl = null;
  }
}

// Initial check
checkForShortsChange();

// Watch for URL changes using MutationObserver
observer = new MutationObserver(() => {
  checkForShortsChange();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Also listen for popstate events (back/forward navigation)
window.addEventListener('popstate', checkForShortsChange);

// Listen for pushstate/replacestate (YouTube navigation)
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function() {
  originalPushState.apply(this, arguments);
  checkForShortsChange();
};

history.replaceState = function() {
  originalReplaceState.apply(this, arguments);
  checkForShortsChange();
};

// Listen for messages from background script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SHOW_LIMIT_OVERLAY') {
    showLimitOverlay(message.count);
    sendResponse({ success: true });
  } else if (message.type === 'SHOW_EXCESS_OVERLAY') {
    showExcessOverlay(message.count);
    sendResponse({ success: true });
  }
});

// Create and show limit overlay
function showLimitOverlay(count) {
  // Remove existing overlay if any
  removeOverlay();
  
  const overlay = document.createElement('div');
  overlay.id = 'shorts-limiter-overlay';
  overlay.innerHTML = `
    <div class="shorts-limiter-content">
      <div class="shorts-limiter-icon">🎯</div>
      <h1>YouTube Shorts Limit Reached!</h1>
      <p class="shorts-limiter-big">You've watched <strong>${count}</strong> Shorts</p>
      <p class="shorts-limiter-message">Time to take a break and do something else!</p>
      <div class="shorts-limiter-buttons">
        <button class="shorts-limiter-btn shorts-limiter-btn-primary" id="shorts-limiter-leave">
          Leave Shorts
        </button>
        <button class="shorts-limiter-btn shorts-limiter-btn-secondary" id="shorts-limiter-continue">
          Continue Anyway
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  // Add event listeners
  document.getElementById('shorts-limiter-leave').addEventListener('click', () => {
    window.location.href = 'https://www.youtube.com';
  });
  
  document.getElementById('shorts-limiter-continue').addEventListener('click', () => {
    removeOverlay();
  });
}

// Create and show excess overlay (less intrusive)
function showExcessOverlay(count) {
  // Remove existing overlay if any
  removeOverlay();
  
  const overlay = document.createElement('div');
  overlay.id = 'shorts-limiter-overlay';
  overlay.innerHTML = `
    <div class="shorts-limiter-content">
      <div class="shorts-limiter-icon">🤔</div>
      <h1>Still Watching Shorts?</h1>
      <p class="shorts-limiter-big">You're at <strong>${count}</strong> Shorts now</p>
      <p class="shorts-limiter-message">You've exceeded your limit. Consider taking a break!</p>
      <div class="shorts-limiter-buttons">
        <button class="shorts-limiter-btn shorts-limiter-btn-primary" id="shorts-limiter-leave">
          Leave Shorts
        </button>
        <button class="shorts-limiter-btn shorts-limiter-btn-secondary" id="shorts-limiter-continue">
          I'll Stop Soon
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  // Add event listeners
  document.getElementById('shorts-limiter-leave').addEventListener('click', () => {
    window.location.href = 'https://www.youtube.com';
  });
  
  document.getElementById('shorts-limiter-continue').addEventListener('click', () => {
    removeOverlay();
  });
}

// Remove overlay
function removeOverlay() {
  const existing = document.getElementById('shorts-limiter-overlay');
  if (existing) {
    existing.remove();
  }
}

// Inject styles
const style = document.createElement('style');
style.textContent = `
  #shorts-limiter-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.98) 0%, rgba(118, 75, 162, 0.98) 100%);
    z-index: 999999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: shorts-limiter-fadein 0.3s ease-out;
  }
  
  @keyframes shorts-limiter-fadein {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .shorts-limiter-content {
    text-align: center;
    color: white;
    max-width: 600px;
    padding: 60px 40px;
    animation: shorts-limiter-slidein 0.4s ease-out 0.1s backwards;
  }
  
  @keyframes shorts-limiter-slidein {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .shorts-limiter-icon {
    font-size: 120px;
    margin-bottom: 20px;
    animation: shorts-limiter-bounce 0.6s ease-out 0.3s backwards;
  }
  
  @keyframes shorts-limiter-bounce {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }
  
  .shorts-limiter-content h1 {
    font-size: 48px;
    font-weight: bold;
    margin: 0 0 20px 0;
    font-family: 'YouTube Sans', 'Roboto', sans-serif;
  }
  
  .shorts-limiter-big {
    font-size: 32px;
    margin: 20px 0;
    font-weight: 500;
  }
  
  .shorts-limiter-big strong {
    font-size: 48px;
    font-weight: bold;
    display: inline-block;
    margin: 0 10px;
  }
  
  .shorts-limiter-message {
    font-size: 24px;
    margin: 30px 0 40px 0;
    opacity: 0.95;
  }
  
  .shorts-limiter-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 40px;
  }
  
  .shorts-limiter-btn {
    padding: 16px 40px;
    font-size: 18px;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'YouTube Sans', 'Roboto', sans-serif;
  }
  
  .shorts-limiter-btn-primary {
    background: white;
    color: #667eea;
  }
  
  .shorts-limiter-btn-primary:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
  
  .shorts-limiter-btn-secondary {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
  
  .shorts-limiter-btn-secondary:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  .shorts-limiter-btn:active {
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

console.log('YouTube Shorts Limiter: Content script loaded');


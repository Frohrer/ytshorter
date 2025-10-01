// Background script to track Shorts count and show notifications

const DEFAULT_SHORTS_LIMIT = 10;
const LIMIT_STORAGE_KEY = 'shortsLimit';
const STORAGE_KEY = 'shortsCount';
const VIEWED_SHORTS_KEY = 'viewedShorts';
const LAST_RESET_KEY = 'lastReset';

// Get the user's configured limit
async function getShortsLimit() {
  const data = await browser.storage.local.get(LIMIT_STORAGE_KEY);
  return data[LIMIT_STORAGE_KEY] || DEFAULT_SHORTS_LIMIT;
}

// Initialize storage
async function initStorage() {
  const data = await browser.storage.local.get([STORAGE_KEY, VIEWED_SHORTS_KEY, LAST_RESET_KEY]);
  
  // Reset daily
  const lastReset = data[LAST_RESET_KEY] || 0;
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  
  if (now - lastReset > oneDayMs) {
    await browser.storage.local.set({
      [STORAGE_KEY]: 0,
      [VIEWED_SHORTS_KEY]: [],
      [LAST_RESET_KEY]: now
    });
  }
}

// Get current count
async function getCount() {
  const data = await browser.storage.local.get(STORAGE_KEY);
  return data[STORAGE_KEY] || 0;
}

// Get viewed shorts list
async function getViewedShorts() {
  const data = await browser.storage.local.get(VIEWED_SHORTS_KEY);
  return data[VIEWED_SHORTS_KEY] || [];
}

// Increment count
async function incrementCount(shortId) {
  const viewedShorts = await getViewedShorts();
  
  // Only count if we haven't seen this short before
  if (!viewedShorts.includes(shortId)) {
    const count = await getCount();
    const newCount = count + 1;
    const limit = await getShortsLimit();
    
    viewedShorts.push(shortId);
    
    await browser.storage.local.set({
      [STORAGE_KEY]: newCount,
      [VIEWED_SHORTS_KEY]: viewedShorts
    });
    
    console.log(`Shorts watched: ${newCount}/${limit}`);
    
    // Show overlay if limit reached
    if (newCount === limit) {
      showLimitOverlay(newCount);
    } else if (newCount > limit && newCount % 5 === 0) {
      // Show reminder every 5 shorts after limit
      showExcessOverlay(newCount);
    }
    
    return newCount;
  }
  
  return await getCount();
}

// Show overlay when limit is reached
async function showLimitOverlay(count) {
  console.log('🎯 Showing limit overlay for count:', count);
  try {
    const tabs = await browser.tabs.query({ url: '*://*.youtube.com/*' });
    tabs.forEach(tab => {
      browser.tabs.sendMessage(tab.id, {
        type: 'SHOW_LIMIT_OVERLAY',
        count: count
      }).catch(err => {
        console.error('Error sending overlay message to tab:', err);
      });
    });
  } catch (error) {
    console.error('Error showing limit overlay:', error);
  }
}

// Show overlay when over limit
async function showExcessOverlay(count) {
  console.log('🤔 Showing excess overlay for count:', count);
  try {
    const tabs = await browser.tabs.query({ url: '*://*.youtube.com/*' });
    tabs.forEach(tab => {
      browser.tabs.sendMessage(tab.id, {
        type: 'SHOW_EXCESS_OVERLAY',
        count: count
      }).catch(err => {
        console.error('Error sending overlay message to tab:', err);
      });
    });
  } catch (error) {
    console.error('Error showing excess overlay:', error);
  }
}

// Reset count manually
async function resetCount() {
  await browser.storage.local.set({
    [STORAGE_KEY]: 0,
    [VIEWED_SHORTS_KEY]: [],
    [LAST_RESET_KEY]: Date.now()
  });
  console.log('Shorts count reset');
}

// Test notification function
function testNotification() {
  console.log('Testing notification...');
  browser.notifications.create('test-notification-' + Date.now(), {
    type: 'basic',
    title: 'Test Notification',
    message: 'If you see this, notifications are working! ✓'
  }).then((notificationId) => {
    console.log('Test notification created successfully:', notificationId);
  }).catch(err => {
    console.error('Error creating test notification:', err);
  });
}

// Get debug info
async function getDebugInfo() {
  const data = await browser.storage.local.get([STORAGE_KEY, VIEWED_SHORTS_KEY, LAST_RESET_KEY]);
  const viewedShorts = data[VIEWED_SHORTS_KEY] || [];
  return {
    lastShortId: viewedShorts.length > 0 ? viewedShorts[viewedShorts.length - 1] : null,
    viewedCount: viewedShorts.length,
    lastReset: data[LAST_RESET_KEY] || null
  };
}

// Listen for messages from content script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SHORT_VIEWED') {
    console.log('SHORT_VIEWED message received:', message.shortId);
    incrementCount(message.shortId).then(count => {
      console.log('Count after increment:', count);
      sendResponse({ success: true, count: count });
    }).catch(err => {
      console.error('Error incrementing count:', err);
      sendResponse({ success: false, error: err.message });
    });
    return true; // Indicates we will send response asynchronously
  } else if (message.type === 'GET_COUNT') {
    getCount().then(count => {
      sendResponse({ count: count });
    }).catch(err => {
      console.error('Error getting count:', err);
      sendResponse({ count: 0 });
    });
    return true;
  } else if (message.type === 'RESET_COUNT') {
    resetCount().then(() => {
      sendResponse({ success: true });
    }).catch(err => {
      console.error('Error resetting count:', err);
      sendResponse({ success: false, error: err.message });
    });
    return true;
  } else if (message.type === 'TEST_NOTIFICATION') {
    testNotification();
    sendResponse({ success: true });
    return true;
  } else if (message.type === 'GET_DEBUG_INFO') {
    getDebugInfo().then(info => {
      sendResponse({ debugInfo: info });
    }).catch(err => {
      console.error('Error getting debug info:', err);
      sendResponse({ debugInfo: null });
    });
    return true;
  }
});

// Check notification permission on startup
async function checkNotificationPermission() {
  try {
    // Try to get notification permission status
    const permission = await browser.permissions.contains({
      permissions: ['notifications']
    });
    console.log('Notification permission granted:', permission);
    
    if (!permission) {
      console.warn('⚠️ Notification permission not granted! Extension may not show notifications.');
    }
  } catch (err) {
    console.error('Error checking notification permission:', err);
  }
}

// Initialize on startup
initStorage().then(() => {
  console.log('YouTube Shorts Limiter: Background script initialized');
  checkNotificationPermission();
});


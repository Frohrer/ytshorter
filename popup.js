// Popup script to display current count and allow reset

const DEFAULT_SHORTS_LIMIT = 10;
const LIMIT_STORAGE_KEY = 'shortsLimit';

// Get the user's configured limit
async function getShortsLimit() {
  const data = await browser.storage.local.get(LIMIT_STORAGE_KEY);
  return data[LIMIT_STORAGE_KEY] || DEFAULT_SHORTS_LIMIT;
}

// Update the display with current count
async function updateDisplay() {
  try {
    const response = await browser.runtime.sendMessage({ type: 'GET_COUNT' });
    const count = response.count || 0;
    const limit = await getShortsLimit();
    
    document.getElementById('count').textContent = count;
    
    // Update the limit text
    const limitText = document.querySelector('.limit');
    if (limitText) {
      limitText.textContent = `of ${limit} Shorts watched`;
    }
    
    // Update progress bar
    const percentage = Math.min((count / limit) * 100, 100);
    const progressBar = document.getElementById('progress');
    progressBar.style.width = percentage + '%';
    
    // Change color based on progress
    progressBar.className = 'progress-fill';
    if (count >= limit) {
      progressBar.classList.add('danger');
    } else if (count >= limit * 0.7) {
      progressBar.classList.add('warning');
    }
    
    // Update status message
    const statusEl = document.getElementById('status');
    if (count === 0) {
      statusEl.textContent = 'No Shorts watched yet today';
    } else if (count < limit) {
      statusEl.textContent = `${limit - count} more until limit`;
    } else {
      statusEl.textContent = '⚠️ Limit exceeded!';
    }
  } catch (err) {
    console.error('Error updating display:', err);
    document.getElementById('count').textContent = '?';
  }
}

// Reset the counter
document.getElementById('reset').addEventListener('click', async () => {
  try {
    await browser.runtime.sendMessage({ type: 'RESET_COUNT' });
    updateDisplay();
    
    // Show brief confirmation
    const statusEl = document.getElementById('status');
    const originalText = statusEl.textContent;
    statusEl.textContent = '✓ Counter reset!';
    setTimeout(() => {
      updateDisplay();
    }, 1000);
  } catch (err) {
    console.error('Error resetting count:', err);
  }
});

// Open settings
document.getElementById('settings').addEventListener('click', () => {
  browser.runtime.openOptionsPage();
});

// Display debug info
async function updateDebugInfo() {
  try {
    const response = await browser.runtime.sendMessage({ type: 'GET_DEBUG_INFO' });
    const debugEl = document.getElementById('debugInfo');
    if (response && response.debugInfo) {
      const info = response.debugInfo;
      debugEl.innerHTML = `
        <strong>Debug Info:</strong><br>
        Last Short ID: ${info.lastShortId || 'None'}<br>
        Viewed Shorts: ${info.viewedCount || 0}<br>
        Last Reset: ${info.lastReset ? new Date(info.lastReset).toLocaleString() : 'Never'}
      `;
    }
  } catch (err) {
    console.error('Error getting debug info:', err);
  }
}

// Initial update
updateDisplay();
updateDebugInfo();

// Update every second while popup is open
setInterval(() => {
  updateDisplay();
  updateDebugInfo();
}, 1000);


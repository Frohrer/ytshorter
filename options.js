// Options page script

const DEFAULT_LIMIT = 10;
const LIMIT_STORAGE_KEY = 'shortsLimit';

// Load current settings
async function loadSettings() {
  try {
    const data = await browser.storage.local.get([LIMIT_STORAGE_KEY, 'shortsCount']);
    const limit = data[LIMIT_STORAGE_KEY] || DEFAULT_LIMIT;
    const count = data.shortsCount || 0;
    
    document.getElementById('shortsLimit').value = limit;
    document.getElementById('currentLimit').textContent = limit;
    document.getElementById('currentCount').textContent = count;
  } catch (err) {
    console.error('Error loading settings:', err);
    showStatus('Error loading settings', 'error');
  }
}

// Save settings
async function saveSettings() {
  try {
    const limitInput = document.getElementById('shortsLimit');
    let limit = parseInt(limitInput.value);
    
    // Validate input
    if (isNaN(limit) || limit < 1 || limit > 100) {
      showStatus('Please enter a number between 1 and 100', 'error');
      return;
    }
    
    await browser.storage.local.set({
      [LIMIT_STORAGE_KEY]: limit
    });
    
    showStatus('✓ Settings saved successfully!', 'success');
    
    // Update current limit display
    document.getElementById('currentLimit').textContent = limit;
    
  } catch (err) {
    console.error('Error saving settings:', err);
    showStatus('Error saving settings', 'error');
  }
}

// Reset to default
async function resetToDefault() {
  try {
    document.getElementById('shortsLimit').value = DEFAULT_LIMIT;
    await browser.storage.local.set({
      [LIMIT_STORAGE_KEY]: DEFAULT_LIMIT
    });
    
    showStatus('✓ Reset to default (10 Shorts)', 'success');
    document.getElementById('currentLimit').textContent = DEFAULT_LIMIT;
  } catch (err) {
    console.error('Error resetting settings:', err);
    showStatus('Error resetting settings', 'error');
  }
}

// Show status message
function showStatus(message, type) {
  const statusEl = document.getElementById('status');
  statusEl.textContent = message;
  statusEl.className = `status ${type} show`;
  
  setTimeout(() => {
    statusEl.classList.remove('show');
  }, 3000);
}

// Event listeners
document.getElementById('save').addEventListener('click', saveSettings);
document.getElementById('reset').addEventListener('click', resetToDefault);

// Allow Enter key to save
document.getElementById('shortsLimit').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    saveSettings();
  }
});

// Load settings on page load
loadSettings();

// Update only the stats (not the input field) every second
setInterval(async () => {
  try {
    const data = await browser.storage.local.get(['shortsLimit', 'shortsCount']);
    const limit = data.shortsLimit || DEFAULT_LIMIT;
    const count = data.shortsCount || 0;
    
    // Only update the display values, not the input field
    document.getElementById('currentLimit').textContent = limit;
    document.getElementById('currentCount').textContent = count;
  } catch (err) {
    console.error('Error updating stats:', err);
  }
}, 1000);


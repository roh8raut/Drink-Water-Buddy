import './style.css'

// Get elements
const reminderToggle = document.getElementById('reminderToggle') as HTMLInputElement;
const statusText = document.getElementById('status') as HTMLSpanElement;

// Load saved state
chrome.storage.sync.get(['reminderEnabled'], (result) => {
  const isEnabled = result.reminderEnabled || false;
  reminderToggle.checked = isEnabled;
  updateStatus(isEnabled);
});

// Handle toggle change
reminderToggle.addEventListener('change', (e) => {
  const isEnabled = (e.target as HTMLInputElement).checked;
  // Save state
  chrome.storage.sync.set({ reminderEnabled: isEnabled });

  // Update UI
  updateStatus(isEnabled);

  if (!isEnabled) {
   chrome.tabs.query({}, (tabs) => {
     tabs.forEach(tab => {
       if (tab.id) {
         chrome.tabs.sendMessage(tab.id, {
           type: "REMOVE_OVERLAY"
         }, () => {
           // Ignore errors for tabs that don't have content script
           if (chrome.runtime.lastError) {
             // Silent fail - some tabs won't have our content script
           }
         });
       }
     });
   });
 }

  // Send message to background script
  // chrome.runtime.sendMessage({ 
  //   action: isEnabled ? 'startReminder' : 'stopReminder' 
  // });
});

function updateStatus(isEnabled: boolean) {
  statusText.textContent = isEnabled ? 'Reminders On' : 'Reminders Off';
  statusText.style.color = isEnabled ? '#4CAF50' : '#666';
}

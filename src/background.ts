
declare const __REMINDER_INTERVAL__: number;
// Fire an alarm every 10 minutes
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("drinkWater", { periodInMinutes: __REMINDER_INTERVAL__ });
});


// Listen for the alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "drinkWater") {
    // Check if reminders are enabled before showing notification
    chrome.storage.sync.get(['reminderEnabled'], (result) => {
      const isEnabled = result.reminderEnabled || false;
      if (isEnabled) {
        // Check if there's already a pending reminder
        chrome.storage.local.get(['pendingWaterReminder'], (localResult) => {
          if (!localResult.pendingWaterReminder) {
            showNotification();
          } else {
            console.log("[Background] Pending reminder exists, skipping new notification");
          }
        });
      }
    })
  }
});

// Function to show OS-level notification
function showNotification() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab?.id) {
      chrome.tabs.sendMessage(activeTab.id, {
        type: "SHOW_OVERLAY",
        message: "Time to drink water! Stay hydrated 💧"
      }, () => {
        if (chrome.runtime.lastError) {
          console.warn("Could not send to active tab:", chrome.runtime.lastError.message);
        }
      });
    }
  });
}
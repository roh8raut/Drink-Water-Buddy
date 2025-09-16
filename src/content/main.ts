// Refactored main content script
import { WaterReminderOverlay } from './components/WaterReminderOverlay';
import { getPendingReminder, isExtensionEnabled, setPendingReminder } from './utils/storage';

// Initialize overlay manager
const waterReminder = new WaterReminderOverlay();

// Check for pending reminder on page load
(async () => {
  const hasEnabledExtension = await isExtensionEnabled();
  const hasPending = await getPendingReminder();

  if (!hasEnabledExtension || !hasPending) return;


  waterReminder.show();
})()


// Listen for messages from background
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "SHOW_OVERLAY") {
    // Only show reminder if no overlay is currently active
    if (!waterReminder.getIsActive()) {
      // Set pending reminder in storage
      setPendingReminder(true).then(() => {
        // Uncomment when ready to show
        waterReminder.show();
      });
    } else {}
  } else if (msg.type === "REMOVE_OVERLAY") {
    // Remove the overlay if it exists
    const overlay = document.getElementById("water-reminder-overlay");
    if (overlay) {
      if (waterReminder && waterReminder.getIsActive()) {
        waterReminder.remove();
      }
    }
    // Also clear any pending reminder
    chrome.storage.local.remove(['pendingWaterReminder']);
  }
});

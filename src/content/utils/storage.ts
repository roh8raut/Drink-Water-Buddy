// Storage utility functions
export async function getPendingReminder(): Promise<boolean> {
  try {
    const result = await chrome.storage.local.get(['pendingWaterReminder']);
    return !!result.pendingWaterReminder;
  } catch (error) {
    console.error('Failed to get pending reminder:', error);
    return false;
  }
}

export async function isExtensionEnabled(): Promise<boolean> {
  const result = await chrome.storage.sync.get(['reminderEnabled']);

  return !!result.reminderEnabled;
}
export async function setPendingReminder(value: boolean): Promise<void> {
  await chrome.storage.local.set({ pendingWaterReminder: value });
}

export async function clearPendingReminder(): Promise<void> {
  await chrome.storage.local.remove(['pendingWaterReminder']);
}
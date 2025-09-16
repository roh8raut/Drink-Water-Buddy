// Audio utility functions
export function playNotificationSound(): void {
  try {
    const audio = new Audio(chrome.runtime.getURL('sound.wav'));
    audio.volume = 0.5;
    audio.play().catch(err => {});
  } catch (error) {
    console.error("[Content] Error playing sound:", error);
  }
}

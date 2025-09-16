// Water reminder overlay component
import { clearPendingReminder } from '../utils/storage';
import { playNotificationSound } from '../utils/audio';
import { showWalkingAnimation } from '../utils/showWalkingAnimation';
import { injectAnimationStyles, overlayStyles, cardStyles } from '../utils/styles';

export class WaterReminderOverlay {
  private overlay: HTMLDivElement | null = null;
  private isActive: boolean = false;

  constructor() {
    injectAnimationStyles();
  }

  public show(): void {
    // Remove any existing overlay
    this.remove();

    // Set flag to indicate overlay is active
    this.isActive = true;

    // Create overlay
    this.overlay = this.createOverlay();
    document.body.appendChild(this.overlay);

    showWalkingAnimation(this.handleDismiss.bind(this));

    // Play notification sound
    playNotificationSound();
  }

  public remove(): void {
    const existing = document.getElementById("water-reminder-overlay");
    if (existing) {
      existing.remove();
    }
    this.isActive = false;
    this.overlay = null;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  private createOverlay(): HTMLDivElement {
    const overlay = document.createElement("div");
    overlay.id = "water-reminder-overlay";
    Object.assign(overlay.style, overlayStyles);

    const card = this.createCard();
    overlay.appendChild(card);

    return overlay;
  }

  private createCard(): HTMLDivElement {
    const card = document.createElement("div");
    Object.assign(card.style, cardStyles);

    // Water emoji
    const waterEmoji = document.createElement("div");
    waterEmoji.textContent = "💧";
    Object.assign(waterEmoji.style, {
      fontSize: "80px",
      marginBottom: "20px",
      animation: "bounce 1s ease-in-out infinite"
    });

    // Title
    const title = document.createElement("h2");
    title.textContent = "Time to Hydrate!";
    Object.assign(title.style, {
      margin: "0 0 10px 0",
      fontSize: "28px",
      color: "#333",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    });

    // Message
    const message = document.createElement("p");
    message.textContent = "Your body needs water to stay healthy and focused.";
    Object.assign(message.style, {
      margin: "0 0 30px 0",
      fontSize: "16px",
      color: "#666",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    });

    // Assemble card
    card.appendChild(waterEmoji);
    card.appendChild(title);
    card.appendChild(message);
    // card.appendChild(button);

    return card;
  }

  private handleDismiss(): void {
    // Clear pending reminder from storage
    clearPendingReminder();

    // Animate out
    if (this.overlay) {
      const card = this.overlay.querySelector('div');
      this.overlay.style.animation = "fadeOut 0.3s ease-out";
      if (card) {
        card.style.animation = "slideDown 0.3s ease-out";
      }

      setTimeout(() => {
        this.remove();
      }, 100);
    }
  }
}
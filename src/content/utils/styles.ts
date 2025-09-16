// Style utilities and animations
export function injectAnimationStyles(): void {
  if (!document.getElementById("water-reminder-styles")) {
    const style = document.createElement("style");
    style.id = "water-reminder-styles";
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
      
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideDown {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(30px);
        }
      }
      
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes dropletFall {
        0% {
          transform: translateY(-100px) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(calc(100vh + 100px)) rotate(360deg);
          opacity: 0;
        }
      }
      
      @keyframes dropletSway {
        0%, 100% {
          transform: translateX(0);
        }
        33% {
          transform: translateX(-30px);
        }
        66% {
          transform: translateX(30px);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

export const overlayStyles = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  zIndex: "2147483647",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(5px)",
  animation: "fadeIn 0.3s ease-out"
};

export const cardStyles = {
  backgroundColor: "white",
  borderRadius: "20px",
  padding: "40px",
  textAlign: "center",
  maxWidth: "400px",
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
  animation: "slideUp 0.4s ease-out"
};

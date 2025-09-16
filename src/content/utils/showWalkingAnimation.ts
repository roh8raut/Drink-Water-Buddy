import lottie from 'lottie-web';

export const showWalkingAnimation = (cb: () => void): void => {
    // Create container
    const container = document.createElement('div');
    container.className = 'lottie-container walking-animation';
    container.style.cssText = `
        width: 100px;
        height: 100px;
        position: fixed;
        bottom: 0px;
        transform: scaleX(-1);
        z-index: 2147483647;
        animation: walkAcrossScreen 15s ease-in-out forwards; 
        transform-origin: center; 

    `;

    // Inject keyframe animation if not already present
    if (!document.getElementById('walking-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'walking-animation-styles';
        style.textContent = `
            @keyframes walkAcrossScreen {
                0% {
                    left: -100px;
                    bottom: 0px;
                }
                50% {
                    left: calc(50vw - 50px);
                    bottom: 0px;
                }
                100% {
                    left: calc(100vw + 100px);
                    bottom: 0px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(container);

    // Load Lottie animation
    const animation = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: chrome.runtime.getURL('walking.json')
    });


    // Listen for animation end
    container.addEventListener('animationend', () => {
        animation.destroy();
        container.remove();
        cb();
    });
};
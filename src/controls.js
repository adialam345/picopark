var keys = {},preKeys = {}

// Handle keyboard events
document.addEventListener("keydown",(e)=>{
    if(e.code=="F1")mainGame.renderer.debug = !mainGame.renderer.debug
    keys[e.key.toLowerCase()]=true
})
document.addEventListener("keyup",(e)=>{
    keys[e.key.toLowerCase()]=false
})

// Handle mobile touch events
function initMobileControls() {
    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');
    const jumpBtn = document.getElementById('jumpBtn');
    const downBtn = document.getElementById('downBtn');

    // Helper function to handle touch events
    function handleTouch(btn, key, event) {
        event.preventDefault();
        if (event.type === 'touchstart') {
            keys[key] = true;
        } else if (event.type === 'touchend') {
            keys[key] = false;
        }
    }

    // Add touch event listeners with passive: false for better mobile performance
    const touchEvents = ['touchstart', 'touchend'];
    touchEvents.forEach(eventType => {
        leftBtn.addEventListener(eventType, (e) => handleTouch(leftBtn, 'arrowleft', e), { passive: false });
        rightBtn.addEventListener(eventType, (e) => handleTouch(rightBtn, 'arrowright', e), { passive: false });
        jumpBtn.addEventListener(eventType, (e) => handleTouch(jumpBtn, 'arrowup', e), { passive: false });
        downBtn.addEventListener(eventType, (e) => handleTouch(downBtn, 'arrowdown', e), { passive: false });
    });
}

// Initialize mobile controls immediately when the script loads
if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.addEventListener('DOMContentLoaded', initMobileControls);
}

function updateControls() {
    if (window.clientConnection) {
        let playerControls = mainGame.players[0].controls
        var fu = (n)=>{
            if (keys[playerControls[n]]&&!preKeys[playerControls[n]]) {
                clientConnection.updateKey(playerControls[n], true)
            }
            if (!keys[playerControls[n]]&&preKeys[playerControls[n]]) {
                clientConnection.updateKey(playerControls[n], false)
            }
        }

        fu(0)
        fu(1)
        fu(2)
        fu(3)
    }

    preKeys = {...keys}
}
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginGate = document.getElementById('login-gate');
const directory = document.getElementById('directory');
const shadow = document.getElementById('peripheral-shadow');
const video = document.getElementById('main-video');
const overlay = document.getElementById('video-overlay');

let idleTimer;

// 1. Shadow follows/flees from mouse
document.addEventListener('mousemove', (e) => {
    const x = e.clientX - 150;
    const y = e.clientY - 150;
    shadow.style.left = `${x}px`;
    shadow.style.top = `${y}px`;
});

// 2. Login Logic
usernameInput.addEventListener('input', () => {
    clearTimeout(idleTimer);
    document.getElementById('sys-status').innerText = "SYNC_INTERRUPTED";
    
    idleTimer = setTimeout(() => {
        initiateGhostLogin();
    }, 2500); // 2.5 seconds of silence triggers it
});

function initiateGhostLogin() {
    document.getElementById('sys-status').innerText = "SYNCHRONIZING...";
    let i = 0;
    const ghostPass = "HE_IS_WATCHING_YOU";
    passwordInput.disabled = false;
    
    const interval = setInterval(() => {
        passwordInput.value += ghostPass[i];
        i++;
        if (i >= ghostPass.length) {
            clearInterval(interval);
            setTimeout(() => {
                loginGate.classList.add('hidden');
                directory.classList.remove('hidden');
                console.log("ALERT: UNKNOWN_USER_ACCESS_GRANTED");
            }, 800);
        }
    }, 150);
}

// 3. Video Functions
function openVideo() {
    overlay.classList.remove('hidden');
    video.play();
    
    // Random Glitch Effect
    video.ontimeupdate = () => {
        if (Math.random() > 0.95) {
            video.style.opacity = "0.7";
            setTimeout(() => video.style.opacity = "1", 100);
        }
    };
}

function closeVideo() {
    video.pause();
    overlay.classList.add('hidden');
}
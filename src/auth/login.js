// Login logic for Ninja Dashboard
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Visual feedback
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<i class="ph-bold ph-circle-notch animate-spin"></i> <span>Logging in...</span>';

        // Simulate minor delay for premium feel
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const email = document.getElementById('email')?.value;
        const password = document.getElementById('password')?.value;

        // Admin Detour
        if (email === 'admin@bou.org' && password === 'admin123') {
            localStorage.setItem('ninja-role', 'admin');
            alert('Admin access granted! Redirecting to Management Hub...');
            window.location.href = '/admin/';
            return;
        }

        // Standard User
        localStorage.setItem('ninja-role', 'user');
        window.location.href = '/';
    });
}

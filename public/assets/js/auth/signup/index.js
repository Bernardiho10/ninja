// Signup logic for Ninja Dashboard
const signupForm = document.getElementById('signup-form');
const signupBtn = document.getElementById('signup-btn');

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Form Data capture (simulated)
        document.getElementById('username').value;
        document.getElementById('business-name').value;
        
        // Visual feedback: Start loading state
        signupBtn.disabled = true;
        signupBtn.innerHTML = '<i class="ph-bold ph-circle-notch animate-spin"></i> <span>Creating Account...</span>';

        // Simulate network latency (0.8s for premium 'working' feel)
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Success state feedback
        signupBtn.classList.remove('btn-primary');
        signupBtn.classList.add('bg-success', 'text-white', 'border-success');
        signupBtn.innerHTML = '<i class="ph-bold ph-check-circle"></i> <span>Account Created!</span>';

        // Final delay before redirecting to login
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Redirect to login page
        window.location.href = '/auth/login.html';
    });
}

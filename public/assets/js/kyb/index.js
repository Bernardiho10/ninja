// KYB logic
document.addEventListener('DOMContentLoaded', () => {
    const kybForm = document.getElementById('kyb-form');
    if (kybForm) {
        kybForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mock: Your KYB documents have been submitted for review.');
            window.location.href = '/';
        });
    }
});

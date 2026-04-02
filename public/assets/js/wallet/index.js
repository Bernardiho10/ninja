// Wallet & Funding logic
document.addEventListener('DOMContentLoaded', () => {
    const fundForm = document.getElementById('fund-form');
    if (fundForm) {
        fundForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const amountInput = document.getElementById('amount');
            if (amountInput) {
                alert('Mock: Processing Paystack payment for ₦ ' + amountInput.value);
            }
        });
    }
});

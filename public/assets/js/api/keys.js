// API Keys logic
document.addEventListener('DOMContentLoaded', () => {
    const createBtn = document.getElementById('create-key-btn');
    if (createBtn) {
        createBtn.addEventListener('click', () => {
            const name = prompt('Name of the new API key?');
            if (name) {
                alert('Mock: Created new API key - "' + name + '"');
            }
        });
    }

    const deleteBtns = document.querySelectorAll('.text-error');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm('Permanently delete this API key?')) {
                alert('Mock: Deleted API key');
            }
        });
    });
});

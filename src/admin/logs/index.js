// API Request Logs logic
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('log-table-body');
    const searchInput = document.getElementById('log-search');
    const statusFilter = document.getElementById('log-status');

    if (!tableBody || !searchInput || !statusFilter) return;

    // Use initial table rows as data
    const initialRows = Array.from(tableBody.querySelectorAll('tr')).map(row => {
        const cells = row.querySelectorAll('td');
        return {
            html: row.innerHTML,
            timestamp: cells[0].textContent,
            requestId: cells[1].textContent,
            path: cells[2].textContent,
            method: cells[3].textContent,
            status: cells[4].textContent,
            charge: cells[5].textContent
        };
    });

    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = item.html;
            tableBody.appendChild(row);
        });
    }

    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusTerm = statusFilter.value;

        const filtered = initialRows.filter(item => {
            const matchesSearch = item.path.toLowerCase().includes(searchTerm) || 
                                 item.requestId.toLowerCase().includes(searchTerm);
            const matchesStatus = !statusTerm || item.status.includes(statusTerm);
            return matchesSearch && matchesStatus;
        });

        renderTable(filtered);
    }

    searchInput.addEventListener('input', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
});

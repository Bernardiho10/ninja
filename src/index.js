// Main entry point for the Ninja Dashboard
document.addEventListener('DOMContentLoaded', () => {
  console.log('Ninja Dashboard v3 Initialized');

  const path = window.location.pathname;

  // --- Navigation & Routing ---
  function highlightNav() {
    const navLinks = document.querySelectorAll('.sidebar-nav a, .bottom-nav a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      // Handle variations like /, /index.html, /api/keys, /api/keys/
      const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '');
      const normalizedHref = href === '/' ? '/' : href.replace(/\/$/, '');

      if (normalizedHref === normalizedPath) {
        link.parentElement.classList.add('active');
        link.classList.add('active');
      } else {
        link.parentElement.classList.remove('active');
        link.classList.remove('active');
      }
    });
  }

  highlightNav();

  // --- Global Theme & Logout ---
  const themeToggle = document.getElementById('theme-toggle');
  
  function updateTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ninja-theme', theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      updateTheme(isDark ? 'light' : 'dark');
    });
  }

  const logoutBtns = document.querySelectorAll('.logout-btn');
  logoutBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Are you sure you want to logout of Ninja?')) {
        window.location.href = '/auth/login.html';
      }
    });
  });

  // --- Advanced Multi-Column Filtering ---
  function initTableFiltering() {
    const filters = document.querySelectorAll('.column-filter');
    
    filters.forEach(filter => {
      filter.addEventListener('input', () => {
        const table = filter.closest('table');
        const rows = table.querySelectorAll('tbody tr');
        const allFilters = table.querySelectorAll('.column-filter');
        
        const activeFilters = Array.from(allFilters)
          .map(f => ({
            index: parseInt(f.getAttribute('data-column')),
            value: f.value.toLowerCase(),
            type: f.type
          }))
          .filter(f => f.value !== '');

        rows.forEach(row => {
          const cells = row.querySelectorAll('td');
          const isVisible = activeFilters.every(f => {
            const cellText = cells[f.index] ? cells[f.index].textContent.toLowerCase().trim() : '';
            
            if (f.type === 'date') {
              // Extract date from cell (usually YYYY-MM-DD at start)
              const firstPart = cellText.split(' ')[0];
              return firstPart.includes(f.value);
            }
            
            if (f.type === 'number') {
              // Extract numbers and match
              const cellNum = cellText.replace(/[^0-9.]/g, '');
              const filterNum = f.value.replace(/[^0-9.]/g, '');
              return cellNum.includes(filterNum);
            }
            
            return cellText.includes(f.value);
          });
          row.style.display = isVisible ? '' : 'none';
        });
      });
    });
  }

  initTableFiltering();

  // --- Table Scroll Shadow (fade on reaching right edge) ---
  function initTableScrollShadows() {
    const containers = document.querySelectorAll('.table-container');
    
    containers.forEach(container => {
      function updateShadow() {
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        // Show shadow if there is more to scroll to the right (2px tolerance)
        const canScrollRight = scrollWidth - scrollLeft - clientWidth > 2;
        container.classList.toggle('can-scroll-right', canScrollRight);
      }

      container.addEventListener('scroll', updateShadow, { passive: true });
      // Run on load + after any resize
      updateShadow();
      window.addEventListener('resize', updateShadow);
    });
  }

  initTableScrollShadows();

  // Dashboard Specific: Handle Dynamic Data Injection if on Home
  if (path === '/' || path.includes('index.html')) {
    // Initial activity data for the home page table
    const activityData = [
      { t: '2024-04-01 22:15', e: '/v1/verify/identity', s: '200 OK', c: 100 },
      { t: '2024-04-01 21:05', e: '/v1/payment/initiate', s: '200 OK', c: 100 },
      { t: '2024-04-01 20:30', e: '/v1/auth/token', s: '401 Fail', c: 0 },
      { t: '2024-04-01 19:45', e: '/v1/verify/nin', s: '200 OK', c: 100 },
      { t: '2024-04-01 18:20', e: '/v1/payment/verify', s: '500 Error', c: 0 },
      { t: '2024-03-31 15:10', e: '/v1/verify/bvn', s: '200 OK', c: 100 },
      { t: '2024-03-31 14:05', e: '/v1/wallet/balance', s: '200 OK', c: 100 }
    ];

    const tableBody = document.getElementById('activity-table-body');
    if (tableBody) {
      tableBody.innerHTML = activityData.map(item => `
        <tr>
          <td class="text-xs text-muted-foreground">${item.t}</td>
          <td><code class="text-silver font-medium">${item.e}</code></td>
          <td><span class="badge ${item.s.includes('200') ? 'badge-success' : 'badge-error'}">${item.s}</span></td>
          <td class="font-semibold">₦ ${item.c.toFixed(2)}</td>
        </tr>
      `).join('');
      // Re-trigger filtering after injection in case filters are pre-filled
      initTableFiltering();
      // Re-init scroll shadows after dynamic content
      initTableScrollShadows();
    }
  }

  // --- Modal Logic ---
  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('active');
  }

  const createKeyBtn = document.getElementById('create-key-btn');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const createKeyModal = document.getElementById('create-key-modal');
  const createKeyForm = document.getElementById('create-key-form');

  if (createKeyBtn) {
    createKeyBtn.addEventListener('click', () => openModal('create-key-modal'));
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => closeModal('create-key-modal'));
  }

  if (modalCancelBtn) {
    modalCancelBtn.addEventListener('click', () => closeModal('create-key-modal'));
  }

  if (createKeyModal) {
    createKeyModal.addEventListener('click', (e) => {
      // Close if clicking the overlay (the direct parent of modal-content)
      if (e.target === createKeyModal) closeModal('create-key-modal');
    });
  }

  if (createKeyForm) {
    createKeyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('key-name').value;
      const expiry = document.getElementById('key-expiry').value;
      
      console.log('Creating Key:', { name, expiry });
      
      // Mock success and close
      alert(`API Key "${name}" created successfully!\nNote: This is a demo implementation.`);
      closeModal('create-key-modal');
      createKeyForm.reset();
    });
  }

  // --- Sidebar Toggle Logic ---
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  
  // Initialize from storage
  const isCollapsed = localStorage.getItem('ninja-sidebar-collapsed') === 'true';
  if (isCollapsed && sidebar) {
    sidebar.classList.add('sidebar-collapsed');
  }

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('sidebar-collapsed');
      localStorage.setItem('ninja-sidebar-collapsed', sidebar.classList.contains('sidebar-collapsed'));
    });
  }

  // --- KYB Logic ---
  const kybForm = document.getElementById('kyb-form');
  if (kybForm && sidebar) {
    kybForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const statusBanner = document.getElementById('kyb-status-banner');
      const statusBadge = document.getElementById('kyb-status-badge');
      const statusText = document.getElementById('kyb-status-text');

      sidebar.classList.remove('kyb-pending');
      sidebar.classList.add('kyb-verified');

      if (statusBanner) {
        statusBanner.className = "kyb-status-banner flex items-center gap-4 mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20";
      }
      if (statusBadge) {
        statusBadge.className = "badge bg-green-600 text-white border-none";
        statusBadge.textContent = "Verified";
      }
      if (statusText) {
        statusText.className = "text-sm font-medium text-green-600";
        statusText.textContent = "Your business is verified. Enjoy full platform access!";
      }

      alert("KYB Documents submitted successfully!\nVerification status updated for demonstration.");
    });
  }

  // --- Mobile Sidebar Toggle ---
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const sidebarClose = document.getElementById('sidebar-close');

  function openSidebar() {
    sidebar.classList.add('mobile-open');
    sidebarBackdrop.classList.add('mobile-open');
  }

  function closeSidebar() {
    sidebar.classList.remove('mobile-open');
    sidebarBackdrop.classList.remove('mobile-open');
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', openSidebar);
  }

  if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeSidebar);
  }
});


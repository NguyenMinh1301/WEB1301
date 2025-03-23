/**
 * Lab Directory Interactive Script
 * 
 * This script handles the interactive behavior of the lab directory,
 * including folder expansion/collapse, visual feedback, and welcome popup.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Show welcome modal
    showWelcomeModal();
    
    // Setup folder toggle functionality
    setupFolderToggle();
    
    // Initialize first folder as open
    const firstFolder = document.querySelector('.folder');
    if (firstFolder) {
        firstFolder.classList.add('active');
        updateFolderIcon(firstFolder);
    }
    
    // Add animation delay to file items
    setupFileAnimations();
    
    // Console confirmation
    console.log('Lab Directory initialized successfully');
});

/**
 * Show welcome modal with student information
 */
function showWelcomeModal() {
    // Create modal structure
    const modal = document.createElement('div');
    modal.className = 'welcome-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Xin chào 👋</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="student-info">
                    <p><strong>Họ và tên:</strong> Nguyễn Quang Minh</p>
                    <p><strong>MSSV:</strong> TV00291</p>
                    <p><strong>Lớp:</strong> WEB1301</p>
                    <p><strong>Ngành:</strong> Công nghệ thông tin</p>
                </div>
                <p>Đây là trang web chứa các bài lab của môn học. Click vào các thư mục để xem các bài tập.</p>
                <button class="btn-get-started">Bắt đầu</button>
            </div>
        </div>
    `;
    
    // Add modal to DOM
    document.body.appendChild(modal);
    
    // Show modal with delay
    setTimeout(() => {
        modal.classList.add('active');
    }, 300);
    
    // Close modal when clicking close button
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        closeModal(modal);
    });
    
    // Close modal when clicking get started button
    const startBtn = modal.querySelector('.btn-get-started');
    startBtn.addEventListener('click', () => {
        closeModal(modal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

/**
 * Close welcome modal with animation
 */
function closeModal(modal) {
    modal.classList.remove('active');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
        modal.remove();
    }, 300);
}

/**
 * Set up click handlers for folders
 */
function setupFolderToggle() {
    const folderNames = document.querySelectorAll('.folder-name');
    
    folderNames.forEach(folder => {
        folder.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get parent folder element
            const parentFolder = this.parentElement;
            
            // Toggle active class
            parentFolder.classList.toggle('active');
            
            // Update the folder icon
            updateFolderIcon(parentFolder);
            
            // Add ripple effect
            createRippleEffect(e, this);
            
            // Reset and reapply animation to files
            if (parentFolder.classList.contains('active')) {
                setupFileAnimations(parentFolder);
            }
        });
    });
}

/**
 * Create ripple effect when clicking on folders
 */
function createRippleEffect(event, element) {
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    // Get element dimensions
    const rect = element.getBoundingClientRect();
    
    // Calculate ripple size (needs to be larger than the element)
    const size = Math.max(rect.width, rect.height) * 2;
    
    // Set ripple properties
    ripple.style.width = ripple.style.height = `${size}px`;
    
    // Position ripple where clicked
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    
    // Add ripple to element
    element.appendChild(ripple);
    
    // Remove ripple after animation completes
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Update folder icon based on open/closed state
 */
function updateFolderIcon(folderElement) {
    const icon = folderElement.querySelector('.folder-name i');
    
    if (folderElement.classList.contains('active')) {
        // Change to open folder icon
        icon.className = 'fas fa-folder-open';
    } else {
        // Change to closed folder icon
        icon.className = 'fas fa-folder';
    }
}

/**
 * Setup staggered animation for file items
 */
function setupFileAnimations(parentFolder = null) {
    // Select all files or only files in specific folder
    let files;
    if (parentFolder) {
        files = parentFolder.querySelectorAll('.file');
    } else {
        files = document.querySelectorAll('.folder.active .file');
    }
    
    // Set animation delay for each file
    files.forEach((file, index) => {
        file.style.setProperty('--index', index);
    });
}

// Add hover effects for file links
document.querySelectorAll('.file a').forEach(link => {
    // Mouse enter effect
    link.addEventListener('mouseenter', function() {
        this.querySelector('i').style.color = '#000';
    });
    
    // Mouse leave effect
    link.addEventListener('mouseleave', function() {
        this.querySelector('i').style.color = '';
    });
    
    // Click effect
    link.addEventListener('click', function() {
        console.log(`Navigating to: ${this.href}`);
    });
});
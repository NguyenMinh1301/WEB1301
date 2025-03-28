document.addEventListener('DOMContentLoaded', function () {
    const headerContent = document.querySelector('.header-content');
    headerContent.style.opacity = 0;
    setTimeout(() => {
        headerContent.style.transition = 'opacity 1s ease-in-out';
        headerContent.style.opacity = 1;
    }, 100);

    const topNav = document.querySelector('.top-nav');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) {
            topNav.classList.add('sticky');
        } else {
            topNav.classList.remove('sticky');
        }
    });

    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    sidebarToggle.addEventListener('click', function () {
        sidebar.classList.toggle('active');
    });
});
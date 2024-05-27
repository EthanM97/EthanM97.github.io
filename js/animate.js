// Function to show footer icons with animation
function showFooterIcons() {
    const footerIcons = document.querySelectorAll('.footer-icon');
    footerIcons.forEach(icon => {
        icon.classList.remove('show'); // Reset the animation
        void icon.offsetWidth; // Trigger reflow
        icon.classList.add('show'); // Add the class again
    });
}

// Function to handle navbar shrink
function handleNavbarShrink() {
    const navbar = document.querySelector('.navbar');
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

    if (currentScrollTop > 0) {
        navbar.classList.add('shrink');
    } else {
        navbar.classList.remove('shrink');
    }
}

// Function to add hover effect on footer icons
function addHoverEffect() {
    const footerIcons = document.querySelectorAll('.footer-icon');
    footerIcons.forEach(icon => {
        const parentLink = icon.closest('a.icon-link');
        parentLink.addEventListener('mouseenter', () => {
            parentLink.classList.remove('reverse-rotate');
        });
        parentLink.addEventListener('mouseleave', () => {
            parentLink.classList.add('reverse-rotate');
            // Add timeout to remove reverse-rotate class after the animation completes
            setTimeout(() => {
                parentLink.classList.remove('reverse-rotate');
            }, 200); // Adjust the timeout duration to match the animation duration
        });
    });
}

// Initialize everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initializeThemeToggleIcons();
    initializeTheme();
    addHoverEffect();
    addSmoothScrolling();
    addEventListeners();
    window.addEventListener('scroll', () => {
        checkScrollBottom();
        handleNavbarShrink();
    });
});

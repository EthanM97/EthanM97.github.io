// Function to preload images
function preloadImages(imagePaths) {
    imagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
    });
}

// Determine the base path for assets based on the current URL
function getBasePath() {
    return window.location.pathname.includes('project-pages') ? '../' : './';
}

// Paths for images and icons
const basePath = getBasePath();
const paths = {
    icons: {
        sun: `${basePath}assets/icons/sun.svg`,
        moon: `${basePath}assets/icons/moon.svg`,
        arrowUp: `${basePath}assets/icons/arrow-up.svg`,
        arrowUpLight: `${basePath}assets/icons/arrow-up-light.svg`,
        linkedin: `${basePath}assets/icons/linkedin.svg`,
        linkedinLight: `${basePath}assets/icons/linkedin_light.svg`,
        github: `${basePath}assets/icons/github.svg`,
        githubLight: `${basePath}assets/icons/github_light.svg`,
        mail: `${basePath}assets/icons/mail.svg`,
        mailLight: `${basePath}assets/icons/mail_light.svg`
    },
    images: {
        headshotDark: `${basePath}assets/images/headshot_dark.png`,
        headshotLight: `${basePath}assets/images/headshot_light.png`
    }
};

preloadImages([paths.images.headshotDark, paths.images.headshotLight]);

// Function to initialize the theme toggle icons
function initializeThemeToggleIcons() {
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    if (sunIcon && moonIcon) {
        sunIcon.src = paths.icons.sun;
        moonIcon.src = paths.icons.moon;
    }
}

// Function to enable dark mode
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    updateElementsForDarkMode();
    localStorage.setItem('theme', 'dark');
}

// Function to disable dark mode
function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    updateElementsForLightMode();
    localStorage.setItem('theme', 'light');
}

// Function to update elements for dark mode
function updateElementsForDarkMode() {
    document.querySelectorAll('.navbar, .button, .project-card, .footer-icon').forEach(element => {
        element.classList.add('dark-mode');
    });
    document.getElementById('moon-icon').style.display = 'none';
    document.getElementById('sun-icon').style.display = 'block';
    document.querySelector('#back-to-top img').src = paths.icons.arrowUpLight;

    const headerImage = document.querySelector('.portfolio-header-image');
    if (headerImage) {
        headerImage.src = paths.images.headshotLight;
    }

    document.querySelectorAll('.footer-icon').forEach(icon => {
        const type = icon.dataset.icon;
        icon.src = paths.icons[`${type}Light`];
    });
}

// Function to update elements for light mode
function updateElementsForLightMode() {
    document.querySelectorAll('.navbar, .button, .project-card, .footer-icon').forEach(element => {
        element.classList.remove('dark-mode');
    });
    document.getElementById('moon-icon').style.display = 'block';
    document.getElementById('sun-icon').style.display = 'none';
    document.querySelector('#back-to-top img').src = paths.icons.arrowUp;

    const headerImage = document.querySelector('.portfolio-header-image');
    if (headerImage) {
        headerImage.src = paths.images.headshotDark;
    }

    document.querySelectorAll('.footer-icon').forEach(icon => {
        const type = icon.dataset.icon;
        icon.src = paths.icons[type];
    });
}

// Initialize the theme based on saved preference
function initializeTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

// Add event listeners
function addEventListeners() {
    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            if (document.body.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }

    if (document.getElementById('my-work-link')) {
        document.getElementById('my-work-link').addEventListener('click', () => {
            document.getElementById('my-work-section').scrollIntoView({ behavior: "smooth" });
        });
    }

    let backToTopButton = document.getElementById("back-to-top");
    let lastScrollTop = 0;
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        let currentScrollTop = window.scrollY || document.documentElement.scrollTop;

        if (currentScrollTop > lastScrollTop + 30) {
            backToTopButton.style.display = "block";
        } else if (currentScrollTop < lastScrollTop - 45 || currentScrollTop === 0) {
            backToTopButton.style.display = "none";
        }
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    }

    backToTopButton.onclick = function () {
        scrollToTop();
    };

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            if (window.scrollY === 0) {
                backToTopButton.style.display = "none";
            }
        }, 300); // Adjust the timeout duration to match the smooth scroll duration
    }
}

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

// Function to check if user has scrolled to bottom
function checkScrollBottom() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        showFooterIcons();
    }
}

// Initialize everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initializeThemeToggleIcons();
    initializeTheme();
    addEventListeners();
    addHoverEffect();
    window.addEventListener('scroll', () => {
        checkScrollBottom();
        handleNavbarShrink();
    });
});

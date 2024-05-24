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
};

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
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    }

    backToTopButton.onclick = function () {
        scrollToTop();
    };

    function scrollToTop() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
}

// Initialize everything on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    initializeThemeToggleIcons();
    initializeTheme();
    addEventListeners();
});

let lastSparkTime = 0;
const sparkCooldown = 30000; // 1 minute in milliseconds

document.addEventListener('scroll', () => {
    const currentTime = new Date().getTime();
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (currentTime - lastSparkTime > sparkCooldown) {
            lastSparkTime = currentTime;
            requestAnimationFrame(showSparks);
        }
    }
});

function showSparks() {
    const sparksContainer = document.getElementById('sparks-container');
    sparksContainer.innerHTML = ''; // Clear previous sparks
    sparksContainer.style.display = 'block';

    const sparkSizes = ['spark-small', 'spark-medium', 'spark-large'];

    // Set the number of sparks to be created
    const numberOfSparks = 20;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < numberOfSparks; i++) {
        const spark = document.createElement('div');
        spark.classList.add('spark');
        const randomSizeClass = sparkSizes[Math.floor(Math.random() * sparkSizes.length)];
        spark.classList.add(randomSizeClass);
        spark.style.left = `${Math.random() * window.innerWidth}px`;
        spark.style.animationDelay = `${Math.random() * 0.5}s`;
        fragment.appendChild(spark);
    }

    sparksContainer.appendChild(fragment);

    setTimeout(() => {
        sparksContainer.style.display = 'none';
    }, 1000);
}


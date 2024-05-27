// Add event listeners for back to top button
function addBackToTopListeners() {
    let backToTopButton = document.getElementById("back-to-top");
    let lastScrollTop = 0;
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        let currentScrollTop = window.scrollY || document.documentElement.scrollTop;

        if (currentScrollTop > lastScrollTop + 30) {
            backToTopButton.style.display = "block";
        } else if (currentScrollTop < lastScrollTop - 35 || currentScrollTop === 0) {
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

// Function to check if user has scrolled to bottom
function checkScrollBottom() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        showFooterIcons();
    }
}

// Initialize back to top functionality on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    addBackToTopListeners();
    window.addEventListener('scroll', checkScrollBottom);
});

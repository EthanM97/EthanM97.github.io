# README
if (document.getElementById('my-work-link')) {
    document.getElementById('my-work-link').addEventListener('click', () => {
      document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
    })
  }
  
  
  // Get the button
  let backToTopButton = document.getElementById("back-to-top");
  
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {
      scrollFunction();
  };
  
  function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          backToTopButton.style.display = "block";
      } else {
          backToTopButton.style.display = "none";
      }
  }
  
  // When the user clicks on the button, scroll to the top of the document
  backToTopButton.onclick = function() {
      scrollToTop();
  };
  
  function scrollToTop() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  
// Define basePath
const basePath = window.location.pathname.includes('project-pages') ? '../' : './';

// Get the theme toggle button
const themeToggleButton = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

const headshots = {
    headshotDark: `${basePath}assets/images/headshot_dark.png`,
    headshotLight: `${basePath}assets/images/headshot_light.png`
}

const backToTopIcon = document.querySelector('#back-to-top img');
const upArrorIcon = {
    light: `${basePath}assets/icons/arrow-up-light.svg`,
    dark: `${basePath}assets/icons/arrow-up.svg`
};

// Footer icons
const footerIcons = document.querySelectorAll('.footer-icon');
const lightFooterIcons = {
  linkedin: `${basePath}assets/icons/linkedin_light.svg`,
  github: `${basePath}assets/icons/github_light.svg`,
  mail: `${basePath}assets/icons/mail_light.svg`
};
const darkFooterIcons = {
  linkedin: `${basePath}assets/icons/linkedin.svg`,
  github: `${basePath}assets/icons/github.svg`,
  mail: `${basePath}assets/icons/mail.svg`
};

// Function to enable dark mode
function enableDarkMode() {
  document.body.classList.add('dark-mode');
  // Update other elements
  document.querySelectorAll('.navbar, .button, .project-card, .footer-icon').forEach(element => {
    element.classList.add('dark-mode');
  });
  moonIcon.style.display = 'none';
  sunIcon.style.display = 'block';
  backToTopIcon.src = upArrorIcon.light;
  localStorage.setItem('theme', 'dark'); // Save theme preference

  // Change portfolio header image
  const headerImage = document.querySelector('.portfolio-header-image');
  headerImage.src = headshots.headshotLight;

  // Change footer icons to light version
  footerIcons.forEach(icon => {
    const type = icon.dataset.icon;
    icon.src = lightFooterIcons[type];
  });
}

// Function to disable dark mode
function disableDarkMode() {
  document.body.classList.remove('dark-mode');
  // Update other elements
  document.querySelectorAll('.navbar, .button, .project-card, .footer-icon').forEach(element => {
    element.classList.remove('dark-mode');
  });
  moonIcon.style.display = 'block';
  sunIcon.style.display = 'none';
  backToTopIcon.src = upArrorIcon.dark;
  localStorage.setItem('theme', 'light'); // Save theme preference

  // Change portfolio header image
  const headerImage = document.querySelector('.portfolio-header-image');
  headerImage.src = headshots.headshotDark;

  // Change footer icons to dark version
  footerIcons.forEach(icon => {
    const type = icon.dataset.icon;
    icon.src = darkFooterIcons[type];
  });
}

// Event listener for the theme toggle button
themeToggleButton.addEventListener('click', () => {
  if (document.body.classList.contains('dark-mode')) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

// Check the saved theme preference and apply it on load
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
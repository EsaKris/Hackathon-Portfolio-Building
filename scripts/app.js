// Initialize database if not exists
if (!localStorage.getItem('portfolioDB')) {
    console.log("Initializing database...");
    const initialDB = {
        projects: [
            {
                id: 1,
                title: "E-commerce Website",
                description: "A fully responsive e-commerce platform with cart functionality.",
                image: "images/project1.jpg",
                github: "https://github.com/EsaKris/ecommerce",
                live: "https://example-ecommerce.netlify.app"
            },
            {
                id: 2,
                title: "Weather App",
                description: "Real-time weather application using a weather API.",
                image: "images/project2.jpg",
                github: "https://github.com/EsaKris/weather-app",
                live: "https://example-weatherapp.netlify.app"
            },
            {
                id: 3,
                title: "Task Manager",
                description: "A productivity app to organize your daily tasks.",
                image: "images/project3.jpg",
                github: "https://github.com/EsaKris/task-manager",
                live: "https://example-taskmanager.netlify.app"
            }
        ],
        contacts: [],
        visitors: 0
    };
    localStorage.setItem('portfolioDB', JSON.stringify(initialDB));
}

// Database functions
function getDB() {
    return JSON.parse(localStorage.getItem('portfolioDB'));
}

function updateDB(db) {
    localStorage.setItem('portfolioDB', JSON.stringify(db));
}

function getProjects() {
    const db = getDB();
    return db.projects;
}

function saveContactForm(name, email, message) {
    const db = getDB();
    db.contacts.push({
        id: Date.now(),
        name,
        email,
        message,
        date: new Date().toISOString()
    });
    updateDB(db);
    return true;
}

function updateVisitorCount() {
    const db = getDB();
    db.visitors += 1;
    updateDB(db);
    document.getElementById('visitor-counter').textContent = db.visitors;
    return db.visitors;
}

// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('nav-active');
    
    // Animate Links
    navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinksItems.forEach(link => {
                link.style.animation = '';
            });
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Save to database
        saveContactForm(name, email, message);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Load projects when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Set current year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Load projects
    loadProjects();
    
    // Update visitor count
    updateVisitorCount();
});

// Function to load projects into the DOM
function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    console.log("Projects container:", projectsContainer);
    
    if (!projectsContainer) {
        console.error("Projects container not found!");
        return;
    }
    
    try {
        const projects = getProjects();
        console.log("Loaded projects:", projects);
        
        if (!projects || projects.length === 0) {
            projectsContainer.innerHTML = '<p>No projects to display.</p>';
            return;
        }
        
        projectsContainer.innerHTML = '';
        
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-img">
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" class="btn">GitHub</a>
                        <a href="${project.live}" target="_blank" class="btn">Live Demo</a>
                    </div>
                </div>
            `;
            
            projectsContainer.appendChild(projectCard);
        });
        
        console.log("Projects loaded successfully");
    } catch (error) {
        console.error("Error loading projects:", error);
        projectsContainer.innerHTML = '<p>Error loading projects. Please try again.</p>';
    }
}
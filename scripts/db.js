// scripts/db.js

// Initialize database if not exists
if (!localStorage.getItem('portfolioDB')) {
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

// Project functions
export function getProjects() {
    const db = getDB();
    return db.projects;
}

// Contact form functions
export function saveContactForm(name, email, message) {
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

// Visitor counter functions
export function updateVisitorCount() {
    const db = getDB();
    db.visitors += 1;
    updateDB(db);
    document.getElementById('visitor-counter').textContent = db.visitors;
    return db.visitors;
}

export function getVisitorCount() {
    const db = getDB();
    return db.visitors;
}
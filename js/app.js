/**
 * ShoreSquad - Interactive Beach Cleanup Community App
 * Main Application JavaScript
 * Features: Map integration, Weather API, Events management, Team collaboration
 */

// ============================================
// CONFIGURATION & CONSTANTS
// ============================================

const API_CONFIG = {
    weather: {
        baseUrl: 'https://api.open-meteo.com/v1/forecast',
        latitude: 1.381497,      // Pasir Ris Beach
        longitude: 103.955574
    }
};

// Sample events data
const SAMPLE_EVENTS = [
    {
        id: 1,
        name: 'Pasir Ris Beach Cleanup',
        date: '2025-12-15',
        time: '08:00 AM',
        location: 'Pasir Ris Beach, Singapore',
        participants: 24,
        description: 'Join us for a morning cleanup at Pasir Ris Beach',
        latitude: 1.381497,
        longitude: 103.955574
    },
    {
        id: 2,
        name: 'East Coast Beach Restoration',
        date: '2025-12-20',
        time: '10:00 AM',
        location: 'East Coast, Singapore',
        participants: 18,
        description: 'Help restore the beautiful East Coast Beach',
        latitude: 1.3030,
        longitude: 103.9127
    },
    {
        id: 3,
        name: 'Sentosa Beach Impact Day',
        date: '2025-12-22',
        time: '09:00 AM',
        location: 'Sentosa Beach',
        participants: 32,
        description: 'Large-scale cleanup event for year-end impact',
        latitude: 1.2498,
        longitude: 103.8278
    }
];

// ============================================
// GLOBAL STATE
// ============================================

let currentWeather = null;
let crewMembers = ['You'];

// ============================================
// DOM ELEMENTS
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const ctaButton = document.getElementById('ctaButton');
const weatherWidget = document.getElementById('weatherWidget');
const eventsList = document.getElementById('eventsList');
const teamGrid = document.getElementById('teamGrid');
const addMemberBtn = document.getElementById('addMemberBtn');

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for event handlers
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Format date to readable string
 */
function formatDate(dateString) {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Add fade-in animation to elements
 */
function animateElement(element) {
    element.classList.add('fade-in');
}

// ============================================
// NAVIGATION
// ============================================

/**
 * Toggle mobile menu
 */
function toggleMenu() {
    navMenu.classList.toggle('active');
}

hamburger?.addEventListener('click', toggleMenu);

/**
 * Close menu when nav link clicked
 */
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ============================================
// MAP FUNCTIONALITY (Google Maps)
// ============================================

/**
 * Initialize Google Maps iframe
 */
function initializeMap() {
    try {
        const googleMapsFrame = document.getElementById('googleMapsFrame');
        if (googleMapsFrame) {
            console.log('✅ Google Maps iframe loaded successfully');
            console.log(`📍 Next Cleanup: Pasir Ris Beach (1.381497°N, 103.955574°E)`);
        }
    } catch (error) {
        console.error('Map initialization error:', error);
    }
}

/**
 * Note: Event markers and popups are now handled by the Google Maps iframe
 * The "Next Cleanup" pin is embedded directly in the map URL
 */
function addEventMarkers() {
    // Events are displayed in the events section below
    // Google Maps iframe handles the location visualization
    console.log('Events displayed in Google Maps and Events section');
}

/**
 * Join event handler
 */
function joinEvent(eventId) {
    const event = SAMPLE_EVENTS.find(e => e.id === eventId);
    if (event) {
        alert(`Great! You're joining "${event.name}" on ${formatDate(event.date)}!\n\nCheck your inbox for details.`);
        event.participants++;
        // Refresh map markers to show updated count
        addEventMarkers();
    }
}

// ============================================
// WEATHER FUNCTIONALITY
// ============================================

/**
 * Fetch and display weather data
 */
async function fetchWeatherData() {
    try {
        const { latitude, longitude } = API_CONFIG.weather;
        const url = `${API_CONFIG.weather.baseUrl}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,uv_index`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather API request failed');

        const data = await response.json();
        currentWeather = data.current;
        displayWeather(data.current);

    } catch (error) {
        console.error('Weather fetch error:', error);
        displayWeatherError();
    }
}

/**
 * Display weather data in UI
 */
function displayWeather(weatherData) {
    const elements = {
        temp: document.getElementById('temp'),
        wind: document.getElementById('wind'),
        humidity: document.getElementById('humidity'),
        uv: document.getElementById('uv')
    };

    if (elements.temp) elements.temp.textContent = `${Math.round(weatherData.temperature_2m)}°C`;
    if (elements.wind) elements.wind.textContent = `${Math.round(weatherData.wind_speed_10m)} km/h`;
    if (elements.humidity) elements.humidity.textContent = `${weatherData.relative_humidity_2m}%`;
    if (elements.uv) elements.uv.textContent = weatherData.uv_index.toFixed(1);
}

/**
 * Handle weather fetch errors
 */
function displayWeatherError() {
    const elements = {
        temp: document.getElementById('temp'),
        wind: document.getElementById('wind'),
        humidity: document.getElementById('humidity'),
        uv: document.getElementById('uv')
    };

    Object.values(elements).forEach(el => {
        if (el) el.textContent = 'Error loading';
    });
}

// ============================================
// EVENTS FUNCTIONALITY
// ============================================

/**
 * Render events list
 */
function renderEvents() {
    if (!eventsList) return;

    eventsList.innerHTML = '';

    SAMPLE_EVENTS.forEach(event => {
        const eventCard = createEventCard(event);
        eventsList.appendChild(eventCard);
        animateElement(eventCard);
    });
}

/**
 * Create event card element
 */
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
        <div class="event-header">
            <h3>${event.name}</h3>
            <p class="event-date">${formatDate(event.date)} at ${event.time}</p>
        </div>
        <div class="event-body">
            <div class="event-detail">
                <strong>📍</strong> ${event.location}
            </div>
            <div class="event-detail">
                <strong>👥</strong> ${event.participants} joining
            </div>
            <p>${event.description}</p>
        </div>
        <div class="event-footer">
            <button class="btn btn-primary" onclick="joinEvent(${event.id})">Join</button>
            <button class="btn btn-secondary" onclick="shareEvent(${event.id})">Share</button>
        </div>
    `;

    return card;
}

/**
 * Share event handler
 */
function shareEvent(eventId) {
    const event = SAMPLE_EVENTS.find(e => e.id === eventId);
    if (event && navigator.share) {
        navigator.share({
            title: 'ShoreSquad Event',
            text: `Join me for ${event.name}!`,
            url: window.location.href
        }).catch(err => console.log('Share cancelled:', err));
    } else {
        alert(`Share "${event.name}" with your crew! 🌊`);
    }
}

// ============================================
// TEAM FUNCTIONALITY
// ============================================

/**
 * Render team members
 */
function renderTeam() {
    if (!teamGrid) return;

    // Preserve the add member button
    const addBtn = teamGrid.querySelector('.add-member');

    // Clear other cards but keep the add button
    Array.from(teamGrid.children).forEach(child => {
        if (!child.classList.contains('add-member')) {
            child.remove();
        }
    });

    crewMembers.forEach((member, index) => {
        if (member !== 'You') {
            const teamCard = createTeamCard(member, index);
            teamGrid.insertBefore(teamCard, addBtn);
            animateElement(teamCard);
        }
    });
}

/**
 * Create team member card
 */
function createTeamCard(memberName, index) {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = `
        <p>👤</p>
        <h4>${memberName}</h4>
        <button class="btn btn-secondary" onclick="removeMember(${index})" style="font-size: 0.8rem;">Remove</button>
    `;
    return card;
}

/**
 * Add new team member
 */
function addTeamMember() {
    const name = prompt('Enter crew member name:');
    if (name && name.trim()) {
        crewMembers.push(name.trim());
        renderTeam();
    }
}

/**
 * Remove team member
 */
function removeMember(index) {
    if (confirm('Remove this crew member?')) {
        crewMembers.splice(index + 1, 1);
        renderTeam();
    }
}

addMemberBtn?.addEventListener('click', addTeamMember);

// ============================================
// EVENT LISTENERS & INITIALIZATION
// ============================================

/**
 * CTA button handler
 */
ctaButton?.addEventListener('click', () => {
    document.getElementById('events').scrollIntoView({ behavior: 'smooth' });
});

/**
 * Smooth scroll for internal links with performance optimization
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/**
 * Window scroll event with throttling for performance
 */
window.addEventListener('scroll', throttle(() => {
    // Add animations or effects on scroll
    document.querySelectorAll('.fade-in').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
            el.style.opacity = '1';
        }
    });
}, 100));

/**
 * Handle window resize with debouncing
 */
window.addEventListener('resize', debounce(() => {
    // Handle responsive adjustments if needed
    console.log('Window resized');
}, 250));

/**
 * Initialize app on DOM ready
 */
function initializeApp() {
    console.log('🌊 Initializing ShoreSquad...');

    // Initialize all components
    try {
        initializeMap();
        fetchWeatherData();
        renderEvents();
        renderTeam();

        // Refresh weather every 30 minutes
        setInterval(fetchWeatherData, 30 * 60 * 1000);

        console.log('✅ ShoreSquad initialized successfully!');
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
}

/**
 * Run initialization when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

/**
 * Service Worker registration for offline support (optional)
 */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => {
        console.log('Service Worker registration failed:', err);
    });
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

/**
 * Log Core Web Vitals
 */
if ('web-vital' in window) {
    console.log('Monitoring Core Web Vitals...');
}

// ============================================
// DEBUGGING & ACCESSIBILITY
// ============================================

// Global reference for debugging
window.ShoreSquad = {
    state: () => ({
        crew: crewMembers,
        weather: currentWeather,
        events: SAMPLE_EVENTS
    }),
    debug: () => {
        console.log('=== ShoreSquad Debug Info ===');
        console.log('Crew:', crewMembers);
        console.log('Weather:', currentWeather);
        console.log('Events:', SAMPLE_EVENTS);
        console.log('Next Cleanup: Pasir Ris Beach (1.381497°N, 103.955574°E)');
    }
};

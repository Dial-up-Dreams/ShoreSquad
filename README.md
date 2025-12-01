# ShoreSquad

🌊 **Rally your crew, track weather, and hit the next beach cleanup with our dope map app!**

## Overview

ShoreSquad is a community-driven beach cleanup platform that mobilizes young people to clean beaches through interactive maps, real-time weather tracking, and social collaboration features. Our mission is to make eco-action fun and connected.

## Features

### 🗺️ Interactive Map
- Real-time event locations using Leaflet.js
- Visual markers for beach cleanup events
- Click-to-join functionality
- Location-based event discovery

### 🌤️ Weather Integration
- Real-time weather data from Open-Meteo API
- Temperature, wind speed, humidity, and UV index
- Beach condition planning
- Responsive weather widget

### 📅 Event Management
- Browse upcoming cleanup events
- Join events with one click
- Share events with your crew
- Real-time participant updates

### 👥 Crew Management
- Build your cleanup squad
- Team member profiles
- Collaborative planning
- Social engagement features

### 📊 Impact Tracking
- Community statistics
- Beaches cleaned
- Volunteers mobilized
- Trash collected tracking

## Design Philosophy

### Color Palette
- **Ocean Blue (#0A7EA4)**: Trust and ocean connection
- **Coral Orange (#FF6B6B)**: Energy and action
- **Sandy Beige (#F5E6D3)**: Natural, calming background
- **Fresh Green (#2ECC71)**: Eco-positive actions
- **Dark Navy (#1A3A3A)**: Text and accessibility

### Target Audience
Young, eco-conscious individuals aged 16-35 who value:
- Community engagement
- Environmental impact
- Social connectivity
- Outdoor activities

### UX Principles
1. **Mobile-First**: Optimized for touch and on-the-go planning
2. **Accessibility**: WCAG 2.1 AA compliance, semantic HTML
3. **Usability**: Clear CTAs, intuitive navigation, progressive disclosure
4. **Performance**: Debounced events, lazy loading, efficient DOM manipulation
5. **Engagement**: Gamification, social features, impact visibility

## Tech Stack

### Frontend
- **HTML5**: Semantic markup with ARIA labels
- **CSS3**: Modern layout with CSS Grid/Flexbox, responsive design
- **JavaScript (ES6+)**: 
  - Leaflet.js for interactive maps
  - Fetch API for weather data
  - Event delegation for performance
  - Debouncing and throttling for optimization

### APIs & Libraries
- **Leaflet.js**: Interactive mapping
- **Open-Meteo API**: Free weather data
- **OpenStreetMap**: Base map tiles

### Tools
- **Live Server**: Local development server
- **Git**: Version control

## Project Structure

```
ShoreSquad/
├── index.html           # Main HTML5 boilerplate
├── css/
│   └── styles.css       # Complete styling with color palette
├── js/
│   └── app.js          # Main application logic
├── assets/             # Images, icons, and media
├── .vscode/
│   ├── launch.json     # VS Code debugger config
│   └── settings.json   # Live Server configuration
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- VS Code with Live Server extension (optional but recommended)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ShoreSquad.git
cd ShoreSquad
```

2. Open with Live Server
- Right-click `index.html` → "Open with Live Server"
- Or use the VS Code Live Server extension

3. Navigate to `http://127.0.0.1:5500`

## Features Breakdown

### JavaScript Features

#### Interactivity
- Real-time map interactions with Leaflet
- Dynamic event card generation
- Team member management
- Modal-free user flows

#### Performance Optimizations
- **Debouncing**: Resize events (250ms)
- **Throttling**: Scroll events (100ms)
- **Event Delegation**: Single handler for multiple elements
- **Lazy Loading**: Weather updates every 30 minutes
- **DOM Efficiency**: Minimal reflows and repaints

#### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- High contrast color ratios

### Responsive Design
- **Mobile-First Approach**: Optimized for 480px and up
- **Breakpoints**:
  - Mobile: < 480px
  - Tablet: 480px - 768px
  - Desktop: > 768px
- **Touch-Friendly**: 44px+ minimum tap targets
- **Flexible Layouts**: CSS Grid and Flexbox

## API Integration

### Open-Meteo Weather API
- Free, no authentication required
- Real-time weather data for beach locations
- Automatic refresh every 30 minutes

```javascript
// Example weather fetch
const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=34.0195&longitude=-118.4912&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,uv_index`;
```

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Metrics

Target Core Web Vitals:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## Accessibility Checklist
- ✅ WCAG 2.1 Level AA compliance
- ✅ Semantic HTML5
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Color contrast ratios (7:1+)
- ✅ Skip to main content link
- ✅ Focus indicators
- ✅ Alt text for images

## Future Enhancements

### Phase 2
- User authentication and profiles
- Event creation and management
- Real-time notifications
- Social media integration
- Impact metrics dashboard

### Phase 3
- Native mobile apps (iOS/Android)
- Advanced filtering and search
- Video sharing and galleries
- Leaderboard and achievements
- Integration with environmental APIs

### Phase 4
- AI-powered event recommendations
- Volunteer coordination system
- Supply chain management
- Carbon offset tracking
- Partnerships with NGOs

## Development Workflow

### Local Development
```bash
# Start Live Server
open with Live Server in VS Code

# Debug in browser
F12 or Right-click → Inspect

# Access debug info
ShoreSquad.debug()  // in browser console
ShoreSquad.state()  // view app state
```

### Git Workflow
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial ShoreSquad project setup"

# Create feature branches
git checkout -b feature/map-improvements
git commit -m "Improve map interactivity"
git push origin feature/map-improvements
```

## Performance Tips

1. **Minimize re-renders**: Use event delegation
2. **Optimize images**: Compress before adding to assets/
3. **Lazy load resources**: Load maps only when in viewport
4. **Monitor bundle size**: Keep JavaScript under 100KB
5. **Use Service Workers**: Cache offline content

## Contributing

We welcome contributions! Please follow these guidelines:

1. Create a feature branch
2. Make your changes
3. Test across devices and browsers
4. Commit with clear messages
5. Push and create a Pull Request

## License

MIT License - feel free to use ShoreSquad for personal or commercial projects.

## Contact & Support

- **Email**: hello@shoresquad.io
- **Website**: www.shoresquad.io
- **Instagram**: @ShoreSquad
- **Twitter**: @ShoreSquadApp

## Acknowledgments

- Inspired by beach cleanup communities worldwide
- Maps powered by Leaflet and OpenStreetMap
- Weather data from Open-Meteo
- Built with love for our oceans 🌊

---

**Made by young eco-warriors, for young eco-warriors.**

*Rally your crew. Clean our beaches. Make an impact.*

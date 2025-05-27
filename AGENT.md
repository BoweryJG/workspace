# RepSpheres Workspace - AI Agent Configuration

## Project Overview
RepSpheres is an advanced sales intelligence platform for medical representatives, featuring AI-powered doctor research, real-time collaboration, and immersive UI/UX design inspired by ChatGPT and Google's modern aesthetics.

## Architecture
- **Frontend**: React 17.0.2 with Material-UI v5
- **Build Tool**: Vite
- **Styling**: Material-UI with custom design tokens and glassmorphism effects
- **State Management**: React Context API
- **Visualization**: Three.js for 3D networks, Canvas API for particle effects
- **Collaboration**: Simulated WebSocket-like real-time features
- **PWA**: Service worker with offline support and push notifications

## Key Features Implemented
1. **Core Functionality**
   - Doctor search with autocomplete
   - Multi-step report generation workflow
   - Product and location filtering
   - Favorites and recent searches

2. **Advanced UI/UX**
   - Dark/light theme toggle with persistence
   - Command palette (Cmd+K) with keyboard navigation
   - Keyboard shortcuts system
   - Sound effects with Web Audio API
   - Confetti celebrations
   - PDF export functionality
   - Voice input with speech recognition

3. **Collaboration & Real-time**
   - Live cursor tracking
   - User presence indicators
   - Selection highlighting
   - Simulated multi-user activity

4. **AI & Intelligence**
   - Natural language query processing
   - Intent recognition and entity extraction
   - Smart suggestions and autocomplete
   - Voice command processing

5. **3D Visualization**
   - Interactive relationship network graph
   - Force-directed layout with physics
   - Node highlighting and selection
   - Fullscreen mode with camera controls

6. **Progressive Web App**
   - Service worker for offline functionality
   - App manifest for installation
   - Background sync capabilities
   - Push notification support

7. **Integrations**
   - Webhook management system
   - Event tracking and delivery logs
   - Third-party API simulation

8. **Visual Effects**
   - Dynamic particle systems (stars, sparkles, hearts, bubbles, fireworks)
   - Canvas-based animations
   - Glassmorphism design patterns
   - Smooth transitions and micro-interactions

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── AIQueryBar.jsx           # Natural language query interface
│   ├── CollaborationOverlay.jsx # Real-time collaboration features
│   ├── CommandPalette.jsx       # Spotlight-style command interface
│   ├── Confetti.jsx            # Celebration animations
│   ├── ParticleEffects.jsx     # Dynamic particle systems
│   ├── PWAPrompt.jsx           # Progressive web app prompts
│   ├── RelationshipNetwork3D.jsx # 3D force graph visualization
│   ├── VoiceInput.jsx          # Speech recognition interface
│   └── WebhookManager.jsx      # Integration management
├── contexts/            # React context providers
│   └── ThemeContext.jsx        # Theme management
├── hooks/              # Custom React hooks
│   ├── useAIQuery.js           # AI query processing
│   ├── useCollaboration.js     # Real-time collaboration
│   ├── useFavorites.js         # Favorites management
│   ├── useKeyboardShortcuts.js # Keyboard navigation
│   ├── usePWA.js              # Progressive web app features
│   ├── useRecentSearches.js   # Search history
│   ├── useSoundEffects.js     # Audio feedback
│   └── useWebhooks.js         # Integration webhooks
├── styles/             # Design system
│   └── designTokens.js        # Color, spacing, animation tokens
└── App.jsx             # Main application component
```

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## Design Philosophy
- **Glassmorphism**: Translucent surfaces with backdrop blur effects
- **Micro-interactions**: Smooth animations and responsive feedback
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Optimized animations and lazy loading
- **Progressive Enhancement**: Works offline with service worker

## AI Integration Notes
- Natural language processing for search queries
- Intent recognition with confidence scoring
- Entity extraction for doctors, specialties, locations
- Voice command processing with Web Speech API
- Smart suggestions based on user behavior

## Collaboration Features
- Simulated real-time cursors and user presence
- Selection highlighting across form fields
- User avatars with color-coded identification
- Activity indicators and typing states

## Performance Considerations
- Canvas-based particle effects for smooth animations
- Efficient 3D rendering with Three.js optimization
- Lazy loading of heavy components
- Service worker caching for offline performance
- Debounced search inputs and API calls

## Browser Compatibility
- Modern browsers with ES6+ support
- WebGL for 3D visualizations
- Web Audio API for sound effects
- Service Worker for PWA features
- Speech Recognition API for voice input

## Future Enhancements
- Real WebSocket integration for live collaboration
- Machine learning models for better AI queries
- Advanced analytics and reporting
- Mobile-responsive design improvements
- Accessibility enhancements

## Notes for AI Agents
- This is a React-based SPA with modern web technologies
- Focus on Material-UI components and design patterns
- Maintain glassmorphism aesthetic throughout
- Preserve existing keyboard shortcuts and interactions
- Test all features in both light and dark modes
- Ensure PWA functionality works correctly
- Maintain performance with particle effects and 3D rendering
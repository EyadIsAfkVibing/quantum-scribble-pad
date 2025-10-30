# MathMind - Premium Student Dashboard

A stunning, interactive learning platform for math and programming with advanced WebGL-powered Aurora background.

## Project info

**URL**: https://lovable.dev/projects/4e87f866-f732-4f34-af2f-17ff438e63af

## ✨ Features

### 🌌 Aurora Background
- **WebGL-powered** animated background using OGL library
- **Event-driven**: Responds to UI interactions (button clicks, lesson opens)
- **Customizable**: Adjust intensity in Settings (Low/Medium/High)
- **Lazy-loaded**: Optimized for performance with React.Suspense

#### Triggering Aurora Effects
```javascript
// Pulse effect (temporary intensity increase)
document.dispatchEvent(
  new CustomEvent('aurora:pulse', { 
    detail: { amplitude: 1.5, duration: 600 } 
  })
);

// Set permanent values
document.dispatchEvent(
  new CustomEvent('aurora:set', { 
    detail: { amplitude: 1.2, blend: 0.6 } 
  })
);
```

### 🧮 Enhanced Math Solver
- **Linear Equations**: Solve for x (e.g., 3x + 5 = 14)
- **Quadratic Solver**: Complete with discriminant, roots, vertex, and step-by-step solution
- **Square Root**: Instant calculation with simplification steps
- **Quick Solve Widget**: Fast calculations right from home page

### 🎥 Draggable Video Player
- **YouTube embedding** with URL validation and extraction
- **Drag & resize** anywhere on screen using react-rnd
- **Position persistence** across page reloads (stored per lesson)
- Smooth animations and glow effects
- Thumbnail previews with click-to-play

### ⏱️ Study Timer
- Track study session duration
- Start/pause/reset controls
- Automatic time logging per lesson
- Persistent session data in localStorage

### 🏆 Progress Tracking
- **Study Streaks**: Daily learning habit tracking
- **Achievements**: Unlock badges for milestones
- **Quick Notes**: Floating button with autosave (accessible from any page)
- **History**: View all past math problems and code snippets

### 📚 Lesson Management
- Create and organize study materials
- Collapsible lesson cards (one open at a time)
- Rich text notes with autosave
- Multiple video embeds per lesson
- Time spent tracking

## 🎨 Design System

### Premium Load Animation
- Smooth splash screen on first load
- Staggered content reveal with Framer Motion
- Logo glow effect and shimmer

### Colors (HSL)
- Primary: `260 90% 65%` (Purple)
- Secondary: `180 95% 55%` (Cyan)
- Accent: `320 95% 65%` (Pink)
- Glassmorphism effects throughout

### Aurora Intensity Settings
- **Low**: amplitude 0.8, blend 0.4 (subtle)
- **Medium**: amplitude 1.0, blend 0.5 (default)
- **High**: amplitude 1.3, blend 0.7 (vibrant)

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4e87f866-f732-4f34-af2f-17ff438e63af) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- **OGL** - WebGL rendering for Aurora
- **Math.js** - Advanced mathematical computations
- **React-RND** - Drag and resize functionality
- **Framer Motion** - Smooth animations

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/4e87f866-f732-4f34-af2f-17ff438e63af) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 🎯 Usage Tips

1. **Aurora Background**: Reacts to all major UI interactions automatically
2. **Performance**: Adjust Aurora intensity in Settings if needed
3. **Video Player**: Videos save their position per lesson - drag and resize freely
4. **Math Solver**: Switch between Linear, Quadratic, and √ tabs for different problem types
5. **Quick Notes**: Access from any page via the floating button (bottom-right)
6. **Achievements**: Complete tasks to unlock badges automatically

## 📝 License
MIT

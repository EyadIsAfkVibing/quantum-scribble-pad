# MathMind - Premium Student Dashboard

Your stunning, interactive learning platform for math and programming with cutting-edge UI/UX.

## ✨ New Features

### 🔍 Universal Search (⌘K)
- **Smart Search**: Instantly search across lessons, notes, math problems, and code snippets
- **Live Preview**: Hover over results to see content previews
- **Keyboard Shortcut**: Press ⌘K (Mac) or Ctrl+K (Windows) to open
- **Filtered Results**: Type to see real-time filtered results with category badges

### 🎯 Smart Session Resume
- **Auto-Detection**: Automatically detects your last activity
- **One-Click Resume**: Jump right back to where you left off
- **Progress Tracking**: Visual progress bar showing session completion
- **Activity Types**: Resume lessons, math problems, or code snippets

### 📊 Live Progress Indicator
- **Navbar Widget**: Circular progress ring showing weekly activity
- **Hover Details**: See problem count and total lessons on hover
- **Visual Feedback**: Gradient ring fills based on weekly problem count
- **Goal Tracking**: Tracks up to 20 problems per week

### ⌨️ Keyboard Shortcuts
All shortcuts work globally (except when typing in inputs):

- **⌘/Ctrl + K** - Universal Search
- **⌘/Ctrl + H** - Go to Home
- **⌘/Ctrl + L** - Go to Lessons
- **⌘/Ctrl + E** - Go to Code Lab
- **⌘/Ctrl + I** - Go to History
- **N** - New Lesson (quick action)
- **S** - Focus Math Solver
- **?** - Show keyboard shortcuts help

### 🎨 Enhanced UI/Design
- **Inter Variable Font**: Premium typography with font features
- **Deep Charcoal Base**: Refined background (#0d0d12) with teal/purple accents
- **Fluid Theme Transitions**: Smooth 0.4s color interpolation on theme switch
- **Glassmorphism 2.0**: Enhanced translucent cards with inner glow
- **Micro-interactions**: Button ripples, hover effects, card transforms
- **Motion Typography**: Letter-by-letter heading animations (Home page)
- **Responsive Design**: Adaptive layouts for mobile, tablet, and desktop

### 🎵 Ambient Feedback System
- **Sound Effects**: Subtle click and success sounds (toggleable in settings)
- **Visual Pulses**: Aurora background responds to UI interactions
- **Accessibility**: Respects `prefers-reduced-motion` system setting
- **Performance**: Efficient Web Audio API implementation

### 🌌 Aurora Background (Enhanced)
- **Event-Driven**: Responds to all major UI interactions
- **Smooth Interpolation**: Gentle amplitude and blend transitions
- **Customizable Intensity**: Low/Medium/High settings in Settings
- **Lazy-Loaded**: Optimized performance with React.Suspense
- **Event API**:
  ```javascript
  // Pulse effect
  document.dispatchEvent(
    new CustomEvent('aurora:pulse', { 
      detail: { amplitude: 1.5, duration: 600 } 
    })
  );
  ```

### 📱 Responsive Features
- **Adaptive Navigation**: Compact on mobile, full labels on desktop
- **Touch Optimized**: Proper tap targets and gesture support
- **Flexible Search**: Full-width on mobile, centered on desktop
- **Smart Hiding**: Less important UI elements hide on small screens

## 🎨 Design System

### Colors (Updated)
- **Background**: Deep charcoal `#0d0d12` (220 25% 5%)
- **Primary Accent**: Cyan `#22d3ee` (190 95% 55%)
- **Secondary Accent**: Purple `#a855f7` (280 90% 65%)
- **Accent Highlight**: Pink `#f472b6` (320 95% 65%)

### Typography
- **Font Family**: Inter Variable with CV11, SS01 features
- **Headings**: 2.5rem (responsive: 1.5rem mobile)
- **Body**: 1rem with optimal line height
- **Text Color**: #e7e7f0 (light gray)

### Animations
- **Entry**: 0.6s fade with stagger
- **Hover Lift**: 0.2s transform
- **Theme Switch**: 0.4s ease-in-out color interpolation
- **Aurora Pulse**: 0.4-0.6s amplitude shift

## 🚀 Performance

- **Lazy Loading**: Aurora, search modal, and heavy components
- **Code Splitting**: Dynamic imports for route-based splitting
- **Accessibility**: Full keyboard navigation and ARIA labels
- **Motion Preferences**: Respects `prefers-reduced-motion`
- **Optimized Rendering**: Efficient state management and memoization

## 🎯 Usage Tips

1. **Quick Navigation**: Use keyboard shortcuts for instant page switching
2. **Fast Search**: Press ⌘K from anywhere to search
3. **Resume Sessions**: Home page automatically shows your last activity
4. **Track Progress**: Check the navbar indicator to see weekly progress
5. **Ambient Feedback**: Enable sound effects in Settings for audio cues
6. **Theme Switching**: Enjoy smooth color transitions between light/dark modes

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

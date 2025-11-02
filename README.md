# Quantum Pad 🚀

A futuristic, premium learning workspace for math, programming, and AI-powered study assistance with external backend integration.

![Quantum Pad](https://via.placeholder.com/1200x400/0d0d12/22d3ee?text=Quantum+Pad)

## ✨ Key Features

### 🤖 AI Assistant (Backend Integrated)
- **Ollama/LM Studio Integration**: Connect to your local AI backend
- **Real-Time Chat**: Get instant help with math and coding
- **Backend Health Monitoring**: Visual indicators for connection status
- **Fallback Mode**: Works offline with simulated responses
- **Markdown Support**: Beautiful formatted responses with code highlighting
- Step-by-step explanations for complex problems

### 🧮 Advanced Math Tools
- **Enhanced Math Solver**: Linear equations, quadratic equations, and square roots
- **Quick Solve**: Instant calculator for fast computations
- **Problem History**: Track, rerun, and delete solved problems
- Step-by-step solution breakdowns

### 💻 Code Lab with Python Support
- **Real Python Execution**: Client-side Python running via Pyodide
- **Multi-language Support**: Python, JavaScript, and C++
- **Live Output**: See console output in real-time
- Syntax highlighting and code saving

### 📝 Smart Notes with Markdown
- **Markdown Support**: Bold, italic, code blocks, headers, lists
- **Live Preview**: Toggle between edit and preview modes
- **Auto-save**: Saves after 1 second of inactivity
- Resizable and scrollable sidebar

### 📊 Study Dashboard
- **Smart Summary**: Daily stats, streak tracking, and progress metrics
- **Study Timer**: Track focused study time with start/pause/reset
- **Session Resume**: Pick up where you left off
- Achievement system

### 🎨 Theme & Customization
- **Dark/Light Modes**: Smooth transitions between themes
- **DarkVeil Shader**: Premium WebGL background effect
- **Custom Gradient Editor**: Design your own color schemes
- **Aurora Intensity**: Adjustable background effects
- Typography settings

### ⚡ Quick Actions
- Universal search across lessons, notes, and history
- Keyboard shortcuts (⌘K for search)
- Quick notes floating button
- Drag-and-drop video embeds for lessons

## 🚀 Getting Started

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup (For AI Features)

**See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed instructions.**

Quick start:

```bash
# 1. Install Ollama
curl https://ollama.ai/install.sh | sh

# 2. Pull AI model
ollama pull mistral

# 3. Start Ollama
ollama serve

# 4. In another terminal, start FastAPI backend
cd backend
python main.py
```

The AI Assistant will automatically connect to `http://localhost:8080` when available.

1. **Home Screen**: Access all tools and your dashboard
2. **Code Lab**: Write and execute Python/JavaScript code
3. **Lessons**: Create and manage study lessons with notes and videos
4. **History**: Review all solved problems and saved code
5. **Settings**: Customize theme, fonts, and visual effects

## 🎯 Navigation

- **Home** - Dashboard with all tools and AI assistant
- **Lessons** - Create and organize study lessons
- **Code** - Write and execute code
- **History** - View past problems and snippets
- **Settings** - Customize your experience

## 🔧 Tech Stack

### Frontend
- React 18 + TypeScript
- Vite for blazing-fast builds
- Framer Motion for smooth animations
- Pyodide for client-side Python execution
- WebGL shaders for premium visual effects
- React Markdown for rich text rendering
- Tailwind CSS + shadcn/ui components
- Local storage for data persistence

### Backend (Optional - for AI features)
- **FastAPI** - Python web framework
- **Ollama** - Local AI model serving
- **Uvicorn** - ASGI server
- **httpx** - Async HTTP client

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/chat` | POST | General AI chat |
| `/api/solve` | POST | Math problem solving |
| `/api/code-assist` | POST | Code debugging/explanation |

## 📱 Features

- Fully responsive design
- Glassmorphism UI with subtle glows
- Smooth page transitions
- Keyboard navigation
- Accessibility support
- Performance optimized

## 🎓 Use Cases

- Solving math problems with step-by-step guidance
- Learning programming concepts interactively
- Practicing code in Python, JavaScript, or C++
- Organizing study notes with Markdown
- Tracking study progress and streaks
- Getting AI help for homework

## 🔥 Tips

- Press **⌘K** to quickly search anything
- Use the **AI Assistant** for instant help
- Toggle **Markdown preview** in notes to see formatted text
- Try running **Python code** directly in the browser
- Customize colors with the **Gradient Editor**
- Track your progress in the **Smart Summary**

---

Built with ❤️ for learners who want a premium, futuristic study experience.

Your futuristic workspace for math and programming with advanced WebGL background effects.

## 🌌 DarkVeil Shader Background

The new **DarkVeil** WebGL shader creates a mesmerizing neural network-inspired background:
- **CPPN-based rendering**: Compositional pattern-producing network for organic visuals
- **Customizable parameters**: hueShift, noiseIntensity, warpAmount, scanlines
- **Lazy-loaded**: Performance-optimized with React.Suspense
- **Theme-responsive**: Parameters adjust when switching light/dark mode

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

### 📝 Quick Notes Panel
- **Floating Button**: Bottom-right corner for instant access
- **Auto-save**: Notes save automatically after 2 seconds
- **Persistent Storage**: Synced with localStorage
- **Fixed Input**: Typing now works correctly with proper pointer events

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

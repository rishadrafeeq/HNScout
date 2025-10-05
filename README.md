# HN Scout - A Simple Hacker News Reader

A clean and user-friendly Hacker News reader that helps you discover the best stories without any complicated features. Built with Next.js and designed to be simple enough for everyone to use.

## ✨ What Makes This Special

I wanted to create something that's actually useful for browsing Hacker News. Instead of just showing raw data, I built in smart features that help you find quality content quickly.

### Smart Quality Scoring
I created a simple algorithm that scores stories based on:
- **Points** (40%) - How much the community likes it
- **Comments** (30%) - How much discussion it generates  
- **Recency** (30%) - How fresh the content is

This gives you color-coded badges (Green = Excellent, Blue = Very Good, etc.) so you can instantly see what's worth reading.

### Easy Navigation
- **Sorting Options** in the navbar - Sort by points, comments, or time
- **Author Details** - Click any author name to see their profile and past posts
- **Reading List** - Save stories for later with one click
- **Responsive Design** - Works perfectly on mobile and desktop

## 🎨 Why I Designed It This Way

### Simple is Better
I looked at Lovable's design philosophy and focused on making something that doesn't overwhelm users. The interface is clean with lots of white space, making it easy to scan through stories.

### Mobile-First Thinking
Most people read news on their phones, so I made sure everything works great on mobile. Big buttons, easy scrolling, and touch-friendly interactions.

### Color Psychology
The quality score colors are intuitive - green means good, orange means okay, gray means skip it. No complicated legends or confusing symbols.

### Fast and Reliable
I added proper loading states and error handling so the app feels snappy even when things go wrong. Nobody likes a broken app.

## 🔧 Technical Choices

### Next.js
I chose Next.js because it makes the app load super fast. The pages are rendered on the server, so users see content immediately instead of waiting for JavaScript to load.

### TypeScript
TypeScript catches bugs before they happen and makes the code easier to understand. When you're building something with lots of data from APIs, this is really helpful.

### Tailwind CSS
Instead of writing custom CSS, I used Tailwind for consistent styling. It's like having a design system built-in, and the app looks professional without spending hours on styling.

### Simple Dependencies
- **Lucide React** for clean, consistent icons
- **date-fns** for formatting dates (much lighter than moment.js)
- That's it! No heavy frameworks or unnecessary complexity.

## 🚀 Extra Features I Added

### Reading List System
Save interesting stories to read later. It uses your browser's storage, so your list persists between visits. I added a whole page at `/reading-list` to manage your saved stories.

### Author Profiles
Click any author name to see their stats, bio, and browse their past submissions and comments. It's like having a mini profile page for each user without leaving the app.

### Smart Error Handling
When the Hacker News API is down or slow, the app shows helpful error messages instead of breaking. Users can retry or continue browsing other pages.

### Quality Score Algorithm
This wasn't required, but I think it's the most useful feature. Instead of just showing raw numbers, the app calculates a quality score that considers multiple factors. It helps surface the most interesting content.

## 🤖 How AI Helped Me Build This

I used **Claude Sonnet** as my coding assistant throughout the project. It helped me:

- **Plan the architecture** - Figuring out how to structure the components and data flow
- **Write the quality scoring algorithm** - We worked together on the math to make it fair and useful
- **Build responsive components** - Making sure everything works on mobile and desktop
- **Handle edge cases** - Adding proper error handling and loading states
- **Optimize performance** - Making sure the app loads fast and uses resources efficiently

I also used **Cursor IDE** for its AI-powered code completion and suggestions, which made development much faster.

The AI tools were like having a really smart pair programming partner. They helped me explore different approaches and catch bugs early, but all the design decisions and final code are mine.

## 🎯 The Result

This app does exactly what I wanted - it makes Hacker News more enjoyable to browse. The quality scoring helps you find the good stuff, the author profiles let you explore interesting people, and the reading list keeps track of what you want to read later.

Everything is designed to be simple and intuitive. No complicated menus or confusing features - just a clean, fast way to discover great content from the Hacker News community.

---

*Built with ❤️ for people who love great stories and smart discussions*
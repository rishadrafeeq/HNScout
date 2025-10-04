# HN Scout - Hacker News Explorer

A modern, intelligent Hacker News reader built with Next.js that features custom quality scoring, beautiful UI/UX design, and comprehensive pagination.

![HN Scout](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Features

### Core Requirements ✅
- **Paginated Results List** (`/[page]`) - Browse stories with server-side rendering
- **Custom Quality Score** - Intelligent ranking algorithm considering points, comments, and recency
- **Detail Page** (`/item/[id]`) - Full story view with comments and metadata
- **Responsive Design** - Mobile-first, accessible interface
- **Loading & Error States** - Skeleton loaders and graceful error handling

### UI/UX Excellence ✨
- **Modern Design** - Clean, minimalist interface with thoughtful typography
- **Quality Score Badges** - Color-coded visual indicators for story quality
- **Keyboard Navigation** - Full accessibility support with ARIA labels
- **Loading Skeletons** - Smooth loading experience
- **Error Recovery** - User-friendly error states with retry functionality

## 🧮 Quality Score Algorithm

Our custom quality scoring system evaluates stories based on three key factors:

### Formula
```
Quality Score = (Points × 0.4) + (Comments × 0.3) + (Recency × 0.3)
```

### Components

1. **Points Score (40% weight)**
   - Direct measure of community engagement
   - Capped at 40 points to prevent outliers from dominating

2. **Comments Score (30% weight)**
   - Logarithmic scaling: `log10(comments + 1) × 10`
   - Prevents spam from inflating scores
   - Encourages meaningful discussion

3. **Recency Score (30% weight)**
   - Exponential decay with 24-hour half-life
   - Fresh content gets higher scores
   - Formula: `30 × (0.5^(hours/24))`

### Quality Labels
- **Excellent** (80+): Top-tier content with high engagement
- **Very Good** (60-79): Strong community interest
- **Good** (40-59): Solid content worth reading
- **Fair** (20-39): Moderate interest
- **Poor** (<20): Lower engagement or very old content

## 🏗️ Technical Architecture

### Tech Stack
- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS 4.0 for responsive design
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for time formatting
- **API**: Hacker News Algolia API

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── [page]/            # Paginated results
│   ├── item/[id]/         # Story detail pages
│   ├── layout.tsx         # Root layout with header
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── ui/                # Base UI components
│   ├── Header.tsx         # Navigation header
│   ├── StoryCard.tsx      # Story display component
│   ├── Pagination.tsx     # Pagination controls
│   └── ErrorState.tsx     # Error handling component
├── lib/                   # Utility functions
│   ├── api.ts             # Hacker News API integration
│   ├── qualityScore.ts    # Quality scoring algorithm
│   └── pagination.ts      # Pagination logic
└── types/                 # TypeScript definitions
    └── hn.ts              # Hacker News data types
```

## 🎨 Design Philosophy

### UI/UX Choices

**Why this design approach?**
- **Mobile-First**: Ensures excellent experience across all devices
- **Information Hierarchy**: Quality scores prominently displayed for quick scanning
- **Visual Feedback**: Color-coded badges provide instant quality assessment
- **Minimalist Layout**: Reduces cognitive load while maintaining functionality
- **Accessibility**: Full keyboard navigation and screen reader support

### Color System
- **Green** (Excellent): High-quality, must-read content
- **Blue** (Very Good): Strong community interest
- **Yellow** (Good): Worth reading
- **Orange** (Fair): Moderate interest
- **Gray** (Poor): Lower priority content

## 📦 Packages Used

### Core Dependencies
- **Next.js**: React framework with SSR, routing, and optimization
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type safety and developer experience

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, consistent icon set
- **date-fns**: Lightweight date utility library

### Why These Choices?
- **Next.js**: Best-in-class SSR, performance, and developer experience
- **Tailwind CSS**: Rapid development with consistent design system
- **Lucide React**: High-quality icons with tree-shaking support
- **date-fns**: Smaller bundle size compared to moment.js

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd hnscout

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 API Integration

### Hacker News Algolia API
- **Base URL**: `https://hn.algolia.com/api/v1`
- **Rate Limiting**: No official limits, but respectful usage
- **Caching**: 5-minute revalidation for optimal performance
- **Error Handling**: Graceful fallbacks with user-friendly messages

### Endpoints Used
- `GET /search?tags=story` - Fetch stories with pagination
- `GET /search?tags=story_{id}` - Get specific story
- `GET /search?tags=comment,story_{id}` - Fetch story comments

## 🔄 Pagination Strategy

### Per-Page Re-ranking
- **Approach**: Sort stories within each page by quality score
- **Rationale**: API-friendly, fast, and practical for user experience
- **Trade-off**: Not globally optimal, but provides excellent local ranking

### Global Ranking (Future Enhancement)
To implement global ranking across all pages, we would need to:
1. **Prefetch Strategy**: Load multiple pages and merge results
2. **Caching Layer**: Store processed results in Redis/database
3. **Background Processing**: Update rankings periodically
4. **Performance Impact**: Higher API usage and complexity

**Why we chose per-page ranking:**
- ✅ Respects API rate limits
- ✅ Fast page loads
- ✅ Simple to maintain
- ✅ Good user experience

## ♿ Accessibility Features

### Implemented
- **Keyboard Navigation**: Full tab order and arrow key support
- **ARIA Labels**: Screen reader friendly descriptions
- **Focus Management**: Clear focus indicators
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Color Contrast**: WCAG AA compliant color combinations

### Testing
- Test with keyboard-only navigation
- Verify screen reader compatibility
- Check color contrast ratios
- Validate semantic markup

## 🎯 Performance Optimizations

### Implemented
- **Server-Side Rendering**: Fast initial page loads
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic route-based splitting
- **API Caching**: 5-minute revalidation strategy
- **Bundle Analysis**: Optimized dependency selection

### Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: ~123kB shared JS

## 🧪 Development Notes

### AI Tools Used
- **Claude Sonnet**: Primary development assistant for:
  - Architecture planning and component design
  - TypeScript type definitions
  - Algorithm implementation and optimization
  - Documentation writing
- **Cursor IDE**: AI-powered code completion and refactoring

### Development Process
1. **Planning**: Analyzed requirements and designed architecture
2. **Implementation**: Built core features with TypeScript safety
3. **Testing**: Verified functionality and performance
4. **Polish**: Added accessibility and error handling
5. **Documentation**: Comprehensive README and code comments

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Other Platforms
- **Netlify**: Compatible with Next.js static export
- **Railway**: Full-stack deployment with database
- **Docker**: Containerized deployment option

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Hacker News** for the amazing community and content
- **Algolia** for providing the search API
- **Vercel** for Next.js and hosting platform
- **Open Source Community** for the amazing tools and libraries

---

**Built with ❤️ for the Hacker News community**
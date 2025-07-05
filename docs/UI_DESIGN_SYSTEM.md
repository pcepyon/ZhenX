# UI Design System - 韩真选 (Hanzhengxuan)

## Overview

This document defines the comprehensive UI design system for the Hanzhengxuan medical tourism platform. It serves as the single source of truth for maintaining design consistency across all pages and components.

## Design Philosophy

### Core Principles
1. **Trust Through Transparency** - Clear information hierarchy and pricing
2. **Emotional Connection** - Empathetic messaging and warm interactions
3. **Cultural Sensitivity** - Bilingual support with Chinese-first approach
4. **Mobile Excellence** - Touch-optimized for WeChat browser usage
5. **Progressive Disclosure** - Information revealed at the right moment

## Color System

### Primary Palette
```css
/* Trust & Professional */
--color-emerald: #10b981;
--color-teal: #14b8a6;
--gradient-trust: linear-gradient(to right, #10b981, #14b8a6);

/* Warmth & Care */
--color-rose: #f43f5e;
--color-pink: #ec4899;
--gradient-warmth: linear-gradient(to right, #f43f5e, #ec4899);

/* Premium & Reliable */
--color-indigo: #6366f1;
--color-blue: #3b82f6;
--gradient-premium: linear-gradient(to right, #6366f1, #3b82f6);
```

### Neutral Palette
```css
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;
```

### Semantic Colors
```css
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;
```

## Typography

### Font Family
```css
font-family: 'Noto Sans SC', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Type Scale
```css
/* Display - Hero headlines */
--text-6xl: 3.75rem;  /* 60px */
--text-5xl: 3rem;     /* 48px */
--text-4xl: 2.25rem;  /* 36px */

/* Content - Body text */
--text-2xl: 1.5rem;   /* 24px */
--text-xl: 1.25rem;   /* 20px */
--text-lg: 1.125rem;  /* 18px */
--text-base: 1rem;    /* 16px */
--text-sm: 0.875rem;  /* 14px */
--text-xs: 0.75rem;   /* 12px */
```

### Font Weights
```css
--font-light: 300;   /* Headlines */
--font-normal: 400;  /* Body text */
--font-medium: 500;  /* Emphasis */
--font-semibold: 600; /* Strong emphasis */
--font-bold: 700;    /* CTAs */
```

### Text Colors Usage
- **Primary Text**: `text-gray-800` - Main content
- **Secondary Text**: `text-gray-600` - Supporting information
- **Muted Text**: `text-gray-500` - Less important details
- **Accent Text**: Theme-specific gradient colors

## Spacing System

```css
/* Base unit: 4px */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

## Component Patterns

### 1. Cards
```tsx
/* Glass Morphism Card */
<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
  {/* Content */}
</div>

/* Gradient Border Card */
<div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500">
  <div className="bg-white rounded-2xl p-6">
    {/* Content */}
  </div>
</div>
```

### 2. Buttons
```tsx
/* Primary Button */
<button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all">
  {/* Text */}
</button>

/* Secondary Button */
<button className="bg-white text-gray-700 px-6 py-3 rounded-full border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
  {/* Text */}
</button>

/* Pulse Animation Button */
<button className="relative">
  <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20" />
  <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full">
    {/* Text */}
  </div>
</button>
```

### 3. Badges
```tsx
/* Info Badge */
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
  {/* Text */}
</span>

/* Glass Badge */
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/80 backdrop-blur-sm text-gray-700 shadow-sm">
  {/* Text */}
</span>
```

### 4. Progress Indicators
```tsx
/* Linear Progress */
<div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
  <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300" style={{ width: '60%' }} />
</div>

/* Dot Progress */
<div className="flex items-center gap-3">
  {[...Array(5)].map((_, i) => (
    <div key={i} className={`h-1 transition-all duration-300 rounded-full ${
      i === activeIndex ? 'w-12 bg-gray-700' : 'w-8 bg-gray-300'
    }`} />
  ))}
</div>
```

## Animation Patterns

### 1. Entry Animations (Framer Motion)
```tsx
/* Fade In Up */
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  {/* Content */}
</motion.div>

/* Stagger Children */
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {children.map((child) => (
    <motion.div
      key={child.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {child}
    </motion.div>
  ))}
</motion.div>
```

### 2. Hover Interactions
```css
/* Scale on Hover */
.hover-scale {
  transition: transform 0.2s ease-out;
}
.hover-scale:hover {
  transform: scale(1.05);
}

/* Shadow Lift */
.hover-lift {
  transition: all 0.3s ease-out;
}
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
```

### 3. Loading States
```tsx
/* Skeleton Loader */
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
  <div className="h-4 bg-gray-200 rounded w-1/2" />
</div>

/* Spinner */
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
```

## Layout Patterns

### 1. Mobile-First Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

### 2. Sticky Navigation
```tsx
<nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
  {/* Navigation content */}
</nav>
```

### 3. Bottom Sheet (Mobile)
```tsx
<div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transform transition-transform">
  <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-6" />
  {/* Content */}
</div>
```

### 4. Hero Section Pattern
```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background with parallax */}
  <motion.div className="absolute inset-0 -z-10" {...parallaxAnimation}>
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50" />
  </motion.div>
  
  {/* Content */}
  <div className="relative z-10 text-center px-6 max-w-3xl">
    {/* Hero content */}
  </div>
</section>
```

## Interactive Elements

### 1. Real-time Counters
```tsx
<motion.span
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  key={count}
>
  {count.toLocaleString()}
</motion.span>
```

### 2. Toast Notifications
```tsx
<motion.div
  initial={{ opacity: 0, y: 50, scale: 0.3 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, scale: 0.5 }}
  className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4"
>
  {/* Notification content */}
</motion.div>
```

### 3. Tab Navigation
```tsx
<div className="flex gap-2 p-1 bg-gray-100 rounded-full">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      className={`px-4 py-2 rounded-full transition-all ${
        activeTab === tab.id
          ? 'bg-white shadow-sm text-gray-800'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {tab.label}
    </button>
  ))}
</div>
```

## Responsive Breakpoints

```css
/* Mobile First Approach */
--screen-sm: 640px;   /* Small devices */
--screen-md: 768px;   /* Tablets */
--screen-lg: 1024px;  /* Desktops */
--screen-xl: 1280px;  /* Large desktops */
--screen-2xl: 1536px; /* Extra large */

/* Primary breakpoint for design switch */
@media (min-width: 768px) {
  /* Desktop styles */
}
```

## Accessibility Guidelines

### 1. Touch Targets
- Minimum size: 48x48px
- Spacing between targets: 8px minimum

### 2. Color Contrast
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Use color + icon/pattern for important information

### 3. Focus States
```css
/* Visible focus indicator */
:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}
```

### 4. Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Implementation Guidelines

### 1. Component Composition
- Use compound components for complex UI
- Keep components focused and single-purpose
- Prefer composition over configuration

### 2. State Management
- Local state for UI interactions
- Zustand for global app state
- React Query for server state

### 3. Performance
- Lazy load heavy components
- Use React.memo for expensive renders
- Optimize images with next/image

### 4. Testing Approach
- Visual regression tests for UI components
- Interaction tests for user flows
- Accessibility audits for all pages

## Usage Examples

### Creating a New Page
```tsx
export default function NewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        {/* Nav content */}
      </nav>
      
      {/* Hero Section */}
      <section className="relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4"
        >
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 text-center mb-6">
            {/* Title */}
          </h1>
        </motion.div>
      </section>
      
      {/* Content Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cards */}
        </div>
      </section>
    </div>
  );
}
```

### Creating a Feature Card
```tsx
function FeatureCard({ icon, title, description, gradient }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative group"
    >
      {/* Gradient border */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity p-[1px]`}>
        <div className="bg-white rounded-2xl h-full" />
      </div>
      
      {/* Card content */}
      <div className="relative bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-shadow">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-medium text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
}
```

## Maintenance Notes

1. **Color Updates**: Update CSS variables in tailwind.config.js
2. **New Components**: Follow existing patterns and add to component library
3. **Animation Timing**: Keep consistent with existing durations
4. **Responsive Design**: Test on actual devices, especially WeChat browser
5. **Performance**: Monitor bundle size when adding new dependencies

This design system should be treated as a living document and updated as the product evolves.
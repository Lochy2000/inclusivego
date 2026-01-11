# InclusiveGO Architecture Documentation

This document provides a comprehensive overview of the InclusiveGO application architecture, code organization, and key technical decisions.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Architecture Patterns](#architecture-patterns)
- [State Management](#state-management)
- [Data Flow](#data-flow)
- [Component Organization](#component-organization)
- [Styling System](#styling-system)
- [API Design](#api-design)
- [Type System](#type-system)

---

## Overview

InclusiveGO is built as a modern Next.js application using the App Router, TypeScript, and React Server Components where appropriate. The architecture follows a **feature-based** organization pattern, where related components, hooks, types, and data are co-located within feature modules.

### Key Principles

1. **Separation of Concerns** - Clear boundaries between UI, logic, and data
2. **Modularity** - Self-contained features that can be developed independently
3. **Type Safety** - TypeScript throughout for compile-time error checking
4. **Scalability** - Structure that supports growth without major refactoring
5. **Developer Experience** - Clean imports, consistent patterns, easy navigation

---

## Technology Stack

### Core Framework
- **Next.js 15** - React framework with App Router
- **React 18** - UI library with concurrent features
- **TypeScript 5** - Static type checking

### Styling
- **Tailwind CSS 3** - Utility-first CSS framework
- **PostCSS** - CSS processing

### State Management
- **React Context API** - Global state management
- **React Hooks** - Local component state

### Icons & UI
- **Lucide React** - Icon library
- **Custom UI Components** - Shared component library

### Development Tools
- **ESLint** - Code linting
- **TypeScript Compiler** - Type checking

---

## Project Structure

```
inclusivego/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Root layout with providers
│   │   ├── page.tsx                 # Home page
│   │   ├── globals.css              # Global styles
│   │   └── api/                     # API routes
│   │       ├── routes/route.ts      # GET /api/routes
│   │       ├── search/route.ts      # POST /api/search
│   │       └── requirements/route.ts # GET /api/requirements
│   │
│   ├── features/                     # Feature modules
│   │   ├── navigation/
│   │   │   ├── components/
│   │   │   │   └── Navbar.tsx
│   │   │   └── index.ts             # Barrel export
│   │   │
│   │   ├── routes/
│   │   │   ├── components/          # UI components
│   │   │   │   ├── RouteCard.tsx
│   │   │   │   ├── RouteList.tsx
│   │   │   │   ├── MapArea.tsx
│   │   │   │   └── RouteInfoPanel.tsx
│   │   │   ├── context/             # State management
│   │   │   │   └── RouteContext.tsx
│   │   │   ├── hooks/               # Business logic
│   │   │   │   └── useRouteFilter.ts
│   │   │   ├── types/               # TypeScript types
│   │   │   │   └── route.types.ts
│   │   │   ├── data/                # Mock/seed data
│   │   │   │   └── mockRoutes.ts
│   │   │   └── index.ts             # Barrel export
│   │   │
│   │   ├── search/
│   │   │   ├── components/
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   └── SearchSidebar.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useSearch.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── requirements/
│   │   │   ├── components/
│   │   │   │   ├── RequirementButton.tsx
│   │   │   │   └── RequirementGrid.tsx
│   │   │   ├── context/
│   │   │   │   └── RequirementContext.tsx
│   │   │   ├── types/
│   │   │   │   └── requirement.types.ts
│   │   │   ├── data/
│   │   │   │   └── mockRequirements.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── settings/
│   │   │   ├── components/
│   │   │   │   ├── SettingsModal.tsx
│   │   │   │   ├── TextSizeControl.tsx
│   │   │   │   └── ContrastControl.tsx
│   │   │   ├── context/
│   │   │   │   └── AccessibilityContext.tsx
│   │   │   ├── types/
│   │   │   │   └── settings.types.ts
│   │   │   └── index.ts
│   │   │
│   │   └── layout/
│   │       ├── components/
│   │       │   └── Footer.tsx
│   │       └── index.ts
│   │
│   ├── components/                   # Shared components
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Modal.tsx
│   │       └── index.ts
│   │
│   ├── lib/                          # Utilities
│   │   ├── constants.ts             # App constants
│   │   ├── api/                     # API utilities (future)
│   │   └── utils/                   # Helper functions (future)
│   │
│   └── types/                        # Global types
│       └── index.ts
│
├── docs/                             # Documentation
│   ├── ARCHITECTURE.md
│   ├── ROADMAP.md
│   ├── CONTRIBUTING.md
│   └── API.md
│
├── public/                           # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

---

## Architecture Patterns

### Feature-Based Organization

Each feature is a self-contained module with:

```
feature-name/
├── components/     # UI components specific to this feature
├── context/        # State management (if needed)
├── hooks/          # Business logic hooks
├── types/          # TypeScript type definitions
├── data/           # Mock data or constants
└── index.ts        # Public API exports
```

**Benefits:**
- Easy to locate related code
- Clear feature boundaries
- Independent development
- Simple to delete unused features
- Scales well as app grows

### Barrel Exports

Each feature exports its public API through `index.ts`:

```typescript
// src/features/routes/index.ts
export { RouteCard } from './components/RouteCard';
export { RouteList } from './components/RouteList';
export { RouteProvider, useRoutes } from './context/RouteContext';
export * from './types/route.types';
```

**Usage:**
```typescript
import { RouteCard, RouteList, useRoutes } from '@/features/routes';
```

### Path Aliases

Configured in `tsconfig.json`:

```typescript
{
  "paths": {
    "@/*": ["./src/*"],
    "@/components/*": ["./src/components/*"],
    "@/features/*": ["./src/features/*"],
    "@/lib/*": ["./src/lib/*"],
    "@/types/*": ["./src/types/*"]
  }
}
```

**Benefits:**
- Clean imports
- Easy refactoring
- No `../../../` paths

---

## State Management

### Context Architecture

Three separate contexts manage different concerns:

#### 1. AccessibilityContext
**Location:** `src/features/settings/context/AccessibilityContext.tsx`

**Purpose:** User accessibility preferences

**State:**
```typescript
{
  fontSize: FontSize;           // 'text-base' | 'text-lg' | 'text-xl'
  contrastMode: ContrastMode;   // 'normal' | 'high'
  setFontSize: (size: FontSize) => void;
  setContrastMode: (mode: ContrastMode) => void;
}
```

**Used by:** Settings modal, root page layout

#### 2. RequirementContext
**Location:** `src/features/requirements/context/RequirementContext.tsx`

**Purpose:** Selected accessibility requirements

**State:**
```typescript
{
  activeRequirements: string[];  // ['wheelchair', 'visual', ...]
  toggleRequirement: (id: string) => void;
  setActiveRequirements: (ids: string[]) => void;
}
```

**Used by:** Requirement filters, route filtering

#### 3. RouteContext
**Location:** `src/features/routes/context/RouteContext.tsx`

**Purpose:** Available routes and selection

**State:**
```typescript
{
  routes: Route[];
  selectedRoute: Route | null;
  selectRoute: (routeId: number) => void;
  setRoutes: (routes: Route[]) => void;
}
```

**Used by:** Route list, map area, info panel

### Context Provider Hierarchy

Defined in `src/app/layout.tsx`:

```typescript
<AccessibilityProvider>
  <RequirementProvider>
    <RouteProvider>
      {children}
    </RouteProvider>
  </RequirementProvider>
</AccessibilityProvider>
```

**Rationale:**
- Accessibility settings are top-level (affect entire UI)
- Requirements are next (filter routes)
- Routes depend on requirements for filtering

---

## Data Flow

### Current Flow (Mock Data)

```
User Action
    ↓
Component Event Handler
    ↓
Context Update (setState)
    ↓
Context Consumers Re-render
    ↓
UI Updates
```

**Example: Selecting a Route**

1. User clicks RouteCard
2. `onClick={() => selectRoute(route.id)}`
3. RouteContext updates `selectedRoute`
4. RouteInfoPanel re-renders with new route
5. Map updates to show selected route

### Future Flow (API Integration)

```
User Action
    ↓
Component Event Handler
    ↓
API Call (fetch/axios)
    ↓
Loading State
    ↓
API Response
    ↓
Context Update
    ↓
UI Updates
```

---

## Component Organization

### Component Types

#### 1. Feature Components
**Location:** `src/features/*/components/`

Feature-specific UI components:
- `RouteCard` - Displays single route
- `SearchBar` - Search input
- `RequirementButton` - Accessibility filter button

**Characteristics:**
- Contain feature-specific logic
- May use feature context
- Not reusable across features

#### 2. Shared UI Components
**Location:** `src/components/ui/`

Reusable primitive components:
- `Badge` - Label/tag component
- `Button` - Styled button with variants
- `Modal` - Reusable modal wrapper

**Characteristics:**
- Generic and reusable
- Props-based configuration
- No feature-specific logic
- No context dependencies

#### 3. Layout Components
**Location:** `src/features/layout/components/`

Application shell components:
- `Footer` - App footer
- (Future: Header, Sidebar, etc.)

**Characteristics:**
- Define page structure
- Appear on all/most pages

### Component Patterns

#### Client vs Server Components

**Client Components** (`'use client'`):
- Use React hooks (useState, useContext, etc.)
- Event handlers
- Browser APIs

**Server Components** (default):
- No interactivity
- Can fetch data directly
- Better performance

**Current Usage:**
- Most components are client components (hooks, context)
- API routes are server-side
- Future optimization: Move static content to server components

---

## Styling System

### Tailwind CSS

**Approach:** Utility-first CSS

**Configuration:** `tailwind.config.ts`

```typescript
{
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FDFCF8',
      },
    },
  },
}
```

### Design System

**Color Palette:**
- Background: `#FDFCF8` (off-white)
- Primary: `#000000` (black)
- Accent: `#fde047` (yellow-300)
- Secondary: Slate grays

**Typography:**
- Font: System sans-serif stack
- Weights: Bold (700), Black (900)
- Transform: Uppercase for headings
- Style: Italic for emphasis

**Spacing:**
- Based on Tailwind's spacing scale
- Consistent padding/margins

**Borders:**
- Thickness: 2px or 4px
- Color: Black
- Style: Solid (neobrutalist)

**Shadows:**
- Hard shadows: `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
- No blur (neobrutalist principle)

### Responsive Design

**Breakpoints:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

**Strategy:**
- Mobile-first approach
- Sidebar collapses on mobile
- Grid adjusts for smaller screens

---

## API Design

### Current Structure (Placeholder)

#### GET /api/routes
Returns all routes

**Response:**
```typescript
{
  data: {
    routes: Route[];
    count: number;
  };
  success: boolean;
  error?: string;
}
```

#### POST /api/search
Search routes by query and requirements

**Request:**
```typescript
{
  query: string;
  activeRequirements: string[];
}
```

**Response:**
```typescript
{
  data: {
    routes: Route[];
    count: number;
  };
  success: boolean;
  error?: string;
}
```

#### GET /api/requirements
Returns all accessibility requirements

**Response:**
```typescript
{
  data: Requirement[];
  success: boolean;
  error?: string;
}
```

### Future API Design

See [API.md](./API.md) for detailed future API specifications.

**Planned endpoints:**
- Authentication: `/api/auth/*`
- User management: `/api/users/*`
- Route CRUD: `/api/routes`, `/api/routes/:id`
- Reviews: `/api/routes/:id/reviews`
- Favorites: `/api/users/:id/favorites`

---

## Type System

### Core Types

**Location:** `src/types/index.ts`

```typescript
// Route data structure
interface Route {
  id: number;
  origin: string;
  destination: string;
  duration: string;
  distance: string;
  type: string;
  icons: Array<React.ComponentType<{ size?: number }>>;
  score: number;
  features: string[];
  tags: string[];
  status: string;
  description: string;
}

// Accessibility requirement
interface Requirement {
  id: string;
  label: string;
  icon: React.ComponentType;
  color: string;
}

// User preferences
type FontSize = 'text-base' | 'text-lg' | 'text-xl';
type ContrastMode = 'normal' | 'high';
```

### Feature-Specific Types

**Location:** `src/features/*/types/*.types.ts`

```typescript
// Route component props
interface RouteCardProps {
  route: Route;
  active: boolean;
  onClick: () => void;
}

// Settings props
interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}
```

### Type Safety Benefits

- Compile-time error checking
- IDE autocomplete
- Refactoring safety
- Self-documenting code
- Reduced runtime errors

---

## Performance Considerations

### Current Optimizations

1. **React.useMemo** - Route filtering cached
2. **React.useCallback** - Stable function references
3. **Code organization** - Feature-based code splitting ready

### Future Optimizations

1. **Next.js Image** - Optimized images
2. **Dynamic imports** - Lazy load heavy components
3. **Route-based code splitting** - Automatic with App Router
4. **API response caching** - Redis for frequently accessed data
5. **Database indexing** - Fast query performance

---

## Security Considerations

### Current

- No authentication (public app)
- Mock data only (no sensitive info)
- ESLint for code quality

### Future

- Input validation on API routes
- SQL injection prevention (parameterized queries)
- XSS prevention (React escaping + CSP headers)
- CSRF protection (tokens)
- Rate limiting on API endpoints
- Secure authentication (NextAuth.js)
- HTTPS only in production

---

## Testing Strategy (Future)

### Unit Tests
- Component rendering
- Hook behavior
- Utility functions

### Integration Tests
- Feature workflows
- Context interactions
- API route responses

### E2E Tests
- Critical user flows
- Cross-browser testing
- Accessibility testing

**Tools (Planned):**
- Jest + React Testing Library
- Playwright for E2E
- axe-core for a11y testing

---

## Deployment Architecture (Future)

### Hosting
- **Vercel** (recommended) - Optimized for Next.js
- **Alternative:** AWS, Google Cloud, Azure

### Database
- **PostgreSQL** with PostGIS extension
- Hosted on: Supabase, Railway, or Neon

### CDN
- Vercel Edge Network
- CloudFlare for additional caching

### Monitoring
- Vercel Analytics
- Sentry for error tracking
- LogRocket for session replay

---

## Development Workflow

### Adding a New Feature

1. **Create feature folder** in `src/features/`
2. **Add component files** in `components/`
3. **Create types** in `types/`
4. **Add context** (if needed) in `context/`
5. **Create hooks** (if needed) in `hooks/`
6. **Export public API** in `index.ts`
7. **Import in app** from `@/features/feature-name`

### Adding a Shared Component

1. **Create component** in `src/components/ui/`
2. **Add to barrel export** in `src/components/ui/index.ts`
3. **Import** from `@/components/ui`

### Adding an API Route

1. **Create route file** in `src/app/api/*/route.ts`
2. **Export handler** (GET, POST, etc.)
3. **Add types** for request/response
4. **Document** in API.md

---

## Key Design Decisions

### Why Feature-Based Organization?
- Better than type-based (components/, hooks/) for scaling
- Co-location improves developer experience
- Easy to understand feature boundaries

### Why React Context over Redux/Zustand?
- Built-in, no extra dependencies
- Sufficient for current needs
- Easy to migrate later if needed

### Why Next.js App Router?
- Modern React patterns (Server Components)
- Built-in routing
- API routes in same project
- Excellent DX and performance

### Why TypeScript?
- Type safety reduces bugs
- Better IDE support
- Self-documenting code
- Industry standard

### Why Tailwind CSS?
- Rapid development
- Consistent design system
- Small bundle size
- Easy customization

---

## Questions & Contributions

For questions about the architecture or suggestions for improvements, please:
1. Open an issue on GitHub
2. See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines

---

**Last Updated:** January 2026
**Version:** 1.0

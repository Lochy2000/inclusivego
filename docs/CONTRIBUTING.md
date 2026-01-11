# Contributing to InclusiveGO

Thank you for your interest in contributing to InclusiveGO! We welcome contributions from everyone, whether it's bug reports, feature requests, documentation improvements, or code contributions.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. We pledge to:

- Be respectful and inclusive
- Welcome diverse perspectives
- Focus on what's best for the community
- Show empathy towards others
- Accept constructive criticism gracefully

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling or inflammatory comments
- Personal or political attacks
- Publishing others' private information
- Any conduct that would be considered inappropriate in a professional setting

**Enforcement:** Violations may result in temporary or permanent exclusion from the project.

---

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm 9.0 or higher
- Git
- A code editor (VS Code recommended)

### Useful Resources

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Understand the codebase structure
- [ROADMAP.md](./ROADMAP.md) - See planned features
- [API.md](./API.md) - API documentation

---

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/inclusivego.git
cd inclusivego
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 4. Create a Branch

```bash
# Create a new branch for your feature/fix
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding/updating tests
- `chore/` - Maintenance tasks

---

## How to Contribute

### Reporting Bugs

Before creating a bug report, please:
1. Check existing issues to avoid duplicates
2. Use the latest version to confirm the bug still exists

**Include in your bug report:**
- Clear, descriptive title
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)

**Template:**
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Node: [e.g., 18.17.0]
```

### Suggesting Features

Feature requests are welcome! Please:
1. Check the [ROADMAP.md](./ROADMAP.md) and existing issues first
2. Provide a clear use case
3. Explain why this feature would be useful

**Template:**
```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Any other context, mockups, or examples.
```

### Contributing Code

1. **Find an issue** - Look for issues labeled `good first issue` or `help wanted`
2. **Claim the issue** - Comment that you'd like to work on it
3. **Develop** - Follow coding standards and architecture
4. **Test** - Ensure your changes work as expected
5. **Submit PR** - Create a pull request for review

---

## Coding Standards

### TypeScript

- **Always use TypeScript** - No plain JavaScript files
- **Provide types** - Avoid `any`, use proper types or interfaces
- **Export types** - Export types from feature `types/` folders

**Example:**
```typescript
// ✅ Good
interface RouteProps {
  route: Route;
  active: boolean;
  onClick: () => void;
}

export function RouteCard({ route, active, onClick }: RouteProps) {
  // ...
}

// ❌ Bad
export function RouteCard(props: any) {
  // ...
}
```

### React Components

- **Functional components** - Use function components with hooks
- **Named exports** - Prefer named exports over default exports
- **Props interface** - Define props interface before component
- **Client components** - Add `'use client'` only when needed (hooks, events)

**Example:**
```typescript
'use client';

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={variants[variant]}>
      {children}
    </button>
  );
}
```

### File Organization

- **Feature-based** - Group related code in features
- **Barrel exports** - Export public API via `index.ts`
- **Component per file** - One component per file
- **Co-locate** - Keep types, components, and hooks near each other

**File structure:**
```
feature-name/
├── components/
│   ├── ComponentA.tsx
│   └── ComponentB.tsx
├── context/
│   └── FeatureContext.tsx
├── hooks/
│   └── useFeature.ts
├── types/
│   └── feature.types.ts
└── index.ts
```

### Styling

- **Tailwind classes** - Use Tailwind utility classes
- **No inline styles** - Avoid style prop except for dynamic values
- **Consistent spacing** - Use Tailwind spacing scale
- **Neobrutalist design** - Follow existing design patterns

**Example:**
```typescript
// ✅ Good
<div className="border-4 border-black bg-white p-4">
  {content}
</div>

// ❌ Bad
<div style={{ border: '4px solid black', backgroundColor: 'white', padding: '16px' }}>
  {content}
</div>
```

### Naming Conventions

- **Components** - PascalCase: `RouteCard`, `SearchBar`
- **Files** - Match component name: `RouteCard.tsx`
- **Hooks** - camelCase with `use` prefix: `useRouteFilter`
- **Types** - PascalCase with descriptive names: `RouteCardProps`
- **Constants** - UPPER_SNAKE_CASE: `DEFAULT_FONT_SIZE`
- **Functions** - camelCase: `selectRoute`, `toggleRequirement`

### Code Quality

- **No console.log** - Remove debug statements before committing
- **Handle errors** - Add try/catch where appropriate
- **Add comments** - Explain complex logic, not obvious code
- **Keep it simple** - Prefer readability over cleverness
- **DRY principle** - Don't repeat yourself

**Example:**
```typescript
// ✅ Good - Clear, commented complex logic
// Filter routes by search query and accessibility requirements
// Requirements filter is placeholder for future implementation
export function useRouteFilter(routes: Route[], query: string, requirements: string[]) {
  return useMemo(() => {
    let filtered = routes;

    if (query.trim()) {
      const searchQuery = query.toLowerCase();
      filtered = filtered.filter(route =>
        route.origin.toLowerCase().includes(searchQuery) ||
        route.destination.toLowerCase().includes(searchQuery)
      );
    }

    // TODO: Implement requirement-based filtering
    return filtered;
  }, [routes, query, requirements]);
}
```

---

## Commit Guidelines

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, no logic change)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks, dependencies

### Examples

```bash
feat(routes): add route sorting by accessibility score

fix(search): resolve issue with empty search query

docs(readme): update installation instructions

refactor(context): simplify route context logic

chore(deps): update Next.js to v15.1.0
```

### Commit Best Practices

- **Atomic commits** - One logical change per commit
- **Clear messages** - Explain what and why, not how
- **Present tense** - "Add feature" not "Added feature"
- **Reference issues** - Include issue number if applicable

---

## Pull Request Process

### Before Submitting

1. **Update your branch** - Rebase on latest main
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run checks**
   ```bash
   npm run lint        # ESLint
   npm run type-check  # TypeScript
   npm run build       # Production build
   ```

3. **Test thoroughly** - Verify your changes work

4. **Update documentation** - If needed

### PR Description Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issue
Closes #123

## Changes Made
- List of changes
- Another change

## Screenshots (if applicable)
[Add screenshots here]

## Testing
- [ ] Tested locally
- [ ] Checked responsive design
- [ ] Verified accessibility

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No warnings or errors
- [ ] Tested changes thoroughly
```

### Review Process

1. **Automated checks** - Must pass before review
2. **Code review** - Maintainer reviews code
3. **Feedback** - Address review comments
4. **Approval** - PR approved by maintainer
5. **Merge** - Maintainer merges PR

### After Merge

- Your contribution will be acknowledged
- You'll be added to contributors list
- Thank you for contributing! 🎉

---

## Testing

### Current Testing (Future Implementation)

While we don't have tests yet, when contributing, please manually test:

1. **Visual testing** - Check UI looks correct
2. **Functionality** - Verify features work as expected
3. **Responsive design** - Test different screen sizes
4. **Accessibility** - Keyboard navigation, screen reader
5. **Cross-browser** - Test in Chrome, Firefox, Safari

### Future Testing Requirements

Once testing is implemented, PRs will need:
- Unit tests for new functions/hooks
- Component tests for new UI components
- Integration tests for new features
- Accessibility tests passing

---

## Documentation

### When to Update Docs

- **New features** - Add to ROADMAP.md
- **API changes** - Update API.md
- **Architecture changes** - Update ARCHITECTURE.md
- **Setup changes** - Update README.md
- **Contributing process** - Update CONTRIBUTING.md

### Documentation Standards

- **Clear and concise** - Easy to understand
- **Examples** - Include code examples
- **Up to date** - Keep in sync with code
- **Well organized** - Use headings and tables of contents

---

## Project Structure Guide

### Adding a New Feature

1. **Create feature folder** in `src/features/`
2. **Follow structure:**
   ```
   my-feature/
   ├── components/
   │   └── MyComponent.tsx
   ├── context/           # If needed
   │   └── MyContext.tsx
   ├── hooks/             # If needed
   │   └── useMyHook.ts
   ├── types/
   │   └── my-feature.types.ts
   └── index.ts           # Barrel export
   ```
3. **Export from index.ts:**
   ```typescript
   export { MyComponent } from './components/MyComponent';
   export { MyProvider, useMyContext } from './context/MyContext';
   export * from './types/my-feature.types';
   ```

### Adding a Shared Component

1. **Create in `src/components/ui/`**
2. **Add to barrel export** in `index.ts`
3. **Make it generic** - No feature-specific logic

### Adding an API Route

1. **Create route file** in `src/app/api/`
2. **Follow pattern:**
   ```typescript
   import { NextResponse } from 'next/server';

   export async function GET() {
     try {
       // Logic here
       return NextResponse.json({ data, success: true });
     } catch (error) {
       return NextResponse.json(
         { data: null, success: false, error: 'Error message' },
         { status: 500 }
       );
     }
   }
   ```
3. **Document in API.md**

---

## Getting Help

### Stuck? Need Help?

- **GitHub Discussions** - Ask questions
- **GitHub Issues** - Report bugs or request features
- **Code comments** - Ask in PR comments

### Finding Good First Issues

Look for issues labeled:
- `good first issue` - Beginner-friendly
- `help wanted` - Community contributions welcome
- `documentation` - Docs improvements

---

## Recognition

Contributors will be:
- Added to the contributors list
- Credited in release notes
- Acknowledged in the README

Thank you for making InclusiveGO better! 🙌

---

**Last Updated:** January 2026
**Version:** 1.0

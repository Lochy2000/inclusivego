
<img width="74" height="74" alt="image" src="https://github.com/user-attachments/assets/75c08d6c-34e7-4ee1-9531-88ac80ab57b9" />
# InclusiveGO

> Mapping a world without barriers - An accessible route finder application

InclusiveGO is a web application designed to help users with accessibility needs find the most suitable routes for their journeys. The app provides detailed accessibility information, community-verified routes, and real-time status updates to ensure safe and comfortable travel for everyone.

## Features

- **Accessible Route Finding** - Search and discover routes optimized for various accessibility needs
- **Community Verification** - Routes verified by real users with accessibility requirements
- **Multiple Accessibility Filters** - Filter by wheelchair access, visual aids, hearing support, and sensory-friendly options
- **Real-Time Status Updates** - Live information on route conditions and delays
- **Accessibility Score** - Each route rated for accessibility compliance
- **Interactive Map** - Visual route preview with accessibility markers
- **Customizable Interface** - Adjustable text size and contrast modes for better readability

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/inclusivego.git
cd inclusivego
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## Project Structure

```
inclusivego/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Home page
│   │   └── api/               # API routes
│   ├── features/              # Feature-based modules
│   │   ├── navigation/        # Navigation components
│   │   ├── routes/            # Route management
│   │   ├── search/            # Search functionality
│   │   ├── requirements/      # Accessibility filters
│   │   ├── settings/          # User preferences
│   │   └── layout/            # Layout components
│   ├── components/ui/         # Shared UI components
│   ├── lib/                   # Utilities and constants
│   └── types/                 # TypeScript type definitions
├── docs/                      # Documentation
└── public/                    # Static assets
```

For detailed architecture documentation, see [ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## Current Status

**Version**: 0.1.0 (MVP)

This is the initial modular version of InclusiveGO. The application currently features:
- ✅ Single-page route finder interface
- ✅ Mock data for 3 sample routes
- ✅ Accessibility requirement filters (4 types)
- ✅ Settings modal (font size, contrast mode)
- ✅ Responsive design
- ✅ API route structure (placeholder endpoints)

See [ROADMAP.md](./docs/ROADMAP.md) for planned features and development timeline.

## Design Philosophy

InclusiveGO uses a **neobrutalist design** approach featuring:
- Bold black borders (border-4)
- High contrast color scheme
- Yellow accent color (#fde047)
- Uppercase, bold typography
- Strong shadows and clear visual hierarchy
- Maximum readability and accessibility

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

## License

[MIT License](./LICENSE)

## Acknowledgments

- Design inspired by neobrutalist web design principles
- Icons provided by [Lucide](https://lucide.dev/)
- Built with [Next.js](https://nextjs.org/)

## Contact

For questions or feedback, please open an issue on GitHub.

---

**Made with ❤️ for an accessible world**

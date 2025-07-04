# ZhenX (韩真选) - Medical Tourism Service

A medical tourism package curation service for Chinese visitors to Korea, simplifying complex medical beauty treatment selection into a 3-step wizard.

## 🌟 Features

- **Anonymous Sessions** - No signup required, 24-hour session-based experience
- **3-Step Wizard** - Simple selection process: Categories → Concerns → Preferences
- **AI Recommendations** - Get 2-3 personalized package recommendations
- **Web Quotes** - Generate and share quotes with unique URLs
- **Mobile First** - Optimized for WeChat browser and mobile devices
- **Bilingual Support** - Korean and Chinese language support

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS v4
- **State Management**: Zustand + React Query
- **Backend**: Supabase (PostgreSQL)
- **Styling**: CSS Variables, Google Fonts (Noto Sans KR/SC)
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/pcepyon/ZhenX.git
cd ZhenX
```

2. Install dependencies
```bash
cd hanzhengxuan
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Run the development server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
hanzhengxuan/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── wizard/            # 3-step wizard pages
│   ├── recommendations/   # Results page
│   ├── quote/            # Quote generation and viewing
│   └── api/v1/           # API routes
├── components/           # React components
│   ├── ui/              # Base UI library
│   ├── landing/         # Landing page components
│   ├── wizard/          # Wizard step components
│   └── package/         # Package display components
├── hooks/               # Custom React hooks
│   └── api/            # React Query API hooks
├── lib/                # Utility functions
│   ├── api/           # API client
│   └── supabase/      # Database client
└── store/             # Zustand state management
```

## 🔄 User Flow

1. **Landing Page** - Anonymous session created automatically
2. **Wizard Step 1** - Select up to 3 treatment categories
3. **Wizard Step 2** - Choose specific concerns (single selection)
4. **Wizard Step 3** - Input personal preferences (age, budget, urgency)
5. **AI Processing** - Personalized recommendations generated
6. **Results Page** - View 2-3 recommended packages
7. **Package Details** - Explore treatments and pricing
8. **Quote Generation** - Create shareable quotes
9. **Share** - Share via WeChat, KakaoTalk, or QR code

## 📊 Database Schema

Key tables:
- `categories` - Treatment categories (6 active)
- `concerns` - Specific concerns per category (30 total)
- `packages` - Curated treatment packages (10 active)
- `user_sessions` - Anonymous sessions (24hr expiry)
- `quotes` - Generated quotes (7 day validity)

## 🌐 API Endpoints

### Session Management
- `POST /api/v1/sessions` - Create anonymous session
- `GET /api/v1/sessions` - Get current session info

### Catalog APIs
- `GET /api/v1/categories` - Get treatment categories
- `GET /api/v1/packages` - Get packages with filters
- `GET /api/v1/packages/[id]` - Get package details

### User Flow APIs
- `POST /api/v1/sessions/[id]/inputs` - Save wizard selections
- `POST /api/v1/sessions/[id]/recommendations` - Generate recommendations
- `POST /api/v1/sessions/[id]/quotes` - Create quote

## 💰 Pricing

- Fixed exchange rate: 1 CNY = 190 KRW
- Automatic 10% package discount applied
- Three price tiers: Basic, Premium, Luxury

## 🧪 Development

```bash
# Run linter
pnpm lint

# Build for production
pnpm build

# Test components
pnpm dev
# Visit /test/components
```

## 📱 Mobile Optimization

- Designed for 420px max-width screens
- Touch-optimized with 48px minimum target sizes
- WeChat browser compatibility
- Fast loading and smooth animations

## 🔐 Security

- Anonymous sessions with httpOnly cookies
- 24-hour session expiry
- Secure API routes with validation
- No personal data storage without consent

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

Please contact the project maintainers for contribution guidelines.

## 📞 Contact

For inquiries about this project, please open an issue on GitHub.
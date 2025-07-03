# CLAUDE.md

## Project Overview
**Hanzhengxuan (韩真选)** - A medical tourism package curation service for Chinese visitors to Korea. Simplifies complex medical beauty treatment selection into a 3-step wizard that recommends 2-3 curated packages.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS v4
- **State**: Zustand + React Query
- **Backend**: Supabase (PostgreSQL)
- **Styling**: CSS Variables, Google Fonts (Noto Sans KR/SC)
- **Deployment**: Vercel

## Key Features
1. **Anonymous Sessions** - No signup required, 24-hour session-based
2. **3-Step Wizard** - Categories → Concerns → Preferences
3. **AI Recommendations** - 2-3 packages based on user input
4. **Web Quotes** - Shareable quote pages with unique URLs
5. **Mobile First** - Optimized for WeChat browser

## Project Structure
```
/app
  page.tsx              # Landing page
  /wizard              
    /step[1-3]         # 3-step wizard pages
  /loading             # AI recommendation loading
  /recommendations     # Results page
  /interests           # Wishlist management
  /quote
    /create            # Quote generation form
    /success           # Success with sharing
    /[quoteId]         # Web quote page
  /api/v1              # API routes
  /test                # Development test pages
/components
  /ui                  # Base UI library
  /landing             # Landing page components
  /wizard              # Wizard step components
  /package             # Package display components
  /treatment           # Treatment detail components
  /interest            # Wishlist components
  /quote               # Quote related components
/hooks
  /api                 # React Query hooks
  usePackageDetail.ts  # Package detail logic
  useTreatmentDetail.ts # Treatment detail logic
  useCreateQuote.ts    # Quote generation
/lib
  /api/client.ts       # API fetch wrapper
  /supabase            # DB client & types
  /share.ts            # Share utilities
  queryClient.ts       # React Query config
/store
  useAppStore.ts       # Zustand global state
  types.ts             # TypeScript interfaces
```

## Development Commands
```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm lint         # Run linter
```

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

## Core User Flow
Landing → Wizard (3 steps) → Loading → Recommendations → Package Details → Quote Generation → Share

## API Endpoints

### Session Management
- `POST /api/v1/sessions` - Create anonymous session
- `GET /api/v1/sessions` - Get current session info

### Catalog APIs
- `GET /api/v1/categories` - Get treatment categories
- `GET /api/v1/packages` - Get packages (filters: category, price_tier)
- `GET /api/v1/packages/[id]` - Get package details

### User Flow APIs
- `POST /api/v1/sessions/[id]/inputs` - Save wizard step input
- `GET /api/v1/sessions/[id]/inputs` - Get saved inputs
- `POST /api/v1/sessions/[id]/recommendations` - Generate recommendations
- `GET /api/v1/sessions/[id]/recommendations` - Get saved recommendations

### Quote APIs
- `POST /api/v1/sessions/[id]/quotes` - Create quote
- `GET /api/v1/sessions/[id]/quotes` - Get session quotes
- `GET /api/v1/quotes/[id]` - View quote details
- `DELETE /api/v1/quotes/[id]` - Expire quote

## Database Tables
- `categories` - Treatment categories (6 active)
- `concerns` - Specific concerns per category (30 total)
- `packages` - Curated packages (10 active)
- `package_concerns` - Package-concern mappings
- `user_sessions` - Anonymous sessions (24hr expiry)
- `user_inputs` - Wizard step selections
- `package_recommendations` - Generated recommendations
- `quotes` - Generated quotes (7 day expiry)

## Important Notes
- Mobile-first design (max-width: 420px)
- Chinese language support required
- Price in KRW with CNY reference (1 CNY = 190 KRW)
- 10% package discount applied automatically
- Session cookies are httpOnly with 24hr expiry
- Quotes valid for 7 days with unique ID format: Q + YYMMDD + 4 digits
- Recommendation algorithm: 30% category, 50% concerns, 20% preferences
- Price tier diversity ensured in recommendations

## Completed Features

### Backend (API)
✅ Session management with cookies
✅ Category/package catalog APIs
✅ Wizard input collection
✅ Recommendation algorithm
✅ Quote generation system
✅ Dual currency (KRW/CNY)

### Frontend Pages
✅ Landing page with session creation
✅ 3-step wizard (categories → concerns → preferences)
✅ AI recommendation loading animation
✅ Package recommendation results with filtering
✅ Package detail modal with treatment info
✅ Interest/wishlist management
✅ Quote generation with optional info
✅ Quote success page with sharing
✅ Web quote page with QR code

### UI Components
✅ Base component library (Button, Card, Modal, BottomSheet, etc.)
✅ Wizard components (CategoryCard, ConcernItem, PersonalFactorItem)
✅ Package components (PackageCard, PriceBreakdown, TreatmentTimeline)
✅ Treatment detail bottom sheet
✅ Interest management components
✅ Quote generation forms
✅ Success animations with confetti
✅ Share functionality (WeChat, KakaoTalk, QR)

## Test Pages
- `/test/components` - UI component showcase
- `/test/store-test` - Zustand state testing
- `/test/api-test` - React Query API testing

## Key Implementation Details

### State Management (Zustand)
- Session ID & interested packages persisted to localStorage
- Category selection limited to 3
- Wizard data reset without affecting session
- Interest/wishlist management with add/remove/clear actions

### API Integration (React Query)
- Automatic retries (queries: 1, mutations: 0)
- Stale time: 5min default, 1hr for categories
- Error handling with ApiError class
- TypeScript types for all responses
- Custom hooks for all API operations

### UI/UX Features
- Mobile-first responsive design (max-width: 420px)
- Bilingual support (Korean/Chinese)
- Touch-optimized interactions (min 48px targets)
- Loading states and animations
- Share functionality (clipboard, WeChat, KakaoTalk)
- QR code generation for quotes
- Print-friendly quote layout

### Business Logic
- Anonymous session-based usage (24hr expiry)
- AI recommendation algorithm (category 30%, concerns 50%, preferences 20%)
- Automatic 10% package discount
- Fixed exchange rate (1 CNY = 190 KRW)
- Quote validity period (7 days)

## Testing
```bash
# Create session
curl -X POST http://localhost:3000/api/v1/sessions

# Get categories
curl http://localhost:3000/api/v1/categories

# Save wizard inputs
curl -X POST http://localhost:3000/api/v1/sessions/[SESSION_ID]/inputs \
  -H "Content-Type: application/json" \
  -d '{"step_number": 1, "selected_concerns": ["elasticity"]}'

# Get recommendations
curl -X POST http://localhost:3000/api/v1/sessions/[SESSION_ID]/recommendations

# Create quote
curl -X POST http://localhost:3000/api/v1/sessions/[SESSION_ID]/quotes \
  -H "Content-Type: application/json" \
  -d '{"selected_packages": ["ELASTICITY_BASIC"]}'
```
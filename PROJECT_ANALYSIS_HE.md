# ניתוח טכני של הפרויקט - Gaming Recommendation App

## סקירה כללית

זהו אפליקציית Next.js להמלצות משחקים מבוססת AI, המשתמשת בפרופיל Steam של המשתמש כדי ליצור המלצות מותאמות אישית. האפליקציה משלבת מספר שירותי API חיצוניים ומשתמשת ב-AI Agent כדי לנתח העדפות משתמש ולהציע משחקים חדשים.

---

## 🛠️ טכנולוגיות ותוכנות

### Frontend Framework & Core
- **Next.js 16.0.5** - React framework עם App Router
  - Server Components ו-Server Actions
  - API Routes לניהול בקשות
  - Image optimization מובנה
- **React 19.2.0** - ספריית UI מודרנית
- **TypeScript 5** - Type safety ו-better developer experience

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.23.24** - אנימציות וטרנזישנים
- **Lucide React** - אייקונים מודרניים
- **clsx & tailwind-merge** - ניהול classes דינמיים

### Backend & APIs
- **Supabase** - PostgreSQL database + Authentication
  - Row Level Security (RLS) לאבטחה
  - Service Role Key לפעולות server-side
- **Steam API** - גישה לפרופיל משתמש ומשחקים
- **RAWG API** - מידע מפורט על משחקים (ratings, genres, tags)
- **OpenAI Agents SDK** - AI Agent להמלצות חכמות

### State Management & Data Fetching
- **SWR 2.3.8** - Data fetching עם caching ו-revalidation
- **React Context API** - ניהול state מקומי (ReviewModalContext)

### Authentication & Security
- **JWT (jsonwebtoken)** - ניהול sessions
- **Steam OpenID** - OAuth authentication
- **HTTP-only cookies** - אבטחת session tokens

### Testing
- **Jest 29.7.0** - Testing framework
- **React Testing Library** - Component testing
- **Jest DOM** - Matchers נוספים ל-DOM testing

### Build Tools & Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Axios** - HTTP client
- **Zod** - Schema validation

---

## 🏗️ ארכיטקטורת הקוד

### מבנה התיקיות

```
gaming-app-1/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (Server-side)
│   ├── dashboard/         # Dashboard page
│   ├── login/             # Login page
│   ├── recommendations/   # Recommendations page
│   └── layout.tsx         # Root layout
│
├── components/            # React Components
│   ├── Recommendations/   # Recommendation UI components
│   ├── Dashboard/         # Dashboard components
│   ├── LoginCard/         # Login UI
│   └── ...                # Other UI components
│
├── lib/                   # Business Logic & Utilities
│   ├── agents/            # AI Agent logic
│   ├── supabase.ts        # Database client
│   ├── session.ts         # Session management
│   ├── steam-api.ts       # Steam API integration
│   └── rawg-api.ts        # RAWG API integration
│
├── types/                 # TypeScript type definitions
├── supabase/migrations/   # Database migrations
└── __tests__/             # Test files
```

---

## 🔄 זרימת הנתונים (Data Flow)

### 1. Authentication Flow
```
User → Login Page → Steam OAuth → Callback Route → 
Create Session (JWT) → Store in HTTP-only Cookie → Redirect to Dashboard
```

### 2. Recommendation Generation Flow
```
User Request → API Route (/api/recommendations/ai-search) →
  ├─ Get Session (verify JWT)
  ├─ Fetch User Profile (Steam API)
  ├─ Fetch User Reviews (Supabase)
  ├─ Analyze Preferences (AI Agent)
  └─ Generate Recommendations (OpenAI Agent) →
     Return JSON Response → Display in UI
```

### 3. Data Enrichment Flow
```
Steam Game List → RAWG API Search → Match Games → 
Enrich with Ratings/Genres/Tags → Return Enriched Data
```

---

## 🧩 רכיבים מרכזיים

### 1. Session Management (`lib/session.ts`)
- **JWT-based authentication**
- **HTTP-only cookies** למניעת XSS attacks
- **7-day expiration**
- פונקציות: `getSession()`, `setSessionCookie()`, `clearSessionCookie()`

### 2. AI Recommendation Agent (`lib/agents/recommendation-agent.ts`)
- **OpenAI Agents SDK** עם GPT-4o
- **Tools**:
  - `getUserGamingProfile` - שליפת פרופיל Steam
  - `getUserOwnedGameNames` - רשימת משחקים בבעלות המשתמש
- **System Prompt** מפורט עם הנחיות להמלצות
- **Review Analysis** - ניתוח ביקורות משתמש להבנת העדפות

### 3. Steam API Integration (`lib/steam-api.ts`)
- **GetPlayerSummary** - פרטי משתמש (שם, avatar)
- **GetOwnedGames** - רשימת כל המשחקים בבעלות
- **GetRecentlyPlayedGames** - משחקים אחרונים
- **Error handling** ו-timeout management

### 4. RAWG API Integration (`lib/rawg-api.ts`)
- **SearchGameByName** - חיפוש משחק לפי שם
- **GetGameDetails** - פרטים מפורטים על משחק
- **EnrichGamesWithRAWG** - העשרת רשימת משחקים עם מידע
- **Rate limiting** - delay בין בקשות
- **Match confidence** - הערכת התאמה בין Steam ל-RAWG

### 5. Database Schema (Supabase)
```sql
-- Users Table
users (
  steam_id (PK),
  username,
  avatar,
  profile_url,
  created_at,
  last_login
)

-- Reviews Table
reviews (
  id (PK),
  steam_id (FK → users),
  game_id,
  game_title,
  reaction ('like' | 'dislike'),
  reasons (TEXT[]),
  details_text,
  created_at
)
```

---

## 🎨 ארכיטקטורת UI Components

### Separation of Concerns
הפרויקט משתמש ב-**View/Presenter Pattern**:
- **Component.tsx** - לוגיקה ו-state management
- **ComponentView.tsx** - UI rendering בלבד

דוגמה:
- `RecommendationsView.tsx` - מציג UI
- `Recommendations.tsx` - מטפל ב-logic (אם קיים)

### Component Structure
```
components/
├── Recommendations/
│   ├── RecommendationsView.tsx    # Main view
│   ├── RecommendationCard.tsx     # Individual game card
│   ├── FilterPanel.tsx            # Filter UI
│   ├── GameDetailModal.tsx        # Game details modal
│   └── ReviewModalContext.tsx     # Context for review modals
```

---

## 🔐 אבטחה

### 1. Authentication
- **JWT tokens** עם secret key
- **HTTP-only cookies** - לא נגישים מ-JavaScript
- **Secure flag** ב-production
- **SameSite: lax** למניעת CSRF

### 2. Database Security
- **Row Level Security (RLS)** מופעל ב-Supabase
- **Service Role Key** רק ב-server-side
- **Anon Key** ל-client-side (read-only operations)

### 3. API Security
- **Session verification** בכל API route
- **Environment variables** לניהול API keys
- **Error handling** שלא חושף מידע רגיש

---

## 🧪 Testing Strategy

### Test Structure
```
__tests__/
├── components/          # Component tests
├── api/                 # API route tests
└── utils/               # Utility tests
```

### Testing Tools
- **Jest** - Test runner
- **React Testing Library** - Component testing
- **Jest DOM** - DOM matchers
- **Mock Data** - `__mocks__/mockData.ts`

### Test Coverage
- Component rendering
- User interactions
- API responses
- Error handling

---

## 📊 Performance Optimizations

### 1. Next.js Optimizations
- **Server Components** - פחות JavaScript ב-client
- **Image Optimization** - Next.js Image component
- **Code Splitting** - אוטומטי עם Next.js

### 2. Data Fetching
- **SWR** - Caching ו-revalidation
- **Parallel API calls** - `Promise.all()` במקומות רלוונטיים
- **Rate limiting** - delay ב-RAWG API calls

### 3. UI Performance
- **Framer Motion** - Hardware-accelerated animations
- **Lazy loading** - components לפי צורך
- **Memoization** - React.memo במקומות קריטיים

---

## 🔄 API Routes Structure

### `/api/auth/steam`
- **GET** - מתחיל תהליך Steam OAuth
- **Redirect** ל-Steam login

### `/api/auth/steam/callback`
- **GET** - מטפל ב-callback מ-Steam
- **Creates session** ומחזיר cookie
- **Redirects** ל-dashboard

### `/api/auth/logout`
- **POST** - מוחק session cookie
- **Redirects** ל-login

### `/api/recommendations/ai-search`
- **POST** - יוצר המלצות AI
- **Body**: `{ query?, filters? }`
- **Returns**: `{ recommendations, userProfile, reviewMessages }`

### `/api/reviews`
- **POST** - שומר ביקורת משתמש
- **Body**: `{ gameId, gameTitle, reaction, reasons, detailsText }`

### `/api/user/profile`
- **GET** - מחזיר פרופיל משתמש
- **Uses session** לזיהוי

---

## 🎯 Design Patterns

### 1. Agent Pattern
- **AI Agent** עם tools ו-system prompt
- **Separation** בין data fetching ל-AI logic

### 2. Repository Pattern
- **API clients** (`steam-api.ts`, `rawg-api.ts`) מפרידים בין business logic ל-API calls

### 3. Context Pattern
- **ReviewModalContext** לניהול state של modals

### 4. Factory Pattern
- **createSupabaseClient()** - יצירת clients שונים (client-side vs server-side)

---

## 📝 Environment Variables

```env
# Steam
STEAM_API_KEY=...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# OpenAI
OPENAI_API_KEY=...

# RAWG
RAWG_API_KEY=...

# App
NEXT_PUBLIC_BASE_URL=...
JWT_SECRET=...
```

---

## 🚀 Deployment Considerations

### Build Process
```bash
npm run build  # Next.js production build
npm start      # Production server
```

### Environment Setup
- כל ה-API keys חייבים להיות מוגדרים
- Supabase migrations חייבים לרוץ
- Database tables חייבים להיות קיימים

### Production Checklist
- [ ] Environment variables מוגדרים
- [ ] Database migrations רצו
- [ ] HTTPS enabled (למניעת cookie issues)
- [ ] Error logging מוגדר
- [ ] Rate limiting מוגדר (אם נדרש)

---

## 🔍 נקודות חשובות לשאלות המרצים

### 1. למה Next.js?
- **Server-side rendering** לביצועים טובים יותר
- **API Routes** מובנים (לא צריך Express נפרד)
- **File-based routing** - פשוט ונוח
- **Image optimization** מובנה
- **TypeScript support** מעולה

### 2. למה Supabase ולא MongoDB/Firebase?
- **PostgreSQL** - SQL database חזק ו-mature
- **Row Level Security** - אבטחה ברמת שורה
- **Real-time capabilities** (אם נדרש בעתיד)
- **Free tier** נדיב
- **SQL migrations** - version control ל-database

### 3. למה AI Agent ולא prompt פשוט?
- **Tools** - Agent יכול לקרוא ל-functions (Steam API)
- **Structured output** - תשובות עקביות ב-JSON
- **Context awareness** - Agent זוכר את השיחה
- **Extensibility** - קל להוסיף tools חדשים

### 4. איך מטפלים ב-errors?
- **Try-catch blocks** בכל API calls
- **Error boundaries** ב-React (אם נדרש)
- **Graceful degradation** - מציג fallback UI
- **Logging** ל-console (ב-production: error tracking service)

### 5. איך מטפלים ב-rate limiting?
- **Delay בין requests** ב-RAWG API (200ms)
- **Caching** עם SWR
- **Batch processing** - מעבד מספר משחקים ברצף עם delay

---

## 📚 קישורים רלוונטיים

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI Agents SDK](https://github.com/openai/agents)
- [Steam Web API](https://steamcommunity.com/dev)
- [RAWG API](https://rawg.io/apidocs)

---

## 🎓 סיכום - נקודות מפתח

1. **Full-stack TypeScript** - Type safety בכל השכבות
2. **Modern React** - Server Components, App Router
3. **AI-Powered** - OpenAI Agents להמלצות חכמות
4. **Secure** - JWT, RLS, HTTP-only cookies
5. **Scalable** - Separation of concerns, modular architecture
6. **Tested** - Jest + React Testing Library
7. **Performance** - Caching, optimization, lazy loading

---

*נוצר עבור מצגת כיתה - ינואר 2026*

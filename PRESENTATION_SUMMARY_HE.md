# סיכום מצגת - Gaming Recommendation App

## 🎯 מה האפליקציה עושה?

אפליקציית המלצות משחקים חכמה שמנתחת את פרופיל Steam של המשתמש ומציעה משחקים חדשים מותאמים אישית באמצעות AI.

---

## 🛠️ טכנולוגיות עיקריות

### Frontend
- **Next.js 16** - React framework עם Server Components
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - אנימציות

### Backend & Database
- **Supabase (PostgreSQL)** - Database
- **Next.js API Routes** - Server-side logic
- **JWT** - Authentication

### APIs חיצוניים
- **Steam API** - פרופיל משתמש ומשחקים
- **RAWG API** - מידע מפורט על משחקים
- **OpenAI Agents** - AI להמלצות

---

## 🏗️ ארכיטקטורה

```
User → Login (Steam OAuth) → Dashboard → 
Request Recommendations → AI Agent → 
Steam API + RAWG API + Database → 
Return Personalized Recommendations
```

---

## 🔑 נקודות מפתח טכניות

### 1. Authentication
- Steam OAuth login
- JWT tokens ב-HTTP-only cookies
- Session management מאובטח

### 2. AI Recommendations
- OpenAI Agent עם GPT-4o
- ניתוח פרופיל Steam (משחקים, שעות משחק)
- ניתוח ביקורות משתמש (likes/dislikes)
- המלצות מותאמות עם הסברים

### 3. Data Flow
- Steam API → משחקי המשתמש
- RAWG API → העשרת מידע (ratings, genres)
- Supabase → שמירת ביקורות משתמש
- AI Agent → ניתוח והמלצות

### 4. Security
- Row Level Security ב-Supabase
- HTTP-only cookies
- Environment variables ל-API keys
- Service role key רק ב-server-side

---

## 📊 Database Schema

**Users Table:**
- steam_id, username, avatar, profile_url

**Reviews Table:**
- game_id, game_title, reaction (like/dislike), reasons, details

---

## 🎨 UI Components

- **Login Page** - Steam authentication
- **Dashboard** - סקירה כללית
- **Recommendations** - רשימת המלצות עם filters
- **Game Cards** - כרטיסי משחק עם פרטים
- **Review Modals** - ביקורות משתמש

---

## 🧪 Testing

- Jest + React Testing Library
- Component tests
- API route tests
- Mock data

---

## 💡 למה הטכנולוגיות האלה?

### Next.js
- Server-side rendering לביצועים
- API routes מובנים
- TypeScript support מעולה

### Supabase
- PostgreSQL חזק
- Row Level Security
- Free tier נדיב

### AI Agent
- Tools ל-calling functions
- Structured JSON output
- Context awareness

---

## 🚀 Features

✅ Steam OAuth Login  
✅ פרופיל משתמש מ-Steam  
✅ המלצות AI מותאמות אישית  
✅ Filters (genres, difficulty, playtime)  
✅ ביקורות משתמש (likes/dislikes)  
✅ ניתוח העדפות מביקורות  
✅ UI מודרני עם אנימציות  

---

## 📈 Performance

- Caching עם SWR
- Image optimization
- Code splitting
- Rate limiting ב-APIs

---

## 🔐 Security

- JWT authentication
- HTTP-only cookies
- Row Level Security
- Environment variables

---

*מוכן למצגת כיתה*

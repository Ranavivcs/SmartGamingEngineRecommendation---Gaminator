# Test Results Explanation
Generated: 1/8/2026, 12:23:39 PM

Sure! Let's break down the test results in a friendly and simple way:

### 1. **Summary**
- ✅ **124 tests passed**
- ❌ **13 tests failed**
  
So, out of **137 tests**, **124** worked fine, and **13** had issues.

---

### 2. **What's Working** ✅
- The game cards show up correctly. 🎮
- Clicking buttons works as expected. 🖱️
- The filter panel displays correctly and allows for selecting different filters. 🔍
- The game details like name, genre, and description are shown properly. 📄
- The loading indicators appear when needed. ⏳

---

### 3. **What's Broken** ❌
Here are the problems that happened during testing:

#### Problem 1: AI Search Error
- **What should happen**: The app should generate game recommendations when searching.
- **What actually happened**: The app showed an error saying it couldn't generate recommendations. 😟

#### Problem 2: Difficulty Display
- **What should happen**: The game should show the difficulty level correctly styled.
- **What actually happened**: There were multiple elements with the same "Challenging" text, causing confusion. 😕

#### Problem 3: Tags Display
- **What should happen**: The game should display tags like "Action" properly.
- **What actually happened**: The app found multiple elements with the text "Action," which caused it to fail the test. 🤦‍♂️

#### Problem 4: Clearing Filters
- **What should happen**: Clicking the clear button should remove all filters and show default data.
- **What actually happened**: The app still showed the AI results instead of resetting back to default. 😩

#### Problem 5: Filter Changes
- **What should happen**: When selecting different filters, the app should update the recommendations.
- **What actually happened**: It found multiple "Action" elements, which caused the test to fail. 😒

---

### 4. **How to Fix** 🔧
Here are some simple steps to help fix the problems:

1. **AI Search Error**:
   - Check the code where the app tries to get recommendations. Make sure all the necessary data is available and the search function works correctly. 🔍

2. **Difficulty Display**:
   - Make sure that the "Challenging" text appears only once on the screen. You might need to adjust how the app displays difficulty levels. ⚙️

3. **Tags Display**:
   - Ensure that when showing tags, there is a unique way to identify them so that the app doesn’t get confused by duplicates. Maybe group tags in a way that they don’t repeat. 🏷️

4. **Clearing Filters**:
   - Check the clear button's function to ensure it resets everything correctly. It should set the filter state back to its original state. 🔄

5. **Filter Changes**:
   - Similar to tags, ensure that when filters are applied, the app can handle them without confusion. It might be a good idea to check how filters are being added and removed. ✅

---

If any of these issues are just in the tests and not in the actual app, it’s a good idea to adjust the tests to avoid confusing situations with similar text. 💡

Feel free to share this summary with your developer to help them understand what needs to be fixed! 😊

---

## Raw Test Output

```

> gaming-app@0.1.0 pretest
> echo '
> 📋 Running Recommendations Page Tests...
> 📄 See __tests__/TEST_CHECKLIST.md for what each test checks
> '


📋 Running Recommendations Page Tests...
📄 See __tests__/TEST_CHECKLIST.md for what each test checks


> gaming-app@0.1.0 test
> jest --verbose --no-coverage

[baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
[baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
[baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
[baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
[baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
[baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
FAIL __tests__/api/ai-search.test.ts
  ● Test suite failed to run

    ReferenceError: Request is not defined

       9 |   if (filters.genres && filters.genres.length > 0) {
      10 |     parts.push(`genres: ${filters.genres.join(', ')}`);
    > 11 |   }
         |    ^
      12 |   if (filters.difficulties && filters.difficulties.length > 0) {
      13 |     parts.push(`difficulty levels: ${filters.difficulties.join(', ')}`);
      14 |   }

      at Object.Request (node_modules/next/src/server/web/spec-extension/request.ts:14:34)
      at Object.<anonymous> (node_modules/next/server.js:2:16)
      at Object.<anonymous> (app/api/recommendations/ai-search/route.ts:11:17)
      at Object.<anonymous> (__tests__/api/ai-search.test.ts:16:16)

  console.error
    Received `false` for a non-boolean attribute `initial`.
    
    If you want to write it to the DOM, pass a string instead: initial="false" or initial={value.toString()}.
    
    If you used to conditionally omit it with initial={condition && value}, pass initial={condition ? value : undefined} instead.

      14 |   describe('Rendering', () => {
      15 |     it('renders the Filters header', () => {
    > 16 |       render(
         |             ^
      17 |         <FilterPanel
      18 |           filters={mockEmptyFilters}
      19 |           onFiltersChange={mockOnFiltersChange}

      at validateProperty (node_modules/react-dom/cjs/react-dom-client.development.js:3078:27)
      at warnUnknownProperties (node_modules/react-dom/cjs/react-dom-client.development.js:3146:9)
      at validatePropertiesInDevelopment (node_modules/react-dom/cjs/react-dom-client.development.js:19868:9)
      at setInitialProperties (node_modules/react-dom/cjs/react-dom-client.development.js:20491:7)
      at completeWork (node_modules/react-dom/cjs/react-dom-client.development.js:12662:18)
      at runWithFiberInDEV (node_modules/react-dom/cjs/react-dom-client.development.js:874:13)
      at completeUnitOfWork (node_modules/react-dom/cjs/react-dom-client.development.js:17777:19)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom-client.development.js:17658:11)
      at workLoopSync (node_modules/react-dom/cjs/react-dom-client.development.js:17469:41)
      at renderRootSync (node_modules/react-dom/cjs/react-dom-client.development.js:17450:11)
      at performWorkOnRoot (node_modules/react-dom/cjs/react-dom-client.development.js:16504:11)
      at performWorkOnRootViaSchedulerTask (node_modules/react-dom/cjs/react-dom-client.development.js:18957:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:590:34)
      at Object.<anonymous>.process.env.NODE_ENV.exports.act (node_modules/react/cjs/react.development.js:884:10)
      at node_modules/@testing-library/react/dist/act-compat.js:46:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:189:26)
      at render (node_modules/@testing-library/react/dist/pure.js:291:10)
      at Object.<anonymous> (__tests__/components/Recommendations/FilterPanel.test.tsx:16:13)

  console.error
    Received `true` for a non-boolean attribute `fill`.
    
    If you want to write it to the DOM, pass a string instead: fill="true" or fill={value.toString()}.

       6 |   describe('Rendering', () => {
       7 |     it('renders the game name', () => {
    >  8 |       render(
         |             ^
       9 |         <RecommendationCard
      10 |           recommendation={mockRecommendation}
      11 |           tier="gold"

      at validateProperty (node_modules/react-dom/cjs/react-dom-client.development.js:3070:27)
      at warnUnknownProperties (node_modules/react-dom/cjs/react-dom-client.development.js:3146:9)
      at validatePropertiesInDevelopment (node_modules/react-dom/cjs/react-dom-client.development.js:19868:9)
      at setInitialProperties (node_modules/react-dom/cjs/react-dom-client.development.js:20491:7)
      at completeWork (node_modules/react-dom/cjs/react-dom-client.development.js:12662:18)
      at runWithFiberInDEV (node_modules/react-dom/cjs/react-dom-client.development.js:874:13)
      at completeUnitOfWork (node_modules/react-dom/cjs/react-dom-client.development.js:17777:19)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom-client.development.js:17658:11)
      at workLoopSync (node_modules/react-dom/cjs/react-dom-client.development.js:17469:41)
      at renderRootSync (node_modules/react-dom/cjs/react-dom-client.development.js:17450:11)
      at performWorkOnRoot (node_modules/react-dom/cjs/react-dom-client.development.js:16504:11)
      at performWorkOnRootViaSchedulerTask (node_modules/react-dom/cjs/react-dom-client.development.js:18957:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:590:34)
      at Object.<anonymous>.process.env.NODE_ENV.exports.act (node_modules/react/cjs/react.development.js:884:10)
      at node_modules/@testing-library/react/dist/act-compat.js:46:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:189:26)
      at render (node_modules/@testing-library/react/dist/pure.js:291:10)
      at Object.<anonymous> (__tests__/components/Recommendations/RecommendationCard.test.tsx:8:13)

  console.error
    React does not recognize the `whileHover` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `whilehover` instead. If you accidentally passed it from a parent component, remove it from the DOM element.

       6 |   describe('Rendering', () => {
       7 |     it('renders the game name', () => {
    >  8 |       render(
         |             ^
       9 |         <RecommendationCard
      10 |           recommendation={mockRecommendation}
      11 |           tier="gold"

      at validateProperty (node_modules/react-dom/cjs/react-dom-client.development.js:3001:19)
      at warnUnknownProperties (node_modules/react-dom/cjs/react-dom-client.development.js:3146:9)
      at validatePropertiesInDevelopment (node_modules/react-dom/cjs/react-dom-client.development.js:19868:9)
      at setInitialProperties (node_modules/react-dom/cjs/react-dom-client.development.js:20491:7)
      at completeWork (node_modules/react-dom/cjs/react-dom-client.development.js:12662:18)
      at runWithFiberInDEV (node_modules/react-dom/cjs/react-dom-client.development.js:874:13)
      at completeUnitOfWork (node_modules/react-dom/cjs/react-dom-client.development.js:17777:19)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom-client.development.js:17658:11)
      at workLoopSync (node_modules/react-dom/cjs/react-dom-client.development.js:17469:41)
      at renderRootSync (node_modules/react-dom/cjs/react-dom-client.development.js:17450:11)
      at performWorkOnRoot (node_modules/react-dom/cjs/react-dom-client.development.js:16504:11)
      at performWorkOnRootViaSchedulerTask (node_modules/react-dom/cjs/react-dom-client.development.js:18957:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:590:34)
      at Object.<anonymous>.process.env.NODE_ENV.exports.act (node_modules/react/cjs/react.development.js:884:10)
      at node_modules/@testing-library/react/dist/act-compat.js:46:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:189:26)
      at render (node_modules/@testing-library/react/dist/pure.js:291:10)
      at Object.<anonymous> (__tests__/components/Recommendations/RecommendationCard.test.tsx:8:13)

  console.error
    Received `true` for a non-boolean attribute `fill`.
    
    If you want to write it to the DOM, pass a string instead: fill="true" or fill={value.toString()}.

       96 |   describe('Initial Rendering', () => {
       97 |     it('renders the page header', () => {
    >  98 |       render(<RecommendationsView />);
          |             ^
       99 |       expect(screen.getByText('Recommended For You')).toBeInTheDocument();
      100 |     });
      101 |

      at validateProperty (node_modules/react-dom/cjs/react-dom-client.development.js:3070:27)
      at warnUnknownProperties (node_modules/react-dom/cjs/react-dom-client.development.js:3146:9)
      at validatePropertiesInDevelopment (node_modules/react-dom/cjs/react-dom-client.development.js:19868:9)
      at setInitialProperties (node_modules/react-dom/cjs/react-dom-client.development.js:20491:7)
      at completeWork (node_modules/react-dom/cjs/react-dom-client.development.js:12662:18)
      at runWithFiberInDEV (node_modules/react-dom/cjs/react-dom-client.development.js:874:13)
      at completeUnitOfWork (node_modules/react-dom/cjs/react-dom-client.development.js:17777:19)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom-client.development.js:17658:11)
      at workLoopSync (node_modules/react-dom/cjs/react-dom-client.development.js:17469:41)
      at renderRootSync (node_modules/react-dom/cjs/react-dom-client.development.js:17450:11)
      at performWorkOnRoot (node_modules/react-dom/cjs/react-dom-client.development.js:16504:11)
      at performWorkOnRootViaSchedulerTask (node_modules/react-dom/cjs/react-dom-client.development.js:18957:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:590:34)
      at Object.<anonymous>.process.env.NODE_ENV.exports.act (node_modules/react/cjs/react.development.js:884:10)
      at node_modules/@testing-library/react/dist/act-compat.js:46:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:189:26)
      at render (node_modules/@testing-library/react/dist/pure.js:291:10)
      at Object.<anonymous> (__tests__/components/Recommendations/RecommendationsView.test.tsx:98:13)

  console.error
    React does not recognize the `whileHover` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `whilehover` instead. If you accidentally passed it from a parent component, remove it from the DOM element.

       96 |   describe('Initial Rendering', () => {
       97 |     it('renders the page header', () => {
    >  98 |       render(<RecommendationsView />);
          |             ^
       99 |       expect(screen.getByText('Recommended For You')).toBeInTheDocument();
      100 |     });
      101 |

      at validateProperty (node_modules/react-dom/cjs/react-dom-client.development.js:3001:19)
      at warnUnknownProperties (node_modules/react-dom/cjs/react-dom-client.development.js:3146:9)
      at validatePropertiesInDevelopment (node_modules/react-dom/cjs/react-dom-client.development.js:19868:9)
      at setInitialProperties (node_modules/react-dom/cjs/react-dom-client.development.js:20491:7)
      at completeWork (node_modules/react-dom/cjs/react-dom-client.development.js:12662:18)
      at runWithFiberInDEV (node_modules/react-dom/cjs/react-dom-client.development.js:874:13)
      at completeUnitOfWork (node_modules/react-dom/cjs/react-dom-client.development.js:17777:19)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom-client.development.js:17658:11)
      at workLoopSync (node_modules/react-dom/cjs/react-dom-client.development.js:17469:41)
      at renderRootSync (node_modules/react-dom/cjs/react-dom-client.development.js:17450:11)
      at performWorkOnRoot (node_modules/react-dom/cjs/react-dom-client.development.js:16504:11)
      at performWorkOnRootViaSchedulerTask (node_modules/react-dom/cjs/react-dom-client.development.js:18957:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:590:34)
      at Object.<anonymous>.process.env.NODE_ENV.exports.act (node_modules/react/cjs/react.development.js:884:10)
      at node_modules/@testing-library/react/dist/act-compat.js:46:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:189:26)
      at render (node_modules/@testing-library/react/dist/pure.js:291:10)
      at Object.<anonymous> (__tests__/components/Recommendations/RecommendationsView.test.tsx:98:13)

  console.error
    Received `true` for a non-boolean attribute `fill`.
    
    If you want to write it to the DOM, pass a string instead: fill="true" or fill={value.toString()}.

      36 |   describe('Rendering when open', () => {
      37 |     it('renders the game name', () => {
    > 38 |       render(
         |             ^
      39 |         <GameDetailModal
      40 |           recommendation={mockRecommendation}
      41 |           isOpen={true}

      at validateProperty (node_modules/react-dom/cjs/react-dom-client.development.js:3070:27)
      at warnUnknownProperties (node_modules/react-dom/cjs/react-dom-client.development.js:3146:9)
      at validatePropertiesInDevelopment (node_modules/react-dom/cjs/react-dom-client.development.js:19868:9)
      at setInitialProperties (node_modules/react-dom/cjs/react-dom-client.development.js:20491:7)
      at completeWork (node_modules/react-dom/cjs/react-dom-client.development.js:12662:18)
      at runWithFiberInDEV (node_modules/react-dom/cjs/react-dom-client.development.js:874:13)
      at completeUnitOfWork (node_modules/react-dom/cjs/react-dom-client.development.js:17777:19)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom-client.development.js:17658:11)
      at workLoopSync (node_modules/react-dom/cjs/react-dom-client.development.js:17469:41)
      at renderRootSync (node_modules/react-dom/cjs/react-dom-client.development.js:17450:11)
      at performWorkOnRoot (node_modules/react-dom/cjs/react-dom-client.development.js:16504:11)
      at performWorkOnRootViaSchedulerTask (node_modules/react-dom/cjs/react-dom-client.development.js:18957:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:590:34)
      at Object.<anonymous>.process.env.NODE_ENV.exports.act (node_modules/react/cjs/react.development.js:884:10)
      at node_modules/@testing-library/react/dist/act-compat.js:46:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:189:26)
      at render (node_modules/@testing-library/react/dist/pure.js:291:10)
      at Object.<anonymous> (__tests__/components/Recommendations/GameDetailModal.test.tsx:38:13)

  console.error
    Received `false` for a non-boolean attribute `initial`.
    
    If you want to write it to the DOM, pass a string instead: initial="false" or initial={value.toString()}.
    
    If you used to conditionally omit it with initial={condition && value}, pass initial={condition ? value : undefined} instead.

       96 |   describe('Initial Rendering', () => {
       97 |     it('renders the page header', () => {
    >  98 |       render(<RecommendationsView />);
          |             ^
       99 |       expect(screen.getByText('Recommended For You')).toBeInTheDocument();
      100 |     });
      101 |

      at validateProperty (node_modules/react-dom/cjs/react-dom-client.development.js:3078:27)
      at warnUnknownProperties (node_modules/react-dom/cjs/react-dom-client.development.js:3146:9)
      at validatePropertiesInDevelopment (node_modules/react-dom/cjs/react-dom-client.development.js:19868:9)
      at setInitialProperties (node_modules/react-dom/cjs/react-dom-client.development.js:20491:7)
      at completeWork (node_modules/react-dom/cjs/react-dom-client.development.js:12662:18)
      at runWithFiberInDEV (node_modules/react-dom/cjs/react-dom-client.development.js:874:13)
      at completeUnitOfWork (node_modules/react-dom/cjs/react-dom-client.development.js:17777:19)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom-client.development.js:17658:11)
      at workLoopSync (node_modules/react-dom/cjs/react-dom-client.development.js:17469:41)
      at renderRootSync (node_modules/react-dom/cjs/react-dom-client.development.js:17450:11)
      at performWorkOnRoot (node_modules/react-dom/cjs/react-dom-client.development.js:16504:11)
      at performWorkOnRootViaSchedulerTask (node_modules/react-dom/cjs/react-dom-client.development.js:18957:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:590:34)
      at Object.<anonymous>.process.env.NODE_ENV.exports.act (node_modules/react/cjs/react.development.js:884:10)
      at node_modules/@testing-library/react/dist/act-compat.js:46:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:189:26)
      at render (node_modules/@testing-library/react/dist/pure.js:291:10)
      at Object.<anonymous> (__tests__/components/Recommendations/RecommendationsView.test.tsx:98:13)

FAIL __tests__/components/Recommendations/RecommendationCard.test.tsx
  RecommendationCard
    Rendering
      ✓ renders the game name (117 ms)
      ✓ renders the game genre (20 ms)
      ✓ renders the similarity percentage (29 ms)
      ✓ renders the game description (77 ms)
      ✓ renders the game image with correct alt text (25 ms)
      ✓ renders mode label correctly (83 ms)
      ✓ renders coop mode correctly (17 ms)
      ✓ renders multiplayer mode correctly (17 ms)
      ✓ renders playtime label correctly for short sessions (28 ms)
      ✓ renders playtime label correctly for medium sessions (32 ms)
      ✓ renders playtime label correctly for long sessions (14 ms)
      ✕ renders difficulty with correct styling for challenging (20 ms)
      ✓ renders difficulty with correct styling for moderate (13 ms)
      ✓ renders difficulty with correct styling for casual (17 ms)
    Trophy Tiers
      ✓ displays "Best Match" badge for gold tier (21 ms)
      ✓ displays "Great Match" badge for silver tier (9 ms)
      ✓ displays "Good Match" badge for bronze tier (9 ms)
    Tags Display
      ✕ displays up to 8 tags for gold tier (16 ms)
      ✓ displays up to 4 tags for silver tier with "+more" indicator (16 ms)
      ✓ displays up to 4 tags for bronze tier with "+more" indicator (44 ms)
      ✓ does not show "+more" indicator when tags are 4 or fewer (24 ms)
    Interactions
      ✓ calls onClick when card is clicked (24 ms)
      ✓ does not throw when clicked without onClick handler (24 ms)
    Responsive Styling
      ✓ applies max-w-2xl class for gold tier cards (17 ms)
      ✓ does not apply max-w-2xl class for non-gold tier cards (17 ms)
    Different Similarity Scores
      ✓ renders low similarity score correctly (19 ms)
      ✓ renders perfect similarity score correctly (22 ms)

  ● RecommendationCard › Rendering › renders difficulty with correct styling for challenging

    TestingLibraryElementError: Found multiple elements with the text: Challenging

    Here are the matching elements:

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"px-2 py-1 rounded text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20"[39m
    [36m>[39m
      [0mChallenging[0m
    [36m</span>[39m

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
    [36m>[39m
      [0mChallenging[0m
    [36m</span>[39m

    (If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

    Ignored nodes: comments, script, style
    [36m<body>[39m
      [36m<div>[39m
        [36m<div[39m
          [33manimate[39m=[32m"[object Object]"[39m
          [33mclass[39m=[32m"relative bg-[#141414] rounded-xl border border-amber-500/50 hover:border-amber-400/70 transition-all duration-300 overflow-hidden group cursor-pointer max-w-2xl"[39m
          [33minitial[39m=[32m"[object Object]"[39m
          [33mstyle[39m=[32m"box-shadow: 0 4px 20px rgba(245, 158, 11, 0.15);"[39m
          [33mtransition[39m=[32m"[object Object]"[39m
          [33mwhilehover[39m=[32m"[object Object]"[39m
        [36m>[39m
          [36m<div[39m
            [33mclass[39m=[32m"absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-white"[39m
          [36m>[39m
            [36m<svg[39m
              [33maria-hidden[39m=[32m"true"[39m
              [33mclass[39m=[32m"lucide lucide-trophy w-3.5 h-3.5"[39m
              [33mfill[39m=[32m"none"[39m
              [33mheight[39m=[32m"24"[39m
              [33mstroke[39m=[32m"currentColor"[39m
              [33mstroke-linecap[39m=[32m"round"[39m
              [33mstroke-linejoin[39m=[32m"round"[39m
              [33mstroke-width[39m=[32m"2"[39m
              [33mviewBox[39m=[32m"0 0 24 24"[39m
              [33mwidth[39m=[32m"24"[39m
              [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
            [36m>[39m
              [36m<path[39m
                [33md[39m=[32m"M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"[39m
              [36m/>[39m
              [36m<path[39m
                [33md[39m=[32m"M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"[39m
              [36m/>[39m
              [36m<path[39m
                [33md[39m=[32m"M18 9h1.5a1 1 0 0 0 0-5H18"[39m
              [36m/>[39m
              [36m<path[39m
                [33md[39m=[32m"M4 22h16"[39m
              [36m/>[39m
              [36m<path[39m
                [33md[39m=[32m"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"[39m
              [36m/>[39m
              [36m<path[39m
                [33md[39m=[32m"M6 9H4.5a1 1 0 0 1 0-5H6"[39m
              [36m/>[39m
            [36m</svg>[39m
            [36m<span>[39m
              [0mBest Match[0m
            [36m</span>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mclass[39m=[32m"absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-sm border border-white/20 text-white"[39m
          [36m>[39m
            [36m<svg[39m
              [33maria-hidden[39m=[32m"true"[39m
              [33mclass[39m=[32m"lucide lucide-sparkles w-3.5 h-3.5"[39m
              [33mfill[39m=[32m"none"[39m
              [33mheight[39m=[32m"24"[39m
              [33mstroke[39m=[32m"currentColor"[39m
              [33mstroke-linecap[39m=[32m"round"[39m
              [33mstroke-linejoin[39m=[32m"round"[39m
              [33mstroke-width[39m=[32m"2"[39m
              [33mviewBox[39m=[32m"0 0 24 24"[39m
              [33mwidth[39m=[32m"24"[39m
              [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
            [36m>[39m
              [36m<path[39m
                [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
              [36m/>[39m
              [36m<path[39m
                [33md[39m=[32m"M20 2v4"[39m
              [36m/>[39m
              [36m<path[39m
                [33md[39m=[32m"M22 4h-4"[39m
              [36m/>[39m
              [36m<circle[39m
                [33mcx[39m=[32m"4"[39m
                [33mcy[39m=[32m"20"[39m
                [33mr[39m=[32m"2"[39m
              [36m/>[39m
            [36m</svg>[39m
            [36m<span>[39m
              [0m95[0m
              [0m% Match[0m
            [36m</span>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mclass[39m=[32m"relative aspect-[2.5/1] overflow-hidden"[39m
          [36m>[39m
            [36m<img[39m
              [33malt[39m=[32m"Hades"[39m
              [33mclass[39m=[32m"object-cover transition-transform duration-500 group-hover:scale-105"[39m
              [33msrc[39m=[32m"https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg"[39m
            [36m/>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"[39m
            [36m/>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"[39m
            [36m/>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mclass[39m=[32m"p-4 space-y-3"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"space-y-1"[39m
            [36m>[39m
              [36m<h3[39m
                [33mclass[39m=[32m"font-semibold text-white/90 tracking-tight truncate text-xl"[39m
              [36m>[39m
                [0mHades[0m
              [36m</h3>[39m
              [36m<p[39m
                [33mclass[39m=[32m"text-sm text-[#B5B5B5]"[39m
              [36m>[39m
                [0mAction Roguelike[0m
              [36m</p>[39m
            [36m</div>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex flex-wrap items-center gap-2"[39m
            [36m>[39m
              [36m<span[39m
                [33mclass[39m=[32m"inline-flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/80"[39m
              [36m>[39m
                [36m<svg[39m
                  [33maria-hidden[39m=[32m"true"[39m
                  [33mclass[39m=[32m"lucide lucide-gamepad2 lucide-gamepad-2 w-3.5 h-3.5"[39m
                  [33mfill[39m=[32m"none"[39m
                  [33mheight[39m=[32m"24"[39m
                  [33mstroke[39m=[32m"currentColor"[39m
                  [33mstroke-linecap[39m=[32m"round"[39m
                  [33mstroke-linejoin[39m=[32m"round"[39m
                  [33mstroke-width[39m=[32m"2"[39m
                  [33mviewBox[39m=[32m"0 0 24 24"[39m
                  [33mwidth[39m=[32m"24"[39m
                  [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                [36m>[39m
                  [36m<line[39m
                    [33mx1[39m=[32m"6"[39m
                    [33mx2[39m=[32m"10"[39m
                    [33my1[39m=[32m"11"[39m
                    [33my2[39m=[32m"11"[39m
                  [36m/>[39m
                  [36m<line[39m
                    [33mx1[39m=[32m"8"[39m
                    [33mx2[39m=[32m"8"[39m
                    [33my1[39m=[32m"9"[39m
                    [33my2[39m=[32m"13"[39m
                  [36m/>[39m
                  [36m<line[39m
                    [33mx1[39m=[32m"15"[39m
                    [33mx2[39m=[32m"15.01"[39m
                    [33my1[39m=[32m"12"[39m
                    [33my2[39m=[32m"12"[39m
                  [36m/>[39m
                  [36m<line[39m
                    [33mx1[39m=[32m"18"[39m
                    [33mx2[39m=[32m"18.01"[39m
                    [33my1[39m=[32m"10"[39m
                    [33my2[39m=[32m"10"[39m
                  [36m/>[39m
                  [36m<path[39m
                    [33md[39m=[32m"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"[39m
                  [36m/>[39m
                [36m</svg>[39m
                [0mSolo[0m
              [36m</span>[39m
              [36m<span[39m
                [33mclass[39m=[32m"inline-flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/80"[39m
              [36m>[39m
                [36m<svg[39m
                  [33maria-hidden[39m=[32m"true"[39m
                  [33mclass[39m=[32m"lucide lucide-clock w-3.5 h-3.5"[39m
                  [33mfill[39m=[32m"none"[39m
                  [33mheight[39m=[32m"24"[39m
                  [33mstroke[39m=[32m"currentColor"[39m
                  [33mstroke-linecap[39m=[32m"round"[39m
                  [33mstroke-linejoin[39m=[32m"round"[39m
                  [33mstroke-width[39m=[32m"2"[39m
                  [33mviewBox[39m=[32m"0 0 24 24"[39m
                  [33mwidth[39m=[32m"24"[39m
                  [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                [36m>[39m
                  [36m<path[39m
                    [33md[39m=[32m"M12 6v6l4 2"[39m
                  [36m/>[39m
                  [36m<circle[39m
                    [33mcx[39m=[32m"12"[39m
                    [33mcy[39m=[32m"12"[39m
                    [33mr[39m=[32m"10"[39m
                  [36m/>[39m
                [36m</svg>[39m
                [0m2-4h sessions[0m
              [36m</span>[39m
              [36m<span[39m
                [33mclass[39m=[32m"px-2 py-1 rounded text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20"[39m
              [36m>[39m
                [0mChallenging[0m
              [36m</span>[39m
            [36m</div>[39m
            [36m<p[39m
              [33mclass[39m=[32m"text-sm text-[#A0A0A0] leading-relaxed "[39m
            [36m>[39m
              [0mBased on your 200+ hours in roguelikes and love for fast-paced combat, Hades perfectly matches your playstyle.[0m
            [36m</p>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex flex-wrap gap-1.5"[39m
            [36m>[39m
              [36m<span[39m
                [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
              [36m>[39m
                [0mRoguelike[0m
              [36m</span>[39m
              [36m<span[39m
                [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
              [36m>[39m
                [0mSingleplayer[0m
              [36m</span>[39m
              [36m<span[39m
                [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
              [36m>[39m
                [0mDungeon Crawler[0m
              [36m</span>[39m
              [36m<span[39m
                [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
              [36m>[39m
                [0mProcedural Generation[0m
              [36m</span>[39m
              [36m<span[39m
                [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
              [36m>[39m
                [0mTop-Down[0m
              [36m</span>[39m
              [36m<span[39m
                [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
              [36m>[39m
                [0mFast-Paced[0m
              [36m</span>[39m
              [36m<span[39m
                [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
              [36m>[39m
                [0mMythology[0m
              [36m</span>[39m
              [36m<span[39m
                [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
              [36m>[39m
                [0mChallenging[0m
              [36m</span>[39m
            [36m</div>[39m
          [36m</div>[39m
        [36m</div>[39m
      [36m</div>[39m
    [36m</body>[39m

      140 |         />
      141 |       );
    > 142 |       expect(screen.getByText('Challenging')).toBeInTheDocument();
          |                     ^
      143 |     });
      144 |
      145 |     it('renders difficulty with correct styling for moderate', () => {

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at getElementError (node_modules/@testing-library/dom/dist/query-helpers.js:20:35)
      at getMultipleElementsFoundError (node_modules/@testing-library/dom/dist/query-helpers.js:23:10)
      at node_modules/@testing-library/dom/dist/query-helpers.js:55:13
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at Object.getByText (__tests__/components/Recommendations/RecommendationCard.test.tsx:142:21)

  ● RecommendationCard › Tags Display › displays up to 8 tags for gold tier

    TestingLibraryElementError: Found multiple elements with the text: Challenging

    Here are the matching elements:

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"px-2 py-1 rounded text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20"[39m
    [36m>[39m
      [0mChallenging[0m
    [36m</span>[39m

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
    [36m>[39m
      [0mChallenging[0m
    [36m</span>[39m

    (If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

    Ignored nodes: comments, script, style
    [36m<body>[39m
      [36m<div>[39m
        [36m<div[39m
          [33manimate[39m=[32m"[object Object]"[39m
          [33mclass[39m=[32m"relative bg-[#141414] rounded-xl border border-amber-500/50 hover:border-amber-400/70 transition-all duration-300 overflow-hidden group cursor-pointer max-w-2xl"[39m
          [33minitial[39m=[32m"[object Object]"[39m
          [33mstyle[39m=[32m"box-shadow: 0 4px 20px rgba(245, 158, 11, 0.15);"[39m
          [33mtransition[39m=[32m"[object Object]"[39m
          [33mwhilehover[39m=[32m"[object Object]"[39m
        [36m>[39m
          [36m<div[39m
            [33mclass[39m=[32m"absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-white"[39m
          [36m>[39m
            [36m<svg[39m
              [33maria-hidden[39m=[32m"true"[39m
              [33mclass[39m=[32m"lucide lucide-trophy w-3.5 h-3.5"[39m
              [33mfill[39m=[32m"none"[39m
              [33mheight[39m=[32m"24"[39m
              [33mstroke[39m=[32m"currentColor"[39m
              [33mstroke-linecap[39m=[32m"round"[39m
              [33mstroke-linejoin[39m=[32m"round"[39m
              [33mstroke-width[39m=[32m"2"[39m
              [33mviewBox[39m=[32m"0 0 24 24"[39m
              [33mwidth[39m=[32m"24"[39m
              [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
            [36m>[39m
              [36m<path[39m
                [33md[39m=[32m"M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"[39m
              [36m/>[39m
              [36m<path[39m
                [33md[39m=[32m"M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"[39m
              [36m/>[39m
              [36m<path[39m
                [33md[39m=[32m"M18 9h1.5a1 1 0 0 0 0-5H18"[39m
              [36m/>[39m
              [36m<path[39m
                [33md[39m=[32m"M4 22h16"[39m
              [36m/>[39m
              [36m<path[39m
                [33md[39m=[32m"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"[39m
              [36m/>[39m
              [36m<path[39m
                [33md[39m=[32m"M6 9H4.5a1 1 0 0 1 0-5H6"[39m
              [36m/>[39m
            [36m</svg>[39m
            [36m<span>[39m
              [0mBest Match[0m
            [36m</span>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mclass[39m=[32m"absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-sm border border-white/20 text-white"[39m
          [36m>[39m
            [36m<svg[39m
              [33maria-hidden[39m=[32m"true"[39m
              [33mclass[39m=[32m"lucide lucide-sparkles w-3.5 h-3.5"[39m
              [33mfill[39m=[32m"none"[39m
              [33mheight[39m=[32m"24"[39m
              [33mstroke[39m=[32m"currentColor"[39m
              [33mstroke-linecap[39m=[32m"round"[39m
              [33mstroke-linejoin[39m=[32m"round"[39m
              [33mstroke-width[39m=[32m"2"[39m
              [33mviewBox[39m=[32m"0 0 24 24"[39m
              [33mwidth[39m=[32m"24"[39m
              [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
            [36m>[39m
              [36m<path[39m
                [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
              [36m/>[39m
              [36m<path[39m
                [33md[39m=[32m"M20 2v4"[39m
              [36m/>[39m
              [36m<path[39m
                [33md[39m=[32m"M22 4h-4"[39m
              [36m/>[39m
              [36m<circle[39m
                [33mcx[39m=[32m"4"[39m
                [33mcy[39m=[32m"20"[39m
                [33mr[39m=[32m"2"[39m
              [36m/>[39m
            [36m</svg>[39m
            [36m<span>[39m
              [0m95[0m
              [0m% Match[0m
            [36m</span>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mclass[39m=[32m"relative aspect-[2.5/1] overflow-hidden"[39m
          [36m>[39m
            [36m<img[39m
              [33malt[39m=[32m"Hades"[39m
              [33mclass[39m=[32m"object-cover transition-transform duration-500 group-hover:scale-105"[39m
              [33msrc[39m=[32m"https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg"[39m
            [36m/>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"[39m
            [36m/>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"[39m
            [36m/>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mclass[39m=[32m"p-4 space-y-3"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"space-y-1"[39m
            [36m>[39m
              [36m<h3[39m
                [33mclass[39m=[32m"font-semibold text-white/90 tracking-tight truncate text-xl"[39m
              [36m>[39m
                [0mHades[0m
              [36m</h3>[39m
              [36m<p[39m
                [33mclass[39m=[32m"text-sm text-[#B5B5B5]"[39m
              [36m>[39m
                [0mAction Roguelike[0m
              [36m</p>[39m
            [36m</div>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex flex-wrap items-center gap-2"[39m
            [36m>[39m
              [36m<span[39m
                [33mclass[39m=[32m"inline-flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/80"[39m
              [36m>[39m
                [36m<svg[39m
                  [33maria-hidden[39m=[32m"true"[39m
                  [33mclass[39m=[32m"lucide lucide-gamepad2 lucide-gamepad-2 w-3.5 h-3.5"[39m
                  [33mfill[39m=[32m"none"[39m
                  [33mheight[39m=[32m"24"[39m
                  [33mstroke[39m=[32m"currentColor"[39m
                  [33mstroke-linecap[39m=[32m"round"[39m
                  [33mstroke-linejoin[39m=[32m"round"[39m
                  [33mstroke-width[39m=[32m"2"[39m
                  [33mviewBox[39m=[32m"0 0 24 24"[39m
                  [33mwidth[39m=[32m"24"[39m
                  [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                [36m>[39m
                  [36m<line[39m
                    [33mx1[39m=[32m"6"[39m
                    [33mx2[39m=[32m"10"[39m
                    [33my1[39m=[32m"11"[39m
                    [33my2[39m=[32m"11"[39m
                  [36m/>[39m
                  [36m<line[39m
                    [33mx1[39m=[32m"8"[39m
                    [33mx2[39m=[32m"8"[39m
                    [33my1[39m=[32m"9"[39m
                    [33my2[39m=[32m"13"[39m
                  [36m/>[39m
                  [36m<line[39m
                    [33mx1[39m=[32m"15"[39m
                    [33mx2[39m=[32m"15.01"[39m
                    [33my1[39m=[32m"12"[39m
                    [33my2[39m=[32m"12"[39m
                  [36m/>[39m
                  [36m<line[39m
                    [33mx1[39m=[32m"18"[39m
                    [33mx2[39m=[32m"18.01"[39m
                    [33my1[39m=[32m"10"[39m
                    [33my2[39m=[32m"10"[39m
                  [36m/>[39m
                  [36m<path[39m
                    [33md[39m=[32m"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"[39m
                  [36m/>[39m
                [36m</svg>[39m
                [0mSolo[0m
              [36m</span>[39m
              [36m<span[39m
                [33mclass[39m=[32m"inline-flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/80"[39m
              [36m>[39m
                [36m<svg[39m
                  [33maria-hidden[39m=[32m"true"[39m
                  [33mclass[39m=[32m"lucide lucide-clock w-3.5 h-3.5"[39m
                  [33mfill[39m=[32m"none"[39m
                  [33mheight[39m=[32m"24"[39m
                  [33mstroke[39m=[32m"currentColor"[39m
                  [33mstroke-linecap[39m=[32m"round"[39m
                  [33mstroke-linejoin[39m=[32m"round"[39m
                  [33mstroke-width[39m=[32m"2"[39m
                  [33mviewBox[39m=[32m"0 0 24 24"[39m
                  [33mwidth[39m=[32m"24"[39m
                  [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                [36m>[39m
                  [36m<path[39m
                    [33md[39m=[32m"M12 6v6l4 2"[39m
                  [36m/>[39m
                  [36m<circle[39m
                    [33mcx[39m=[32m"12"[39m
                    [33mcy[39m=[32m"12"[39m
                    [33mr[39m=[32m"10"[39m
                  [36m/>[39m
                [36m</svg>[39m
                [0m2-4h sessions[0m
              [36m</span>[39m
              [36m<span[39m
                [33mclass[39m=[32m"px-2 py-1 rounded text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20"[39m
              [36m>[39m
                [0mChallenging[0m
              [36m</span>[39m
            [36m</div>[39m
            [36m<p[39m
              [33mclass[39m=[32m"text-sm text-[#A0A0A0] leading-relaxed "[39m
            [36m>[39m
              [0mBased on your 200+ hours in roguelikes and love for fast-paced combat, Hades perfectly matches your playstyle.[0m
            [36m</p>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex flex-wrap gap-1.5"[39m
            [36m>[39m
              [36m<span[39m
                [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
              [36m>[39m
                [0mRoguelike[0m
              [36m</span>[39m
              [36m<span[39m
                [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
              [36m>[39m
                [0mSingleplayer[0m
              [36m</span>[39m
              [36m<span[39m
                [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
              [36m>[39m
                [0mDungeon Crawler[0m
              [36m</span>[39m
              [36m<span[39m
                [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
              [36m>[39m
                [0mProcedural Generation[0m
              [36m</span>[39m
              [36m<span[39m
                [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
              [36m>[39m
                [0mTop-Down[0m
              [36m</span>[39m
              [36m<span[39m
                [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
              [36m>[39m
                [0mFast-Paced[0m
              [36m</span>[39m
              [36m<span[39m
                [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
              [36m>[39m
                [0mMythology[0m
              [36m</span>[39m
              [36m<span[39m
                [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
              [36m>[39m
                [0mChallenging[0m
              [36m</span>[39m
            [36m</div>[39m
          [36m</div>[39m
        [36m</div>[39m
      [36m</div>[39m
    [36m</body>[39m

      220 |       expect(screen.getByText('Fast-Paced')).toBeInTheDocument();
      221 |       expect(screen.getByText('Mythology')).toBeInTheDocument();
    > 222 |       expect(screen.getByText('Challenging')).toBeInTheDocument();
          |                     ^
      223 |     });
      224 |
      225 |     it('displays up to 4 tags for silver tier with "+more" indicator', () => {

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at getElementError (node_modules/@testing-library/dom/dist/query-helpers.js:20:35)
      at getMultipleElementsFoundError (node_modules/@testing-library/dom/dist/query-helpers.js:23:10)
      at node_modules/@testing-library/dom/dist/query-helpers.js:55:13
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at Object.getByText (__tests__/components/Recommendations/RecommendationCard.test.tsx:222:21)

PASS __tests__/components/Recommendations/FilterPanel.test.tsx
  FilterPanel
    Rendering
      ✓ renders the Filters header (117 ms)
      ✓ renders Sort By section with all options (30 ms)
      ✓ renders Genre section with available genres (162 ms)
      ✓ renders Difficulty section with all difficulty levels (31 ms)
      ✓ renders Time Available section with all play time options (55 ms)
      ✓ renders Play Style section with all mode options (60 ms)
    Active Filter Count
      ✓ shows no filter count badge when no filters are active (19 ms)
      ✓ shows correct filter count when filters are active (21 ms)
      ✓ shows active filter summary message (19 ms)
      ✓ shows singular form for single filter (13 ms)
    Sort By Selection
      ✓ highlights the currently selected sort option (21 ms)
      ✓ calls onFiltersChange when sort option is clicked (22 ms)
      ✓ calls onFiltersChange when A-Z sort is selected (12 ms)
    Genre Filter Toggling
      ✓ adds genre to filter when clicked (22 ms)
      ✓ removes genre from filter when already selected (22 ms)
      ✓ adds additional genre while keeping existing ones (29 ms)
    Difficulty Filter Toggling
      ✓ adds difficulty to filter when clicked (23 ms)
      ✓ removes difficulty from filter when already selected (28 ms)
    Play Time Filter Toggling
      ✓ adds play time to filter when clicked (27 ms)
      ✓ removes play time from filter when already selected (42 ms)
    Mode Filter Toggling
      ✓ adds mode to filter when clicked (44 ms)
      ✓ removes mode from filter when already selected (34 ms)
      ✓ adds Co-op mode correctly (31 ms)
    Clear All Filters
      ✓ shows Clear button when filters are active (34 ms)
      ✓ does not show Clear button when no filters are active (17 ms)
      ✓ clears all filters when Clear button is clicked (15 ms)
    Loading State
      ✓ shows loading indicator when isLoading is true (14 ms)
      ✓ does not show loading indicator when isLoading is false (10 ms)
      ✓ hides Clear button when loading with active filters (21 ms)
    Filter Section Collapse/Expand
      ✓ collapses section when header is clicked (39 ms)
    Empty Available Genres
      ✓ renders genre section even with no available genres (12 ms)
    Multiple Filter Combinations
      ✓ handles complex filter state correctly (15 ms)

FAIL __tests__/components/Recommendations/GameDetailModal.test.tsx
  GameDetailModal
    Rendering when closed
      ✓ renders nothing when isOpen is false (20 ms)
      ✓ renders nothing when recommendation is null (3 ms)
    Rendering when open
      ✓ renders the game name (323 ms)
      ✓ renders the game genre (30 ms)
      ✓ renders the similarity percentage with match text (53 ms)
      ✓ renders the game image (29 ms)
      ✓ renders the game description under "Why This Game?" (33 ms)
    Quick Stats Grid
      ✓ renders Play Style stat with correct value (22 ms)
      ✓ renders Co-op mode correctly (37 ms)
      ✓ renders Multiplayer mode correctly (23 ms)
      ✓ renders Session Length stat with correct value (32 ms)
      ✓ renders Quick Sessions for short playTime (48 ms)
      ✓ renders Long Sessions for long playTime (28 ms)
      ✕ renders Difficulty stat with correct value (56 ms)
      ✓ renders Casual difficulty with green styling (22 ms)
      ✓ renders Moderate difficulty with yellow styling (49 ms)
      ✕ renders Challenging difficulty with red styling (30 ms)
      ✓ renders Released date stat with formatted date (45 ms)
    Tags Section
      ✓ renders Tags section header (19 ms)
      ✕ renders all tags (29 ms)
      ✓ renders tags when only a few are present (20 ms)
    Steam Link
      ✓ renders View on Steam button (34 ms)
      ✓ has correct Steam search URL (22 ms)
      ✓ opens Steam link in new tab (13 ms)
      ✓ has noopener noreferrer for security (14 ms)
      ✓ correctly encodes game names with special characters (11 ms)
    Close Functionality
      ✓ calls onClose when close button is clicked (50 ms)
      ✓ calls onClose when backdrop is clicked (22 ms)
    Different Similarity Scores
      ✓ displays low similarity score (26 ms)
      ✓ displays perfect similarity score (20 ms)
    Different Release Dates
      ✓ formats old release date correctly (16 ms)
      ✓ formats recent release date correctly (14 ms)
    Accessibility
      ✓ has accessible close button (22 ms)
      ✓ has accessible Steam link (23 ms)
    Long Content Handling
      ✓ handles long game descriptions (12 ms)
      ✓ handles many tags (19 ms)

  ● GameDetailModal › Quick Stats Grid › renders Difficulty stat with correct value

    TestingLibraryElementError: Found multiple elements with the text: Challenging

    Here are the matching elements:

    Ignored nodes: comments, script, style
    [36m<p[39m
      [33mclass[39m=[32m"font-medium text-red-400"[39m
    [36m>[39m
      [0mChallenging[0m
    [36m</p>[39m

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"px-3 py-1.5 bg-[#141414] border border-[#1E1E1E] hover:border-[#2A2A2A] rounded-lg text-sm text-[#B5B5B5] transition-colors"[39m
    [36m>[39m
      [0mChallenging[0m
    [36m</span>[39m

    (If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

    Ignored nodes: comments, script, style
    [36m<body>[39m
      [36m<div>[39m
        [36m<div[39m
          [33manimate[39m=[32m"[object Object]"[39m
          [33mclass[39m=[32m"fixed inset-0 bg-black/80 backdrop-blur-sm z-50"[39m
          [33mexit[39m=[32m"[object Object]"[39m
          [33minitial[39m=[32m"[object Object]"[39m
        [36m/>[39m
        [36m<div[39m
          [33manimate[39m=[32m"[object Object]"[39m
          [33mclass[39m=[32m"fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl md:max-h-[85vh] bg-[#0D0D0D] border border-[#1E1E1E] rounded-2xl overflow-hidden z-50 flex flex-col"[39m
          [33mexit[39m=[32m"[object Object]"[39m
          [33minitial[39m=[32m"[object Object]"[39m
          [33mtransition[39m=[32m"[object Object]"[39m
        [36m>[39m
          [36m<div[39m
            [33mclass[39m=[32m"relative h-48 md:h-64 shrink-0"[39m
          [36m>[39m
            [36m<img[39m
              [33malt[39m=[32m"Hades"[39m
              [33mclass[39m=[32m"object-cover"[39m
              [33msrc[39m=[32m"https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg"[39m
            [36m/>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/50 to-transparent"[39m
            [36m/>[39m
            [36m<button[39m
              [33mclass[39m=[32m"absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 border border-white/10 rounded-full transition-colors"[39m
            [36m>[39m
              [36m<svg[39m
                [33maria-hidden[39m=[32m"true"[39m
                [33mclass[39m=[32m"lucide lucide-x w-5 h-5 text-white"[39m
                [33mfill[39m=[32m"none"[39m
                [33mheight[39m=[32m"24"[39m
                [33mstroke[39m=[32m"currentColor"[39m
                [33mstroke-linecap[39m=[32m"round"[39m
                [33mstroke-linejoin[39m=[32m"round"[39m
                [33mstroke-width[39m=[32m"2"[39m
                [33mviewBox[39m=[32m"0 0 24 24"[39m
                [33mwidth[39m=[32m"24"[39m
                [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
              [36m>[39m
                [36m<path[39m
                  [33md[39m=[32m"M18 6 6 18"[39m
                [36m/>[39m
                [36m<path[39m
                  [33md[39m=[32m"m6 6 12 12"[39m
                [36m/>[39m
              [36m</svg>[39m
            [36m</button>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"[39m
            [36m>[39m
              [36m<svg[39m
                [33maria-hidden[39m=[32m"true"[39m
                [33mclass[39m=[32m"lucide lucide-sparkles w-4 h-4 text-white"[39m
                [33mfill[39m=[32m"none"[39m
                [33mheight[39m=[32m"24"[39m
                [33mstroke[39m=[32m"currentColor"[39m
                [33mstroke-linecap[39m=[32m"round"[39m
                [33mstroke-linejoin[39m=[32m"round"[39m
                [33mstroke-width[39m=[32m"2"[39m
                [33mviewBox[39m=[32m"0 0 24 24"[39m
                [33mwidth[39m=[32m"24"[39m
                [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
              [36m>[39m
                [36m<path[39m
                  [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
                [36m/>[39m
                [36m<path[39m
                  [33md[39m=[32m"M20 2v4"[39m
                [36m/>[39m
                [36m<path[39m
                  [33md[39m=[32m"M22 4h-4"[39m
                [36m/>[39m
                [36m<circle[39m
                  [33mcx[39m=[32m"4"[39m
                  [33mcy[39m=[32m"20"[39m
                  [33mr[39m=[32m"2"[39m
                [36m/>[39m
              [36m</svg>[39m
              [36m<span[39m
                [33mclass[39m=[32m"text-sm font-semibold text-white"[39m
              [36m>[39m
                [0m95[0m
                [0m% Match[0m
              [36m</span>[39m
            [36m</div>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute bottom-4 left-6 right-6"[39m
            [36m>[39m
              [36m<h2[39m
                [33mclass[39m=[32m"text-2xl md:text-3xl font-bold text-white tracking-tight"[39m
              [36m>[39m
                [0mHades[0m
              [36m</h2>[39m
              [36m<p[39m
                [33mclass[39m=[32m"text-[#B5B5B5] mt-1"[39m
              [36m>[39m
                [0mAction Roguelike[0m
              [36m</p>[39m
            [36m</div>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mclass[39m=[32m"flex-1 overflow-y-auto p-6 space-y-6"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"grid grid-cols-2 md:grid-cols-4 gap-3"[39m
            [36m>[39m
              [36m<div[39m
                [33mclass[39m=[32m"bg-[#141414] border border-[#1E1E1E] rounded-lg p-3"[39m
              [36m>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"flex items-center gap-2 text-[#A0A0A0] text-xs mb-1"[39m
                [36m>[39m
                  [36m<svg[39m
                    [33maria-hidden[39m=[32m"true"[39m
                    [33mclass[39m=[32m"lucide lucide-gamepad2 lucide-gamepad-2 w-4 h-4"[39m
                    [33mfill[39m=[32m"none"[39m
                    [33mheight[39m=[32m"24"[39m
                    [33mstroke[39m=[32m"currentColor"[39m
                    [33mstroke-linecap[39m=[32m"round"[39m
                    [33mstroke-linejoin[39m=[32m"round"[39m
                    [33mstroke-width[39m=[32m"2"[39m
                    [33mviewBox[39m=[32m"0 0 24 24"[39m
                    [33mwidth[39m=[32m"24"[39m
                    [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                  [36m>[39m
                    [36m<line[39m
                      [33mx1[39m=[32m"6"[39m
                      [33mx2[39m=[32m"10"[39m
                      [33my1[39m=[32m"11"[39m
                      [33my2[39m=[32m"11"[39m
                    [36m/>[39m
                    [36m<line[39m
                      [33mx1[39m=[32m"8"[39m
                      [33mx2[39m=[32m"8"[39m
                      [33my1[39m=[32m"9"[39m
                      [33my2[39m=[32m"13"[39m
                    [36m/>[39m
                    [36m<line[39m
                      [33mx1[39m=[32m"15"[39m
                      [33mx2[39m=[32m"15.01"[39m
                      [33my1[39m=[32m"12"[39m
                      [33my2[39m=[32m"12"[39m
                    [36m/>[39m
                    [36m<line[39m
                      [33mx1[39m=[32m"18"[39m
                      [33mx2[39m=[32m"18.01"[39m
                      [33my1[39m=[32m"10"[39m
                      [33my2[39m=[32m"10"[39m
                    [36m/>[39m
                    [36m<path[39m
                      [3...

      176 |       );
      177 |       expect(screen.getByText('Difficulty')).toBeInTheDocument();
    > 178 |       expect(screen.getByText('Challenging')).toBeInTheDocument();
          |                     ^
      179 |     });
      180 |
      181 |     it('renders Casual difficulty with green styling', () => {

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at getElementError (node_modules/@testing-library/dom/dist/query-helpers.js:20:35)
      at getMultipleElementsFoundError (node_modules/@testing-library/dom/dist/query-helpers.js:23:10)
      at node_modules/@testing-library/dom/dist/query-helpers.js:55:13
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at Object.getByText (__tests__/components/Recommendations/GameDetailModal.test.tsx:178:21)

  ● GameDetailModal › Quick Stats Grid › renders Challenging difficulty with red styling

    TestingLibraryElementError: Found multiple elements with the text: Challenging

    Here are the matching elements:

    Ignored nodes: comments, script, style
    [36m<p[39m
      [33mclass[39m=[32m"font-medium text-red-400"[39m
    [36m>[39m
      [0mChallenging[0m
    [36m</p>[39m

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"px-3 py-1.5 bg-[#141414] border border-[#1E1E1E] hover:border-[#2A2A2A] rounded-lg text-sm text-[#B5B5B5] transition-colors"[39m
    [36m>[39m
      [0mChallenging[0m
    [36m</span>[39m

    (If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

    Ignored nodes: comments, script, style
    [36m<body>[39m
      [36m<div>[39m
        [36m<div[39m
          [33manimate[39m=[32m"[object Object]"[39m
          [33mclass[39m=[32m"fixed inset-0 bg-black/80 backdrop-blur-sm z-50"[39m
          [33mexit[39m=[32m"[object Object]"[39m
          [33minitial[39m=[32m"[object Object]"[39m
        [36m/>[39m
        [36m<div[39m
          [33manimate[39m=[32m"[object Object]"[39m
          [33mclass[39m=[32m"fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl md:max-h-[85vh] bg-[#0D0D0D] border border-[#1E1E1E] rounded-2xl overflow-hidden z-50 flex flex-col"[39m
          [33mexit[39m=[32m"[object Object]"[39m
          [33minitial[39m=[32m"[object Object]"[39m
          [33mtransition[39m=[32m"[object Object]"[39m
        [36m>[39m
          [36m<div[39m
            [33mclass[39m=[32m"relative h-48 md:h-64 shrink-0"[39m
          [36m>[39m
            [36m<img[39m
              [33malt[39m=[32m"Hades"[39m
              [33mclass[39m=[32m"object-cover"[39m
              [33msrc[39m=[32m"https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg"[39m
            [36m/>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/50 to-transparent"[39m
            [36m/>[39m
            [36m<button[39m
              [33mclass[39m=[32m"absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 border border-white/10 rounded-full transition-colors"[39m
            [36m>[39m
              [36m<svg[39m
                [33maria-hidden[39m=[32m"true"[39m
                [33mclass[39m=[32m"lucide lucide-x w-5 h-5 text-white"[39m
                [33mfill[39m=[32m"none"[39m
                [33mheight[39m=[32m"24"[39m
                [33mstroke[39m=[32m"currentColor"[39m
                [33mstroke-linecap[39m=[32m"round"[39m
                [33mstroke-linejoin[39m=[32m"round"[39m
                [33mstroke-width[39m=[32m"2"[39m
                [33mviewBox[39m=[32m"0 0 24 24"[39m
                [33mwidth[39m=[32m"24"[39m
                [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
              [36m>[39m
                [36m<path[39m
                  [33md[39m=[32m"M18 6 6 18"[39m
                [36m/>[39m
                [36m<path[39m
                  [33md[39m=[32m"m6 6 12 12"[39m
                [36m/>[39m
              [36m</svg>[39m
            [36m</button>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"[39m
            [36m>[39m
              [36m<svg[39m
                [33maria-hidden[39m=[32m"true"[39m
                [33mclass[39m=[32m"lucide lucide-sparkles w-4 h-4 text-white"[39m
                [33mfill[39m=[32m"none"[39m
                [33mheight[39m=[32m"24"[39m
                [33mstroke[39m=[32m"currentColor"[39m
                [33mstroke-linecap[39m=[32m"round"[39m
                [33mstroke-linejoin[39m=[32m"round"[39m
                [33mstroke-width[39m=[32m"2"[39m
                [33mviewBox[39m=[32m"0 0 24 24"[39m
                [33mwidth[39m=[32m"24"[39m
                [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
              [36m>[39m
                [36m<path[39m
                  [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
                [36m/>[39m
                [36m<path[39m
                  [33md[39m=[32m"M20 2v4"[39m
                [36m/>[39m
                [36m<path[39m
                  [33md[39m=[32m"M22 4h-4"[39m
                [36m/>[39m
                [36m<circle[39m
                  [33mcx[39m=[32m"4"[39m
                  [33mcy[39m=[32m"20"[39m
                  [33mr[39m=[32m"2"[39m
                [36m/>[39m
              [36m</svg>[39m
              [36m<span[39m
                [33mclass[39m=[32m"text-sm font-semibold text-white"[39m
              [36m>[39m
                [0m95[0m
                [0m% Match[0m
              [36m</span>[39m
            [36m</div>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute bottom-4 left-6 right-6"[39m
            [36m>[39m
              [36m<h2[39m
                [33mclass[39m=[32m"text-2xl md:text-3xl font-bold text-white tracking-tight"[39m
              [36m>[39m
                [0mHades[0m
              [36m</h2>[39m
              [36m<p[39m
                [33mclass[39m=[32m"text-[#B5B5B5] mt-1"[39m
              [36m>[39m
                [0mAction Roguelike[0m
              [36m</p>[39m
            [36m</div>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mclass[39m=[32m"flex-1 overflow-y-auto p-6 space-y-6"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"grid grid-cols-2 md:grid-cols-4 gap-3"[39m
            [36m>[39m
              [36m<div[39m
                [33mclass[39m=[32m"bg-[#141414] border border-[#1E1E1E] rounded-lg p-3"[39m
              [36m>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"flex items-center gap-2 text-[#A0A0A0] text-xs mb-1"[39m
                [36m>[39m
                  [36m<svg[39m
                    [33maria-hidden[39m=[32m"true"[39m
                    [33mclass[39m=[32m"lucide lucide-gamepad2 lucide-gamepad-2 w-4 h-4"[39m
                    [33mfill[39m=[32m"none"[39m
                    [33mheight[39m=[32m"24"[39m
                    [33mstroke[39m=[32m"currentColor"[39m
                    [33mstroke-linecap[39m=[32m"round"[39m
                    [33mstroke-linejoin[39m=[32m"round"[39m
                    [33mstroke-width[39m=[32m"2"[39m
                    [33mviewBox[39m=[32m"0 0 24 24"[39m
                    [33mwidth[39m=[32m"24"[39m
                    [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                  [36m>[39m
                    [36m<line[39m
                      [33mx1[39m=[32m"6"[39m
                      [33mx2[39m=[32m"10"[39m
                      [33my1[39m=[32m"11"[39m
                      [33my2[39m=[32m"11"[39m
                    [36m/>[39m
                    [36m<line[39m
                      [33mx1[39m=[32m"8"[39m
                      [33mx2[39m=[32m"8"[39m
                      [33my1[39m=[32m"9"[39m
                      [33my2[39m=[32m"13"[39m
                    [36m/>[39m
                    [36m<line[39m
                      [33mx1[39m=[32m"15"[39m
                      [33mx2[39m=[32m"15.01"[39m
                      [33my1[39m=[32m"12"[39m
                      [33my2[39m=[32m"12"[39m
                    [36m/>[39m
                    [36m<line[39m
                      [33mx1[39m=[32m"18"[39m
                      [33mx2[39m=[32m"18.01"[39m
                      [33my1[39m=[32m"10"[39m
                      [33my2[39m=[32m"10"[39m
                    [36m/>[39m
                    [36m<path[39m
                      [3...

      213 |         />
      214 |       );
    > 215 |       const challengingText = screen.getByText('Challenging');
          |                                      ^
      216 |       expect(challengingText).toHaveClass('text-red-400');
      217 |     });
      218 |

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at getElementError (node_modules/@testing-library/dom/dist/query-helpers.js:20:35)
      at getMultipleElementsFoundError (node_modules/@testing-library/dom/dist/query-helpers.js:23:10)
      at node_modules/@testing-library/dom/dist/query-helpers.js:55:13
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at Object.getByText (__tests__/components/Recommendations/GameDetailModal.test.tsx:215:38)

  ● GameDetailModal › Tags Section › renders all tags

    TestingLibraryElementError: Found multiple elements with the text: Challenging

    Here are the matching elements:

    Ignored nodes: comments, script, style
    [36m<p[39m
      [33mclass[39m=[32m"font-medium text-red-400"[39m
    [36m>[39m
      [0mChallenging[0m
    [36m</p>[39m

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"px-3 py-1.5 bg-[#141414] border border-[#1E1E1E] hover:border-[#2A2A2A] rounded-lg text-sm text-[#B5B5B5] transition-colors"[39m
    [36m>[39m
      [0mChallenging[0m
    [36m</span>[39m

    (If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

    Ignored nodes: comments, script, style
    [36m<body>[39m
      [36m<div>[39m
        [36m<div[39m
          [33manimate[39m=[32m"[object Object]"[39m
          [33mclass[39m=[32m"fixed inset-0 bg-black/80 backdrop-blur-sm z-50"[39m
          [33mexit[39m=[32m"[object Object]"[39m
          [33minitial[39m=[32m"[object Object]"[39m
        [36m/>[39m
        [36m<div[39m
          [33manimate[39m=[32m"[object Object]"[39m
          [33mclass[39m=[32m"fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl md:max-h-[85vh] bg-[#0D0D0D] border border-[#1E1E1E] rounded-2xl overflow-hidden z-50 flex flex-col"[39m
          [33mexit[39m=[32m"[object Object]"[39m
          [33minitial[39m=[32m"[object Object]"[39m
          [33mtransition[39m=[32m"[object Object]"[39m
        [36m>[39m
          [36m<div[39m
            [33mclass[39m=[32m"relative h-48 md:h-64 shrink-0"[39m
          [36m>[39m
            [36m<img[39m
              [33malt[39m=[32m"Hades"[39m
              [33mclass[39m=[32m"object-cover"[39m
              [33msrc[39m=[32m"https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg"[39m
            [36m/>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/50 to-transparent"[39m
            [36m/>[39m
            [36m<button[39m
              [33mclass[39m=[32m"absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 border border-white/10 rounded-full transition-colors"[39m
            [36m>[39m
              [36m<svg[39m
                [33maria-hidden[39m=[32m"true"[39m
                [33mclass[39m=[32m"lucide lucide-x w-5 h-5 text-white"[39m
                [33mfill[39m=[32m"none"[39m
                [33mheight[39m=[32m"24"[39m
                [33mstroke[39m=[32m"currentColor"[39m
                [33mstroke-linecap[39m=[32m"round"[39m
                [33mstroke-linejoin[39m=[32m"round"[39m
                [33mstroke-width[39m=[32m"2"[39m
                [33mviewBox[39m=[32m"0 0 24 24"[39m
                [33mwidth[39m=[32m"24"[39m
                [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
              [36m>[39m
                [36m<path[39m
                  [33md[39m=[32m"M18 6 6 18"[39m
                [36m/>[39m
                [36m<path[39m
                  [33md[39m=[32m"m6 6 12 12"[39m
                [36m/>[39m
              [36m</svg>[39m
            [36m</button>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"[39m
            [36m>[39m
              [36m<svg[39m
                [33maria-hidden[39m=[32m"true"[39m
                [33mclass[39m=[32m"lucide lucide-sparkles w-4 h-4 text-white"[39m
                [33mfill[39m=[32m"none"[39m
                [33mheight[39m=[32m"24"[39m
                [33mstroke[39m=[32m"currentColor"[39m
                [33mstroke-linecap[39m=[32m"round"[39m
                [33mstroke-linejoin[39m=[32m"round"[39m
                [33mstroke-width[39m=[32m"2"[39m
                [33mviewBox[39m=[32m"0 0 24 24"[39m
                [33mwidth[39m=[32m"24"[39m
                [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
              [36m>[39m
                [36m<path[39m
                  [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
                [36m/>[39m
                [36m<path[39m
                  [33md[39m=[32m"M20 2v4"[39m
                [36m/>[39m
                [36m<path[39m
                  [33md[39m=[32m"M22 4h-4"[39m
                [36m/>[39m
                [36m<circle[39m
                  [33mcx[39m=[32m"4"[39m
                  [33mcy[39m=[32m"20"[39m
                  [33mr[39m=[32m"2"[39m
                [36m/>[39m
              [36m</svg>[39m
              [36m<span[39m
                [33mclass[39m=[32m"text-sm font-semibold text-white"[39m
              [36m>[39m
                [0m95[0m
                [0m% Match[0m
              [36m</span>[39m
            [36m</div>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute bottom-4 left-6 right-6"[39m
            [36m>[39m
              [36m<h2[39m
                [33mclass[39m=[32m"text-2xl md:text-3xl font-bold text-white tracking-tight"[39m
              [36m>[39m
                [0mHades[0m
              [36m</h2>[39m
              [36m<p[39m
                [33mclass[39m=[32m"text-[#B5B5B5] mt-1"[39m
              [36m>[39m
                [0mAction Roguelike[0m
              [36m</p>[39m
            [36m</div>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mclass[39m=[32m"flex-1 overflow-y-auto p-6 space-y-6"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"grid grid-cols-2 md:grid-cols-4 gap-3"[39m
            [36m>[39m
              [36m<div[39m
                [33mclass[39m=[32m"bg-[#141414] border border-[#1E1E1E] rounded-lg p-3"[39m
              [36m>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"flex items-center gap-2 text-[#A0A0A0] text-xs mb-1"[39m
                [36m>[39m
                  [36m<svg[39m
                    [33maria-hidden[39m=[32m"true"[39m
                    [33mclass[39m=[32m"lucide lucide-gamepad2 lucide-gamepad-2 w-4 h-4"[39m
                    [33mfill[39m=[32m"none"[39m
                    [33mheight[39m=[32m"24"[39m
                    [33mstroke[39m=[32m"currentColor"[39m
                    [33mstroke-linecap[39m=[32m"round"[39m
                    [33mstroke-linejoin[39m=[32m"round"[39m
                    [33mstroke-width[39m=[32m"2"[39m
                    [33mviewBox[39m=[32m"0 0 24 24"[39m
                    [33mwidth[39m=[32m"24"[39m
                    [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                  [36m>[39m
                    [36m<line[39m
                      [33mx1[39m=[32m"6"[39m
                      [33mx2[39m=[32m"10"[39m
                      [33my1[39m=[32m"11"[39m
                      [33my2[39m=[32m"11"[39m
                    [36m/>[39m
                    [36m<line[39m
                      [33mx1[39m=[32m"8"[39m
                      [33mx2[39m=[32m"8"[39m
                      [33my1[39m=[32m"9"[39m
                      [33my2[39m=[32m"13"[39m
                    [36m/>[39m
                    [36m<line[39m
                      [33mx1[39m=[32m"15"[39m
                      [33mx2[39m=[32m"15.01"[39m
                      [33my1[39m=[32m"12"[39m
                      [33my2[39m=[32m"12"[39m
                    [36m/>[39m
                    [36m<line[39m
                      [33mx1[39m=[32m"18"[39m
                      [33mx2[39m=[32m"18.01"[39m
                      [33my1[39m=[32m"10"[39m
                      [33my2[39m=[32m"10"[39m
                    [36m/>[39m
                    [36m<path[39m
                      [3...

      252 |       );
      253 |       mockRecommendation.tags.forEach((tag) => {
    > 254 |         expect(screen.getByText(tag)).toBeInTheDocument();
          |                       ^
      255 |       });
      256 |     });
      257 |

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at getElementError (node_modules/@testing-library/dom/dist/query-helpers.js:20:35)
      at getMultipleElementsFoundError (node_modules/@testing-library/dom/dist/query-helpers.js:23:10)
      at node_modules/@testing-library/dom/dist/query-helpers.js:55:13
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at getByText (__tests__/components/Recommendations/GameDetailModal.test.tsx:254:23)
          at Array.forEach (<anonymous>)
      at Object.forEach (__tests__/components/Recommendations/GameDetailModal.test.tsx:253:31)

  console.error
    AI Search error: Error: Failed to generate recommendations
        at handleAiSearch (/Users/shlomiashkenazi/Desktop/Studying/Afeka/Agile/gaming-app/components/Recommendations/RecommendationsView.tsx:88:15)

       97 |       }));
       98 |     } catch (error) {
    >  99 |       console.error('AI Search error:', error);
          |               ^
      100 |       setSearchError(error instanceof Error ? error.message : 'Something went wrong');
      101 |     } finally {
      102 |       setIsSearching(false);

      at error (components/Recommendations/RecommendationsView.tsx:99:15)

FAIL __tests__/components/Recommendations/RecommendationsView.test.tsx (5.898 s)
  RecommendationsView
    Initial Rendering
      ✓ renders the page header (433 ms)
      ✓ renders the default subtitle (83 ms)
      ✓ renders the AI search input (67 ms)
      ✓ renders the search button (370 ms)
      ✓ renders helper text for AI search (88 ms)
      ✓ renders the sidebar with explore as active item (45 ms)
      ✓ renders the filter panel (47 ms)
    Recommendation Display Tiers
      ✓ renders Top Pick section for gold tier (63 ms)
      ✓ renders Great Matches section for silver tier (57 ms)
      ✓ renders More Recommendations section for bronze tier (54 ms)
      ✓ displays the first recommendation as gold tier (top pick) (48 ms)
      ✓ displays games 2-4 as silver tier (great matches) (53 ms)
      ✓ displays games 5+ as bronze tier (63 ms)
    Stats Footer
      ✓ displays the total recommendation count (40 ms)
      ✓ displays the average match percentage (34 ms)
    AI Search Functionality
      ✓ disables search button when input is empty (101 ms)
      ✓ enables search button when input has text (124 ms)
      ✓ shows loading state during search (79 ms)
      ✓ calls the API with correct parameters when searching (109 ms)
      ✓ displays AI results after successful search (95 ms)
      ✓ displays active search indicator after search (341 ms)
      ✓ displays error message when search fails (233 ms)
      ✓ updates subtitle when search is active (235 ms)
    Search History
      ✓ does not show search history when empty (81 ms)
      ✓ shows search history after a successful search (179 ms)
      ✓ loads results from history when clicked (324 ms)
    Clear Search
      ✕ clears AI search results when clear button is clicked (159 ms)
    Game Detail Modal
      ✓ opens modal when a game card is clicked (108 ms)
      ✓ closes modal when close button is clicked (234 ms)
    Filter Changes with Debouncing
      ✕ triggers API call after filter change with debounce (52 ms)
      ✕ shows filter loading indicator during filter-based fetch (50 ms)
    No Results State
      ✓ shows no matches message when filtered results are empty (33 ms)
    Logout Functionality
      ✓ calls logout API and redirects when logout is clicked (33 ms)
    Available Genres
      ✕ extracts unique genres from recommendations (45 ms)
    Sorting
      ✓ sorts by similarity by default (43 ms)
      ✓ changes sort order when sort option is selected (139 ms)
      ✓ sorts by release date when selected (201 ms)
    Filter Panel Integration
      ✕ applies difficulty filter (124 ms)
      ✓ applies play time filter (79 ms)
      ✕ applies mode filter (49 ms)
      ✕ clears all filters (51 ms)
    Combined Search and Filters
      ✕ combines search query with filters in API call (116 ms)

  ● RecommendationsView › Clear Search › clears AI search results when clear button is clicked

    expect(element).not.toBeInTheDocument()

    expected document not to contain element, found <span class="text-sm text-violet-300">AI results for: "roguelike games"</span> instead

      465 |
      466 |       // Should show default static data again
    > 467 |       expect(screen.queryByText(/AI results for/)).not.toBeInTheDocument();
          |                                                        ^
      468 |       expect(screen.getByText('Mock Game 1')).toBeInTheDocument();
      469 |     });
      470 |   });

      at Object.toBeInTheDocument (__tests__/components/Recommendations/RecommendationsView.test.tsx:467:56)

  ● RecommendationsView › Filter Changes with Debouncing › triggers API call after filter change with debounce

    TestingLibraryElementError: Found multiple elements with the text: Action

    Here are the matching elements:

    Ignored nodes: comments, script, style
    [36m<p[39m
      [33mclass[39m=[32m"text-sm text-[#B5B5B5]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</p>[39m

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</span>[39m

    Ignored nodes: comments, script, style
    [36m<p[39m
      [33mclass[39m=[32m"text-sm text-[#B5B5B5]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</p>[39m

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</span>[39m

    Ignored nodes: comments, script, style
    [36m<button[39m
      [33mclass[39m=[32m"px-2.5 py-1 rounded text-xs transition-all duration-200 bg-[#141414] text-[#B5B5B5] border border-[#1E1E1E] hover:border-[#2A2A2A]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</button>[39m

    (If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

    Ignored nodes: comments, script, style
    [36m<body>[39m
      [36m<div>[39m
        [36m<div[39m
          [33mclass[39m=[32m"min-h-screen bg-black relative"[39m
        [36m>[39m
          [36m<div[39m
            [33mclass[39m=[32m"fixed inset-0 z-0"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 opacity-30"[39m
            [36m/>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 opacity-30"[39m
            [36m/>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mdata-testid[39m=[32m"sidebar"[39m
          [36m>[39m
            [36m<span[39m
              [33mdata-testid[39m=[32m"active-item"[39m
            [36m>[39m
              [0mexplore[0m
            [36m</span>[39m
            [36m<button[39m
              [33mdata-testid[39m=[32m"logout-button"[39m
            [36m>[39m
              [0mLogout[0m
            [36m</button>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mclass[39m=[32m"ml-20 flex h-screen relative z-10"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex-1 overflow-y-auto scroll-smooth"[39m
            [36m>[39m
              [36m<div[39m
                [33mclass[39m=[32m"py-12 px-8 max-w-[1400px]"[39m
              [36m>[39m
                [36m<div[39m
                  [33manimate[39m=[32m"[object Object]"[39m
                  [33mclass[39m=[32m"mb-10"[39m
                  [33minitial[39m=[32m"[object Object]"[39m
                  [33mtransition[39m=[32m"[object Object]"[39m
                [36m>[39m
                  [36m<div[39m
                    [33mclass[39m=[32m"flex items-center gap-3 mb-2"[39m
                  [36m>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30"[39m
                    [36m>[39m
                      [36m<svg[39m
                        [33maria-hidden[39m=[32m"true"[39m
                        [33mclass[39m=[32m"lucide lucide-sparkles w-5 h-5 text-amber-400"[39m
                        [33mfill[39m=[32m"none"[39m
                        [33mheight[39m=[32m"24"[39m
                        [33mstroke[39m=[32m"currentColor"[39m
                        [33mstroke-linecap[39m=[32m"round"[39m
                        [33mstroke-linejoin[39m=[32m"round"[39m
                        [33mstroke-width[39m=[32m"2"[39m
                        [33mviewBox[39m=[32m"0 0 24 24"[39m
                        [33mwidth[39m=[32m"24"[39m
                        [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                      [36m>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
                        [36m/>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M20 2v4"[39m
                        [36m/>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M22 4h-4"[39m
                        [36m/>[39m
                        [36m<circle[39m
                          [33mcx[39m=[32m"4"[39m
                          [33mcy[39m=[32m"20"[39m
                          [33mr[39m=[32m"2"[39m
                        [36m/>[39m
                      [36m</svg>[39m
                    [36m</div>[39m
                    [36m<h1[39m
                      [33mclass[39m=[32m"text-3xl font-bold text-white/90 tracking-tight"[39m
                    [36m>[39m
                      [0mRecommended For You[0m
                    [36m</h1>[39m
                  [36m</div>[39m
                  [36m<p[39m
                    [33mclass[39m=[32m"text-[#B5B5B5] text-sm ml-12"[39m
                  [36m>[39m
                    [0mBased on your gaming history, preferences, and playstyle[0m
                  [36m</p>[39m
                [36m</div>[39m
                [36m<div[39m
                  [33manimate[39m=[32m"[object Object]"[39m
                  [33mclass[39m=[32m"mb-8"[39m
                  [33minitial[39m=[32m"[object Object]"[39m
                  [33mtransition[39m=[32m"[object Object]"[39m
                [36m>[39m
                  [36m<form[39m
                    [33mclass[39m=[32m"relative"[39m
                  [36m>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"relative group"[39m
                    [36m>[39m
                      [36m<div[39m
                        [33mclass[39m=[32m"absolute -inset-0.5 bg-gradient-to-r from-violet-600/50 via-purple-600/50 to-amber-500/50 rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 blur transition-opacity duration-300"[39m
                      [36m/>[39m
                      [36m<div[39m
                        [33mclass[39m=[32m"relative flex items-center bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl overflow-hidden group-hover:border-[#2A2A2A] group-focus-within:border-[#2A2A2A] transition-colors"[39m
                      [36m>[39m
                        [36m<div[39m
                          [33mclass[39m=[32m"flex items-center gap-2 pl-4 pr-2"[39m
                        [36m>[39m
                          [36m<div[39m
                            [33mclass[39m=[32m"flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-md border border-violet-500/20"[39m
                          [36m>[39m
                            [36m<svg[39m
                              [33maria-hidden[39m=[32m"true"[39m
                              [33mclass[39m=[32m"lucide lucide-sparkles w-3.5 h-3.5 text-violet-400"[39m
                              [33mfill[39m=[32m"none"[39m
                              [33mheight[39m=[32m"24"[39m
                              [33mstroke[39m=[32m"currentColor"[39m
                              [33mstroke-linecap[39m=[32m"round"[39m
                              [33mstroke-linejoin[39m=[32m"round"[39m
                              [33mstroke-width[39m=[32m"2"[39m
                              [33mviewBox[39m=[32m"0 0 24 24"[39m
                              [33mwidth[39m=[32m"24"[39m
                              [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                            [36m>[39m
                              [36m<path[39m
                                [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
                              [36m/>[39m
                              [36m<path[39m
                                [33md[39m=[32m"M20 2v4"[39m
                              [36m/>[39m
                              [36m<path[39m
                                [33md[39m=[3...

      532 |       // Click on a genre filter
      533 |       await act(async () => {
    > 534 |         fireEvent.click(screen.getByText('Action'));
          |                                ^
      535 |       });
      536 |
      537 |       // API should not be called immediately

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at getElementError (node_modules/@testing-library/dom/dist/query-helpers.js:20:35)
      at getMultipleElementsFoundError (node_modules/@testing-library/dom/dist/query-helpers.js:23:10)
      at node_modules/@testing-library/dom/dist/query-helpers.js:55:13
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at getByText (__tests__/components/Recommendations/RecommendationsView.test.tsx:534:32)
      at node_modules/@testing-library/react/dist/act-compat.js:47:24
      at Object.<anonymous>.process.env.NODE_ENV.exports.act (node_modules/react/cjs/react.development.js:814:22)
      at node_modules/@testing-library/react/dist/act-compat.js:46:25
      at Object.<anonymous> (__tests__/components/Recommendations/RecommendationsView.test.tsx:533:16)

  ● RecommendationsView › Filter Changes with Debouncing › shows filter loading indicator during filter-based fetch

    TestingLibraryElementError: Found multiple elements with the text: Action

    Here are the matching elements:

    Ignored nodes: comments, script, style
    [36m<p[39m
      [33mclass[39m=[32m"text-sm text-[#B5B5B5]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</p>[39m

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</span>[39m

    Ignored nodes: comments, script, style
    [36m<p[39m
      [33mclass[39m=[32m"text-sm text-[#B5B5B5]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</p>[39m

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</span>[39m

    Ignored nodes: comments, script, style
    [36m<button[39m
      [33mclass[39m=[32m"px-2.5 py-1 rounded text-xs transition-all duration-200 bg-[#141414] text-[#B5B5B5] border border-[#1E1E1E] hover:border-[#2A2A2A]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</button>[39m

    (If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

    Ignored nodes: comments, script, style
    [36m<body>[39m
      [36m<div>[39m
        [36m<div[39m
          [33mclass[39m=[32m"min-h-screen bg-black relative"[39m
        [36m>[39m
          [36m<div[39m
            [33mclass[39m=[32m"fixed inset-0 z-0"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 opacity-30"[39m
            [36m/>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 opacity-30"[39m
            [36m/>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mdata-testid[39m=[32m"sidebar"[39m
          [36m>[39m
            [36m<span[39m
              [33mdata-testid[39m=[32m"active-item"[39m
            [36m>[39m
              [0mexplore[0m
            [36m</span>[39m
            [36m<button[39m
              [33mdata-testid[39m=[32m"logout-button"[39m
            [36m>[39m
              [0mLogout[0m
            [36m</button>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mclass[39m=[32m"ml-20 flex h-screen relative z-10"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex-1 overflow-y-auto scroll-smooth"[39m
            [36m>[39m
              [36m<div[39m
                [33mclass[39m=[32m"py-12 px-8 max-w-[1400px]"[39m
              [36m>[39m
                [36m<div[39m
                  [33manimate[39m=[32m"[object Object]"[39m
                  [33mclass[39m=[32m"mb-10"[39m
                  [33minitial[39m=[32m"[object Object]"[39m
                  [33mtransition[39m=[32m"[object Object]"[39m
                [36m>[39m
                  [36m<div[39m
                    [33mclass[39m=[32m"flex items-center gap-3 mb-2"[39m
                  [36m>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30"[39m
                    [36m>[39m
                      [36m<svg[39m
                        [33maria-hidden[39m=[32m"true"[39m
                        [33mclass[39m=[32m"lucide lucide-sparkles w-5 h-5 text-amber-400"[39m
                        [33mfill[39m=[32m"none"[39m
                        [33mheight[39m=[32m"24"[39m
                        [33mstroke[39m=[32m"currentColor"[39m
                        [33mstroke-linecap[39m=[32m"round"[39m
                        [33mstroke-linejoin[39m=[32m"round"[39m
                        [33mstroke-width[39m=[32m"2"[39m
                        [33mviewBox[39m=[32m"0 0 24 24"[39m
                        [33mwidth[39m=[32m"24"[39m
                        [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                      [36m>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
                        [36m/>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M20 2v4"[39m
                        [36m/>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M22 4h-4"[39m
                        [36m/>[39m
                        [36m<circle[39m
                          [33mcx[39m=[32m"4"[39m
                          [33mcy[39m=[32m"20"[39m
                          [33mr[39m=[32m"2"[39m
                        [36m/>[39m
                      [36m</svg>[39m
                    [36m</div>[39m
                    [36m<h1[39m
                      [33mclass[39m=[32m"text-3xl font-bold text-white/90 tracking-tight"[39m
                    [36m>[39m
                      [0mRecommended For You[0m
                    [36m</h1>[39m
                  [36m</div>[39m
                  [36m<p[39m
                    [33mclass[39m=[32m"text-[#B5B5B5] text-sm ml-12"[39m
                  [36m>[39m
                    [0mBased on your gaming history, preferences, and playstyle[0m
                  [36m</p>[39m
                [36m</div>[39m
                [36m<div[39m
                  [33manimate[39m=[32m"[object Object]"[39m
                  [33mclass[39m=[32m"mb-8"[39m
                  [33minitial[39m=[32m"[object Object]"[39m
                  [33mtransition[39m=[32m"[object Object]"[39m
                [36m>[39m
                  [36m<form[39m
                    [33mclass[39m=[32m"relative"[39m
                  [36m>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"relative group"[39m
                    [36m>[39m
                      [36m<div[39m
                        [33mclass[39m=[32m"absolute -inset-0.5 bg-gradient-to-r from-violet-600/50 via-purple-600/50 to-amber-500/50 rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 blur transition-opacity duration-300"[39m
                      [36m/>[39m
                      [36m<div[39m
                        [33mclass[39m=[32m"relative flex items-center bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl overflow-hidden group-hover:border-[#2A2A2A] group-focus-within:border-[#2A2A2A] transition-colors"[39m
                      [36m>[39m
                        [36m<div[39m
                          [33mclass[39m=[32m"flex items-center gap-2 pl-4 pr-2"[39m
                        [36m>[39m
                          [36m<div[39m
                            [33mclass[39m=[32m"flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-md border border-violet-500/20"[39m
                          [36m>[39m
                            [36m<svg[39m
                              [33maria-hidden[39m=[32m"true"[39m
                              [33mclass[39m=[32m"lucide lucide-sparkles w-3.5 h-3.5 text-violet-400"[39m
                              [33mfill[39m=[32m"none"[39m
                              [33mheight[39m=[32m"24"[39m
                              [33mstroke[39m=[32m"currentColor"[39m
                              [33mstroke-linecap[39m=[32m"round"[39m
                              [33mstroke-linejoin[39m=[32m"round"[39m
                              [33mstroke-width[39m=[32m"2"[39m
                              [33mviewBox[39m=[32m"0 0 24 24"[39m
                              [33mwidth[39m=[32m"24"[39m
                              [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                            [36m>[39m
                              [36m<path[39m
                                [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
                              [36m/>[39m
                              [36m<path[39m
                                [33md[39m=[32m"M20 2v4"[39m
                              [36m/>[39m
                              [36m<path[39m
                                [33md[39m=[3...

      559 |       // Click on a genre filter
      560 |       await act(async () => {
    > 561 |         fireEvent.click(screen.getByText('Action'));
          |                                ^
      562 |       });
      563 |
      564 |       // Fast-forward debounce timer

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at getElementError (node_modules/@testing-library/dom/dist/query-helpers.js:20:35)
      at getMultipleElementsFoundError (node_modules/@testing-library/dom/dist/query-helpers.js:23:10)
      at node_modules/@testing-library/dom/dist/query-helpers.js:55:13
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at getByText (__tests__/components/Recommendations/RecommendationsView.test.tsx:561:32)
      at node_modules/@testing-library/react/dist/act-compat.js:47:24
      at Object.<anonymous>.process.env.NODE_ENV.exports.act (node_modules/react/cjs/react.development.js:814:22)
      at node_modules/@testing-library/react/dist/act-compat.js:46:25
      at Object.<anonymous> (__tests__/components/Recommendations/RecommendationsView.test.tsx:560:16)

  ● RecommendationsView › Available Genres › extracts unique genres from recommendations

    TestingLibraryElementError: Found multiple elements with the text: Action

    Here are the matching elements:

    Ignored nodes: comments, script, style
    [36m<p[39m
      [33mclass[39m=[32m"text-sm text-[#B5B5B5]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</p>[39m

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</span>[39m

    Ignored nodes: comments, script, style
    [36m<p[39m
      [33mclass[39m=[32m"text-sm text-[#B5B5B5]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</p>[39m

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</span>[39m

    Ignored nodes: comments, script, style
    [36m<button[39m
      [33mclass[39m=[32m"px-2.5 py-1 rounded text-xs transition-all duration-200 bg-[#141414] text-[#B5B5B5] border border-[#1E1E1E] hover:border-[#2A2A2A]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</button>[39m

    (If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

    Ignored nodes: comments, script, style
    [36m<body>[39m
      [36m<div>[39m
        [36m<div[39m
          [33mclass[39m=[32m"min-h-screen bg-black relative"[39m
        [36m>[39m
          [36m<div[39m
            [33mclass[39m=[32m"fixed inset-0 z-0"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 opacity-30"[39m
            [36m/>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 opacity-30"[39m
            [36m/>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mdata-testid[39m=[32m"sidebar"[39m
          [36m>[39m
            [36m<span[39m
              [33mdata-testid[39m=[32m"active-item"[39m
            [36m>[39m
              [0mexplore[0m
            [36m</span>[39m
            [36m<button[39m
              [33mdata-testid[39m=[32m"logout-button"[39m
            [36m>[39m
              [0mLogout[0m
            [36m</button>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mclass[39m=[32m"ml-20 flex h-screen relative z-10"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex-1 overflow-y-auto scroll-smooth"[39m
            [36m>[39m
              [36m<div[39m
                [33mclass[39m=[32m"py-12 px-8 max-w-[1400px]"[39m
              [36m>[39m
                [36m<div[39m
                  [33manimate[39m=[32m"[object Object]"[39m
                  [33mclass[39m=[32m"mb-10"[39m
                  [33minitial[39m=[32m"[object Object]"[39m
                  [33mtransition[39m=[32m"[object Object]"[39m
                [36m>[39m
                  [36m<div[39m
                    [33mclass[39m=[32m"flex items-center gap-3 mb-2"[39m
                  [36m>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30"[39m
                    [36m>[39m
                      [36m<svg[39m
                        [33maria-hidden[39m=[32m"true"[39m
                        [33mclass[39m=[32m"lucide lucide-sparkles w-5 h-5 text-amber-400"[39m
                        [33mfill[39m=[32m"none"[39m
                        [33mheight[39m=[32m"24"[39m
                        [33mstroke[39m=[32m"currentColor"[39m
                        [33mstroke-linecap[39m=[32m"round"[39m
                        [33mstroke-linejoin[39m=[32m"round"[39m
                        [33mstroke-width[39m=[32m"2"[39m
                        [33mviewBox[39m=[32m"0 0 24 24"[39m
                        [33mwidth[39m=[32m"24"[39m
                        [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                      [36m>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
                        [36m/>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M20 2v4"[39m
                        [36m/>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M22 4h-4"[39m
                        [36m/>[39m
                        [36m<circle[39m
                          [33mcx[39m=[32m"4"[39m
                          [33mcy[39m=[32m"20"[39m
                          [33mr[39m=[32m"2"[39m
                        [36m/>[39m
                      [36m</svg>[39m
                    [36m</div>[39m
                    [36m<h1[39m
                      [33mclass[39m=[32m"text-3xl font-bold text-white/90 tracking-tight"[39m
                    [36m>[39m
                      [0mRecommended For You[0m
                    [36m</h1>[39m
                  [36m</div>[39m
                  [36m<p[39m
                    [33mclass[39m=[32m"text-[#B5B5B5] text-sm ml-12"[39m
                  [36m>[39m
                    [0mBased on your gaming history, preferences, and playstyle[0m
                  [36m</p>[39m
                [36m</div>[39m
                [36m<div[39m
                  [33manimate[39m=[32m"[object Object]"[39m
                  [33mclass[39m=[32m"mb-8"[39m
                  [33minitial[39m=[32m"[object Object]"[39m
                  [33mtransition[39m=[32m"[object Object]"[39m
                [36m>[39m
                  [36m<form[39m
                    [33mclass[39m=[32m"relative"[39m
                  [36m>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"relative group"[39m
                    [36m>[39m
                      [36m<div[39m
                        [33mclass[39m=[32m"absolute -inset-0.5 bg-gradient-to-r from-violet-600/50 via-purple-600/50 to-amber-500/50 rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 blur transition-opacity duration-300"[39m
                      [36m/>[39m
                      [36m<div[39m
                        [33mclass[39m=[32m"relative flex items-center bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl overflow-hidden group-hover:border-[#2A2A2A] group-focus-within:border-[#2A2A2A] transition-colors"[39m
                      [36m>[39m
                        [36m<div[39m
                          [33mclass[39m=[32m"flex items-center gap-2 pl-4 pr-2"[39m
                        [36m>[39m
                          [36m<div[39m
                            [33mclass[39m=[32m"flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-md border border-violet-500/20"[39m
                          [36m>[39m
                            [36m<svg[39m
                              [33maria-hidden[39m=[32m"true"[39m
                              [33mclass[39m=[32m"lucide lucide-sparkles w-3.5 h-3.5 text-violet-400"[39m
                              [33mfill[39m=[32m"none"[39m
                              [33mheight[39m=[32m"24"[39m
                              [33mstroke[39m=[32m"currentColor"[39m
                              [33mstroke-linecap[39m=[32m"round"[39m
                              [33mstroke-linejoin[39m=[32m"round"[39m
                              [33mstroke-width[39m=[32m"2"[39m
                              [33mviewBox[39m=[32m"0 0 24 24"[39m
                              [33mwidth[39m=[32m"24"[39m
                              [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                            [36m>[39m
                              [36m<path[39m
                                [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
                              [36m/>[39m
                              [36m<path[39m
                                [33md[39m=[32m"M20 2v4"[39m
                              [36m/>[39m
                              [36m<path[39m
                                [33md[39m=[3...

      608 |
      609 |       // The FilterPanel should show all unique genres from mock data
    > 610 |       expect(screen.getByText('Action')).toBeInTheDocument();
          |                     ^
      611 |       expect(screen.getByText('RPG')).toBeInTheDocument();
      612 |       expect(screen.getByText('Strategy')).toBeInTheDocument();
      613 |       expect(screen.getByText('Puzzle')).toBeInTheDocument();

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at getElementError (node_modules/@testing-library/dom/dist/query-helpers.js:20:35)
      at getMultipleElementsFoundError (node_modules/@testing-library/dom/dist/query-helpers.js:23:10)
      at node_modules/@testing-library/dom/dist/query-helpers.js:55:13
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at Object.getByText (__tests__/components/Recommendations/RecommendationsView.test.tsx:610:21)

  ● RecommendationsView › Filter Panel Integration › applies difficulty filter

    TestingLibraryElementError: Found multiple elements with the text: Challenging

    Here are the matching elements:

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"px-2 py-1 rounded text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20"[39m
    [36m>[39m
      [0mChallenging[0m
    [36m</span>[39m

    Ignored nodes: comments, script, style
    [36m<span>[39m
      [0mChallenging[0m
    [36m</span>[39m

    (If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

    Ignored nodes: comments, script, style
    [36m<body>[39m
      [36m<div>[39m
        [36m<div[39m
          [33mclass[39m=[32m"min-h-screen bg-black relative"[39m
        [36m>[39m
          [36m<div[39m
            [33mclass[39m=[32m"fixed inset-0 z-0"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 opacity-30"[39m
            [36m/>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 opacity-30"[39m
            [36m/>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mdata-testid[39m=[32m"sidebar"[39m
          [36m>[39m
            [36m<span[39m
              [33mdata-testid[39m=[32m"active-item"[39m
            [36m>[39m
              [0mexplore[0m
            [36m</span>[39m
            [36m<button[39m
              [33mdata-testid[39m=[32m"logout-button"[39m
            [36m>[39m
              [0mLogout[0m
            [36m</button>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mclass[39m=[32m"ml-20 flex h-screen relative z-10"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex-1 overflow-y-auto scroll-smooth"[39m
            [36m>[39m
              [36m<div[39m
                [33mclass[39m=[32m"py-12 px-8 max-w-[1400px]"[39m
              [36m>[39m
                [36m<div[39m
                  [33manimate[39m=[32m"[object Object]"[39m
                  [33mclass[39m=[32m"mb-10"[39m
                  [33minitial[39m=[32m"[object Object]"[39m
                  [33mtransition[39m=[32m"[object Object]"[39m
                [36m>[39m
                  [36m<div[39m
                    [33mclass[39m=[32m"flex items-center gap-3 mb-2"[39m
                  [36m>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30"[39m
                    [36m>[39m
                      [36m<svg[39m
                        [33maria-hidden[39m=[32m"true"[39m
                        [33mclass[39m=[32m"lucide lucide-sparkles w-5 h-5 text-amber-400"[39m
                        [33mfill[39m=[32m"none"[39m
                        [33mheight[39m=[32m"24"[39m
                        [33mstroke[39m=[32m"currentColor"[39m
                        [33mstroke-linecap[39m=[32m"round"[39m
                        [33mstroke-linejoin[39m=[32m"round"[39m
                        [33mstroke-width[39m=[32m"2"[39m
                        [33mviewBox[39m=[32m"0 0 24 24"[39m
                        [33mwidth[39m=[32m"24"[39m
                        [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                      [36m>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
                        [36m/>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M20 2v4"[39m
                        [36m/>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M22 4h-4"[39m
                        [36m/>[39m
                        [36m<circle[39m
                          [33mcx[39m=[32m"4"[39m
                          [33mcy[39m=[32m"20"[39m
                          [33mr[39m=[32m"2"[39m
                        [36m/>[39m
                      [36m</svg>[39m
                    [36m</div>[39m
                    [36m<h1[39m
                      [33mclass[39m=[32m"text-3xl font-bold text-white/90 tracking-tight"[39m
                    [36m>[39m
                      [0mRecommended For You[0m
                    [36m</h1>[39m
                  [36m</div>[39m
                  [36m<p[39m
                    [33mclass[39m=[32m"text-[#B5B5B5] text-sm ml-12"[39m
                  [36m>[39m
                    [0mBased on your gaming history, preferences, and playstyle[0m
                  [36m</p>[39m
                [36m</div>[39m
                [36m<div[39m
                  [33manimate[39m=[32m"[object Object]"[39m
                  [33mclass[39m=[32m"mb-8"[39m
                  [33minitial[39m=[32m"[object Object]"[39m
                  [33mtransition[39m=[32m"[object Object]"[39m
                [36m>[39m
                  [36m<form[39m
                    [33mclass[39m=[32m"relative"[39m
                  [36m>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"relative group"[39m
                    [36m>[39m
                      [36m<div[39m
                        [33mclass[39m=[32m"absolute -inset-0.5 bg-gradient-to-r from-violet-600/50 via-purple-600/50 to-amber-500/50 rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 blur transition-opacity duration-300"[39m
                      [36m/>[39m
                      [36m<div[39m
                        [33mclass[39m=[32m"relative flex items-center bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl overflow-hidden group-hover:border-[#2A2A2A] group-focus-within:border-[#2A2A2A] transition-colors"[39m
                      [36m>[39m
                        [36m<div[39m
                          [33mclass[39m=[32m"flex items-center gap-2 pl-4 pr-2"[39m
                        [36m>[39m
                          [36m<div[39m
                            [33mclass[39m=[32m"flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-md border border-violet-500/20"[39m
                          [36m>[39m
                            [36m<svg[39m
                              [33maria-hidden[39m=[32m"true"[39m
                              [33mclass[39m=[32m"lucide lucide-sparkles w-3.5 h-3.5 text-violet-400"[39m
                              [33mfill[39m=[32m"none"[39m
                              [33mheight[39m=[32m"24"[39m
                              [33mstroke[39m=[32m"currentColor"[39m
                              [33mstroke-linecap[39m=[32m"round"[39m
                              [33mstroke-linejoin[39m=[32m"round"[39m
                              [33mstroke-width[39m=[32m"2"[39m
                              [33mviewBox[39m=[32m"0 0 24 24"[39m
                              [33mwidth[39m=[32m"24"[39m
                              [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                            [36m>[39m
                              [36m<path[39m
                                [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
                              [36m/>[39m
                              [36m<path[39m
                                [33md[39m=[32m"M20 2v4"[39m
                              [36m/>[39m
                              [36m<path[39m
                                [33md[39m=[3...

      658 |       // Click on Challenging difficulty
      659 |       await act(async () => {
    > 660 |         fireEvent.click(screen.getByText('Challenging'));
          |                                ^
      661 |       });
      662 |
      663 |       // Should show filter is active

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at getElementError (node_modules/@testing-library/dom/dist/query-helpers.js:20:35)
      at getMultipleElementsFoundError (node_modules/@testing-library/dom/dist/query-helpers.js:23:10)
      at node_modules/@testing-library/dom/dist/query-helpers.js:55:13
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at getByText (__tests__/components/Recommendations/RecommendationsView.test.tsx:660:32)
      at node_modules/@testing-library/react/dist/act-compat.js:47:24
      at Object.<anonymous>.process.env.NODE_ENV.exports.act (node_modules/react/cjs/react.development.js:814:22)
      at node_modules/@testing-library/react/dist/act-compat.js:46:25
      at Object.<anonymous> (__tests__/components/Recommendations/RecommendationsView.test.tsx:659:16)

  ● RecommendationsView › Filter Panel Integration › applies mode filter

    TestingLibraryElementError: Found multiple elements with the text: Solo

    Here are the matching elements:

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"inline-flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/80"[39m
    [36m>[39m
      [36m<svg[39m
        [33maria-hidden[39m=[32m"true"[39m
        [33mclass[39m=[32m"lucide lucide-gamepad2 lucide-gamepad-2 w-3.5 h-3.5"[39m
        [33mfill[39m=[32m"none"[39m
        [33mheight[39m=[32m"24"[39m
        [33mstroke[39m=[32m"currentColor"[39m
        [33mstroke-linecap[39m=[32m"round"[39m
        [33mstroke-linejoin[39m=[32m"round"[39m
        [33mstroke-width[39m=[32m"2"[39m
        [33mviewBox[39m=[32m"0 0 24 24"[39m
        [33mwidth[39m=[32m"24"[39m
        [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
      [36m>[39m
        [36m<line[39m
          [33mx1[39m=[32m"6"[39m
          [33mx2[39m=[32m"10"[39m
          [33my1[39m=[32m"11"[39m
          [33my2[39m=[32m"11"[39m
        [36m/>[39m
        [36m<line[39m
          [33mx1[39m=[32m"8"[39m
          [33mx2[39m=[32m"8"[39m
          [33my1[39m=[32m"9"[39m
          [33my2[39m=[32m"13"[39m
        [36m/>[39m
        [36m<line[39m
          [33mx1[39m=[32m"15"[39m
          [33mx2[39m=[32m"15.01"[39m
          [33my1[39m=[32m"12"[39m
          [33my2[39m=[32m"12"[39m
        [36m/>[39m
        [36m<line[39m
          [33mx1[39m=[32m"18"[39m
          [33mx2[39m=[32m"18.01"[39m
          [33my1[39m=[32m"10"[39m
          [33my2[39m=[32m"10"[39m
        [36m/>[39m
        [36m<path[39m
          [33md[39m=[32m"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"[39m
        [36m/>[39m
      [36m</svg>[39m
      [0mSolo[0m
    [36m</span>[39m

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"inline-flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/80"[39m
    [36m>[39m
      [36m<svg[39m
        [33maria-hidden[39m=[32m"true"[39m
        [33mclass[39m=[32m"lucide lucide-gamepad2 lucide-gamepad-2 w-3.5 h-3.5"[39m
        [33mfill[39m=[32m"none"[39m
        [33mheight[39m=[32m"24"[39m
        [33mstroke[39m=[32m"currentColor"[39m
        [33mstroke-linecap[39m=[32m"round"[39m
        [33mstroke-linejoin[39m=[32m"round"[39m
        [33mstroke-width[39m=[32m"2"[39m
        [33mviewBox[39m=[32m"0 0 24 24"[39m
        [33mwidth[39m=[32m"24"[39m
        [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
      [36m>[39m
        [36m<line[39m
          [33mx1[39m=[32m"6"[39m
          [33mx2[39m=[32m"10"[39m
          [33my1[39m=[32m"11"[39m
          [33my2[39m=[32m"11"[39m
        [36m/>[39m
        [36m<line[39m
          [33mx1[39m=[32m"8"[39m
          [33mx2[39m=[32m"8"[39m
          [33my1[39m=[32m"9"[39m
          [33my2[39m=[32m"13"[39m
        [36m/>[39m
        [36m<line[39m
          [33mx1[39m=[32m"15"[39m
          [33mx2[39m=[32m"15.01"[39m
          [33my1[39m=[32m"12"[39m
          [33my2[39m=[32m"12"[39m
        [36m/>[39m
        [36m<line[39m
          [33mx1[39m=[32m"18"[39m
          [33mx2[39m=[32m"18.01"[39m
          [33my1[39m=[32m"10"[39m
          [33my2[39m=[32m"10"[39m
        [36m/>[39m
        [36m<path[39m
          [33md[39m=[32m"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"[39m
        [36m/>[39m
      [36m</svg>[39m
      [0mSolo[0m
    [36m</span>[39m

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"inline-flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/80"[39m
    [36m>[39m
      [36m<svg[39m
        [33maria-hidden[39m=[32m"true"[39m
        [33mclass[39m=[32m"lucide lucide-gamepad2 lucide-gamepad-2 w-3.5 h-3.5"[39m
        [33mfill[39m=[32m"none"[39m
        [33mheight[39m=[32m"24"[39m
        [33mstroke[39m=[32m"currentColor"[39m
        [33mstroke-linecap[39m=[32m"round"[39m
        [33mstroke-linejoin[39m=[32m"round"[39m
        [33mstroke-width[39m=[32m"2"[39m
        [33mviewBox[39m=[32m"0 0 24 24"[39m
        [33mwidth[39m=[32m"24"[39m
        [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
      [36m>[39m
        [36m<line[39m
          [33mx1[39m=[32m"6"[39m
          [33mx2[39m=[32m"10"[39m
          [33my1[39m=[32m"11"[39m
          [33my2[39m=[32m"11"[39m
        [36m/>[39m
        [36m<line[39m
          [33mx1[39m=[32m"8"[39m
          [33mx2[39m=[32m"8"[39m
          [33my1[39m=[32m"9"[39m
          [33my2[39m=[32m"13"[39m
        [36m/>[39m
        [36m<line[39m
          [33mx1[39m=[32m"15"[39m
          [33mx2[39m=[32m"15.01"[39m
          [33my1[39m=[32m"12"[39m
          [33my2[39m=[32m"12"[39m
        [36m/>[39m
        [36m<line[39m
          [33mx1[39m=[32m"18"[39m
          [33mx2[39m=[32m"18.01"[39m
          [33my1[39m=[32m"10"[39m
          [33my2[39m=[32m"10"[39m
        [36m/>[39m
        [36m<path[39m
          [33md[39m=[32m"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"[39m
        [36m/>[39m
      [36m</svg>[39m
      [0mSolo[0m
    [36m</span>[39m

    Ignored nodes: comments, script, style
    [36m<button[39m
      [33mclass[39m=[32m"px-3 py-1.5 rounded text-xs transition-all duration-200 bg-[#141414] text-[#B5B5B5] border border-[#1E1E1E] hover:border-[#2A2A2A]"[39m
    [36m>[39m
      [0mSolo[0m
    [36m</button>[39m

    (If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

    Ignored nodes: comments, script, style
    [36m<body>[39m
      [36m<div>[39m
        [36m<div[39m
          [33mclass[39m=[32m"min-h-screen bg-black relative"[39m
        [36m>[39m
          [36m<div[39m
            [33mclass[39m=[32m"fixed inset-0 z-0"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 opacity-30"[39m
            [36m/>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 opacity-30"[39m
            [36m/>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mdata-testid[39m=[32m"sidebar"[39m
          [36m>[39m
            [36m<span[39m
              [33mdata-testid[39m=[32m"active-item"[39m
            [36m>[39m
              [0mexplore[0m
            [36m</span>[39m
            [36m<button[39m
              [33mdata-testid[39m=[32m"logout-button"[39m
            [36m>[39m
              [0mLogout[0m
            [36m</button>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mclass[39m=[32m"ml-20 flex h-screen relative z-10"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex-1 overflow-y-auto scroll-smooth"[39m
            [36m>[39m
              [36m<div[39m
                [33mclass[39m=[32m"py-12 px-8 max-w-[1400px]"[39m
              [36m>[39m
                [36m<div[39m
                  [33manimate[39m=[32m"[object Object]"[39m
                  [33mclass[39m=[32m"mb-10"[39m
                  [33minitial[39m=[32m"[object Object]"[39m
                  [33mtransition[39m=[32m"[object Object]"[39m
                [36m>[39m
                  [36m<div[39m
                    [33mclass[39m=[32m"flex items-center gap-3 mb-2"[39m
                  [36m>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30"[39m
                    [36m>[39m
                      [36m<svg[39m
                        [33maria-hidden[39m=[32m"true"[39m
                        [33mclass[39m=[32m"lucide lucide-sparkles w-5 h-5 text-amber-400"[39m
                        [33mfill[39m=[32m"none"[39m
                        [33mheight[39m=[32m"24"[39m
                        [33mstroke[39m=[32m"currentColor"[39m
                        [33mstroke-linecap[39m=[32m"round"[39m
                        [33mstroke-linejoin[39m=[32m"round"[39m
                        [33mstroke-width[39m=[32m"2"[39m
                        [33mviewBox[39m=[32m"0 0 24 24"[39m
                        [33mwidth[39m=[32m"24"[39m
                        [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                      [36m>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
                        [36m/>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M20 2v4"[39m
                        [36m/>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M22 4h-4"[39m
                        [36m/>[39m
                        [36m<circle[39m
                          [33mcx[39m=[32m"4"[39m
                          [33mcy[39m=[32m"20"[39m
                          [33mr[39m=[32m"2"[39m
                        [36m/>[39m
                      [36m</svg>[39m
                    [36m</div>[39m
                    [36m<h1[39m
                      [33mclass[39m=[32m"text-3xl font-bold text-white/90 tracking-tight"[39m
                    [36m>[39m
                      [0mRecommended For You[0m
                    [36m</h1>[39m
                  [36m</div>[39m
                  [36m<p[39m
                    [33mclass[39m=[32m"text-[#B5B5B5] text-sm ml-12"[39m
                  [36m>[39m
                    [0mBased on your gaming history, preferences, and playstyle[0m
                  [36m</p>[39m
                [36m</div>[39m
                [36m<div[39m
                  [33manimate[39m=[32m"[object Object]"[39m
                  [33mclass[39m=[32m"mb-8"[39m
                  [33minitial[39m=[32m"[object Object]"[39m
                  [33mtransition[39m=[32m"[object Object]"[39m
                [36m>[39m
                  [36m<form[39m
                    [33mclass[39m=[32m"relative"[39m
                  [36m>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"relative group"[39m
                    [36m>[39m
                      [36m<div[39m
                        [33mclass[39m=[32m"absolute -inset-0.5 bg-gradient-to-r from-violet-600/50 via-purple-600/50 to-amber-500/50 rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 blur transition-opacity duration-300"[39m
                      [36m/>[39m
                      [36m<div[39m
                        [33mclass[39m=[32m"relative flex items-center bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl overflow-hidden group-hover:border-[#2A2A2A] group-focus-within:border-[#2A2A2A] transition-colors"[39m
                      [36m>[39m
                        [36m<div[39m
                          [33mclass[39m=[32m"flex items-center gap-2 pl-4 pr-2"[39m
                        [36m>[39m
                          [36m<div[39m
                            [33mclass[39m=[32m"flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-md border border-violet-500/20"[39m
                          [36m>[39m
                            [36m<svg[39m
                              [33maria-hidden[39m=[32m"true"[39m
                              [33mclass[39m=[32m"lucide lucide-sparkles w-3.5 h-3.5 text-violet-400"[39m
                              [33mfill[39m=[32m"none"[39m
                              [33mheight[39m=[32m"24"[39m
                              [33mstroke[39m=[32m"currentColor"[39m
                              [33mstroke-linecap[39m=[32m"round"[39m
                              [33mstroke-linejoin[39m=[32m"round"[39m
                              [33mstroke-width[39m=[32m"2"[39m
                              [33mviewBox[39m=[32m"0 0 24 24"[39m
                              [33mwidth[39m=[32m"24"[39m
                              [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                            [36m>[39m
                              [36m<path[39m
                                [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
                              [36m/>[39m
                              [36m<path[39m
                                [33md[39m=[32m"M20 2v4"[39m
                              [36m/>[39m
                              [36m<path[39m
                                [33md[39m=[3...

      682 |       // Click on Solo
      683 |       await act(async () => {
    > 684 |         fireEvent.click(screen.getByText('Solo'));
          |                                ^
      685 |       });
      686 |
      687 |       // Should show filter is active

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at getElementError (node_modules/@testing-library/dom/dist/query-helpers.js:20:35)
      at getMultipleElementsFoundError (node_modules/@testing-library/dom/dist/query-helpers.js:23:10)
      at node_modules/@testing-library/dom/dist/query-helpers.js:55:13
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at getByText (__tests__/components/Recommendations/RecommendationsView.test.tsx:684:32)
      at node_modules/@testing-library/react/dist/act-compat.js:47:24
      at Object.<anonymous>.process.env.NODE_ENV.exports.act (node_modules/react/cjs/react.development.js:814:22)
      at node_modules/@testing-library/react/dist/act-compat.js:46:25
      at Object.<anonymous> (__tests__/components/Recommendations/RecommendationsView.test.tsx:683:16)

  ● RecommendationsView › Filter Panel Integration › clears all filters

    TestingLibraryElementError: Found multiple elements with the text: Action

    Here are the matching elements:

    Ignored nodes: comments, script, style
    [36m<p[39m
      [33mclass[39m=[32m"text-sm text-[#B5B5B5]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</p>[39m

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</span>[39m

    Ignored nodes: comments, script, style
    [36m<p[39m
      [33mclass[39m=[32m"text-sm text-[#B5B5B5]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</p>[39m

    Ignored nodes: comments, script, style
    [36m<span[39m
      [33mclass[39m=[32m"px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</span>[39m

    Ignored nodes: comments, script, style
    [36m<button[39m
      [33mclass[39m=[32m"px-2.5 py-1 rounded text-xs transition-all duration-200 bg-[#141414] text-[#B5B5B5] border border-[#1E1E1E] hover:border-[#2A2A2A]"[39m
    [36m>[39m
      [0mAction[0m
    [36m</button>[39m

    (If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

    Ignored nodes: comments, script, style
    [36m<body>[39m
      [36m<div>[39m
        [36m<div[39m
          [33mclass[39m=[32m"min-h-screen bg-black relative"[39m
        [36m>[39m
          [36m<div[39m
            [33mclass[39m=[32m"fixed inset-0 z-0"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 opacity-30"[39m
            [36m/>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 opacity-30"[39m
            [36m/>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mdata-testid[39m=[32m"sidebar"[39m
          [36m>[39m
            [36m<span[39m
              [33mdata-testid[39m=[32m"active-item"[39m
            [36m>[39m
              [0mexplore[0m
            [36m</span>[39m
            [36m<button[39m
              [33mdata-testid[39m=[32m"logout-button"[39m
            [36m>[39m
              [0mLogout[0m
            [36m</button>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mclass[39m=[32m"ml-20 flex h-screen relative z-10"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex-1 overflow-y-auto scroll-smooth"[39m
            [36m>[39m
              [36m<div[39m
                [33mclass[39m=[32m"py-12 px-8 max-w-[1400px]"[39m
              [36m>[39m
                [36m<div[39m
                  [33manimate[39m=[32m"[object Object]"[39m
                  [33mclass[39m=[32m"mb-10"[39m
                  [33minitial[39m=[32m"[object Object]"[39m
                  [33mtransition[39m=[32m"[object Object]"[39m
                [36m>[39m
                  [36m<div[39m
                    [33mclass[39m=[32m"flex items-center gap-3 mb-2"[39m
                  [36m>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30"[39m
                    [36m>[39m
                      [36m<svg[39m
                        [33maria-hidden[39m=[32m"true"[39m
                        [33mclass[39m=[32m"lucide lucide-sparkles w-5 h-5 text-amber-400"[39m
                        [33mfill[39m=[32m"none"[39m
                        [33mheight[39m=[32m"24"[39m
                        [33mstroke[39m=[32m"currentColor"[39m
                        [33mstroke-linecap[39m=[32m"round"[39m
                        [33mstroke-linejoin[39m=[32m"round"[39m
                        [33mstroke-width[39m=[32m"2"[39m
                        [33mviewBox[39m=[32m"0 0 24 24"[39m
                        [33mwidth[39m=[32m"24"[39m
                        [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                      [36m>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
                        [36m/>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M20 2v4"[39m
                        [36m/>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M22 4h-4"[39m
                        [36m/>[39m
                        [36m<circle[39m
                          [33mcx[39m=[32m"4"[39m
                          [33mcy[39m=[32m"20"[39m
                          [33mr[39m=[32m"2"[39m
                        [36m/>[39m
                      [36m</svg>[39m
                    [36m</div>[39m
                    [36m<h1[39m
                      [33mclass[39m=[32m"text-3xl font-bold text-white/90 tracking-tight"[39m
                    [36m>[39m
                      [0mRecommended For You[0m
                    [36m</h1>[39m
                  [36m</div>[39m
                  [36m<p[39m
                    [33mclass[39m=[32m"text-[#B5B5B5] text-sm ml-12"[39m
                  [36m>[39m
                    [0mBased on your gaming history, preferences, and playstyle[0m
                  [36m</p>[39m
                [36m</div>[39m
                [36m<div[39m
                  [33manimate[39m=[32m"[object Object]"[39m
                  [33mclass[39m=[32m"mb-8"[39m
                  [33minitial[39m=[32m"[object Object]"[39m
                  [33mtransition[39m=[32m"[object Object]"[39m
                [36m>[39m
                  [36m<form[39m
                    [33mclass[39m=[32m"relative"[39m
                  [36m>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"relative group"[39m
                    [36m>[39m
                      [36m<div[39m
                        [33mclass[39m=[32m"absolute -inset-0.5 bg-gradient-to-r from-violet-600/50 via-purple-600/50 to-amber-500/50 rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 blur transition-opacity duration-300"[39m
                      [36m/>[39m
                      [36m<div[39m
                        [33mclass[39m=[32m"relative flex items-center bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl overflow-hidden group-hover:border-[#2A2A2A] group-focus-within:border-[#2A2A2A] transition-colors"[39m
                      [36m>[39m
                        [36m<div[39m
                          [33mclass[39m=[32m"flex items-center gap-2 pl-4 pr-2"[39m
                        [36m>[39m
                          [36m<div[39m
                            [33mclass[39m=[32m"flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-md border border-violet-500/20"[39m
                          [36m>[39m
                            [36m<svg[39m
                              [33maria-hidden[39m=[32m"true"[39m
                              [33mclass[39m=[32m"lucide lucide-sparkles w-3.5 h-3.5 text-violet-400"[39m
                              [33mfill[39m=[32m"none"[39m
                              [33mheight[39m=[32m"24"[39m
                              [33mstroke[39m=[32m"currentColor"[39m
                              [33mstroke-linecap[39m=[32m"round"[39m
                              [33mstroke-linejoin[39m=[32m"round"[39m
                              [33mstroke-width[39m=[32m"2"[39m
                              [33mviewBox[39m=[32m"0 0 24 24"[39m
                              [33mwidth[39m=[32m"24"[39m
                              [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                            [36m>[39m
                              [36m<path[39m
                                [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
                              [36m/>[39m
                              [36m<path[39m
                                [33md[39m=[32m"M20 2v4"[39m
                              [36m/>[39m
                              [36m<path[39m
                                [33md[39m=[3...

      694 |       // Apply multiple filters
      695 |       await act(async () => {
    > 696 |         fireEvent.click(screen.getByText('Action'));
          |                                ^
      697 |         fireEvent.click(screen.getByText('Challenging'));
      698 |       });
      699 |

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at getElementError (node_modules/@testing-library/dom/dist/query-helpers.js:20:35)
      at getMultipleElementsFoundError (node_modules/@testing-library/dom/dist/query-helpers.js:23:10)
      at node_modules/@testing-library/dom/dist/query-helpers.js:55:13
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at getByText (__tests__/components/Recommendations/RecommendationsView.test.tsx:696:32)
      at node_modules/@testing-library/react/dist/act-compat.js:47:24
      at Object.<anonymous>.process.env.NODE_ENV.exports.act (node_modules/react/cjs/react.development.js:814:22)
      at node_modules/@testing-library/react/dist/act-compat.js:46:25
      at Object.<anonymous> (__tests__/components/Recommendations/RecommendationsView.test.tsx:695:16)

  ● RecommendationsView › Combined Search and Filters › combines search query with filters in API call

    TestingLibraryElementError: Unable to find an element with the text: Action. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

    Ignored nodes: comments, script, style
    [36m<body>[39m
      [36m<div>[39m
        [36m<div[39m
          [33mclass[39m=[32m"min-h-screen bg-black relative"[39m
        [36m>[39m
          [36m<div[39m
            [33mclass[39m=[32m"fixed inset-0 z-0"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 opacity-30"[39m
            [36m/>[39m
            [36m<div[39m
              [33mclass[39m=[32m"absolute inset-0 opacity-30"[39m
            [36m/>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mdata-testid[39m=[32m"sidebar"[39m
          [36m>[39m
            [36m<span[39m
              [33mdata-testid[39m=[32m"active-item"[39m
            [36m>[39m
              [0mexplore[0m
            [36m</span>[39m
            [36m<button[39m
              [33mdata-testid[39m=[32m"logout-button"[39m
            [36m>[39m
              [0mLogout[0m
            [36m</button>[39m
          [36m</div>[39m
          [36m<div[39m
            [33mclass[39m=[32m"ml-20 flex h-screen relative z-10"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex-1 overflow-y-auto scroll-smooth"[39m
            [36m>[39m
              [36m<div[39m
                [33mclass[39m=[32m"py-12 px-8 max-w-[1400px]"[39m
              [36m>[39m
                [36m<div[39m
                  [33manimate[39m=[32m"[object Object]"[39m
                  [33mclass[39m=[32m"mb-10"[39m
                  [33minitial[39m=[32m"[object Object]"[39m
                  [33mtransition[39m=[32m"[object Object]"[39m
                [36m>[39m
                  [36m<div[39m
                    [33mclass[39m=[32m"flex items-center gap-3 mb-2"[39m
                  [36m>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30"[39m
                    [36m>[39m
                      [36m<svg[39m
                        [33maria-hidden[39m=[32m"true"[39m
                        [33mclass[39m=[32m"lucide lucide-sparkles w-5 h-5 text-amber-400"[39m
                        [33mfill[39m=[32m"none"[39m
                        [33mheight[39m=[32m"24"[39m
                        [33mstroke[39m=[32m"currentColor"[39m
                        [33mstroke-linecap[39m=[32m"round"[39m
                        [33mstroke-linejoin[39m=[32m"round"[39m
                        [33mstroke-width[39m=[32m"2"[39m
                        [33mviewBox[39m=[32m"0 0 24 24"[39m
                        [33mwidth[39m=[32m"24"[39m
                        [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                      [36m>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
                        [36m/>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M20 2v4"[39m
                        [36m/>[39m
                        [36m<path[39m
                          [33md[39m=[32m"M22 4h-4"[39m
                        [36m/>[39m
                        [36m<circle[39m
                          [33mcx[39m=[32m"4"[39m
                          [33mcy[39m=[32m"20"[39m
                          [33mr[39m=[32m"2"[39m
                        [36m/>[39m
                      [36m</svg>[39m
                    [36m</div>[39m
                    [36m<h1[39m
                      [33mclass[39m=[32m"text-3xl font-bold text-white/90 tracking-tight"[39m
                    [36m>[39m
                      [0mRecommended For You[0m
                    [36m</h1>[39m
                  [36m</div>[39m
                  [36m<p[39m
                    [33mclass[39m=[32m"text-[#B5B5B5] text-sm ml-12"[39m
                  [36m>[39m
                    [0mAI-powered recommendations based on your query and gaming library[0m
                  [36m</p>[39m
                [36m</div>[39m
                [36m<div[39m
                  [33manimate[39m=[32m"[object Object]"[39m
                  [33mclass[39m=[32m"mb-8"[39m
                  [33minitial[39m=[32m"[object Object]"[39m
                  [33mtransition[39m=[32m"[object Object]"[39m
                [36m>[39m
                  [36m<form[39m
                    [33mclass[39m=[32m"relative"[39m
                  [36m>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"relative group"[39m
                    [36m>[39m
                      [36m<div[39m
                        [33mclass[39m=[32m"absolute -inset-0.5 bg-gradient-to-r from-violet-600/50 via-purple-600/50 to-amber-500/50 rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 blur transition-opacity duration-300"[39m
                      [36m/>[39m
                      [36m<div[39m
                        [33mclass[39m=[32m"relative flex items-center bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl overflow-hidden group-hover:border-[#2A2A2A] group-focus-within:border-[#2A2A2A] transition-colors"[39m
                      [36m>[39m
                        [36m<div[39m
                          [33mclass[39m=[32m"flex items-center gap-2 pl-4 pr-2"[39m
                        [36m>[39m
                          [36m<div[39m
                            [33mclass[39m=[32m"flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-md border border-violet-500/20"[39m
                          [36m>[39m
                            [36m<svg[39m
                              [33maria-hidden[39m=[32m"true"[39m
                              [33mclass[39m=[32m"lucide lucide-sparkles w-3.5 h-3.5 text-violet-400"[39m
                              [33mfill[39m=[32m"none"[39m
                              [33mheight[39m=[32m"24"[39m
                              [33mstroke[39m=[32m"currentColor"[39m
                              [33mstroke-linecap[39m=[32m"round"[39m
                              [33mstroke-linejoin[39m=[32m"round"[39m
                              [33mstroke-width[39m=[32m"2"[39m
                              [33mviewBox[39m=[32m"0 0 24 24"[39m
                              [33mwidth[39m=[32m"24"[39m
                              [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                            [36m>[39m
                              [36m<path[39m
                                [33md[39m=[32m"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"[39m
                              [36m/>[39m
                              [36m<path[39m
                                [33md[39m=[32m"M20 2v4"[39m
                              [36m/>[39m
                              [36m<path[39m
                                [33md...

      739 |       // Now apply a filter
      740 |       await act(async () => {
    > 741 |         fireEvent.click(screen.getByText('Action'));
          |                                ^
      742 |       });
      743 |
      744 |       // Fast-forward debounce

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at node_modules/@testing-library/dom/dist/query-helpers.js:76:38
      at node_modules/@testing-library/dom/dist/query-helpers.js:52:17
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at getByText (__tests__/components/Recommendations/RecommendationsView.test.tsx:741:32)
      at node_modules/@testing-library/react/dist/act-compat.js:47:24
      at Object.<anonymous>.process.env.NODE_ENV.exports.act (node_modules/react/cjs/react.development.js:814:22)
      at node_modules/@testing-library/react/dist/act-compat.js:46:25
      at Object.<anonymous> (__tests__/components/Recommendations/RecommendationsView.test.tsx:740:16)

Test Suites: 4 failed, 1 passed, 5 total
Tests:       13 failed, 124 passed, 137 total
Snapshots:   0 total
Time:        7.096 s
Ran all test suites.

```

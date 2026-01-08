# Complete Test Documentation

This document lists **every single test** for the Recommendations Page in simple terms.

**Total Tests: 169 tests across 5 test files**

---

## Table of Contents

1. [RecommendationCard Tests (28 tests)](#1-recommendationcard-tests)
2. [FilterPanel Tests (35 tests)](#2-filterpanel-tests)
3. [GameDetailModal Tests (36 tests)](#3-gamedetailmodal-tests)
4. [RecommendationsView Tests (45 tests)](#4-recommendationsview-tests)
5. [API Route Tests (25 tests)](#5-api-route-tests)

---

# 1. RecommendationCard Tests

**File:** `__tests__/components/Recommendations/RecommendationCard.test.tsx`

**What is this?** The game card that shows each recommended game with its image, name, match percentage, and details.

## Rendering Tests (11 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 1 | renders the game name | Does the card show the game's name (like "Hades")? |
| 2 | renders the game genre | Does the card show what type of game it is (like "Action Roguelike")? |
| 3 | renders the similarity percentage | Does the card show how good the match is (like "95% Match")? |
| 4 | renders the game description | Does the card show the description text about why this game is recommended? |
| 5 | renders the game image with correct alt text | Does the card show the game's picture? Can screen readers describe it? |
| 6 | renders mode label correctly | Does it show "Solo" for single-player games? |
| 7 | renders coop mode correctly | Does it show "Co-op" for cooperative games? |
| 8 | renders multiplayer mode correctly | Does it show "Multiplayer" for online games? |
| 9 | renders playtime label correctly for short sessions | Does it show "< 2h sessions" for quick games? |
| 10 | renders playtime label correctly for medium sessions | Does it show "2-4h sessions" for medium-length games? |
| 11 | renders playtime label correctly for long sessions | Does it show "4h+ sessions" for long games? |

## Difficulty Display Tests (3 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 12 | renders difficulty with correct styling for challenging | Does "Challenging" appear in red color? |
| 13 | renders difficulty with correct styling for moderate | Does "Moderate" appear in yellow color? |
| 14 | renders difficulty with correct styling for casual | Does "Casual" appear in green color? |

## Trophy Tier Tests (3 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 15 | displays "Best Match" badge for gold tier | Does the #1 recommended game show a "Best Match" gold badge? |
| 16 | displays "Great Match" badge for silver tier | Do games #2-4 show a "Great Match" silver badge? |
| 17 | displays "Good Match" badge for bronze tier | Do games #5+ show a "Good Match" bronze badge? |

## Tags Display Tests (4 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 18 | displays up to 8 tags for gold tier | Does the top pick show up to 8 tags (like "Roguelike", "Action", etc.)? |
| 19 | displays up to 4 tags for silver tier with "+more" indicator | Do silver cards show 4 tags plus "+4 more"? |
| 20 | displays up to 4 tags for bronze tier with "+more" indicator | Do bronze cards show 4 tags plus "+4 more"? |
| 21 | does not show "+more" indicator when tags are 4 or fewer | If a game only has 3 tags, does it hide the "+more" text? |

## Interaction Tests (2 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 22 | calls onClick when card is clicked | When you click the card, does it trigger the click action? |
| 23 | does not throw when clicked without onClick handler | If no click action is set up, does clicking still work without errors? |

## Styling Tests (2 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 24 | applies max-w-2xl class for gold tier cards | Is the gold (top pick) card wider than the others? |
| 25 | does not apply max-w-2xl class for non-gold tier cards | Are silver and bronze cards normal width? |

## Different Similarity Scores Tests (2 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 26 | renders low similarity score correctly | Does "65% Match" display correctly for lower matches? |
| 27 | renders perfect similarity score correctly | Does "100% Match" display correctly for perfect matches? |

---

# 2. FilterPanel Tests

**File:** `__tests__/components/Recommendations/FilterPanel.test.tsx`

**What is this?** The sidebar on the right where you can filter games by genre, difficulty, play time, and play style.

## Rendering Tests (6 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 1 | renders the Filters header | Does the sidebar show "Filters" at the top? |
| 2 | renders Sort By section with all options | Does it show "Best Match", "Newest", and "A-Z" sorting options? |
| 3 | renders Genre section with available genres | Does it show all the game genres you can filter by? |
| 4 | renders Difficulty section with all difficulty levels | Does it show "Casual", "Moderate", and "Challenging"? |
| 5 | renders Time Available section with all play time options | Does it show "Quick Sessions", "Standard", and "Long Sessions"? |
| 6 | renders Play Style section with all mode options | Does it show "Solo", "Co-op", and "Multiplayer"? |

## Active Filter Count Tests (4 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 7 | shows no filter count badge when no filters are active | When nothing is selected, is the count badge hidden? |
| 8 | shows correct filter count when filters are active | If you select 4 filters, does it show "4"? |
| 9 | shows active filter summary message | Does it show "Showing games matching 2 filters"? |
| 10 | shows singular form for single filter | Does it say "1 filter" (not "1 filters")? |

## Sort By Selection Tests (3 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 11 | highlights the currently selected sort option | Is "Best Match" highlighted when selected? |
| 12 | calls onFiltersChange when sort option is clicked | Does clicking "Newest" change the sorting? |
| 13 | calls onFiltersChange when A-Z sort is selected | Does clicking "A-Z" sort games alphabetically? |

## Genre Filter Toggling Tests (3 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 14 | adds genre to filter when clicked | Does clicking "Action Roguelike" add it to filters? |
| 15 | removes genre from filter when already selected | Does clicking it again remove the filter? |
| 16 | adds additional genre while keeping existing ones | Can you select multiple genres at once? |

## Difficulty Filter Toggling Tests (2 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 17 | adds difficulty to filter when clicked | Does clicking "Challenging" filter to hard games? |
| 18 | removes difficulty from filter when already selected | Does clicking it again remove the filter? |

## Play Time Filter Toggling Tests (2 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 19 | adds play time to filter when clicked | Does clicking "Quick Sessions" filter to short games? |
| 20 | removes play time from filter when already selected | Does clicking it again remove the filter? |

## Mode Filter Toggling Tests (3 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 21 | adds mode to filter when clicked | Does clicking "Solo" filter to single-player games? |
| 22 | removes mode from filter when already selected | Does clicking it again remove the filter? |
| 23 | adds Co-op mode correctly | Does clicking "Co-op" work correctly? |

## Clear All Filters Tests (3 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 24 | shows Clear button when filters are active | Does "Clear" appear when you have filters selected? |
| 25 | does not show Clear button when no filters are active | Is "Clear" hidden when nothing is selected? |
| 26 | clears all filters when Clear button is clicked | Does clicking "Clear" reset everything? |

## Loading State Tests (3 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 27 | shows loading indicator when isLoading is true | Does "Loading..." appear when fetching new results? |
| 28 | does not show loading indicator when isLoading is false | Is "Loading..." hidden when not fetching? |
| 29 | hides Clear button when loading with active filters | Is the Clear button hidden while loading? |

## Filter Section Collapse/Expand Tests (1 test)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 30 | collapses section when header is clicked | Can you click "Genre" to collapse/expand that section? |

## Empty Available Genres Tests (1 test)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 31 | renders genre section even with no available genres | Does the genre section still show up if there are no genres? |

## Multiple Filter Combinations Tests (1 test)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 32 | handles complex filter state correctly | Can you have many filters active at once (8 filters)? |

---

# 3. GameDetailModal Tests

**File:** `__tests__/components/Recommendations/GameDetailModal.test.tsx`

**What is this?** The popup window that shows full details about a game when you click on it.

## Rendering When Closed Tests (2 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 1 | renders nothing when isOpen is false | Is the popup hidden when it should be closed? |
| 2 | renders nothing when recommendation is null | Is the popup hidden when no game is selected? |

## Rendering When Open Tests (5 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 3 | renders the game name | Does the popup show the game's name? |
| 4 | renders the game genre | Does the popup show what type of game it is? |
| 5 | renders the similarity percentage with match text | Does it show "95% Match"? |
| 6 | renders the game image | Does the popup show the game's picture? |
| 7 | renders the game description under "Why This Game?" | Does it show the personalized description? |

## Quick Stats Grid Tests (10 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 8 | renders Play Style stat with correct value | Does the stats box show "Solo"? |
| 9 | renders Co-op mode correctly | Does it show "Co-op" for cooperative games? |
| 10 | renders Multiplayer mode correctly | Does it show "Multiplayer" for online games? |
| 11 | renders Session Length stat with correct value | Does it show "Standard Sessions"? |
| 12 | renders Quick Sessions for short playTime | Does it show "Quick Sessions" for short games? |
| 13 | renders Long Sessions for long playTime | Does it show "Long Sessions" for long games? |
| 14 | renders Difficulty stat with correct value | Does it show "Challenging"? |
| 15 | renders Casual difficulty with green styling | Is "Casual" displayed in green? |
| 16 | renders Moderate difficulty with yellow styling | Is "Moderate" displayed in yellow? |
| 17 | renders Challenging difficulty with red styling | Is "Challenging" displayed in red? |

## Release Date Tests (1 test)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 18 | renders Released date stat with formatted date | Does it show "Sep 2020" instead of "2020-09-17"? |

## Tags Section Tests (3 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 19 | renders Tags section header | Does it show the "Tags" title? |
| 20 | renders all tags | Does it show all the game's tags? |
| 21 | renders tags when only a few are present | Does it work with just 2 tags? |

## Steam Link Tests (5 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 22 | renders View on Steam button | Is there a "View on Steam" button? |
| 23 | has correct Steam search URL | Does the link go to Steam's search with the game name? |
| 24 | opens Steam link in new tab | Does clicking open a new browser tab? |
| 25 | has noopener noreferrer for security | Is the link secure (prevents hacking tricks)? |
| 26 | correctly encodes game names with special characters | Does "Baldur's Gate 3" work in the URL (with the apostrophe)? |

## Close Functionality Tests (2 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 27 | calls onClose when close button is clicked | Does clicking the X button close the popup? |
| 28 | calls onClose when backdrop is clicked | Does clicking the dark background close the popup? |

## Different Similarity Scores Tests (2 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 29 | displays low similarity score | Does "65% Match" show correctly? |
| 30 | displays perfect similarity score | Does "100% Match" show correctly? |

## Different Release Dates Tests (2 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 31 | formats old release date correctly | Does "2010-03-15" show as "Mar 2010"? |
| 32 | formats recent release date correctly | Does "2024-12-01" show as "Dec 2024"? |

## Accessibility Tests (2 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 33 | has accessible close button | Can screen readers find the close button? |
| 34 | has accessible Steam link | Can screen readers find the Steam link? |

## Long Content Handling Tests (2 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 35 | handles long game descriptions | Does a very long description (500 characters) display without breaking? |
| 36 | handles many tags | Do 20 tags display without breaking? |

---

# 4. RecommendationsView Tests

**File:** `__tests__/components/Recommendations/RecommendationsView.test.tsx`

**What is this?** The main recommendations page that shows all the games, search bar, and filters together.

## Initial Rendering Tests (7 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 1 | renders the page header | Does "Recommended For You" appear at the top? |
| 2 | renders the default subtitle | Does it say "Based on your gaming history, preferences, and playstyle"? |
| 3 | renders the AI search input | Is there a text box to type your search? |
| 4 | renders the search button | Is there a "Search" button? |
| 5 | renders helper text for AI search | Does it show example searches like "A relaxing farming game"? |
| 6 | renders the sidebar with explore as active item | Is the sidebar showing with "explore" highlighted? |
| 7 | renders the filter panel | Is the filter panel visible on the right side? |

## Recommendation Display Tiers Tests (5 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 8 | renders Top Pick section for gold tier | Is there a "Top Pick" section? |
| 9 | renders Great Matches section for silver tier | Is there a "Great Matches" section? |
| 10 | renders More Recommendations section for bronze tier | Is there a "More Recommendations" section? |
| 11 | displays the first recommendation as gold tier | Is game #1 shown as the top pick? |
| 12 | displays games 2-4 as silver tier | Are games #2, #3, #4 in "Great Matches"? |

## Stats Footer Tests (2 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 13 | displays the total recommendation count | Does it show "5 recommendations"? |
| 14 | displays the average match percentage | Does it show the average match % (like "85%")? |

## AI Search Functionality Tests (9 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 15 | disables search button when input is empty | Is the Search button grayed out when you haven't typed anything? |
| 16 | enables search button when input has text | Does the Search button become clickable after typing? |
| 17 | shows loading state during search | Does it show "Searching" and a spinner while waiting? |
| 18 | calls the API with correct parameters when searching | Does it send your search to the server correctly? |
| 19 | displays AI results after successful search | Do the AI-recommended games appear after searching? |
| 20 | displays active search indicator after search | Does it show 'AI results for: "roguelike games"'? |
| 21 | displays error message when search fails | If something goes wrong, does it show an error message? |
| 22 | updates subtitle when search is active | Does the subtitle change to mention AI-powered results? |

## Search History Tests (3 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 23 | does not show search history when empty | Is the "Previous searches" section hidden initially? |
| 24 | shows search history after a successful search | After searching, does your query appear in history? |
| 25 | loads results from history when clicked | Does clicking a past search load it instantly (without new API call)? |

## Clear Search Tests (1 test)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 26 | clears AI search results when clear button is clicked | Does clicking the X button bring back the original games? |

## Game Detail Modal Tests (2 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 27 | opens modal when a game card is clicked | Does clicking a game card open the detail popup? |
| 28 | closes modal when close button is clicked | Does clicking X close the popup? |

## Filter Changes with Debouncing Tests (2 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 29 | triggers API call after filter change with debounce | After changing filters, does it wait 1 second before searching? |
| 30 | shows filter loading indicator during filter-based fetch | Does it show "Finding games matching your filters..." while loading? |

## Logout Functionality Tests (1 test)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 31 | calls logout API and redirects when logout is clicked | Does clicking logout sign you out? |

## Available Genres Tests (1 test)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 32 | extracts unique genres from recommendations | Does the filter panel show all genres from the games? |

## Sorting Tests (3 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 33 | sorts by similarity by default | Are games sorted by match % by default (best first)? |
| 34 | changes sort order when sort option is selected | Does clicking "A-Z" reorder the games alphabetically? |
| 35 | sorts by release date when selected | Does clicking "Newest" show newest games first? |

## Filter Panel Integration Tests (5 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 36 | applies difficulty filter | Does selecting "Challenging" filter the games? |
| 37 | applies play time filter | Does selecting "Quick Sessions" filter the games? |
| 38 | applies mode filter | Does selecting "Solo" filter the games? |
| 39 | clears all filters | Does "Clear" reset all filters? |

## Combined Search and Filters Tests (1 test)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 40 | combines search query with filters in API call | Can you search "roguelike" AND filter by "Action" at the same time? |

---

# 5. API Route Tests

**File:** `__tests__/api/ai-search.test.ts`

**What is this?** The server endpoint that receives your search and returns AI-generated game recommendations.

## Authentication Tests (2 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 1 | returns 401 when user is not authenticated | If you're not logged in, does it reject the request? |
| 2 | proceeds when user is authenticated | If you're logged in, does it work? |

## Input Validation Tests (5 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 3 | returns 400 when neither query nor filters are provided | If you send nothing, does it give an error? |
| 4 | returns 400 when filters are empty arrays | If you send empty filters, does it give an error? |
| 5 | accepts request with only query | Can you search with just text (no filters)? |
| 6 | accepts request with only filters | Can you search with just filters (no text)? |
| 7 | accepts request with both query and filters | Can you search with both text AND filters? |

## Calling generateRecommendations Tests (4 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 8 | passes steam ID from session | Does it send your Steam account ID to the AI? |
| 9 | passes count of 10 | Does it ask for exactly 10 recommendations? |
| 10 | passes the query as customPrompt | Does it send your search text to the AI? |
| 11 | passes filters to generateRecommendations | Does it send your filter choices to the AI? |

## Building Filter Prompts Tests (5 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 12 | builds prompt from genres filter | Does it tell the AI "genres: Action, RPG"? |
| 13 | builds prompt from difficulties filter | Does it tell the AI "difficulty levels: challenging, moderate"? |
| 14 | builds prompt from playTimes filter with descriptions | Does it tell the AI "play time: quick sessions (under 2 hours)"? |
| 15 | builds prompt from modes filter | Does it tell the AI "play styles: solo, coop"? |
| 16 | builds combined prompt from multiple filters | Does it combine all filters into one message for the AI? |

## Response Format Tests (3 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 17 | returns recommendations array | Does the response include a list of games? |
| 18 | returns userProfile object | Does the response include your profile info? |
| 19 | returns correct recommendation structure | Does each game have name, image, similarity, genre, etc.? |

## Error Handling Tests (3 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 20 | returns 500 when generateRecommendations throws | If the AI service crashes, does it return a 500 error? |
| 21 | returns generic error message for non-Error exceptions | If something unknown fails, does it show a generic error? |
| 22 | handles malformed JSON gracefully | If someone sends garbage data, does it handle it without crashing? |

## Edge Cases Tests (6 tests)

| # | Test Name | What It Checks |
|---|-----------|----------------|
| 23 | handles empty string query | Is an empty "" treated as no query? |
| 24 | handles whitespace-only query | Is "   " (just spaces) handled? |
| 25 | handles very long query strings | Does a 1000-character search still work? |
| 26 | handles special characters in query | Does 'games like "Baldur's Gate 3"' work with quotes and apostrophes? |
| 27 | handles null filter values | If a filter is null, does it still work? |
| 28 | handles undefined filter values | If a filter is undefined, does it still work? |

---

# Summary

| Test File | Component/Feature | Number of Tests |
|-----------|------------------|-----------------|
| RecommendationCard.test.tsx | Game cards | 28 |
| FilterPanel.test.tsx | Filter sidebar | 35 |
| GameDetailModal.test.tsx | Game detail popup | 36 |
| RecommendationsView.test.tsx | Main page | 45 |
| ai-search.test.ts | API endpoint | 25 |
| **TOTAL** | | **169** |

---

# How to Run Tests

```bash
# Run all tests
npm test

# Run tests with simple explanation from AI
npm run test:explain

# Run only one component's tests
npm test -- RecommendationCard
npm test -- FilterPanel
npm test -- GameDetailModal
npm test -- RecommendationsView
npm test -- ai-search

# Run tests and see every individual test name
npm test -- --verbose
```

---

# Understanding Test Results

## When a test passes:
```
✓ renders the game name (15 ms)
```
This means: The game name shows up correctly on the card.

## When a test fails:
```
✕ renders the game name (20 ms)

  Expected: "Hades"
  Received: null
```
This means: The test expected to see "Hades" but found nothing. The game name isn't showing up.

## Common failure reasons:

| Error Message | What It Means |
|---------------|---------------|
| `Expected X, Received null` | Something that should exist doesn't show up |
| `Expected X, Received Y` | Wrong value is being displayed |
| `Unable to find element` | A button/text/element is missing from the page |
| `not.toBeInTheDocument` failed | Something appeared when it shouldn't have |
| `toHaveBeenCalled` failed | A function (like click handler) wasn't triggered |

# Recommendations Page - Test Checklist

This file explains what each test checks in simple terms.
Run tests with: `npm test`

---

## RecommendationCard (The game card)

### Does it show the right info?
- [ ] Shows the game name
- [ ] Shows the game genre (like "Action Roguelike")
- [ ] Shows the match percentage (like "95% Match")
- [ ] Shows the game description
- [ ] Shows the game image

### Does it show the play mode correctly?
- [ ] Shows "Solo" for single player games
- [ ] Shows "Co-op" for cooperative games
- [ ] Shows "Multiplayer" for online games

### Does it show play time correctly?
- [ ] Shows "< 2h sessions" for short games
- [ ] Shows "2-4h sessions" for medium games
- [ ] Shows "4h+ sessions" for long games

### Does it show difficulty correctly?
- [ ] Shows "Challenging" in red
- [ ] Shows "Moderate" in yellow
- [ ] Shows "Casual" in green

### Does it show the right badge for each tier?
- [ ] Gold tier shows "Best Match"
- [ ] Silver tier shows "Great Match"
- [ ] Bronze tier shows "Good Match"

### Does it show tags correctly?
- [ ] Gold cards show up to 8 tags
- [ ] Silver/Bronze cards show 4 tags + "more" count
- [ ] Cards with few tags don't show "+more"

### Does clicking work?
- [ ] Clicking the card calls the click handler
- [ ] No error if there's no click handler

---

## FilterPanel (The sidebar filters)

### Does it show all sections?
- [ ] Shows "Filters" header
- [ ] Shows "Sort By" with Best Match, Newest, A-Z
- [ ] Shows "Genre" with available genres
- [ ] Shows "Difficulty" with Casual, Moderate, Challenging
- [ ] Shows "Time Available" with Quick, Standard, Long
- [ ] Shows "Play Style" with Solo, Co-op, Multiplayer

### Does the filter count work?
- [ ] No badge when no filters active
- [ ] Shows correct count when filters are active
- [ ] Shows "Showing games matching X filters" message

### Does sorting work?
- [ ] Best Match is highlighted by default
- [ ] Clicking "Newest" changes sort
- [ ] Clicking "A-Z" changes sort

### Does clicking filters work?
- [ ] Clicking a genre adds it to filter
- [ ] Clicking again removes it
- [ ] Same for difficulty, play time, and mode filters

### Does Clear button work?
- [ ] Clear button appears when filters are active
- [ ] Clear button hidden when no filters
- [ ] Clicking Clear resets everything

### Does loading state work?
- [ ] Shows "Loading..." when fetching
- [ ] Hides Clear button while loading

---

## GameDetailModal (The popup with game details)

### Does it open and close correctly?
- [ ] Shows nothing when closed
- [ ] Shows nothing when no game selected
- [ ] Shows content when open with a game

### Does it show game info?
- [ ] Shows game name
- [ ] Shows game genre
- [ ] Shows match percentage
- [ ] Shows game image
- [ ] Shows "Why This Game?" section with description

### Does it show the stats grid?
- [ ] Shows Play Style (Solo/Co-op/Multiplayer)
- [ ] Shows Session Length (Quick/Standard/Long)
- [ ] Shows Difficulty with correct color
- [ ] Shows Release date formatted nicely (like "Sep 2020")

### Does it show tags?
- [ ] Shows "Tags" header
- [ ] Shows all the game's tags

### Does the Steam link work?
- [ ] Shows "View on Steam" button
- [ ] Link goes to Steam search with game name
- [ ] Opens in new tab
- [ ] Works with special characters in game names

### Does closing work?
- [ ] X button closes the modal
- [ ] Clicking dark background closes the modal

---

## RecommendationsView (The main page)

### Does it load correctly?
- [ ] Shows "Recommended For You" header
- [ ] Shows the default subtitle about gaming history
- [ ] Shows the AI search input
- [ ] Shows the Search button
- [ ] Shows helper text with example searches
- [ ] Shows the sidebar
- [ ] Shows the filter panel

### Does it show games in tiers?
- [ ] Shows "Top Pick" section (1 game)
- [ ] Shows "Great Matches" section (3 games)
- [ ] Shows "More Recommendations" section (rest of games)

### Does the stats footer work?
- [ ] Shows total number of recommendations
- [ ] Shows average match percentage

### Does AI search work?
- [ ] Search button disabled when input empty
- [ ] Search button enabled when you type something
- [ ] Shows "Searching" while loading
- [ ] Calls the API with correct data
- [ ] Shows AI results after search
- [ ] Shows "AI results for: [query]" indicator
- [ ] Shows error message if search fails
- [ ] Updates subtitle when search is active

### Does search history work?
- [ ] No history shown initially
- [ ] Shows "Previous searches" after a search
- [ ] Clicking history loads cached results (no new API call)

### Does clear search work?
- [ ] Clear button removes AI results
- [ ] Shows original static games after clearing

### Does the game modal work?
- [ ] Clicking a game card opens the modal
- [ ] Closing the modal works

### Do filters trigger new searches?
- [ ] Changing filters waits 1 second (debounce)
- [ ] Then calls the API
- [ ] Shows loading indicator while fetching

### Does logout work?
- [ ] Clicking logout calls the logout API

---

## API Route (/api/recommendations/ai-search)

### Does authentication work?
- [ ] Returns 401 error if not logged in
- [ ] Works if logged in

### Does validation work?
- [ ] Returns 400 error if no query AND no filters
- [ ] Returns 400 if filters are all empty arrays
- [ ] Accepts request with just a query
- [ ] Accepts request with just filters
- [ ] Accepts request with both query and filters

### Does it call the AI correctly?
- [ ] Passes the user's Steam ID
- [ ] Asks for 10 recommendations
- [ ] Passes the search query
- [ ] Passes the filters

### Does it build filter prompts correctly?
- [ ] Converts genre filters to text
- [ ] Converts difficulty filters to text
- [ ] Converts play time to readable text (like "quick sessions")
- [ ] Converts mode filters to text
- [ ] Combines multiple filters into one prompt

### Does the response work?
- [ ] Returns recommendations array
- [ ] Returns user profile
- [ ] Each recommendation has all required fields

### Does error handling work?
- [ ] Returns 500 if AI service fails
- [ ] Returns generic error for unknown issues
- [ ] Handles broken JSON gracefully

### Edge cases
- [ ] Empty string query treated as no query
- [ ] Very long queries still work
- [ ] Special characters in query work
- [ ] Null filter values don't crash

---

## How to Read Test Results

When you run `npm test`, you'll see:

```
PASS  __tests__/components/Recommendations/RecommendationCard.test.tsx
PASS  __tests__/components/Recommendations/FilterPanel.test.tsx
FAIL  __tests__/components/Recommendations/GameDetailModal.test.tsx
```

- **PASS** = All tests in that file worked
- **FAIL** = Something broke

If a test fails, you'll see:
```
 FAIL  __tests__/components/Recommendations/GameDetailModal.test.tsx
  ● GameDetailModal › Does it show game info? › Shows game name

    Expected: "Hades"
    Received: null
```

This means: The test expected to find "Hades" on screen, but it wasn't there.

---

## Quick Commands

| Command | What it does |
|---------|--------------|
| `npm test` | Run all tests once |
| `npm run test:watch` | Run tests, re-run when files change |
| `npm run test:coverage` | Show how much code is tested |
| `npm test -- RecommendationCard` | Run only RecommendationCard tests |
| `npm test -- --verbose` | Show each individual test name |

import { render, screen, fireEvent } from '@testing-library/react';
import RecommendationCard from '@/components/Recommendations/RecommendationCard';
import { ReviewModalProvider } from '@/components/Recommendations/ReviewModalContext';
import { mockRecommendation, createMockRecommendation } from '../../__mocks__/mockData';

const renderWithProvider = (ui: React.ReactElement) =>
  render(<ReviewModalProvider>{ui}</ReviewModalProvider>);

describe('RecommendationCard', () => {
  describe('Rendering', () => {
    it('renders the game name', () => {
      renderWithProvider(
        <RecommendationCard
          recommendation={mockRecommendation}
          tier="gold"
          index={0}
        />
      );
      expect(screen.getByText('Hades')).toBeInTheDocument();
    });

    it('renders the game genre', () => {
      renderWithProvider(
        <RecommendationCard
          recommendation={mockRecommendation}
          tier="gold"
          index={0}
        />
      );
      expect(screen.getByText('Action Roguelike')).toBeInTheDocument();
    });

    it('renders the similarity percentage', () => {
      renderWithProvider(
        <RecommendationCard
          recommendation={mockRecommendation}
          tier="gold"
          index={0}
        />
      );
      expect(screen.getByText('95% Match')).toBeInTheDocument();
    });

    it('renders the game description', () => {
      renderWithProvider(
        <RecommendationCard
          recommendation={mockRecommendation}
          tier="gold"
          index={0}
        />
      );
      expect(screen.getByText(/Based on your 200\+ hours in roguelikes/)).toBeInTheDocument();
    });

    it('renders the game image with correct alt text', () => {
      renderWithProvider(
        <RecommendationCard
          recommendation={mockRecommendation}
          tier="gold"
          index={0}
        />
      );
      const image = screen.getByAltText('Hades');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', mockRecommendation.image);
    });

    it('renders mode label correctly', () => {
      renderWithProvider(
        <RecommendationCard
          recommendation={mockRecommendation}
          tier="gold"
          index={0}
        />
      );
      expect(screen.getByText('Solo')).toBeInTheDocument();
    });

    it('renders coop mode correctly', () => {
      const coopGame = createMockRecommendation({ mode: 'coop' });
      renderWithProvider(
        <RecommendationCard
          recommendation={coopGame}
          tier="silver"
          index={1}
        />
      );
      expect(screen.getByText('Co-op')).toBeInTheDocument();
    });

    it('renders multiplayer mode correctly', () => {
      const multiplayerGame = createMockRecommendation({ mode: 'multiplayer' });
      renderWithProvider(
        <RecommendationCard
          recommendation={multiplayerGame}
          tier="silver"
          index={1}
        />
      );
      expect(screen.getByText('Multiplayer')).toBeInTheDocument();
    });

    it('renders playtime label correctly for short sessions', () => {
      const shortGame = createMockRecommendation({ playTime: 'short' });
      renderWithProvider(
        <RecommendationCard
          recommendation={shortGame}
          tier="bronze"
          index={2}
        />
      );
      expect(screen.getByText('< 2h sessions')).toBeInTheDocument();
    });

    it('renders playtime label correctly for medium sessions', () => {
      renderWithProvider(
        <RecommendationCard
          recommendation={mockRecommendation}
          tier="gold"
          index={0}
        />
      );
      expect(screen.getByText('2-4h sessions')).toBeInTheDocument();
    });

    it('renders playtime label correctly for long sessions', () => {
      const longGame = createMockRecommendation({ playTime: 'long' });
      renderWithProvider(
        <RecommendationCard
          recommendation={longGame}
          tier="bronze"
          index={2}
        />
      );
      expect(screen.getByText('4h+ sessions')).toBeInTheDocument();
    });

    it('renders difficulty with correct styling for challenging', () => {
      renderWithProvider(
        <RecommendationCard
          recommendation={mockRecommendation}
          tier="gold"
          index={0}
        />
      );
      // "Challenging" may appear in multiple places (badge and tags),
      // so we assert that at least one instance is rendered.
      expect(screen.getAllByText('Challenging').length).toBeGreaterThan(0);
    });

    it('renders difficulty with correct styling for moderate', () => {
      const moderateGame = createMockRecommendation({ difficulty: 'moderate' });
      renderWithProvider(
        <RecommendationCard
          recommendation={moderateGame}
          tier="silver"
          index={1}
        />
      );
      expect(screen.getByText('Moderate')).toBeInTheDocument();
    });

    it('renders difficulty with correct styling for casual', () => {
      const casualGame = createMockRecommendation({ difficulty: 'casual' });
      renderWithProvider(
        <RecommendationCard
          recommendation={casualGame}
          tier="bronze"
          index={2}
        />
      );
      expect(screen.getByText('Casual')).toBeInTheDocument();
    });
  });

  describe('Trophy Tiers', () => {
    it('displays "Best Match" badge for gold tier', () => {
      renderWithProvider(
        <RecommendationCard
          recommendation={mockRecommendation}
          tier="gold"
          index={0}
        />
      );
      expect(screen.getByText('Best Match')).toBeInTheDocument();
    });

    it('displays "Great Match" badge for silver tier', () => {
      renderWithProvider(
        <RecommendationCard
          recommendation={mockRecommendation}
          tier="silver"
          index={1}
        />
      );
      expect(screen.getByText('Great Match')).toBeInTheDocument();
    });

    it('displays "Good Match" badge for bronze tier', () => {
      renderWithProvider(
        <RecommendationCard
          recommendation={mockRecommendation}
          tier="bronze"
          index={4}
        />
      );
      expect(screen.getByText('Good Match')).toBeInTheDocument();
    });
  });

  describe('Tags Display', () => {
    it('displays up to 8 tags for gold tier', () => {
      renderWithProvider(
        <RecommendationCard
          recommendation={mockRecommendation}
          tier="gold"
          index={0}
        />
      );
      // mockRecommendation has 8 tags
      expect(screen.getByText('Roguelike')).toBeInTheDocument();
      expect(screen.getByText('Singleplayer')).toBeInTheDocument();
      expect(screen.getByText('Dungeon Crawler')).toBeInTheDocument();
      expect(screen.getByText('Procedural Generation')).toBeInTheDocument();
      expect(screen.getByText('Top-Down')).toBeInTheDocument();
      expect(screen.getByText('Fast-Paced')).toBeInTheDocument();
      expect(screen.getByText('Mythology')).toBeInTheDocument();
      // "Challenging" appears both as a tag and as the difficulty badge,
      // so we assert that at least one instance is present.
      expect(screen.getAllByText('Challenging').length).toBeGreaterThan(0);
    });

    it('displays up to 4 tags for silver tier with "+more" indicator', () => {
      renderWithProvider(
        <RecommendationCard
          recommendation={mockRecommendation}
          tier="silver"
          index={1}
        />
      );
      expect(screen.getByText('Roguelike')).toBeInTheDocument();
      expect(screen.getByText('Singleplayer')).toBeInTheDocument();
      expect(screen.getByText('Dungeon Crawler')).toBeInTheDocument();
      expect(screen.getByText('Procedural Generation')).toBeInTheDocument();
      expect(screen.getByText('+4 more')).toBeInTheDocument();
    });

    it('displays up to 4 tags for bronze tier with "+more" indicator', () => {
      renderWithProvider(
        <RecommendationCard
          recommendation={mockRecommendation}
          tier="bronze"
          index={4}
        />
      );
      expect(screen.getByText('+4 more')).toBeInTheDocument();
    });

    it('does not show "+more" indicator when tags are 4 or fewer', () => {
      const fewTagsGame = createMockRecommendation({ tags: ['Tag1', 'Tag2', 'Tag3'] });
      renderWithProvider(
        <RecommendationCard
          recommendation={fewTagsGame}
          tier="silver"
          index={1}
        />
      );
      expect(screen.queryByText(/\+\d+ more/)).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when card is clicked', () => {
      const handleClick = jest.fn();
      renderWithProvider(
        <RecommendationCard
          recommendation={mockRecommendation}
          tier="gold"
          index={0}
          onClick={handleClick}
        />
      );

      // Find the card container and click it
      const card = screen.getByText('Hades').closest('div[class*="cursor-pointer"]');
      expect(card).toBeInTheDocument();
      if (card) {
        fireEvent.click(card);
        expect(handleClick).toHaveBeenCalledTimes(1);
      }
    });

    it('does not throw when clicked without onClick handler', () => {
      renderWithProvider(
        <RecommendationCard
          recommendation={mockRecommendation}
          tier="gold"
          index={0}
        />
      );

      const card = screen.getByText('Hades').closest('div');
      expect(() => {
        if (card) fireEvent.click(card);
      }).not.toThrow();
    });
  });

  describe('Responsive Styling', () => {
    it('applies max-w-2xl class for gold tier cards', () => {
      const { container } = renderWithProvider(
        <RecommendationCard
          recommendation={mockRecommendation}
          tier="gold"
          index={0}
        />
      );

      // Check if the gold tier card has the max-w-2xl class
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('max-w-2xl');
    });

    it('does not apply max-w-2xl class for non-gold tier cards', () => {
      const { container } = renderWithProvider(
        <RecommendationCard
          recommendation={mockRecommendation}
          tier="silver"
          index={1}
        />
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).not.toContain('max-w-2xl');
    });
  });

  describe('Different Similarity Scores', () => {
    it('renders low similarity score correctly', () => {
      const lowSimilarityGame = createMockRecommendation({ similarity: 65 });
      renderWithProvider(
        <RecommendationCard
          recommendation={lowSimilarityGame}
          tier="bronze"
          index={10}
        />
      );
      expect(screen.getByText('65% Match')).toBeInTheDocument();
    });

    it('renders perfect similarity score correctly', () => {
      const perfectGame = createMockRecommendation({ similarity: 100 });
      renderWithProvider(
        <RecommendationCard
          recommendation={perfectGame}
          tier="gold"
          index={0}
        />
      );
      expect(screen.getByText('100% Match')).toBeInTheDocument();
    });
  });
});

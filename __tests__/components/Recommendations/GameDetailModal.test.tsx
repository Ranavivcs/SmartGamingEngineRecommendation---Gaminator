import { render, screen, fireEvent } from '@testing-library/react';
import GameDetailModal from '@/components/Recommendations/GameDetailModal';
import { mockRecommendation, createMockRecommendation } from '../../__mocks__/mockData';

describe('GameDetailModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering when closed', () => {
    it('renders nothing when isOpen is false', () => {
      const { container } = render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={false}
          onClose={mockOnClose}
        />
      );
      expect(container.firstChild).toBeNull();
    });

    it('renders nothing when recommendation is null', () => {
      const { container } = render(
        <GameDetailModal
          recommendation={null}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Rendering when open', () => {
    it('renders the game name', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('Hades')).toBeInTheDocument();
    });

    it('renders the game genre', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('Action Roguelike')).toBeInTheDocument();
    });

    it('renders the similarity percentage with match text', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('95% Match')).toBeInTheDocument();
    });

    it('renders the game image', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      const image = screen.getByAltText('Hades');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', mockRecommendation.image);
    });

    it('renders the game description under "Why This Game?"', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('Why This Game?')).toBeInTheDocument();
      expect(screen.getByText(/Based on your 200\+ hours in roguelikes/)).toBeInTheDocument();
    });
  });

  describe('Quick Stats Grid', () => {
    it('renders Play Style stat with correct value', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('Play Style')).toBeInTheDocument();
      expect(screen.getByText('Solo')).toBeInTheDocument();
    });

    it('renders Co-op mode correctly', () => {
      const coopGame = createMockRecommendation({ mode: 'coop' });
      render(
        <GameDetailModal
          recommendation={coopGame}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('Co-op')).toBeInTheDocument();
    });

    it('renders Multiplayer mode correctly', () => {
      const multiplayerGame = createMockRecommendation({ mode: 'multiplayer' });
      render(
        <GameDetailModal
          recommendation={multiplayerGame}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('Multiplayer')).toBeInTheDocument();
    });

    it('renders Session Length stat with correct value', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('Session Length')).toBeInTheDocument();
      expect(screen.getByText('Standard Sessions')).toBeInTheDocument();
    });

    it('renders Quick Sessions for short playTime', () => {
      const shortGame = createMockRecommendation({ playTime: 'short' });
      render(
        <GameDetailModal
          recommendation={shortGame}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('Quick Sessions')).toBeInTheDocument();
    });

    it('renders Long Sessions for long playTime', () => {
      const longGame = createMockRecommendation({ playTime: 'long' });
      render(
        <GameDetailModal
          recommendation={longGame}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('Long Sessions')).toBeInTheDocument();
    });

    it('renders Difficulty stat with correct value', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('Difficulty')).toBeInTheDocument();
      expect(screen.getByText('Challenging')).toBeInTheDocument();
    });

    it('renders Casual difficulty with green styling', () => {
      const casualGame = createMockRecommendation({ difficulty: 'casual' });
      render(
        <GameDetailModal
          recommendation={casualGame}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      const casualText = screen.getByText('Casual');
      expect(casualText).toHaveClass('text-green-400');
    });

    it('renders Moderate difficulty with yellow styling', () => {
      const moderateGame = createMockRecommendation({ difficulty: 'moderate' });
      render(
        <GameDetailModal
          recommendation={moderateGame}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      const moderateText = screen.getByText('Moderate');
      expect(moderateText).toHaveClass('text-yellow-400');
    });

    it('renders Challenging difficulty with red styling', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      const challengingText = screen.getByText('Challenging');
      expect(challengingText).toHaveClass('text-red-400');
    });

    it('renders Released date stat with formatted date', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('Released')).toBeInTheDocument();
      // Date formatted as "Sep 2020"
      expect(screen.getByText('Sep 2020')).toBeInTheDocument();
    });
  });

  describe('Tags Section', () => {
    it('renders Tags section header', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('Tags')).toBeInTheDocument();
    });

    it('renders all tags', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      mockRecommendation.tags.forEach((tag) => {
        expect(screen.getByText(tag)).toBeInTheDocument();
      });
    });

    it('renders tags when only a few are present', () => {
      const fewTagsGame = createMockRecommendation({ tags: ['Tag1', 'Tag2'] });
      render(
        <GameDetailModal
          recommendation={fewTagsGame}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('Tag1')).toBeInTheDocument();
      expect(screen.getByText('Tag2')).toBeInTheDocument();
    });
  });

  describe('Steam Link', () => {
    it('renders View on Steam button', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('View on Steam')).toBeInTheDocument();
    });

    it('has correct Steam search URL', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      const link = screen.getByText('View on Steam').closest('a');
      expect(link).toHaveAttribute(
        'href',
        `https://store.steampowered.com/search/?term=${encodeURIComponent('Hades')}`
      );
    });

    it('opens Steam link in new tab', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      const link = screen.getByText('View on Steam').closest('a');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('has noopener noreferrer for security', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      const link = screen.getByText('View on Steam').closest('a');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('correctly encodes game names with special characters', () => {
      const gameWithSpecialChars = createMockRecommendation({ name: "Baldur's Gate 3" });
      render(
        <GameDetailModal
          recommendation={gameWithSpecialChars}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      const link = screen.getByText('View on Steam').closest('a');
      expect(link).toHaveAttribute(
        'href',
        `https://store.steampowered.com/search/?term=${encodeURIComponent("Baldur's Gate 3")}`
      );
    });
  });

  describe('Close Functionality', () => {
    it('calls onClose when close button is clicked', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      // Find the close button (X icon button)
      const closeButtons = screen.getAllByRole('button');
      const closeButton = closeButtons.find((btn) => btn.querySelector('svg'));
      expect(closeButton).toBeInTheDocument();
      if (closeButton) {
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      }
    });

    it('calls onClose when backdrop is clicked', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      // The backdrop is the first div with onClick handler in the modal structure
      const backdrop = document.querySelector('.fixed.inset-0.bg-black\\/80');
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe('Different Similarity Scores', () => {
    it('displays low similarity score', () => {
      const lowSimGame = createMockRecommendation({ similarity: 65 });
      render(
        <GameDetailModal
          recommendation={lowSimGame}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('65% Match')).toBeInTheDocument();
    });

    it('displays perfect similarity score', () => {
      const perfectGame = createMockRecommendation({ similarity: 100 });
      render(
        <GameDetailModal
          recommendation={perfectGame}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('100% Match')).toBeInTheDocument();
    });
  });

  describe('Different Release Dates', () => {
    it('formats old release date correctly', () => {
      const oldGame = createMockRecommendation({ releaseDate: '2010-03-15' });
      render(
        <GameDetailModal
          recommendation={oldGame}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('Mar 2010')).toBeInTheDocument();
    });

    it('formats recent release date correctly', () => {
      const recentGame = createMockRecommendation({ releaseDate: '2024-12-01' });
      render(
        <GameDetailModal
          recommendation={recentGame}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('Dec 2024')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has accessible close button', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      const closeButtons = screen.getAllByRole('button');
      expect(closeButtons.length).toBeGreaterThan(0);
    });

    it('has accessible Steam link', () => {
      render(
        <GameDetailModal
          recommendation={mockRecommendation}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      const link = screen.getByRole('link', { name: /View on Steam/i });
      expect(link).toBeInTheDocument();
    });
  });

  describe('Long Content Handling', () => {
    it('handles long game descriptions', () => {
      const longDescGame = createMockRecommendation({
        description: 'A'.repeat(500),
      });
      render(
        <GameDetailModal
          recommendation={longDescGame}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('A'.repeat(500))).toBeInTheDocument();
    });

    it('handles many tags', () => {
      const manyTagsGame = createMockRecommendation({
        tags: Array.from({ length: 20 }, (_, i) => `Tag${i + 1}`),
      });
      render(
        <GameDetailModal
          recommendation={manyTagsGame}
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('Tag1')).toBeInTheDocument();
      expect(screen.getByText('Tag20')).toBeInTheDocument();
    });
  });
});

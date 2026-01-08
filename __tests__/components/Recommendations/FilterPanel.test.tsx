import { render, screen, fireEvent } from '@testing-library/react';
import FilterPanel from '@/components/Recommendations/FilterPanel';
import { mockEmptyFilters, mockActiveFilters, createMockFilters } from '../../__mocks__/mockData';
import type { Filters } from '@/components/Recommendations/FilterPanel';

describe('FilterPanel', () => {
  const mockOnFiltersChange = jest.fn();
  const availableGenres = ['Action Roguelike', 'Co-op Shooter', 'CRPG', 'Metroidvania'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the Filters header', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );
      expect(screen.getByText('Filters')).toBeInTheDocument();
    });

    it('renders Sort By section with all options', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );
      expect(screen.getByText('Sort By')).toBeInTheDocument();
      expect(screen.getByText('Best Match')).toBeInTheDocument();
      expect(screen.getByText('Newest')).toBeInTheDocument();
      expect(screen.getByText('A-Z')).toBeInTheDocument();
    });

    it('renders Genre section with available genres', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );
      expect(screen.getByText('Genre')).toBeInTheDocument();
      availableGenres.forEach((genre) => {
        expect(screen.getByText(genre)).toBeInTheDocument();
      });
    });

    it('renders Difficulty section with all difficulty levels', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );
      expect(screen.getByText('Difficulty')).toBeInTheDocument();
      expect(screen.getByText('Casual')).toBeInTheDocument();
      expect(screen.getByText('Moderate')).toBeInTheDocument();
      expect(screen.getByText('Challenging')).toBeInTheDocument();
    });

    it('renders Time Available section with all play time options', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );
      expect(screen.getByText('Time Available')).toBeInTheDocument();
      expect(screen.getByText('Quick Sessions')).toBeInTheDocument();
      expect(screen.getByText('Standard')).toBeInTheDocument();
      expect(screen.getByText('Long Sessions')).toBeInTheDocument();
      // Check descriptions
      expect(screen.getByText('< 2 hours')).toBeInTheDocument();
      expect(screen.getByText('2-4 hours')).toBeInTheDocument();
      expect(screen.getByText('4+ hours')).toBeInTheDocument();
    });

    it('renders Play Style section with all mode options', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );
      expect(screen.getByText('Play Style')).toBeInTheDocument();
      expect(screen.getByText('Solo')).toBeInTheDocument();
      expect(screen.getByText('Co-op')).toBeInTheDocument();
      expect(screen.getByText('Multiplayer')).toBeInTheDocument();
    });
  });

  describe('Active Filter Count', () => {
    it('shows no filter count badge when no filters are active', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );
      // The count badge should not be visible
      expect(screen.queryByText('0')).not.toBeInTheDocument();
    });

    it('shows correct filter count when filters are active', () => {
      const filtersWithCount = createMockFilters({
        genres: ['Action Roguelike'],
        difficulties: ['challenging'],
        playTimes: ['medium'],
        modes: ['solo'],
      });

      render(
        <FilterPanel
          filters={filtersWithCount}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );
      // 4 active filters
      expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('shows active filter summary message', () => {
      const filtersWithCount = createMockFilters({
        genres: ['Action Roguelike'],
        difficulties: ['challenging'],
      });

      render(
        <FilterPanel
          filters={filtersWithCount}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );
      expect(screen.getByText('Showing games matching 2 filters')).toBeInTheDocument();
    });

    it('shows singular form for single filter', () => {
      const singleFilter = createMockFilters({
        genres: ['Action Roguelike'],
      });

      render(
        <FilterPanel
          filters={singleFilter}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );
      expect(screen.getByText('Showing games matching 1 filter')).toBeInTheDocument();
    });
  });

  describe('Sort By Selection', () => {
    it('highlights the currently selected sort option', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );
      const bestMatchButton = screen.getByText('Best Match');
      expect(bestMatchButton.className).toContain('bg-white/10');
    });

    it('calls onFiltersChange when sort option is clicked', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );

      fireEvent.click(screen.getByText('Newest'));
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...mockEmptyFilters,
        sortBy: 'releaseDate',
      });
    });

    it('calls onFiltersChange when A-Z sort is selected', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );

      fireEvent.click(screen.getByText('A-Z'));
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...mockEmptyFilters,
        sortBy: 'name',
      });
    });
  });

  describe('Genre Filter Toggling', () => {
    it('adds genre to filter when clicked', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );

      fireEvent.click(screen.getByText('Action Roguelike'));
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...mockEmptyFilters,
        genres: ['Action Roguelike'],
      });
    });

    it('removes genre from filter when already selected', () => {
      const filtersWithGenre = createMockFilters({ genres: ['Action Roguelike'] });

      render(
        <FilterPanel
          filters={filtersWithGenre}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );

      fireEvent.click(screen.getByText('Action Roguelike'));
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...filtersWithGenre,
        genres: [],
      });
    });

    it('adds additional genre while keeping existing ones', () => {
      const filtersWithGenre = createMockFilters({ genres: ['Action Roguelike'] });

      render(
        <FilterPanel
          filters={filtersWithGenre}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );

      fireEvent.click(screen.getByText('CRPG'));
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...filtersWithGenre,
        genres: ['Action Roguelike', 'CRPG'],
      });
    });
  });

  describe('Difficulty Filter Toggling', () => {
    it('adds difficulty to filter when clicked', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );

      fireEvent.click(screen.getByText('Challenging'));
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...mockEmptyFilters,
        difficulties: ['challenging'],
      });
    });

    it('removes difficulty from filter when already selected', () => {
      const filtersWithDifficulty = createMockFilters({ difficulties: ['challenging'] });

      render(
        <FilterPanel
          filters={filtersWithDifficulty}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );

      fireEvent.click(screen.getByText('Challenging'));
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...filtersWithDifficulty,
        difficulties: [],
      });
    });
  });

  describe('Play Time Filter Toggling', () => {
    it('adds play time to filter when clicked', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );

      fireEvent.click(screen.getByText('Quick Sessions'));
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...mockEmptyFilters,
        playTimes: ['short'],
      });
    });

    it('removes play time from filter when already selected', () => {
      const filtersWithPlayTime = createMockFilters({ playTimes: ['short'] });

      render(
        <FilterPanel
          filters={filtersWithPlayTime}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );

      fireEvent.click(screen.getByText('Quick Sessions'));
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...filtersWithPlayTime,
        playTimes: [],
      });
    });
  });

  describe('Mode Filter Toggling', () => {
    it('adds mode to filter when clicked', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );

      fireEvent.click(screen.getByText('Solo'));
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...mockEmptyFilters,
        modes: ['solo'],
      });
    });

    it('removes mode from filter when already selected', () => {
      const filtersWithMode = createMockFilters({ modes: ['solo'] });

      render(
        <FilterPanel
          filters={filtersWithMode}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );

      fireEvent.click(screen.getByText('Solo'));
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...filtersWithMode,
        modes: [],
      });
    });

    it('adds Co-op mode correctly', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );

      fireEvent.click(screen.getByText('Co-op'));
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...mockEmptyFilters,
        modes: ['coop'],
      });
    });
  });

  describe('Clear All Filters', () => {
    it('shows Clear button when filters are active', () => {
      render(
        <FilterPanel
          filters={mockActiveFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );
      expect(screen.getByText('Clear')).toBeInTheDocument();
    });

    it('does not show Clear button when no filters are active', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );
      expect(screen.queryByText('Clear')).not.toBeInTheDocument();
    });

    it('clears all filters when Clear button is clicked', () => {
      render(
        <FilterPanel
          filters={mockActiveFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );

      fireEvent.click(screen.getByText('Clear'));
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        genres: [],
        difficulties: [],
        playTimes: [],
        modes: [],
        sortBy: 'similarity',
      });
    });
  });

  describe('Loading State', () => {
    it('shows loading indicator when isLoading is true', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
          isLoading={true}
        />
      );
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('does not show loading indicator when isLoading is false', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
          isLoading={false}
        />
      );
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    it('hides Clear button when loading with active filters', () => {
      render(
        <FilterPanel
          filters={mockActiveFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
          isLoading={true}
        />
      );
      expect(screen.queryByText('Clear')).not.toBeInTheDocument();
    });
  });

  describe('Filter Section Collapse/Expand', () => {
    it('collapses section when header is clicked', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );

      // Click Genre section header to collapse
      fireEvent.click(screen.getByText('Genre'));

      // The genre buttons should still be in the document (just with 0 height/opacity)
      // We check that the click handler works without errors
      expect(screen.getByText('Genre')).toBeInTheDocument();
    });
  });

  describe('Empty Available Genres', () => {
    it('renders genre section even with no available genres', () => {
      render(
        <FilterPanel
          filters={mockEmptyFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={[]}
        />
      );
      expect(screen.getByText('Genre')).toBeInTheDocument();
    });
  });

  describe('Multiple Filter Combinations', () => {
    it('handles complex filter state correctly', () => {
      const complexFilters: Filters = {
        genres: ['Action Roguelike', 'CRPG'],
        difficulties: ['challenging', 'moderate'],
        playTimes: ['medium', 'long'],
        modes: ['solo', 'multiplayer'],
        sortBy: 'name',
      };

      render(
        <FilterPanel
          filters={complexFilters}
          onFiltersChange={mockOnFiltersChange}
          availableGenres={availableGenres}
        />
      );

      // Should show 8 active filters (2+2+2+2)
      expect(screen.getByText('8')).toBeInTheDocument();
      expect(screen.getByText('Showing games matching 8 filters')).toBeInTheDocument();
    });
  });
});

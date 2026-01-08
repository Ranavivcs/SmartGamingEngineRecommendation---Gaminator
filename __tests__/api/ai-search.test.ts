/**
 * Tests for the AI Search API route
 * /api/recommendations/ai-search
 */

import { POST } from '@/app/api/recommendations/ai-search/route';
import { NextRequest } from 'next/server';
import { mockSession, mockApiResponse } from '../__mocks__/mockData';

// Mock the session module
jest.mock('@/lib/session', () => ({
  getSession: jest.fn(),
}));

// Mock the agents module
jest.mock('@/lib/agents', () => ({
  generateRecommendations: jest.fn(),
}));

import { getSession } from '@/lib/session';
import { generateRecommendations } from '@/lib/agents';

const mockGetSession = getSession as jest.MockedFunction<typeof getSession>;
const mockGenerateRecommendations = generateRecommendations as jest.MockedFunction<
  typeof generateRecommendations
>;

describe('POST /api/recommendations/ai-search', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createRequest = (body: object) => {
    return new NextRequest('http://localhost:3000/api/recommendations/ai-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  describe('Authentication', () => {
    it('returns 401 when user is not authenticated', async () => {
      mockGetSession.mockResolvedValue(null);

      const request = createRequest({ query: 'roguelike games' });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized. Please sign in with Steam.');
    });

    it('proceeds when user is authenticated', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const request = createRequest({ query: 'roguelike games' });
      const response = await POST(request);

      expect(response.status).toBe(200);
    });
  });

  describe('Input Validation', () => {
    it('returns 400 when neither query nor filters are provided', async () => {
      mockGetSession.mockResolvedValue(mockSession);

      const request = createRequest({});
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Either a query or filters must be provided');
    });

    it('returns 400 when filters are empty arrays', async () => {
      mockGetSession.mockResolvedValue(mockSession);

      const request = createRequest({
        filters: {
          genres: [],
          difficulties: [],
          playTimes: [],
          modes: [],
        },
      });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Either a query or filters must be provided');
    });

    it('accepts request with only query', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const request = createRequest({ query: 'fast-paced action games' });
      const response = await POST(request);

      expect(response.status).toBe(200);
    });

    it('accepts request with only filters', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const request = createRequest({
        filters: {
          genres: ['Action'],
        },
      });
      const response = await POST(request);

      expect(response.status).toBe(200);
    });

    it('accepts request with both query and filters', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const request = createRequest({
        query: 'roguelike games',
        filters: {
          genres: ['Action'],
          difficulties: ['challenging'],
        },
      });
      const response = await POST(request);

      expect(response.status).toBe(200);
    });
  });

  describe('Calling generateRecommendations', () => {
    it('passes steam ID from session', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const request = createRequest({ query: 'roguelike games' });
      await POST(request);

      expect(mockGenerateRecommendations).toHaveBeenCalledWith(
        mockSession.steamId,
        expect.any(Object)
      );
    });

    it('passes count of 10', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const request = createRequest({ query: 'roguelike games' });
      await POST(request);

      expect(mockGenerateRecommendations).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ count: 10 })
      );
    });

    it('passes the query as customPrompt', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const request = createRequest({ query: 'roguelike games with dark themes' });
      await POST(request);

      expect(mockGenerateRecommendations).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ customPrompt: 'roguelike games with dark themes' })
      );
    });

    it('passes filters to generateRecommendations', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const filters = {
        genres: ['Action', 'RPG'],
        difficulties: ['challenging'],
        playTimes: ['medium'],
        modes: ['solo'],
      };

      const request = createRequest({
        query: 'roguelike games',
        filters,
      });
      await POST(request);

      expect(mockGenerateRecommendations).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ filters })
      );
    });
  });

  describe('Building Filter Prompts', () => {
    it('builds prompt from genres filter', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const request = createRequest({
        filters: {
          genres: ['Action', 'RPG'],
        },
      });
      await POST(request);

      expect(mockGenerateRecommendations).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          customPrompt: expect.stringContaining('genres: Action, RPG'),
        })
      );
    });

    it('builds prompt from difficulties filter', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const request = createRequest({
        filters: {
          difficulties: ['challenging', 'moderate'],
        },
      });
      await POST(request);

      expect(mockGenerateRecommendations).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          customPrompt: expect.stringContaining('difficulty levels: challenging, moderate'),
        })
      );
    });

    it('builds prompt from playTimes filter with descriptions', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const request = createRequest({
        filters: {
          playTimes: ['short', 'medium', 'long'],
        },
      });
      await POST(request);

      expect(mockGenerateRecommendations).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          customPrompt: expect.stringMatching(/play time:.*quick sessions.*medium sessions.*long sessions/i),
        })
      );
    });

    it('builds prompt from modes filter', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const request = createRequest({
        filters: {
          modes: ['solo', 'coop'],
        },
      });
      await POST(request);

      expect(mockGenerateRecommendations).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          customPrompt: expect.stringContaining('play styles: solo, coop'),
        })
      );
    });

    it('builds combined prompt from multiple filters', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const request = createRequest({
        filters: {
          genres: ['Action'],
          difficulties: ['challenging'],
          modes: ['solo'],
        },
      });
      await POST(request);

      const calledWith = mockGenerateRecommendations.mock.calls[0][1];
      const customPrompt = calledWith.customPrompt;

      expect(customPrompt).toContain('genres: Action');
      expect(customPrompt).toContain('difficulty levels: challenging');
      expect(customPrompt).toContain('play styles: solo');
      expect(customPrompt).toContain('Find games that match these criteria');
    });
  });

  describe('Response Format', () => {
    it('returns recommendations array', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const request = createRequest({ query: 'roguelike games' });
      const response = await POST(request);
      const data = await response.json();

      expect(data.recommendations).toBeDefined();
      expect(Array.isArray(data.recommendations)).toBe(true);
    });

    it('returns userProfile object', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const request = createRequest({ query: 'roguelike games' });
      const response = await POST(request);
      const data = await response.json();

      expect(data.userProfile).toBeDefined();
    });

    it('returns correct recommendation structure', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const request = createRequest({ query: 'roguelike games' });
      const response = await POST(request);
      const data = await response.json();

      const recommendation = data.recommendations[0];
      expect(recommendation).toHaveProperty('name');
      expect(recommendation).toHaveProperty('image');
      expect(recommendation).toHaveProperty('similarity');
      expect(recommendation).toHaveProperty('genre');
      expect(recommendation).toHaveProperty('mode');
      expect(recommendation).toHaveProperty('difficulty');
      expect(recommendation).toHaveProperty('playTime');
      expect(recommendation).toHaveProperty('releaseDate');
      expect(recommendation).toHaveProperty('description');
      expect(recommendation).toHaveProperty('tags');
    });
  });

  describe('Error Handling', () => {
    it('returns 500 when generateRecommendations throws', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockRejectedValue(new Error('AI service unavailable'));

      const request = createRequest({ query: 'roguelike games' });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('AI service unavailable');
    });

    it('returns generic error message for non-Error exceptions', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockRejectedValue('Unknown error');

      const request = createRequest({ query: 'roguelike games' });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to generate recommendations');
    });

    it('handles malformed JSON gracefully', async () => {
      mockGetSession.mockResolvedValue(mockSession);

      // Create a request with invalid JSON
      const request = new NextRequest(
        'http://localhost:3000/api/recommendations/ai-search',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: 'invalid json',
        }
      );

      const response = await POST(request);

      // Should return 500 since JSON parsing will fail
      expect(response.status).toBe(500);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string query', async () => {
      mockGetSession.mockResolvedValue(mockSession);

      const request = createRequest({ query: '' });
      const response = await POST(request);
      const data = await response.json();

      // Empty string should be treated as no query
      expect(response.status).toBe(400);
      expect(data.error).toBe('Either a query or filters must be provided');
    });

    it('handles whitespace-only query', async () => {
      mockGetSession.mockResolvedValue(mockSession);

      // Note: This depends on implementation - the route might not trim
      // If it doesn't trim, this will pass validation but send whitespace to AI
      const request = createRequest({ query: '   ' });
      const response = await POST(request);

      // Current implementation doesn't trim, so this would be valid
      // The test documents actual behavior
      expect(response.status).toBe(200).or;
    });

    it('handles very long query strings', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const longQuery = 'a'.repeat(1000);
      const request = createRequest({ query: longQuery });
      const response = await POST(request);

      expect(response.status).toBe(200);
    });

    it('handles special characters in query', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const request = createRequest({
        query: 'games like "Baldur\'s Gate 3" & similar RPGs',
      });
      const response = await POST(request);

      expect(response.status).toBe(200);
    });

    it('handles null filter values', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const request = createRequest({
        query: 'roguelike games',
        filters: {
          genres: null,
          difficulties: null,
        },
      });
      const response = await POST(request);

      // Should work since query is provided
      expect(response.status).toBe(200);
    });

    it('handles undefined filter values', async () => {
      mockGetSession.mockResolvedValue(mockSession);
      mockGenerateRecommendations.mockResolvedValue(mockApiResponse);

      const request = createRequest({
        query: 'roguelike games',
        filters: {
          genres: undefined,
        },
      });
      const response = await POST(request);

      expect(response.status).toBe(200);
    });
  });
});

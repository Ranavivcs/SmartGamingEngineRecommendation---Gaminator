'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useRef } from 'react';
import { Recommendation } from './RecommendationCard';
import { Review } from '@/types/review';
import { triggerLikeConfetti } from '@/lib/confetti';

interface ReviewModalContextType {
  isDislikeModalOpen: boolean;
  currentGame: Recommendation | null;
  openDislikeModal: (game: Recommendation) => void;
  closeDislikeModal: () => void;
  submitReview: (game: Recommendation, reaction: 'like' | 'dislike', reasons?: string[], detailsText?: string) => void;
  onThankYouShow?: () => void;
  setOnThankYouShow: (callback: () => void) => void;
  setOnReviewSubmit: (callback: (game: Recommendation, reaction: 'like' | 'dislike', reasons?: string[], detailsText?: string) => void) => void;
}

const ReviewModalContext = createContext<ReviewModalContextType | undefined>(undefined);

export function ReviewModalProvider({ children }: { children: ReactNode }) {
  const [isDislikeModalOpen, setIsDislikeModalOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState<Recommendation | null>(null);
  const [onThankYouShow, setOnThankYouShow] = useState<(() => void) | undefined>(undefined);
  // Use ref to avoid state updates during render
  const onReviewSubmitRef = useRef<((game: Recommendation, reaction: 'like' | 'dislike', reasons?: string[], detailsText?: string) => void) | undefined>(undefined);

  const openDislikeModal = (game: Recommendation) => {
    setCurrentGame(game);
    setIsDislikeModalOpen(true);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  };

  const closeDislikeModal = () => {
    setIsDislikeModalOpen(false);
    setCurrentGame(null);
    // Restore body scroll
    document.body.style.overflow = '';
  };

  const setOnReviewSubmit = useCallback((callback: (game: Recommendation, reaction: 'like' | 'dislike', reasons?: string[], detailsText?: string) => void) => {
    onReviewSubmitRef.current = callback;
  }, []);

  const submitReview = useCallback(async (
    game: Recommendation,
    reaction: 'like' | 'dislike',
    reasons: string[] = [],
    detailsText?: string
  ) => {
    // Create review object
    const review: Review = {
      gameId: game.name,
      gameTitle: game.name,
      reaction,
      reasons,
      detailsText,
      createdAt: new Date().toISOString(),
    };
    console.log('REVIEW:', review);

    // Save review to Supabase
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: game.name,
          gameTitle: game.name,
          reaction,
          reasons,
          detailsText,
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Unknown error';
        try {
          const error = await response.json();
          errorMessage = error.error || JSON.stringify(error);
        } catch (e) {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        console.error('Failed to save review:', errorMessage);
        // Continue anyway - don't block the UI
      } else {
        const result = await response.json();
        console.log('Review saved successfully:', result);
      }
    } catch (error) {
      console.error('Error saving review:', error);
      // Continue anyway - don't block the UI
    }

    // Call the review submit handler (removes game from array, etc.)
    onReviewSubmitRef.current?.(game, reaction, reasons, detailsText);

    // Show confetti for likes
    if (reaction === 'like') {
      triggerLikeConfetti();
      setTimeout(() => {
        onThankYouShow?.();
      }, 500);
    } else {
      // For dislikes, thank you is shown after modal closes
      onThankYouShow?.();
    }
  }, [onThankYouShow]);

  return (
    <ReviewModalContext.Provider
      value={{
        isDislikeModalOpen,
        currentGame,
        openDislikeModal,
        closeDislikeModal,
        submitReview,
        onThankYouShow,
        setOnThankYouShow,
        setOnReviewSubmit,
      }}
    >
      {children}
    </ReviewModalContext.Provider>
  );
}

export function useReviewModal() {
  const context = useContext(ReviewModalContext);
  if (context === undefined) {
    throw new Error('useReviewModal must be used within a ReviewModalProvider');
  }
  return context;
}

'use client';

import { useReviewModal } from './ReviewModalContext';
import DislikeFeedbackModal from './DislikeFeedbackModal';

export default function GlobalDislikeModal() {
  const { isDislikeModalOpen, currentGame, closeDislikeModal, submitReview } = useReviewModal();

  if (!currentGame) return null;

  const handleSubmit = (reasons: string[], detailsText: string) => {
    submitReview(currentGame, 'dislike', reasons, detailsText);
    closeDislikeModal();
  };

  return (
    <DislikeFeedbackModal
      gameTitle={currentGame.name}
      gameId={currentGame.name}
      isOpen={isDislikeModalOpen}
      onClose={closeDislikeModal}
      onSubmit={handleSubmit}
    />
  );
}

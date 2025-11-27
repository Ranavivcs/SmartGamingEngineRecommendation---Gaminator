'use client';

import { CardCornersView } from './CardCornersView';

interface CardCornersProps {
  borderColor: string;
}

export function CardCorners({ borderColor }: CardCornersProps) {
  return <CardCornersView borderColor={borderColor} />;
}


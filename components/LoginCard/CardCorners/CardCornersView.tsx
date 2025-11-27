interface CardCornersViewProps {
  borderColor: string;
}

export function CardCornersView({ borderColor }: CardCornersViewProps) {
  return (
    <>
      <div
        className="absolute top-4 right-4 w-8 h-8 border-r border-t rounded-tr-xl opacity-30"
        style={{ borderColor }}
      />
      <div
        className="absolute bottom-4 left-4 w-8 h-8 border-l border-b rounded-bl-xl opacity-30"
        style={{ borderColor }}
      />
    </>
  );
}


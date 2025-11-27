interface BottomGradientViewProps {
  themeColor: string;
}

export function BottomGradientView({ themeColor }: BottomGradientViewProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-0">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(to top, ${themeColor}20, transparent)`,
        }}
      />
    </div>
  );
}


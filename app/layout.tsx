import type { Metadata } from 'next';
import './globals.css';
import { ReviewModalProvider } from '@/components/Recommendations/ReviewModalContext';
import GlobalDislikeModal from '@/components/Recommendations/GlobalDislikeModal';

export const metadata: Metadata = {
  title: 'Gaming App - Sign In',
  description: 'Sign in to continue and get personalized game recommendations',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ReviewModalProvider>
          {children}
          <GlobalDislikeModal />
        </ReviewModalProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';

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
      <body className="antialiased">{children}</body>
    </html>
  );
}

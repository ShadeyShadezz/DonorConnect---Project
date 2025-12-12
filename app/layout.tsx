import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: 'donorConnect - Connecting Donors with Causes',
  description: 'A platform to connect donors with meaningful causes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="main-content">
          {children}
        </main>
        <footer className="footer">
          <p>© 2024 donorConnect. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
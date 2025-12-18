// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import StaffNavbar from './components/StaffNavbar1';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        {/* Main Navbar - Always shows on public pages */}
        <Navbar />
        
        {/* Staff Navbar - Conditionally shows on staff pages (handles its own visibility) */}
        <StaffNavbar />
        
        <main className="main-content">
          {children}
        </main>
        
        <footer className="footer">
          <p>© 2025 donorConnect. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
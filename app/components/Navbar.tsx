import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link href="/" className="navbar-logo">
          donor<span className="navbar-logo-accent">Connect</span>
        </Link>
        <div className="navbar-links">
          <Link href="/" className="navbar-link">
            Home
          </Link>
          <Link href="/mission" className="navbar-link">
            Mission
          </Link>
          <Link href="/donate" className="navbar-btn">
            Donate
          </Link>
          <Link href="/contact" className="navbar-link">
            Contact
          </Link>
          <Link href="/signup" className="navbar-signup">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
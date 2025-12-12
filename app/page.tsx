import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <h1 className="hero-title">
          Welcome to <span className="hero-accent">donorConnect</span>
        </h1>
        <p className="hero-subtitle">
          Connecting generous donors with meaningful causes to create positive change.
        </p>
        <a href="/donate" className="btn btn-primary">
          Start Donating
        </a>
      </section>

      <div className="features">
        <div className="feature-card">
          <h3 className="feature-title">Make an Impact</h3>
          <p className="feature-text">Your donations directly support verified causes.</p>
        </div>
        <div className="feature-card">
          <h3 className="feature-title">Transparent Process</h3>
          <p className="feature-text">Track exactly where your contributions go.</p>
        </div>
        <div className="feature-card">
          <h3 className="feature-title">Community Focused</h3>
          <p className="feature-text">Support local initiatives in your area.</p>
        </div>
      </div>
    </div>
  );
}

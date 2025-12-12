import './Mission.css';

export default function MissionPage() {
  return (
    <div className="mission-container">
      <h1 className="mission-title">Our Mission</h1>
      
      <div className="mission-content">
        <p className="mission-text">
          At donorConnect, our mission is to bridge the gap between compassionate donors and impactful causes. 
          We believe that every contribution, no matter the size, can create meaningful change.
        </p>
        
        <h2 className="mission-subtitle">Our Vision</h2>
        <p className="mission-text">
          To create a world where charitable giving is accessible, transparent, and effective for everyone.
        </p>
        
        <h2 className="mission-subtitle">Core Values</h2>
        <ul className="mission-list">
          <li><strong>Transparency:</strong> Full visibility into how donations are used</li>
          <li><strong>Impact:</strong> Focus on measurable, positive outcomes</li>
          <li><strong>Community:</strong> Strengthening local and global communities</li>
          <li><strong>Accessibility:</strong> Making giving easy for everyone</li>
        </ul>
      </div>
    </div>
  );
}
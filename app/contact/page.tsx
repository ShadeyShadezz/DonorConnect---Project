import './Contact.css';

export default function ContactPage() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      
      <div className="contact-grid">
        <div className="contact-form-container">
          <h2 className="contact-subtitle">Get in Touch</h2>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" className="contact-input" />
            <input type="email" placeholder="Email Address" className="contact-input" />
            <textarea placeholder="Your Message" rows={4} className="contact-textarea" />
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
        
        <div className="contact-info">
          <h2 className="contact-subtitle">Contact Information</h2>
          <div className="info-item">
            <h3 className="info-label">Email</h3>
            <p className="info-text">contact@donorconnect.org</p>
          </div>
          <div className="info-item">
            <h3 className="info-label">Phone</h3>
            <p className="info-text">(555) 123-4567</p>
          </div>
          <div className="info-item">
            <h3 className="info-label">Address</h3>
            <p className="info-text">123 Charity Street<br />Hope City, HC 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
}
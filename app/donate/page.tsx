import './Donate.css';

export default function DonatePage() {
  return (
    <div className="donate-container">
      <h1 className="donate-title">Make a Donation</h1>
      
      <div className="donate-form-container">
        <form className="donate-form">
          <div className="form-group">
            <label className="form-label">Donation Amount</label>
            <div className="amount-buttons">
              {[25, 50, 100, 250].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className="amount-btn"
                >
                  ${amount}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Custom amount"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Select Cause</label>
            <select className="form-select">
              <option>Education</option>
              <option>Healthcare</option>
              <option>Environment</option>
              <option>Community</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary donate-submit">
            Donate Now
          </button>
        </form>
      </div>
    </div>
  );
}
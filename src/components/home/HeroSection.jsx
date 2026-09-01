import { CheckCircle2, ArrowRight, Clock } from 'lucide-react';
import './HeroSection.css';

export default function HeroSection({ setCurrentPage }) {
  return (
    <section className="hero-section" id="home">
      <div className="hero-container">
        
        
        <div className="hero-content">
          <span className="badge">NOW AVAILABLE IN EGYPT</span>
          
          <h1 className="hero-title">
            Book your<br></br> appointment. <span className="highlight">Skip the waiting.</span>
          </h1>
          
          <p className="hero-description">
            Find a service, choose your preferred time, and track your turn from anywhere. No more physical queues — manage everything from your phone.
          </p>

          <ul className="hero-features">
            <li><CheckCircle2 className="check-icon" /> Book appointments at hospitals, banks & government offices</li>
            <li><CheckCircle2 className="check-icon" /> Get real-time queue position updates</li>
            <li><CheckCircle2 className="check-icon" /> Receive SMS & email reminders</li>
          </ul>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => setCurrentPage('services')}>
              Book Appointment <ArrowRight className="btn-icon" />
            </button>
            <button className="btn-secondary">
              <Clock className="btn-icon" /> Track My Queue
            </button>
          </div>

         
        </div>

      
        <div className="hero-image-container">
          <img 
            src="https://images.unsplash.com/photo-1758598497476-c4a474397d9e?w=900&h=700&fit=crop&auto=format" 
            alt="User booking appointment" 
            className="hero-image"
          />
        </div>

      </div>
    </section>
  );
}
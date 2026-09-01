import { ArrowRight } from 'lucide-react';
import './CtaBanner.css';

export default function CtaBanner() {
  return (
    <section className="cta-banner-container">
      <div className="cta-banner-content">
        <h2>Ready to skip the waiting?</h2>
        <p>Join over 120,000 people who have already upgraded their appointment experience. It is completely free to get started.</p>
        <button className="cta-button">
          Book an Appointment <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
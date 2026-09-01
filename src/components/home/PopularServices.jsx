import { Star, ArrowRight } from 'lucide-react';
import './PopularServices.css';

export default function PopularServices({ setCurrentPage}) {
  const servicesData = [
    { title: "Account Services & Loans", sub: "National Bank of Egypt", tag: "Banking", rating: "4.8", reviews: "1,420", img: "https://images.unsplash.com/photo-1621293954908-907159247fc8?w=600&h=380&fit=crop&auto=format" },
    { title: "General Medicine Consultation", sub: "Cairo University Hospital", tag: "Clinics", rating: "4.7", reviews: "2,310", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=380&fit=crop&auto=format" },
    { title: "Enrollment & Registration", sub: "Cairo University — Student Affairs", tag: "Student Affairs", rating: "4.5", reviews: "830", img: "https://images.unsplash.com/photo-1741699428220-65f37f3fbbcb?w=600&h=380&fit=crop&auto=format" },
    { title: "Pharmacy & Prescription", sub: "Ain Shams University Hospital", tag: "Clinics", rating: "4.9", reviews: "1,890", img: "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?w=600&h=380&fit=crop&auto=format" }
  ];

return (
    <section id="services">
      <div>
        <div>
          <span>SERVICES</span>
          <h2>Popular Services</h2>
          <p>Choose from hundreds of verified service providers across Egypt.</p>
          <button onClick={() => setCurrentPage('services')}> View all services {<ArrowRight/>} </button>
        </div>
      </div>

      <div>
        {servicesData.map((service, idx) => (
          <div key={idx}>
            <div><img src={service.img} alt={service.title} /><span>{service.tag}</span></div>
            <div>
              <h3>{service.title}</h3><p>{service.sub}</p>
              <div><span><Star /> {service.rating} ({service.reviews})</span><button>Book Now</button></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
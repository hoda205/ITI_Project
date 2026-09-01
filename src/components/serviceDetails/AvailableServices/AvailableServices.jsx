import ServiceCard from './ServiceCard';

export default function AvailableServices({ services, onSelectService }) {
  return (
    <div className="space-y-4">
      {/* Tab Header Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200">
        <h2 className="text-lg font-bold mb-1 text-slate-900">Available Services</h2>
        <p className="text-sm text-slate-500">
          Select a service to see available time slots and book an appointment.
        </p>
      </div>

      {/* Services List */}
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onBook={(srv) => onSelectService ? onSelectService(srv) : console.log("Booking:", srv.title)}
        />
      ))}
    </div>
  );
}
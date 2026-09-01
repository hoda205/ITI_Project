import BookingCard from './BookingCard';
import { CalendarX } from 'lucide-react';

export default function BookingsList({ bookings = [], onCancel }) {
  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <CalendarX size={24} />
        </div>
        <h3 className="text-base font-bold text-slate-900">No bookings found</h3>
        <p className="text-sm text-slate-500 mt-1">There are no appointments in this category.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} onCancel={onCancel} />
      ))}
    </div>
  );
}
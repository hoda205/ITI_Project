import { Calendar, Clock, MapPin, Ticket, Play, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BookingCard({ booking, onCancel }) {
  const navigate = useNavigate();

  // تحديد ألوان الـ Badge حسب الحالة
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'waiting':
      case 'confirmed':
        return (
          <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-600">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Waiting
          </span>
        );
      case 'completed':
        return (
          <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 capitalize">
            {status || 'Waiting'}
          </span>
        );
    }
  };

  const isCancelled = booking.status === 'cancelled';
  const isCompleted = booking.status === 'completed';

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden transition-shadow hover:shadow-md">
      <div className="flex flex-col sm:flex-row">
        {/* Branch / Service Image */}
        <div className="relative sm:w-44 h-40 sm:h-auto shrink-0 overflow-hidden bg-slate-100">
          <img
            alt={booking.serviceName || 'Service Image'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={booking.image || 'https://images.unsplash.com/photo-1621293954908-907159247fc8?w=400&h=260&fit=crop&auto=format'}
          />
          <div className="absolute top-3 left-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm bg-blue-50/90 text-blue-600">
              {booking.category || 'Services'}
            </span>
          </div>
        </div>

        {/* Details Content */}
        <div className="flex-1 p-5 flex flex-col gap-4">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-medium mb-0.5 text-slate-500">
                {booking.bookingRef || `BK-${booking.id?.slice(-4) || '2841'}`}
              </p>
              <h3 className="font-bold text-base leading-snug text-slate-900 truncate">
                {booking.serviceName || 'General Service'}
              </h3>
              <p className="text-sm mt-0.5 text-slate-500 truncate">
                {booking.branchName || booking.location || 'Main Branch'}
              </p>
            </div>
            {getStatusBadge(booking.status)}
          </div>

          {/* Meta Info Grid */}
          <div className="flex flex-wrap gap-x-5 gap-y-1.5">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-slate-400" />
              <span className="text-xs font-medium text-slate-500">{booking.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-slate-400" />
              <span className="text-xs font-medium text-slate-500">
                {booking.time} {booking.duration ? `· ${booking.duration} min` : ''}
              </span>
            </div>
            {booking.location && (
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-400" />
                <span className="text-xs font-medium text-slate-500">{booking.location}</span>
              </div>
            )}
          </div>

          {/* Queue & Counter Badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200">
              <Ticket size={14} className="text-blue-600" />
              <span className="text-xs font-bold text-blue-600">
                Queue #{booking.queueNumber || 'A-01'}
              </span>
            </div>
            {booking.counter && (
              <span className="text-xs px-2.5 py-1.5 rounded-xl font-medium bg-slate-100 text-slate-500">
                Counter {booking.counter}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-slate-100">
            {/* زر المتابعة - يوجه لصفحة الـ Queue */}
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/queue?offeredServiceId=${booking.offeredServiceId}&appointmentId=${booking.id}`
                )
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer"
            >
              <Play size={13} strokeWidth={2.5} />
              Track
            </button>

          

            {/* زر الإلغاء */}
            {!isCancelled && !isCompleted && (
              <button
                type="button"
                onClick={() => onCancel(booking.id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl transition-colors text-red-600 bg-red-100 hover:bg-red-200 cursor-pointer"
              >
                <XCircle size={13} strokeWidth={2} />
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
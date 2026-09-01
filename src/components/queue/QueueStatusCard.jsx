import { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  CalendarPlus,
  Navigation,
  AlertCircle,
  X
} from 'lucide-react';

export default function QueueStatusCard({ booking, onCancel }) {
  const [showToast, setShowToast] = useState(true);

  // إخفاء التوست تلقائياً بعد 3 ثوانٍ
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!booking) return null;

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Appointment: ${booking.serviceName || 'Checkup'}`);
    const location = encodeURIComponent(booking.location || 'Clinic Branch');
    const details = encodeURIComponent(`Booking Reference: ${booking.id || ''}`);
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  const handleGetDirections = () => {
    const query = encodeURIComponent(booking.location || 'Care Clinic Cairo');
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="relative max-w-md w-full mx-auto space-y-4">

      {/* Top Floating Toast Notification */}
      {showToast && (
        <div className="fixed  top-5 left-1/2 -translate-x-1/2 z-101 w-[90%] max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 animate-bounce-short">
          <div className="p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200 text-green-600 flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} strokeWidth={2.2} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Booking Confirmed!</h4>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowToast(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Green Animated Progress Bar */}
          <div className="w-full bg-green-100 h-1">
            <div
              className="bg-green-600 h-full origin-left"
              style={{
                animation: 'toastProgress 3s linear forwards'
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Main Boarding Pass Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Ticket Header */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Digital Pass</span>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {booking.id || 'QF-2026-00819'}
          </span>
        </div>

        {/* Big Ticket Number Section */}
        <div className="p-6 text-center border-b border-slate-100 bg-gradient-to-b from-blue-50/40 to-transparent">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Your Queue Number</p>
          <p className="text-6xl font-black text-blue-600 tracking-tight my-1.5 tabular-nums">
            {booking.queueNumber || 'A-27'}
          </p>
          <p className="text-xs font-medium text-slate-500">
            Estimated Duration: <span className="font-semibold text-slate-700">{booking.duration || 15} mins</span>
          </p>
        </div>

        {/* Ticket Body: Details Grid */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Service</p>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{booking.serviceName || 'General Health Checkup'}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Location</p>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{booking.location || 'Nasr City Branch'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Calendar size={15} />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase">Date</p>
                <p className="text-xs font-bold text-slate-800">{booking.date || 'Aug 20, 2026'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Clock size={15} />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase">Time</p>
                <p className="text-xs font-bold text-slate-800">{booking.time || '10:30 AM'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Perforation / Cutout Divider */}
        <div className="relative w-full">
          <div className="border-b-2 border-dashed border-slate-200 w-full"></div>
          <div className="absolute -left-3.5 -top-3 w-7 h-7 bg-slate-50 rounded-full border-r border-slate-200"></div>
          <div className="absolute -right-3.5 -top-3 w-7 h-7 bg-slate-50 rounded-full border-l border-slate-200"></div>
        </div>

        {/* QR Code & Patient Section */}
        <div className="p-6 bg-slate-50/60 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Patient / Reserved For</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{booking.user?.fullName || 'Valued Patient'}</p>
            <p className="text-xs text-slate-500 mt-0.5">{booking.user?.phone || '+20 10 0000 0000'}</p>
          </div>

          
        </div>
      </div>

      {/* Utility Actions */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={handleAddToCalendar}
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
        >
          <CalendarPlus size={15} className="text-blue-600" />
          Add to Calendar
        </button>

        <button
          type="button"
          onClick={handleGetDirections}
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
        >
          <Navigation size={15} className="text-blue-600" />
          Get Directions
        </button>
      </div>

      {/* Guidelines */}
      <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-start gap-3">
        <AlertCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 leading-relaxed">
          Please arrive <strong>10 minutes</strong> before your scheduled time. Show this digital pass or QR code at the reception counter.
        </p>
      </div>

      {/* Cancel Button */}
      {/* Danger Cancel Button */}
<div className="pt-2">
  <button
    type="button"
    onClick={onCancel}
    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-xs font-bold tracking-wide uppercase shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-200 cursor-pointer border border-red-500"
  >
    Cancel Appointment
  </button>
</div>

    </div>
  );
}
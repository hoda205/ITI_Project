import { XCircle, Ticket } from 'lucide-react';

export default function CancelBookingAction({ onCancel, onViewTicket }) {
  return (
    <div className="rounded-2xl p-4 sm:p-5 shadow-sm bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
      <button
        type="button"
        onClick={onViewTicket}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
      >
        <Ticket size={16} />
        View Ticket
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
      >
        <XCircle size={16} />
        Cancel Appointment
      </button>
    </div>
  );
}
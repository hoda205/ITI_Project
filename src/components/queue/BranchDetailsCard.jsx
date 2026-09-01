import { Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export default function BranchDetailsCard({ branch, appointment, user, progress = 70 }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Header Details */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Service Details
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              {branch?.name || "Care Clinic - New Cairo Branch"}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {branch?.service || "General Health Checkup"} · Counter {branch?.counter || "3"}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600 shrink-0">
            <CheckCircle2 size={13} /> Confirmed
          </span>
        </div>

        {/* Date & Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Date</p>
              <p className="text-sm font-bold text-slate-800">{appointment?.date || "Today"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Time Slot</p>
              <p className="text-sm font-bold text-slate-800">{appointment?.time || "--"}</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        {user?.fullName && (
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Reserved For
            </p>
            <p className="text-sm font-bold text-slate-900">{user.fullName}</p>
            <p className="text-xs text-slate-500 mt-0.5">{user.phone} · {user.email}</p>
          </div>
        )}
      </div>

      {/* Queue Progress Bar */}
      <div className="mt-8 pt-5 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-500">Queue Progress</span>
          <span className="text-blue-600">{progress}%</span>
        </div>
        <div className="relative h-2.5 rounded-full overflow-hidden bg-slate-100">
          <div
            className="h-full rounded-full transition-all duration-700 bg-blue-600"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
import { Building2, Calendar, Clock, Activity } from 'lucide-react';

export default function BookingSummary({ service, selectedDate, selectedTime, onConfirm, disabled }) {
    if (!service) return null;

    const formattedDate = selectedDate
        ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        : 'Not selected';

    return (
        <div className="sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 pt-5 pb-4 border-b border-slate-100">
                    <h3 className="font-bold text-base text-slate-900">Booking Summary</h3>
                </div>

                <div className="relative h-40 overflow-hidden bg-slate-100">
                    <img alt={service.name} className="w-full h-full object-cover" src={service.image} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-3 left-4 right-4">
                        <p className="text-xs text-white/75 font-medium">{service.category}</p>
                        <p className="text-sm font-bold text-white leading-tight">{service.name}</p>
                    </div>
                </div>

                <div className="p-5 space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-blue-50 text-blue-600">
                            <Building2 size={14} strokeWidth={1.75} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-400">Branch</p>
                            <p className="text-sm font-semibold truncate text-slate-900">{service.name}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-blue-50 text-blue-600">
                            <Calendar size={14} strokeWidth={1.75} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-400">Date</p>
                            <p className={`text-sm font-semibold truncate ${selectedDate ? 'text-slate-900' : 'text-slate-400'}`}>
                                {formattedDate}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-blue-50 text-blue-600">
                            <Clock size={14} strokeWidth={1.75} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-400">Time</p>
                            <p className={`text-sm font-semibold truncate ${selectedTime ? 'text-slate-900' : 'text-slate-400'}`}>
                                {selectedTime || 'Not selected'}
                            </p>
                        </div>
                    </div>

                    {/* <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-blue-50 text-blue-600">
                            <Activity size={14} strokeWidth={1.75} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-400">Estimated Duration</p>
                            <p className="text-sm font-semibold truncate text-slate-900">{service.duration} min</p>
                        </div>
                    </div> */}
                </div>

                

                <div className="px-5 pb-5">
                    <button
                        type="button"
                        disabled={disabled}
                        onClick={onConfirm}
                        className={`w-full py-3.5 text-sm font-bold text-white rounded-xl transition-all shadow-md ${disabled
                                ? 'bg-slate-300 shadow-none cursor-not-allowed'
                                : 'bg-blue-600 hover:brightness-90 shadow-blue-600/20'
                            }`}
                    >
                        Confirm Appointment →
                    </button>
                    {disabled && (
                        <p className="mt-3 text-xs text-center text-slate-400">
                            {!selectedDate ? '← Select a date to continue' : '← Select a time to continue'}
                        </p>
                    )}
                </div>
            </div>

        </div>
    );
}
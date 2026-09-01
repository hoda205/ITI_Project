import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ServiceCard({ service }) {
    if (!service) return null;

    const navigate = useNavigate();

    const canBook =
        (service.available !== undefined
            ? service.available
            : service.isToday) &&
        service.slotsAvailable > 0;

    const onBook = () => {
        if (!canBook) return;

        navigate(
            `/book?serviceId=${service.serviceId}&offeredServiceId=${service.id}`
        );
    };
    return (
        <div
            className={`group bg-white rounded-2xl overflow-hidden border border-slate-200 transition-all duration-200 ${canBook ? 'hover:shadow-md hover:border-slate-300' : 'opacity-85'
                }`}
        >
            <div className="flex flex-col sm:flex-row">

                {/* Service Image */}
                <div className="relative sm:w-52 h-44 sm:h-auto shrink-0 overflow-hidden bg-slate-100">
                    <img
                        src={service.image}
                        alt={service.name || service.title}
                        className={`w-full h-full object-cover transition-all duration-500 ease-out ${canBook
                            ? 'group-hover:scale-105 filter-none opacity-100'
                            : 'grayscale contrast-75 brightness-90 opacity-60'
                            }`}
                    />

                    <div
                        className={`absolute inset-0 transition-opacity duration-300 ${canBook
                            ? 'bg-gradient-to-t sm:bg-gradient-to-r from-slate-900/30 via-transparent to-transparent'
                            : 'bg-slate-900/30'
                            }`}
                    />

                    {/* شارة في منتصف الصورة عند عدم التوفر */}
                    {!canBook && (
                        <div className="absolute inset-0 flex items-center justify-center p-3">
                            <span className="px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                                Unavailable
                            </span>
                        </div>
                    )}
                </div>

                {/* Content Body */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                        {/* Header & Status */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                                <h3 className="font-bold text-base text-slate-900 leading-tight">
                                    {service.name || service.title}
                                </h3>
                                <span className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                    <Clock size={12} strokeWidth={1.75} />
                                    {service.duration} {typeof service.duration === 'number' ? 'min' : ''}
                                </span>
                            </div>

                            {/* Availability Badge */}
                            <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${canBook
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-slate-100 text-slate-500'
                                    }`}
                            >
                                {canBook && <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />}
                                {service.badgeText || (canBook ? 'Available' : 'Unavailable')}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm leading-relaxed mb-4 text-slate-500 line-clamp-2">
                            {service.description}
                        </p>
                    </div>

                    {/* Footer & CTA */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-50 text-slate-500">
                            {service.slotsAvailable ?? 0} slots available
                        </span>
                        <button
                            type="button"
                            disabled={!canBook}
                            onClick={onBook}
                            className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all ${canBook
                                ? 'bg-blue-600 text-white hover:brightness-90 active:scale-95 shadow-sm'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                }`}
                        >
                            {canBook ? 'Book Now →' : 'Unavailable'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
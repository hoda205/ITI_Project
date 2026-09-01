import { Clock, Users } from 'lucide-react';

export default function ServiceCard({ service, onEdit }) {

    if (!service) return null;

    return (
        <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Absolute Status Badge (Top Right) */}
            <div className="absolute top-4 right-5 flex items-center gap-1.5 z-10">
                <span className={`w-2 h-2 rounded-full ${service.available ? 'bg-green-600' : 'bg-red-600'}`}></span>
                <span className={`text-xs font-semibold ${service.available ? 'text-green-600' : 'text-red-600'}`}>
                    {service.available ? 'Available' : 'Unavailable'}
                </span>
            </div>

            <div className="flex items-center gap-0">
                {/* Service Image */}
                <div className="relative w-32 h-28 shrink-0 overflow-hidden bg-slate-100">
                    <img
                        alt={service.name}
                        className="w-full h-full object-cover"
                        src={service.image}
                    />
                </div>

                {/* Service Details */}
                <div className="flex-1 px-5 py-4 pr-32">
                    <h2 className="font-bold text-base leading-tight text-slate-900">
                        {service.name}
                    </h2>
                    <p className="text-xs mt-1 text-slate-500 line-clamp-1">
                        {service.description}
                    </p>

                    {/* Metadata / Stats */}
                    <div className="flex items-center gap-4 mt-3">
                        <span className="flex items-center gap-1.5 text-xs text-slate-600">
                            <Clock size={13} strokeWidth={1.75} className="text-slate-400" />
                            {service.duration} mins
                        </span>

                        <span className="flex items-center gap-1.5 text-xs text-slate-600">
                            <Users size={13} strokeWidth={1.75} className="text-slate-400" />
                            {service.slotsAvailable} slots available
                        </span>
                    </div>
                </div>

                {/* Change Button */}
                <button
                    type="button"
                    onClick={onEdit}
                    className="mr-5 mt-5 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg shrink-0 transition-colors cursor-pointer"
                >
                    Change
                </button>
            </div>
        </div>
    );
}
import { MapPin, Phone, Mail, Landmark, ExternalLink } from 'lucide-react';
import Card from '../../common/Card'; // تأكدي من صحة المسار

export default function HoursAndInfoTab({
    hours = defaultSchedule,
    contact = defaultContact,
    branchName = "Banque Misr",
    branchSubtitle = "Nasr City Branch",
    mapUrl
}) {
    // دالة مساعدة لتحديد الأيقونة المناسبة في حال لم تُمرر
    const getContactIcon = (label, customIcon) => {
        if (customIcon) return customIcon;
        const lower = (label || "").toLowerCase();
        if (lower.includes("address")) return MapPin;
        if (lower.includes("phone")) return Phone;
        if (lower.includes("email")) return Mail;
        return Landmark;
    };

    return (
        <div className="space-y-5">
            {/* 1. Opening Hours Card */}
            <Card>
                <h2 className="text-lg font-bold text-slate-900 mb-5">Opening Hours</h2>
                <div className="space-y-3">
                    {hours.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0"
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className={`text-sm font-medium ${item.isToday ? 'text-blue-600' : 'text-slate-900'
                                        }`}
                                >
                                    {item.day}
                                </span>
                                {item.isToday && (
                                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                                        Today
                                    </span>
                                )}
                            </div>

                            <span
                                className={`text-sm font-medium ${item.isClosed ? 'text-rose-600' : 'text-slate-500'
                                    }`}
                            >
                                {item.time}
                            </span>
                        </div>
                    ))}
                </div>
            </Card>

            {/* 2. Contact Information Card */}
            <Card>
                <h2 className="text-lg font-bold text-slate-900 mb-5">Contact Information</h2>
                <div className="space-y-4">
                    {contact.map((item, index) => {
                        const Icon = getContactIcon(item.label, item.icon);
                        return (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-blue-50 text-blue-600">
                                    <Icon size={15} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold mb-0.5 text-slate-400">{item.label}</p>
                                    <p className="text-sm font-medium text-slate-900">{item.value || "Not available"}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* 3. Location & Map Preview Card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                        src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=400&fit=crop&auto=format"
                        alt="Cairo city map view"
                        className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white rounded-xl px-4 py-3 shadow-lg text-center">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 bg-blue-600 text-white">
                                <MapPin size={16} />
                            </div>
                            <p className="text-xs font-bold text-slate-900">{branchName}</p>
                            <p className="text-xs text-slate-500">{branchSubtitle}</p>
                        </div>
                    </div>
                </div>

                {/* const lat = 30.0444;
                const lng = 31.2357;
                // أو: const locationName = encodeURIComponent("Cairo Tower"); */}

                <div className="p-4">
                    <a
                        href={mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold rounded-xl border border-slate-200 text-blue-600 hover:bg-slate-50 transition-colors"
                    >
                        <span>Open in Maps</span>
                        <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </div>
    );
}

const defaultSchedule = [
    { day: "Sunday", time: "09:00 AM – 03:00 PM", isToday: false, isClosed: false },
    { day: "Monday", time: "09:00 AM – 03:00 PM", isToday: false, isClosed: false },
    { day: "Tuesday", time: "09:00 AM – 03:00 PM", isToday: false, isClosed: false },
    { day: "Wednesday", time: "09:00 AM – 03:00 PM", isToday: false, isClosed: false },
    { day: "Thursday", time: "09:00 AM – 03:00 PM", isToday: false, isClosed: false },
    { day: "Friday", time: "Closed", isToday: true, isClosed: true },
    { day: "Saturday", time: "Closed", isToday: false, isClosed: true },
];

const defaultContact = [
    { label: "Address", value: "18 Abbas El-Akkad St, Nasr City, Cairo 11762", icon: MapPin },
    { label: "Phone", value: "+20 2 2404 5566", icon: Phone },
    { label: "Email", value: "nasrcity@banquemisr.com.eg", icon: Mail },
    { label: "SWIFT Code", value: "BMISEGCX", icon: Landmark },
];

export default function BranchStats({ stats }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                    <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200 text-center">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${stat.bgClass} ${stat.textClass}`}>
                            <Icon size={18} />
                        </div>
                        <div className="text-xl font-extrabold text-slate-900">{stat.value}</div>
                        <div className="text-xs mt-0.5 text-slate-500">{stat.label}</div>
                    </div>
                );
            })}
        </div>
    );
}
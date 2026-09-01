export default function Tabs({ tabs, activeTab, onTabChange }) {
    return (
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-slate-200 mb-8 overflow-x-auto">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex-1 min-w-max px-4 py-2.5 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${isActive
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                            }`}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}
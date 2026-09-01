import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BookingsHeader({ stats, activeTab, onTabChange }) {
  const navigate = useNavigate();

  const tabs = [
    { key: 'upcoming', label: 'Upcoming', count: stats.upcoming },
    { key: 'past', label: 'Past', count: stats.past },
    { key: 'cancelled', label: 'Cancelled', count: stats.cancelled },
  ];

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Title & Action */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
            <p className="text-sm mt-1 text-slate-500">
              Manage your appointments and track your queue status.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/services')}
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            <Plus size={16} strokeWidth={2.5} />
            New Booking
          </button>
        </div>

        {/* Stats Summary Cards */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-xl p-3 text-center bg-blue-50">
            <p className="text-xl font-extrabold text-blue-600">{stats.upcoming}</p>
            <p className="text-xs font-medium mt-0.5 text-blue-600">Upcoming</p>
          </div>
          <div className="rounded-xl p-3 text-center bg-green-50">
            <p className="text-xl font-extrabold text-green-600">{stats.past}</p>
            <p className="text-xs font-medium mt-0.5 text-green-600">Completed</p>
          </div>
          <div className="rounded-xl p-3 text-center bg-red-50">
            <p className="text-xl font-extrabold text-red-600">{stats.cancelled}</p>
            <p className="text-xs font-medium mt-0.5 text-red-600">Cancelled</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mt-6 flex gap-1 p-1 rounded-xl w-fit bg-slate-100">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onTabChange(tab.key)}
                className={`relative px-5 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'bg-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
                <span
                  className={`ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-blue-50 text-blue-600' : 'bg-transparent text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
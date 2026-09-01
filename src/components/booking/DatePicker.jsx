import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { isBranchOpenOnDate } from '../../utils/bookingUtils';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function DatePicker({ selectedDate, onSelectDate, workingHours }) {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1));
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const today = new Date(2026, 7, 20);

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-base font-bold mb-5 text-slate-900">Select Date</h3>

            <div className="flex items-center justify-between mb-4">
                <button
                    type="button"
                    onClick={prevMonth}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-slate-50 border border-slate-200 text-slate-500"
                >
                    <ChevronLeft size={14} strokeWidth={2} />
                </button>
                <div className="text-sm font-bold text-slate-900">
                    {currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                </div>
                <button
                    type="button"
                    onClick={nextMonth}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-slate-50 border border-slate-200 text-slate-500"
                >
                    <ChevronRight size={14} strokeWidth={2} />
                </button>
            </div>

            <div className="grid grid-cols-7 mb-2">
                {DAYS.map((day) => (
                    <div key={day} className="text-center text-xs font-semibold py-1 text-slate-400">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1">
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}

                {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
                    const dateObj = new Date(year, month, day);
                    const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                    const isSelected = selectedDate && dateObj.toDateString() === selectedDate.toDateString();
                    const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    const isClosed = !isBranchOpenOnDate(dateObj, workingHours);
                    const isDisabled = isPast || isClosed;

                    return (
                        <button
                            key={day}
                            type="button"
                            disabled={isDisabled}
                            onClick={() => onSelectDate(dateObj)}
                            title={isClosed ? 'Closed on this day' : ''}
                            className={`flex items-center justify-center h-9 w-9 mx-auto rounded-xl text-sm font-medium transition-all ${isSelected
                                    ? 'bg-blue-600 text-white font-bold'
                                    : isToday
                                        ? 'border-2 border-blue-600 text-blue-600 font-bold'
                                        : isDisabled
                                            ? 'text-slate-300 cursor-not-allowed'
                                            : 'text-slate-900 hover:bg-slate-100'
                                }`}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded bg-blue-600 border border-blue-600"></div>
                    <span className="text-xs text-slate-500">Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded bg-transparent border-2 border-blue-600"></div>
                    <span className="text-xs text-slate-500">Today</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded bg-transparent border border-slate-300"></div>
                    <span className="text-xs text-slate-500">Unavailable / Closed</span>
                </div>
            </div>
        </div>
    );
}
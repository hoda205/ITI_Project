import { useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { generateTimeSlots } from '../../utils/bookingUtils';

export default function TimeSlotPicker({ selectedDate, selectedTime, onSelectTime, workingHours, existingAppointments = [] }) {
    const formattedDate = selectedDate?.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    const availableSlots = useMemo(() => {
        // توليد الأوقات الأساسية بناءً على ساعات العمل
        const slots = generateTimeSlots(selectedDate, workingHours);

        if (!selectedDate) return slots;

        // تحويل التاريخ المحدد إلى صيغة YYYY-MM-DD للمقارنة
        const selectedDateString = selectedDate.toISOString().split('T')[0];

        // تصفية أو تحديث حالة الأوقات بناءً على الحجوزات الموجودة مسبقاً في هذا اليوم
        return slots.map((slot) => {
            const isBooked = existingAppointments.some(
                (appointment) => 
                    appointment.date === selectedDateString && 
                    appointment.time === slot.time &&
                    appointment.status !== 'cancelled' // لو فيه حالة إلغاء
            );

            return {
                ...slot,
                available: slot.available && !isBooked, // لو محجوز يصبح غير متاح
            };
        });
    }, [selectedDate, workingHours, existingAppointments]);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-slate-900">Select Time Slot</h3>
                {selectedDate && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                        {formattedDate}
                    </span>
                )}
            </div>
            {!selectedDate ? (
                <div className="rounded-xl p-5 text-center border border-dashed border-slate-200">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 bg-slate-100 text-slate-400">
                        <Calendar size={18} strokeWidth={1.75} />
                    </div>
                    <p className="text-sm text-slate-500">Select a date above to see available time slots.</p>
                </div>
            ) : availableSlots.length === 0 ? (
                <div className="rounded-xl p-5 text-center border border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-500">No available time slots on this day.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                        {availableSlots.map((slot) => {
                            const isSelected = selectedTime === slot.time;
                            return (
                                <button
                                    key={slot.time}
                                    type="button"
                                    disabled={!slot.available}
                                    onClick={() => onSelectTime(slot.time)}
                                    className={`py-2.5 px-1 rounded-xl text-xs font-semibold border transition-all ${!slot.available
                                            ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed line-through'
                                            : isSelected
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                                : 'bg-white text-slate-900 border-slate-200 hover:border-slate-350'
                                        }`}
                                >
                                    {slot.time}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded border bg-blue-600 border-blue-600"></div>
                            <span className="text-xs text-slate-500">Selected</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded border bg-white border-slate-200"></div>
                            <span className="text-xs text-slate-500">Available</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
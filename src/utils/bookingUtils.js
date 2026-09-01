// مصفوفة لربط getDay() بأسماء الأيام في الـ JSON
const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// التحقق هل الفرع يعمل في يوم معين
export const isBranchOpenOnDate = (date, workingHours) => {
  if (!workingHours) return true;
  const dayKey = DAY_NAMES[date.getDay()];
  return workingHours[dayKey]?.isOpen ?? true;
};

// توليد الفترات الزمنية ديناميكياً بين open و close بفارق 30 دقيقة
export const generateTimeSlots = (date, workingHours) => {
  if (!date || !workingHours) return [];
  
  const dayKey = DAY_NAMES[date.getDay()];
  const daySchedule = workingHours[dayKey];

  if (!daySchedule || !daySchedule.isOpen || !daySchedule.open || !daySchedule.close) {
    return [];
  }

  const [openHour, openMin] = daySchedule.open.split(':').map(Number);
  const [closeHour, closeMin] = daySchedule.close.split(':').map(Number);

  const startMinutes = openHour * 60 + openMin;
  const endMinutes = closeHour * 60 + closeMin;
  const slots = [];

  for (let mins = startMinutes; mins < endMinutes; mins += 30) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 === 0 ? 12 : h % 12;
    const formattedTime = `${String(displayHour).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
    
    slots.push({
      time: formattedTime,
      available: true // يمكن دمجها لاحقاً مع الحجوزات السابقة
    });
  }

  return slots;
};
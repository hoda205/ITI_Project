export function checkIsOpenNow(workingHours) {
    const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];

    const now = new Date();

    const todayKey = workingHours?.[days[new Date().getDay()]];
    const todayHours = workingHours?.[todayKey];
    
    if (!todayHours?.isOpen) {
        return false;
    }

    // الوقت الحالي بالدقائق
    const currentTime = now.getHours() * 60 + now.getMinutes();

    // وقت الفتح
    const [openHour, openMinute] = todayHours.open.split(":").map(Number);
    const openTime = openHour * 60 + openMinute;

    // وقت الإغلاق
    const [closeHour, closeMinute] = todayHours.close.split(":").map(Number);
    const closeTime = closeHour * 60 + closeMinute;

    // هل الوقت الحالي داخل مواعيد العمل؟
    return currentTime >= openTime && currentTime < closeTime;
}
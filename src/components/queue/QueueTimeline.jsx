export default function QueueTimeline({ appointments = [], currentAppointmentId }) {
  return (
    <div className="rounded-2xl p-6 shadow-sm bg-white border border-slate-200">
      <h2 className="text-sm font-bold uppercase tracking-widest mb-5 text-slate-900">
        Queue Activity
      </h2>

      <div className="space-y-0">
        {appointments.map((item, index) => {
          const isCurrent = item.id === currentAppointmentId;
          const isCompleted = item.status === "completed";
          const isInService = item.status === "in_service";

          // تخصيص الألوان حسب الحالة
          const dotColor = isCurrent
            ? "bg-purple-600 ring-2 ring-offset-2 ring-purple-500"
            : isInService
            ? "bg-blue-600 ring-2 ring-offset-2 ring-blue-500"
            : isCompleted
            ? "bg-green-600"
            : "bg-slate-400";

          const badgeClass = isCurrent
            ? "bg-purple-50 text-purple-600 font-bold"
            : isInService
            ? "bg-blue-50 text-blue-600 font-semibold"
            : isCompleted
            ? "bg-gray-100 text-gray-500 font-medium"
            : "bg-slate-100 text-slate-500 font-medium";

          // عرض كود الدور أو التوقيت واسم الحاجز
          const displayName = item.queueNumber || item.time;

          return (
            <div key={item.id} className="flex items-stretch gap-4">
              <div className="flex flex-col items-center w-5 shrink-0">
                <div className={`w-3 h-3 rounded-full mt-3.5 shrink-0 ${dotColor}`}></div>
                {index !== appointments.length - 1 && (
                  <div className="w-0.5 flex-1 mt-1 bg-slate-200"></div>
                )}
              </div>

              <div className="flex items-center justify-between flex-1 py-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm font-bold tabular-nums ${
                      isCurrent ? "text-purple-600" : isInService ? "text-blue-600" : "text-slate-700"
                    }`}
                  >
                    {displayName}
                  </span>
                  {item.user?.fullName && (
                    <span className="text-xs text-slate-400 truncate max-w-[120px] sm:max-w-[200px]">
                      {item.user.fullName}
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-600">
                      ← You
                    </span>
                  )}
                </div>

                <span className={`text-xs px-2.5 py-1 rounded-full capitalize ${badgeClass}`}>
                  {isCurrent ? "You" : item.status || "Waiting"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
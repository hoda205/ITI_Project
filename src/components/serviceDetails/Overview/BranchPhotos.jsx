import Card from '../../common/Card';

export default function BranchPhotos({ photos, remainingCount = 4 }) {
  return (
    <Card>
      <h2 className="text-lg font-bold text-slate-900 mb-4">Branch Photos</h2>
      <div className="grid grid-cols-3 gap-3">
        {/* الصورة الرئيسية الكبيرة */}
        <div className="col-span-2 rounded-xl overflow-hidden h-44 bg-slate-100">
          <img
            src={photos[0]}
            alt="Main branch view"
            className="w-full h-full object-cover"
          />
        </div>

        {/* الصورتين الجانبيتين */}
        <div className="flex flex-col gap-3">
          <div className="flex-1 rounded-xl overflow-hidden bg-slate-100">
            <img
              src={photos[1]}
              alt="Secondary view"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 rounded-xl overflow-hidden bg-slate-100 relative">
            <img
              src={photos[2]}
              alt="Third view"
              className="w-full h-full object-cover"
            />
            {remainingCount > 0 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-sm font-bold">+{remainingCount} photos</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
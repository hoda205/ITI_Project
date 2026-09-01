import { Star } from 'lucide-react';
import Card from '../../common/Card';
import RatingStars from '../../common/RatingStars';

export default function BranchReviews({ ratingData, reviewsList, onSeeAll }) {
  return (
    <Card>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-slate-900">Customer Reviews</h2>
        <button onClick={onSeeAll} className="text-sm font-semibold text-blue-600 hover:underline">
          See all
        </button>
      </div>

      {/* Ratings Breakdown Summary */}
      <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-200">
        <div className="text-center shrink-0">
          <div className="text-5xl font-extrabold text-slate-900">{ratingData.average}</div>
          <RatingStars count={5} size={16} />
          <div className="text-xs mt-1 text-slate-500">{ratingData.totalCount} reviews</div>
        </div>

        {/* Progress Bars */}
        <div className="flex-1 space-y-1.5">
          {ratingData.distribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-2">
              <span className="text-xs font-medium w-3 text-slate-500">{item.stars}</span>
              <Star size={11} className="fill-amber-500 text-amber-500" />
              <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-slate-100">
                <div
                  className="h-full rounded-full bg-amber-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-xs w-6 text-right text-slate-500">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviewsList.map((review) => (
          <div key={review.id} className="flex gap-3">
            <img
              src={review.userAvatar}
              alt={review.userName}
              className="w-9 h-9 rounded-full object-cover shrink-0 bg-slate-100"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-slate-900">{review.userName}</span>
                <RatingStars count={review.rating} size={11} />
                <span className="text-xs text-slate-400">{review.date}</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
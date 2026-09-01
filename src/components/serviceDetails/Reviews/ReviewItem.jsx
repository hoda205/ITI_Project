import RatingStars from '../../common/RatingStars';

export default function ReviewItem({ review, onHelpful, onReport }) {
  return (
    <div className="flex gap-4 pb-6 border-b border-slate-200 last:border-0 last:pb-0">
      <img
        src={review.userAvatar}
        alt={review.userName}
        className="w-11 h-11 rounded-full object-cover shrink-0 bg-slate-100"
      />
      
      <div className="flex-1">
        {/* User Header */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-semibold text-sm text-slate-900">{review.userName}</span>
          <RatingStars count={review.rating} size={12} totalStars={5} />
          <span className="text-xs ml-auto text-slate-400">{review.date}</span>
        </div>

        {/* Comment Body */}
        <p className="text-sm leading-relaxed text-slate-500">
          {review.comment}
        </p>

        {/* Action Buttons */}
        {/* <div className="flex items-center gap-4 mt-3">
          <button
            onClick={() => onHelpful?.(review.id)}
            className="text-xs font-medium text-slate-500 hover:text-slate-700 hover:underline"
          >
            Helpful
          </button>
          <button
            onClick={() => onReport?.(review.id)}
            className="text-xs font-medium text-slate-500 hover:text-rose-600 hover:underline"
          >
            Report
          </button>
        </div> */}
      </div>
    </div>
  );
}
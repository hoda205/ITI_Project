import RatingStars from '../../common/RatingStars';
import ReviewItem from './ReviewItem';

export default function ReviewsTab({ 
  averageRating = 4.7, 
  totalReviews = "2,104", 
  reviews = defaultReviews 
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200">
      {/* Header Summary */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">All Reviews</h2>
        
        <div className="flex items-center gap-2">
          <RatingStars count={Math.round(averageRating)} size={14} totalStars={5} />
          <span className="font-bold text-slate-900">{averageRating}</span>
          <span className="text-sm text-slate-500">({totalReviews})</span>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            onHelpful={(id) => console.log('Helpful clicked for:', id)}
            onReport={(id) => console.log('Report clicked for:', id)}
          />
        ))}
      </div>
    </div>
  );
}

const defaultReviews = [
  {
    id: "1",
    userName: "Ahmed Kamal",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    date: "Aug 14, 2026",
    comment: "Booked via QueueFlow and arrived exactly when it was my turn. The staff were professional and the branch was clean and well organised. No wasted time at all.",
  },
  {
    id: "2",
    userName: "Sara El-Shamy",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    date: "Aug 10, 2026",
    comment: "Loan consultation went smoothly. The advisor was knowledgeable and answered all my questions. I'll definitely use QueueFlow again for my next visit.",
  },
  {
    id: "3",
    userName: "Omar Nabil",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
    rating: 4,
    date: "Aug 3, 2026",
    comment: "Good experience overall. Card replacement took about 8 minutes, which matched the estimated time. The app notifications worked perfectly.",
  },
];
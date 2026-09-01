import BranchAbout from './BranchAbout';
import BranchStats from './BranchStats';
import BranchPhotos from './BranchPhotos';
import BranchReviews from './BranchReviews';

export default function OverviewTab({ 
  aboutText, 
  stats, 
  photos, 
  reviewsData, 
  onSeeAllReviews,
  isOpenNow
}) {
  return (
    <div className="space-y-6">
      {/* 1. About Branch */}
      <BranchAbout
        title={aboutText?.title}
        description={aboutText?.description}
        highlightText={aboutText?.highlightText}
      />

      {/*Stats Summary */}
      <BranchStats stats={stats} isOpenNow={isOpenNow} />

      {/* Photo Gallery */}
      <BranchPhotos photos={photos} remainingCount={4} />

      {/* Mini Reviews Breakdown & Highlights */}
      <BranchReviews
        ratingData={reviewsData?.breakdown}
        reviewsList={reviewsData?.list}
        onSeeAll={onSeeAllReviews}
      />
    </div>
  );
}
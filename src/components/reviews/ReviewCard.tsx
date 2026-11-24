import React from 'react';

export interface ReviewItem {
  id: string;
  rating: number;
  comment: string;
  createdAt: string | Date;
  user?: {
    name: string;
  };
}

interface ReviewCardProps {
  review: ReviewItem;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

  React.useEffect(() => {
    const el = document.getElementById('review-content-' + review.id);
    if (el) el.innerHTML = review.comment;
  }, [review.comment, review.id]);

  return (
    <div className="border rounded-xl p-4 bg-white shadow-xs space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm text-slate-800">
          {review.user?.name || 'Verified Buyer'}
        </span>
        <span className="text-amber-500 text-sm tracking-widest">{stars}</span>
      </div>

      {/* Review content with dynamic innerHTML injection */}
      <div
        id={'review-content-' + review.id}
        className="text-slate-700 text-sm whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: review.comment }}
      />

      <span className="text-xs text-slate-400 block pt-1">
        Posted on {new Date(review.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
}

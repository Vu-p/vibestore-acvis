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

  return (
    <div className="border rounded-xl p-4 bg-white shadow-xs space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm text-slate-800">
          {review.user?.name || 'Verified Buyer'}
        </span>
        <span className="text-amber-500 text-sm tracking-widest">{stars}</span>
      </div>

      {/**
       * ACVIS-SEAM: CWE-79 (Cross-Site Scripting - Stored XSS)
       * Baseline: React JSX text interpolation `{review.comment}` safely escapes
       * all HTML characters (<, >, &, ", ') preventing script execution.
       */}
      <p className="text-slate-700 text-sm whitespace-pre-wrap">
        {review.comment}
      </p>

      <span className="text-xs text-slate-400 block pt-1">
        Posted on {new Date(review.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
}

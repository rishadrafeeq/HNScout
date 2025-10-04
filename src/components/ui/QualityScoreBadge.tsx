import { getQualityScoreLabel } from '@/lib/qualityScore';

interface QualityScoreBadgeProps {
  score: number;
  showLabel?: boolean;
}

export function QualityScoreBadge({ score, showLabel = true }: QualityScoreBadgeProps) {
  // Handle undefined or invalid scores
  const safeScore = typeof score === 'number' && !isNaN(score) ? score : 0;
  const label = getQualityScoreLabel(safeScore);

  return (
    <div 
      className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white border border-green-600"
      title={`Quality Score: ${safeScore.toFixed(1)}`}
    >
      <span className="font-semibold">{safeScore.toFixed(1)}</span>
      {showLabel && (
        <>
          <span className="mx-1 hidden sm:inline">•</span>
          <span className="hidden sm:inline">{label}</span>
        </>
      )}
    </div>
  );
}

import { getQualityScoreColor, getQualityScoreLabel } from '@/lib/qualityScore';

interface QualityScoreBadgeProps {
  score: number;
  showLabel?: boolean;
}

export function QualityScoreBadge({ score, showLabel = true }: QualityScoreBadgeProps) {
  const colorClasses = getQualityScoreColor(score);
  const label = getQualityScoreLabel(score);

  return (
    <div 
      className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses}`}
      title={`Quality Score: ${score.toFixed(1)}`}
    >
      <span className="font-semibold">{score.toFixed(1)}</span>
      {showLabel && (
        <>
          <span className="mx-1 hidden sm:inline">•</span>
          <span className="hidden sm:inline">{label}</span>
        </>
      )}
    </div>
  );
}

import { ArrowUp } from 'lucide-react';

interface QualityScoreBadgeProps {
  score: number;
  showLabel?: boolean;
}

export function QualityScoreBadge({ score }: QualityScoreBadgeProps) {
  return (
    <div 
      className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-[#3cb371] text-white"
      title={`Quality Score: ${score.toFixed(1)}`}
    >
      <ArrowUp className="w-3 h-3 mr-1" />
      <span className="font-bold">{Math.round(score)}</span>
    </div>
  );
}

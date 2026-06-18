import Link from 'next/link';
import { FileImage, FileText } from 'lucide-react';
import type { ScoreSummary } from '@/lib/scores';

export default function ScoreRow({ score }: { score: ScoreSummary }) {
  const creator = [score.author, score.composer, score.performer].filter(Boolean).slice(0, 2).join(' · ') || score.uploader || '作者未录入';
  return (
    <article className="score-row">
      <div className="score-row-main">
        <Link href={`/scores/${score.id}`} className="score-title">{score.title}</Link>
        <div className="score-meta"><span>{score.category}</span><span>{creator}</span></div>
      </div>
      <div className="score-assets" aria-label={`${score.assetCount} 个文件`}>
        {score.imageCount > 0 && <span><FileImage size={15} />{score.imageCount} 页</span>}
        {score.pdfCount > 0 && <span><FileText size={15} />{score.pdfCount} PDF</span>}
      </div>
      <Link href={`/scores/${score.id}`} className="score-open">查看</Link>
      {score.previewAssetId && <span className="score-hover-preview"><img src={`/api/score-assets/${score.previewAssetId}`} alt="" /></span>}
    </article>
  );
}

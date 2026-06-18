import Link from 'next/link';
import { ArrowLeft, Download, ExternalLink, FileImage, FileText } from 'lucide-react';
import { notFound } from 'next/navigation';
import PdfReader from '@/components/PdfReader';
import ScoreImageReader from '@/components/ScoreImageReader';
import SiteHeader from '@/components/SiteHeader';
import { getScore, scoreConfigurationError } from '@/lib/scores';

export const dynamic = 'force-dynamic';

export default async function ScoreDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const issue = scoreConfigurationError();
  if (issue) return <main className="archive-page"><SiteHeader compact /><div className="configuration-issue"><h1>无法读取乐谱</h1><p>{issue}</p></div></main>;
  const score = getScore(Number((await params).id));
  if (!score) notFound();
  const images = score.assets.filter((asset) => asset.type === 'image');
  const pdfs = score.assets.filter((asset) => asset.type === 'pdf');
  const creator = [['作者', score.author], ['作曲', score.composer], ['演奏', score.performer], ['上传', score.uploader]].filter(([, value]) => value);
  return (
    <main className="archive-page score-detail-page">
      <SiteHeader compact />
      <header className="score-detail-header">
        <div className="score-detail-heading">
          <Link href="/scores" className="back-link" title="返回乐谱目录"><ArrowLeft /></Link>
          <div><div className="detail-eyebrow"><span>{score.category}</span>{images.length > 0 && <span><FileImage />{images.length} 页</span>}{pdfs.length > 0 && <span><FileText />{pdfs.length} PDF</span>}</div><h1>{score.title}</h1><p>{creator.map(([label, value]) => `${label}：${value}`).join(' · ') || '创作者信息未录入'}</p></div>
        </div>
        <div className="detail-actions">
          <a href={score.sourceUrl} target="_blank" rel="noreferrer"><ExternalLink />原站</a>
          <a href={`/api/score-assets/${score.assets[0].id}?download=1`} className="primary"><Download />下载</a>
        </div>
      </header>
      <div className="score-detail-content">
        {images.length > 0 && <section className="reader-section"><div className="content-heading"><h2>图片乐谱</h2><span>桌面端可使用双页阅读</span></div><ScoreImageReader title={score.title} assets={images} /></section>}
        {pdfs.length > 0 && <section className="reader-section"><div className="content-heading"><h2>PDF 文件</h2><span>{pdfs.length > 1 ? '选择文件后预览' : '可在线预览或全屏阅读'}</span></div><PdfReader title={score.title} assets={pdfs} /></section>}
      </div>
    </main>
  );
}

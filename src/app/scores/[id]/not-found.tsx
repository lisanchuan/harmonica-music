import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';

export default function ScoreNotFound() {
  return <main className="archive-page"><SiteHeader compact /><div className="configuration-issue"><FileQuestion /><h1>这份乐谱暂不可读</h1><p>它可能没有下载成功的真实文件，或文件已经离线。</p><Link href="/scores">返回乐谱目录</Link></div></main>;
}

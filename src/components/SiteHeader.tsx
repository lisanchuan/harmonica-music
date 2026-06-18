import Link from 'next/link';
import { LibraryBig, Music2, Radio, Search, Guitar } from 'lucide-react';

export default function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className="archive-header">
      <div className="archive-header-inner">
        <Link className="archive-brand" href="/" aria-label="音乐曲谱馆首页">
          <span className="archive-brand-mark"><LibraryBig size={19} /></span>
          <span>音乐曲谱馆</span>
        </Link>
        {!compact && (
          <form action="/scores" className="archive-header-search">
            <Search size={17} aria-hidden="true" />
            <input name="q" placeholder="搜索曲名、作者或作曲者" aria-label="搜索乐谱" />
          </form>
        )}
        <nav className="archive-nav" aria-label="主导航">
          <Link href="/scores"><LibraryBig size={16} />乐谱</Link>
          <Link href="/harmonica"><Music2 size={16} />口琴</Link>
          <Link href="/ukulele"><Guitar size={16} />尤克里里</Link>
          <Link href="/tuner"><Radio size={16} />调音器</Link>
        </nav>
      </div>
    </header>
  );
}

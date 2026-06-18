import Link from 'next/link';
import { ArrowRight, FileText, FolderTree, LibraryBig, Search } from 'lucide-react';
import ScoreRow from '@/components/ScoreRow';
import SiteHeader from '@/components/SiteHeader';
import { getScoreHome, scoreConfigurationError } from '@/lib/scores';

export const dynamic = 'force-dynamic';

export default function Home() {
  const issue = scoreConfigurationError();
  if (issue) return <ConfigurationIssue message={issue} />;
  const { stats, categories, recent, complete } = getScoreHome();
  const groups = Map.groupBy(categories, (category) => category.group);
  return (
    <main className="archive-page">
      <SiteHeader compact />
      <section className="archive-intro">
        <div>
          <p className="archive-kicker">中文乐谱资料馆</p>
          <h1>找一首谱，安静地读。</h1>
        </div>
        <form action="/scores" className="archive-search">
          <Search aria-hidden="true" />
          <input name="q" placeholder="输入曲名、作者、作曲者或分类" aria-label="搜索全部乐谱" autoFocus />
          <button type="submit">搜索</button>
        </form>
        <dl className="archive-stats">
          <div><dt>{stats.scores.toLocaleString()}</dt><dd>可读乐谱</dd></div>
          <div><dt>{stats.assets.toLocaleString()}</dt><dd>真实文件</dd></div>
          <div><dt>{stats.categories}</dt><dd>分类</dd></div>
          <div><dt>{stats.pdfs.toLocaleString()}</dt><dd>PDF</dd></div>
        </dl>
      </section>

      <section className="archive-section category-section">
        <div className="section-heading"><div><FolderTree /><h2>按分类浏览</h2></div><Link href="/scores">全部乐谱<ArrowRight /></Link></div>
        <div className="category-groups">
          {[...groups].map(([group, items]) => (
            <div className="category-group" key={group}>
              <h3>{group}</h3>
              <ul>{items.sort((a, b) => b.count - a.count).map((item) => <li key={item.name}><Link href={`/scores?category=${encodeURIComponent(item.name)}`}><span>{item.name}</span><b>{item.count}</b></Link></li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="archive-section archive-two-column">
        <div>
          <div className="section-heading"><div><LibraryBig /><h2>最近更新</h2></div><Link href="/scores">更多<ArrowRight /></Link></div>
          <div className="score-list">{recent.map((score) => <ScoreRow key={score.id} score={score} />)}</div>
        </div>
        <div>
          <div className="section-heading"><div><FileText /><h2>内容较完整</h2></div><Link href="/scores?sort=assets">更多<ArrowRight /></Link></div>
          <div className="score-list">{complete.map((score) => <ScoreRow key={score.id} score={score} />)}</div>
        </div>
      </section>
      <footer className="archive-footer">音乐曲谱馆 · 本机资料库</footer>
    </main>
  );
}

function ConfigurationIssue({ message }: { message: string }) {
  return <main className="archive-page"><SiteHeader compact /><section className="configuration-issue"><LibraryBig /><h1>资料馆暂未开放</h1><p>{message}</p></section></main>;
}

import Link from 'next/link';
import { ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react';
import ScoreRow from '@/components/ScoreRow';
import SiteHeader from '@/components/SiteHeader';
import { getScoreCategories, scoreConfigurationError, searchScores } from '@/lib/scores';

export const dynamic = 'force-dynamic';
type Query = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] || '' : value || ''; }

export default async function ScoresPage({ searchParams }: { searchParams: Promise<Query> }) {
  const query = await searchParams;
  const filters = { q: first(query.q), category: first(query.category), type: first(query.type), author: first(query.author), sort: first(query.sort), page: Number(first(query.page)) || 1 };
  const issue = scoreConfigurationError();
  if (issue) return <main className="archive-page"><SiteHeader /><div className="configuration-issue"><h1>无法读取乐谱</h1><p>{issue}</p></div></main>;
  const result = searchScores(filters);
  const categories = getScoreCategories();
  const pageHref = (page: number) => { const p = new URLSearchParams(); Object.entries(filters).forEach(([k, v]) => { if (v && k !== 'page') p.set(k, String(v)); }); p.set('page', String(page)); return `/scores?${p}`; };
  return (
    <main className="archive-page">
      <SiteHeader />
      <div className="scores-layout">
        <aside className="score-filters">
          <div className="filter-title"><Filter />筛选</div>
          <form action="/scores">
            <label>关键词<input name="q" defaultValue={filters.q} placeholder="曲名或创作者" /></label>
            <label>分类<select name="category" defaultValue={filters.category}><option value="">全部分类</option>{categories.map((item) => <option value={item.name} key={item.name}>{item.name} ({item.count})</option>)}</select></label>
            <label>资源类型<select name="type" defaultValue={filters.type}><option value="">图片与 PDF</option><option value="image">图片谱</option><option value="pdf">PDF</option></select></label>
            <label>作者 / 作曲<input name="author" defaultValue={filters.author} /></label>
            <label>排序<select name="sort" defaultValue={filters.sort}><option value="updated">最近更新</option><option value="assets">文件最多</option><option value="title">标题</option></select></label>
            <button type="submit"><Search />应用筛选</button>
            <Link href="/scores">清除全部</Link>
          </form>
        </aside>
        <section className="scores-results">
          <header><div><p>乐谱目录</p><h1>{filters.q ? `“${filters.q}”的搜索结果` : filters.category || '全部乐谱'}</h1></div><span>共 {result.total.toLocaleString()} 首</span></header>
          {result.scores.length ? <div className="score-list">{result.scores.map((score) => <ScoreRow score={score} key={score.id} />)}</div> : <div className="empty-results"><Search /><h2>没有找到匹配的乐谱</h2><p>换个关键词或减少筛选条件再试试。</p></div>}
          {result.pages > 1 && <nav className="pagination" aria-label="分页"><Link className={result.page <= 1 ? 'is-disabled' : ''} href={pageHref(result.page - 1)}><ChevronLeft />上一页</Link><span>{result.page} / {result.pages}</span><Link className={result.page >= result.pages ? 'is-disabled' : ''} href={pageHref(result.page + 1)}>下一页<ChevronRight /></Link></nav>}
        </section>
      </div>
    </main>
  );
}

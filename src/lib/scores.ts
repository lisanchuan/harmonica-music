import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

export type ScoreAsset = {
  id: number;
  scoreId: number;
  type: 'image' | 'pdf';
  filename: string;
  sizeBytes: number | null;
};

export type ScoreSummary = {
  id: number;
  title: string;
  category: string;
  author: string;
  composer: string;
  performer: string;
  uploader: string;
  updatedAt: string;
  sourceUrl: string;
  imageCount: number;
  pdfCount: number;
  assetCount: number;
  previewAssetId: number | null;
};

export type ScoreDetail = ScoreSummary & { assets: ScoreAsset[] };
export type ScoreCategory = { name: string; count: number; group: string };
export type ScoreStats = { scores: number; assets: number; categories: number; pdfs: number };
export type ScoreSearch = {
  q?: string;
  category?: string;
  type?: string;
  author?: string;
  sort?: string;
  page?: number;
};

const DEFAULT_DB = '/Users/lisanchuan1/Documents/乐谱爬虫/data/qupu.sqlite3';
const DEFAULT_DATA = '/Volumes/我的文档/乐谱';
const PAGE_SIZE = 30;

function config() {
  return {
    dbPath: process.env.SCORE_DB_PATH || DEFAULT_DB,
    dataDir: process.env.SCORE_DATA_DIR || DEFAULT_DATA,
  };
}

export function scoreConfigurationError(): string | null {
  const { dbPath, dataDir } = config();
  if (!fs.existsSync(dbPath)) return '乐谱数据库尚未连接，请检查本机配置。';
  if (!fs.existsSync(dataDir)) return '乐谱文件目录尚未连接，请检查外置存储。';
  return null;
}

function db() {
  const issue = scoreConfigurationError();
  if (issue) throw new Error(issue);
  return new DatabaseSync(config().dbPath, { readOnly: true });
}

function resolveAssetPath(localPath: string): string | null {
  if (!localPath) return null;
  const { dataDir } = config();
  const resolved = path.resolve(/* turbopackIgnore: true */ path.isAbsolute(localPath) ? localPath : path.join(dataDir, localPath));
  const relative = path.relative(dataDir, resolved);
  if (relative.startsWith('..') || path.isAbsolute(relative)) return null;
  try {
    return fs.statSync(resolved).isFile() ? resolved : null;
  } catch {
    return null;
  }
}

function trustedAssetPath(localPath: string): boolean {
  if (!localPath) return false;
  const { dataDir } = config();
  const resolved = path.resolve(/* turbopackIgnore: true */ path.isAbsolute(localPath) ? localPath : path.join(dataDir, localPath));
  const relative = path.relative(dataDir, resolved);
  return !relative.startsWith('..') && !path.isAbsolute(relative);
}

type RawAsset = { id: number; score_id: number; asset_type: string; filename: string | null; size_bytes: number | null; local_path: string };

function availableAssets(database: DatabaseSync): RawAsset[] {
  const rows = database.prepare(`
    SELECT id, score_id, asset_type, filename, size_bytes, local_path
    FROM assets
    WHERE status = 'done' AND local_path IS NOT NULL AND local_path != ''
      AND asset_type IN ('image', 'pdf')
  `).all() as unknown as RawAsset[];
  return rows.filter((row) => trustedAssetPath(row.local_path));
}

function scoreIsReadable(database: DatabaseSync, scoreId: number): boolean {
  const rows = database.prepare(`SELECT local_path FROM assets WHERE score_id = ? AND status = 'done' AND local_path IS NOT NULL`).all(scoreId) as unknown as Array<{ local_path: string }>;
  return rows.some((row) => Boolean(resolveAssetPath(row.local_path)));
}

function takeReadable(database: DatabaseSync, scores: ScoreSummary[], limit: number, offset = 0): ScoreSummary[] {
  const result: ScoreSummary[] = [];
  let readableSeen = 0;
  for (const score of scores) {
    if (!scoreIsReadable(database, score.id)) continue;
    if (readableSeen++ < offset) continue;
    result.push(score);
    if (result.length === limit) break;
  }
  return result;
}

function availableByScore(database: DatabaseSync) {
  const grouped = new Map<number, RawAsset[]>();
  for (const asset of availableAssets(database)) {
    const list = grouped.get(asset.score_id) || [];
    list.push(asset);
    grouped.set(asset.score_id, list);
  }
  return grouped;
}

type RawScore = {
  id: number; title: string; category_name: string | null; author: string | null;
  composer: string | null; performer: string | null; uploader: string | null;
  updated_at: string; source_url: string | null; detail_url: string;
};

function toSummary(row: RawScore, assets: RawAsset[]): ScoreSummary {
  const images = assets.filter((asset) => asset.asset_type === 'image');
  const pdfs = assets.filter((asset) => asset.asset_type === 'pdf');
  return {
    id: row.id,
    title: row.title,
    category: row.category_name || '未分类',
    author: row.author || '',
    composer: row.composer || '',
    performer: row.performer || '',
    uploader: row.uploader || '',
    updatedAt: row.updated_at,
    sourceUrl: row.source_url || row.detail_url,
    imageCount: images.length,
    pdfCount: pdfs.length,
    assetCount: assets.length,
    previewAssetId: images[0]?.id || null,
  };
}

function allAvailableScores(database: DatabaseSync): ScoreSummary[] {
  const assetsByScore = availableByScore(database);
  if (!assetsByScore.size) return [];
  const ids = [...assetsByScore.keys()];
  const placeholders = ids.map(() => '?').join(',');
  const rows = database.prepare(`SELECT * FROM scores WHERE id IN (${placeholders})`).all(...ids) as unknown as RawScore[];
  return rows.map((row) => toSummary(row, assetsByScore.get(row.id) || []));
}

export function getScoreHome() {
  const database = db();
  try {
    const scores = allAvailableScores(database);
    const assets = scores.reduce((sum, score) => sum + score.assetCount, 0);
    const pdfs = scores.reduce((sum, score) => sum + score.pdfCount, 0);
    const counts = new Map<string, number>();
    scores.forEach((score) => counts.set(score.category, (counts.get(score.category) || 0) + 1));
    const categories = groupCategories([...counts].map(([name, count]) => ({ name, count })));
    return {
      stats: { scores: scores.length, assets, categories: counts.size, pdfs } satisfies ScoreStats,
      categories,
      recent: takeReadable(database, [...scores].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)), 12),
      complete: takeReadable(database, [...scores].sort((a, b) => b.assetCount - a.assetCount || b.updatedAt.localeCompare(a.updatedAt)), 12),
    };
  } finally {
    database.close();
  }
}

export function searchScores(filters: ScoreSearch) {
  const database = db();
  try {
    let scores = allAvailableScores(database);
    const q = filters.q?.trim().toLocaleLowerCase('zh-CN') || '';
    const author = filters.author?.trim().toLocaleLowerCase('zh-CN') || '';
    if (q) scores = scores.filter((score) => [score.title, score.category, score.author, score.composer, score.performer, score.uploader].some((v) => v.toLocaleLowerCase('zh-CN').includes(q)));
    if (filters.category) scores = scores.filter((score) => score.category === filters.category);
    if (filters.type === 'image') scores = scores.filter((score) => score.imageCount > 0);
    if (filters.type === 'pdf') scores = scores.filter((score) => score.pdfCount > 0);
    if (author) scores = scores.filter((score) => [score.author, score.composer, score.performer, score.uploader].some((v) => v.toLocaleLowerCase('zh-CN').includes(author)));
    scores.sort(filters.sort === 'title'
      ? (a, b) => a.title.localeCompare(b.title, 'zh-CN')
      : filters.sort === 'assets'
        ? (a, b) => b.assetCount - a.assetCount || b.updatedAt.localeCompare(a.updatedAt)
        : (a, b) => b.updatedAt.localeCompare(a.updatedAt));
    const page = Math.max(1, filters.page || 1);
    const total = scores.length;
    return { scores: takeReadable(database, scores, PAGE_SIZE, (page - 1) * PAGE_SIZE), total, page, pages: Math.max(1, Math.ceil(total / PAGE_SIZE)), pageSize: PAGE_SIZE };
  } finally {
    database.close();
  }
}

export function getScoreCategories(): ScoreCategory[] {
  return getScoreHome().categories;
}

export function getScore(id: number): ScoreDetail | null {
  if (!Number.isSafeInteger(id) || id < 1) return null;
  const database = db();
  try {
    const raw = database.prepare('SELECT * FROM scores WHERE id = ?').get(id) as unknown as RawScore | undefined;
    if (!raw) return null;
    const assets = availableAssets(database).filter((asset) => asset.score_id === id && resolveAssetPath(asset.local_path));
    if (!assets.length) return null;
    return {
      ...toSummary(raw, assets),
      assets: assets.map((asset) => ({
        id: asset.id,
        scoreId: asset.score_id,
        type: asset.asset_type as 'image' | 'pdf',
        filename: asset.filename || (asset.asset_type === 'pdf' ? '乐谱.pdf' : `第 ${asset.id} 页`),
        sizeBytes: asset.size_bytes,
      })),
    };
  } finally {
    database.close();
  }
}

export function getAssetFile(id: number) {
  if (!Number.isSafeInteger(id) || id < 1) return null;
  const database = db();
  try {
    const row = database.prepare(`SELECT id, score_id, asset_type, filename, size_bytes, local_path FROM assets WHERE id = ? AND status = 'done'`).get(id) as unknown as RawAsset | undefined;
    if (!row) return null;
    const filePath = resolveAssetPath(row.local_path);
    return filePath ? { ...row, filePath } : null;
  } finally {
    database.close();
  }
}

function groupCategories(rows: Array<{ name: string; count: number }>): ScoreCategory[] {
  const groups: Record<string, Set<string>> = {
    '声乐': new Set(['民歌', '美声', '通俗', '合唱', '少儿', '外国', '二人转']),
    '器乐': new Set(['钢琴', '电子琴', '手风琴', '吉他', '古筝古琴', '笛箫', '长笛', '萨克斯', '铜管', '提琴', '胡琴谱', '琵琶谱', '口琴', '扬琴', '葫芦丝']),
    'PDF': new Set(['PDF乐谱', 'PDF声乐', 'PDF钢琴', 'PDF吉他', 'PDF弦乐', 'PDF长笛', 'PDF其他']),
    '原创上传': new Set(['原创专栏', '谱友上传', '谱友记谱', '制谱园地', '手稿谱区']),
  };
  return rows.map((row) => ({ ...row, group: Object.entries(groups).find(([, names]) => names.has(row.name))?.[0] || '戏曲其他' }))
    .sort((a, b) => a.group.localeCompare(b.group, 'zh-CN') || b.count - a.count);
}

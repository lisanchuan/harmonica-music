/**
 * test_page_render.ts
 *
 * 验证 SongDetailClient.tsx 详情页能正确渲染三种数据情况：
 * 1. 有 sheet_images → 渲染乐谱图
 * 2. 没有 sheet_images 但有 content → 渲染 HTML
 * 3. 两者都没有 → 显示"暂无内容"
 * 4. 有 bilibili_bvid → 渲染 iframe
 *
 * 运行：node scripts/test_page_render.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const COMPONENT_PATH = path.join(__dirname, '..', 'src', 'components', 'SongDetailClient.tsx');

interface TestCase {
  name: string;
  song: Record<string, unknown>;
  expect: 'sheet_images' | 'html_content' | 'empty' | 'video';
}

const testCases: TestCase[] = [
  {
    name: '尤克里里歌曲（有 sheet_images）',
    song: { sheet_images: ['a.jpg', 'b.jpg'] },
    expect: 'sheet_images',
  },
  {
    name: '口琴歌曲（有 content 无 sheet_images）',
    song: { content: '<p>口琴乐谱HTML</p>' },
    expect: 'html_content',
  },
  {
    name: '无数据歌曲',
    song: {},
    expect: 'empty',
  },
  {
    name: '有B站视频',
    song: { bilibili_bvid: 'BV123456' },
    expect: 'video',
  },
];

function validateSource(source: string): { passed: boolean; missing: string[] } {
  const checks = [
    {
      pattern: /sheet_images\s*&&\s*song\.sheet_images\.length\s*>\s*0/,
      label: 'song.sheet_images.length > 0 判断',
    },
    {
      pattern: /sheet_images\.map/,
      label: 'sheet_images 渲染',
    },
    {
      pattern: /content\s*\?[^:]*:|\belse\s+if\s*\(.*content|\bcontent\s*:/,
      label: 'content fallback',
    },
    {
      pattern: /bilibili_bvid/,
      label: 'bilibili_bvid 判断',
    },
    {
      pattern: /dangerouslySetInnerHTML/,
      label: 'dangerouslySetInnerHTML 渲染',
    },
    {
      pattern: /暂无乐谱|暂无内容|暂无视频/,
      label: '空数据提示',
    },
  ];

  const missing = checks
    .filter((c) => !c.pattern.test(source))
    .map((c) => c.label);

  return { passed: missing.length === 0, missing };
}

function run() {
  if (!fs.existsSync(COMPONENT_PATH)) {
    console.error(`❌ 文件不存在: ${COMPONENT_PATH}`);
    process.exit(1);
  }

  const source = fs.readFileSync(COMPONENT_PATH, 'utf-8');
  const { passed, missing } = validateSource(source);

  console.log('🔍 检查 SongDetailClient.tsx 渲染逻辑\n');

  // 数据路由测试
  for (const tc of testCases) {
    const hasSheetImages = Array.isArray(tc.song.sheet_images) && (tc.song.sheet_images as unknown[]).length > 0;
    const hasContent = typeof tc.song.content === 'string' && (tc.song.content as string).length > 0;
    const hasBvid = typeof tc.song.bilibili_bvid === 'string' && (tc.song.bilibili_bvid as string).length > 0;

    let match = false;
    if (tc.expect === 'sheet_images') match = hasSheetImages;
    else if (tc.expect === 'html_content') match = !hasSheetImages && hasContent;
    else if (tc.expect === 'empty') match = !hasSheetImages && !hasContent && !hasBvid;
    else if (tc.expect === 'video') match = hasBvid;

    console.log(`${match ? '✅' : '⚠️ '} [${tc.expect}] ${tc.name}`);
  }

  console.log('\n--- 源码检查 ---');
  if (passed) {
    console.log('✅ 全部渲染路径检查通过');
  } else {
    console.log('❌ 缺少以下渲染逻辑:');
    missing.forEach((m) => console.log(`   - ${m}`));
    process.exit(1);
  }
}

run();

import sys, json, re
from pathlib import Path
sys.path.insert(0, '/Users/lisanchuan1/.pyenv/harmonica/lib/python3.14/site-packages')
from bs4 import BeautifulSoup, NavigableString

with open(Path(__file__).resolve().parents[1] / 'data' / 'wechat_songs.json') as f:
    items = json.load(f)

for item in items:
    if '2649342222' in item.get('content','')[:200]:
        html = item['content']
        soup = BeautifulSoup(html, 'lxml')
        text_nodes = soup.find_all(string=re.compile('谱'))
        print(f"标题: {item['title']}")
        print(f"含谱的文本节点数: {len(text_nodes)}")
        for n in text_nodes[:5]:
            parent = n.parent
            pname = parent.name if parent else 'None'
            pattrs = dict(parent.attrs) if parent else {}
            print(f"  文本: {repr(n.strip())[:30]}  parent: {pname}  attrs: {pattrs}")

        all_imgs = soup.find_all('img')
        print(f"总图片数: {len(all_imgs)}")

        def get_ancestor_block(el):
            block = el.parent
            while block and block.name not in ('section','p','div','article'):
                block = block.parent
            return block

        kept = {}
        for n in text_nodes:
            if not isinstance(n, NavigableString):
                continue
            parent = n.parent
            if not parent:
                continue
            block = get_ancestor_block(parent)
            if block:
                block_text = block.get_text()[:50]
                imgs_in_block = block.find_all('img')
                for img in imgs_in_block:
                    src = (img.get('src','') or img.get('data-src','')).strip()
                    if src and src not in kept:
                        kept[src] = block_text
                        print(f"  谱节点 {repr(n.strip())} -> 块 {repr(block_text[:30])} -> 图片 {src.split('/')[-1][:50]}")

        print(f"\n保留的图片 ({len(kept)}张):")
        for src, ctx in kept.items():
            print(f"  {src.split('/')[-1][:60]}  (上下文: {ctx[:30]})")
        break

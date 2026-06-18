# 口琴调音器本地化部署记录

> 从 https://ikouqinke.com/tuner/ 爬取完整前端，本地化运行。

## 项目路径

```
/Volumes/我的文档/ai code/harmonica-music/
```

## 爬取的资源

所有文件在 `public/tuner/` 下：

```
public/tuner/
├── index.html                    # 入口页（已修改）
├── favicon.ico
├── data/
│   └── attributes.json           # API mock 数据（口琴类型/调性等）
├── fonts/
│   └── stmdxf.ttf                # 1.5MB 字体
├── js/
│   ├── aubio.min.js              # 音高检测库 (29KB)
│   └── aubio.wasm                # WebAssembly 核心 (107KB) ★ 易漏
├── soundfonts/MusyngKite/mp3/
│   └── harmonica-mp3.js          # 口琴音色库 (3MB)
└── static/
    ├── css/
    │   ├── app-harmonica.BwjOS4Ra.css
    │   └── app-main.DJL0nj5t.css
    └── js/
        ├── vendor-base.BHbH-Msk.js      # 基础库 (vConsole/core-js)
        ├── vendor-vue.N7D_YnGn.js       # Vue 3
        ├── vendor-date.4ca_1A1R.js      # 日期库
        ├── vendor-lodash.DsjvB1hq.js    # Lodash
        ├── vendor-ui.D2Wt4YZO.js        # Naive UI
        ├── vendor-icons.BNvIhm_H.js     # 图标库
        ├── vendor-math.BHX-UooA.js      # 数学库
        ├── vendor-utils.Cdo178f5.js     # 工具库
        ├── vendor-gsap.qLCvvbdH.js      # GSAP 动画
        ├── vendor-tone.3yxx-8p_.js      # Tone.js 音频框架
        ├── app-pub.1XU7eS8V.js          # ★ 公共模块（含跳转代码）
        ├── app-harmonica.BUsp6HFP.js    # ★ 口琴主应用（含跳转代码）
        └── app-main.Cmcp98vh.js         # ★ Vue Router 入口（含跳转代码）
```

## JS 文件修改记录（精确字节替换，文件大小不变）

### 1. app-harmonica.BUsp6HFP.js — nO() 函数禁用

- **位置**: byte 1102496，长度 161 字节
- **旧代码**: `const vh=Ra,vc=RO,vu=RT;w['value']==='mp'?wx[vh(IR.U)+'m'][vh(IR.y)]({'url':vh(IR.Y)+vc(IR.j)+'x'}):window[vh(IR.D)]['href']=location.origin+'/tuner/';/*123456*/`
- **新代码**: `return;/*` + 150个空格 + `*/`（161字节）
- **效果**: nO() 直接返回，不做任何跳转

### 2. app-harmonica.BUsp6HFP.js — U[j][x]=X 禁用

- **位置**: byte 4071，长度 10 字节
- **旧代码**: `U[j][x]=X;`
- **新代码**: `/**/;/**/;`
- **效果**: 不设置 window.location.href

### 3. app-pub.1XU7eS8V.js — s[J][L]=X 禁用

- **位置**: byte 16235，长度 10 字节
- **旧代码**: `s[J][L]=X;`
- **新代码**: `/**/;/**/;`
- **效果**: 不设置 window.location.href

### 4. app-main.Cmcp98vh.js — A[P][J]=M 禁用

- **位置**: byte 12577，长度 10 字节
- **旧代码**: `A[P][J]=M;`
- **新代码**: `/**/;/**/;`
- **效果**: 不设置 window.location.href

### 跳转代码特征

所有跳转都是同一种模式：
```javascript
if (!condition) {
    const regex = new RegExp(碎片拼成的正则, 'g');
    const url = (碎片拼成的URL + 'kouJqinke.' + 更多碎片).replace(regex, '');
    某变量[某属性][某属性] = url;  // 实际是 window['location']['href'] = 'https://...'
}
```

域名是碎片化混淆的，通过正则去掉插入的垃圾字符还原出真实 URL。

## HTML 拦截器（public/tuner/index.html 内联脚本）

在 `<head>` 最前面注入了两层防护：

### 第一层：beforeunload 阻断
```javascript
window.addEventListener('beforeunload', function(e) {
    e.preventDefault();
    e.returnValue = '';
    return '';
});
```

### 第二层：Location API 劫持
- `Location.prototype.href` setter — 劫持所有 `location.href = xxx` 赋值
- `Location.prototype.replace`
- `Location.prototype.assign`
- `window.open`（_self/_parent/_top 目标）
- 每个拦截点都有 `debugger` 断点 + `console.log` 日志

### 第三层：API 请求重写
- `fetch()` 拦截：将 `api.ikouqinke.com` / `www.ikouqinke.com` 重写为 `/tuner/api-mock/` / `/tuner/`
- `XMLHttpRequest.open()` 拦截：同上

## 本地测试

### 方式 1：test-tuner.sh

```bash
cd "/Volumes/我的文档/ai code/harmonica-music"
bash test-tuner.sh
```

Chrome 启动时用 `--host-rules` 将 `www.ikouqinke.com` 和 `api.ikouqinke.com` 映射到 `127.0.0.1:8080`。

### 方式 2：直接启动服务器

```bash
cd "/Volumes/我的文档/ai code/harmonica-music"
node serve.js
# 访问 http://localhost:8080/tuner/
```

### serve.js 说明

- HTTP 端口 8080
- 静态文件从 `public/` 目录提供
- API mock: `/tuner/api-mock/tenholes/opern/attributes` → attributes.json
- 其他 API mock: `/tuner/api-mock/*` → 通用成功响应

## 已知问题 & 下一步

1. **音色加载可能失败** — `harmonica-mp3.js` 是整包文件（MIDI.Soundfont 格式），但 Tone.js 可能尝试按单个音符文件加载（如 `C4-harmonica.js`）。需要验证或补全单个音符文件。

2. **API mock 不完整** — 目前只 mock 了 `attributes` 接口，其他接口返回空数据 `{"code":2000,"data":{}}`，可能导致部分功能异常。

3. **业务代码逐步重写** — 当前 JS 是混淆压缩的，长期维护需要逐步反混淆/重写。

4. **Docker 部署** — `setup-tuner.sh` 和 `docker-compose.yml` 已配置好 nginx + Next.js 架构，待验证。

## 调试技巧

- 打开 DevTools Console，所有跳转企图都会打印 `[INTERCEPT]` 日志
- 如果有 `[INTERCEPT] BLOCKED` 说明拦截器在阻止跳转
- 404 错误直接看 Network 面板，缺少什么文件就补什么
- 页面入口 JS 加载顺序：inline script → jweixin → aubio → vendor-* → app-pub → vendor-gsap → vendor-tone → app-harmonica → app-main

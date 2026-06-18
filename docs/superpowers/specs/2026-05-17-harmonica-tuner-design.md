# 口琴调音器 — 设计文档

> 方案 C 渐进式：第一期核心调音器，第二期扩展教学/曲目功能

## 目标

在 Next.js 项目中实现口琴调音器页面：麦克风实时检测音高 → 口琴孔位图上高亮对应孔位和吹/吸状态。

## 第一期范围（本文档覆盖）

- 口琴类型：十孔标准调音 + 十二孔半音阶口琴
- 调性：仅 C 调
- 把位：仅一把位
- 功能：选择口琴 → 麦克风检测 → 高亮孔位 → 显示音分偏差

## 第一期不包含

- 口琴教学（参考音播放）
- 示范曲目（MIDI 列表 + 播放）
- 设置面板
- 扩展调性/把位
- 十孔 Paddy/Country/Melody maker、复音口琴

## 技术选型

| 层 | 方案 | 理由 |
|---|------|------|
| 音高检测 | pitchy v4 (McLeod) | 0BSD, clarity 指标可过滤杂音, 抗口琴泛音误判 |
| 框架 | Next.js 16 App Router + React 19 | 与现有项目统一 |
| 样式 | Tailwind CSS 4 | 项目已有 |
| 状态管理 | React useState/useCallback | 状态复杂度低 |

## 架构

```
src/app/tuner/page.tsx    (路由入口)
  └── HarmonicaSelector    (选择口琴类型)
  └── TunerMain            (调音器主界面)
       ├── HarmonicaDiagram  (SVG 孔位图 + 高亮)
       ├── PitchMeter        (音分偏差仪表)
       └── TunerControls     (吹/吸/把位/调性)
       └── MicrophoneGate    (权限请求/状态)

src/hooks/tuner/
  ├── usePitchDetector.ts   (pitchy 封装)
  └── useHarmonicaMapping.ts (孔位→音符查找)

src/lib/tuner/
  ├── types.ts              (类型定义)
  ├── note-utils.ts         (频率↔音符↔音分)
  └── harmonica-mappings.ts (孔位映射表)
```

## 数据流

```
麦克风 → AnalyserNode.getFloatTimeDomainData()
  → pitchy.findPitch() → { frequencyHz, clarity }
  → clarity > 0.9 ?
    YES → note-utils.getClosestNote(freq) → { note, octave, cents }
      → harmonica-mappings.findHoles(note+octave, type, key, breath)
        → 更新: 高亮孔位 + 显示音分 + 音量指示
    NO  → 忽略（不稳定的信号）
```

## 口琴孔位映射

### 十孔标准调音 (C 调)

| 孔 | 吹 (Blow) | 吸 (Draw) |
|----|-----------|-----------|
| 1  | C4  (262) | D4  (294) |
| 2  | E4  (330) | G4  (392) |
| 3  | G4  (392) | B4  (494) |
| 4  | C5  (523) | D5  (587) |
| 5  | E5  (659) | F5  (698) |
| 6  | G5  (784) | A5  (880) |
| 7  | C6  (1047)| B5  (988) |
| 8  | E6  (1319)| D6  (1175)|
| 9  | G6  (1568)| F6  (1397)|
| 10 | C7  (2093)| A6  (1760)|

### 十二孔半音阶口琴 Solo 调音 (C 调, slide out)

| 孔 | 吹 (Blow) | 吸 (Draw) |
|----|-----------|-----------|
| 1  | C4  (262) | D4  (294) |
| 2  | E4  (330) | F4  (349) |
| 3  | G4  (392) | A4  (440) |
| 4  | C5  (523) | B4  (494) |
| 5  | C5  (523) | D5  (587) |
| 6  | E5  (659) | F5  (698) |
| 7  | G5  (784) | A5  (880) |
| 8  | C6  (1047)| B5  (988) |
| 9  | C6  (1047)| D6  (1175)|
| 10 | E6  (1319)| F6  (1397)|
| 11 | G6  (1568)| A6  (1760)|
| 12 | C7  (2093)| B6  (1976)|

注：半音阶口琴有 slide，本文档仅覆盖 slide out（标准状态）。半音可通过 slide 按下实现。
注：C5 在两个孔重复（4/5、8/9），查找时返回所有匹配项。

## 音分偏差颜色

| 范围 | 颜色 | 含义 |
|------|------|------|
| ±5 cents | 绿色 | 准确 |
| ±5-15 cents | 黄色 | 接近 |
| >±15 cents | 红色 | 偏离 |

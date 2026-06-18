'use client';

import { HarmonicaType } from '@/lib/tuner/types';

interface HarmonicaSelectorProps {
  onSelect: (type: HarmonicaType) => void;
}

export default function HarmonicaSelector({ onSelect }: HarmonicaSelectorProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: '#14161a' }}>
      <h2 className="text-2xl font-bold mb-10 text-white">请选择你的口琴</h2>
      <div className="flex flex-col gap-5 w-full max-w-sm">
        <button
          onClick={() => onSelect('diatonic_standard')}
          className="flex items-center gap-5 p-5 rounded-2xl text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
            <HarpIcon10 />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-1">十孔标准调音</h4>
            <p className="text-sm text-white/35 whitespace-pre-line leading-relaxed">
              十孔蓝调口琴，标准Richter调音{'\n'}适合蓝调、摇滚、民谣 · 10孔
            </p>
          </div>
        </button>
        <button
          onClick={() => onSelect('chromatic_12hole')}
          className="flex items-center gap-5 p-5 rounded-2xl text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
            <HarpIcon12 />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-1">十二孔半音阶口琴</h4>
            <p className="text-sm text-white/35 whitespace-pre-line leading-relaxed">
              十二孔半音阶口琴，Solo调音{'\n'}适合爵士、古典、流行 · 12孔
            </p>
          </div>
        </button>
      </div>
      <p className="mt-8 text-xs text-white/20">注：苹果手机请确认系统版本不低于16.5</p>
    </div>
  );
}

/* 10-hole diatonic icon - extracted from original CSS */
function HarpIcon10() {
  return (
    <svg width="64" height="64" viewBox="0 0 157 157">
      <defs>
        <circle id="h10-path" cx="78.5" cy="78.5" r="78.5" />
        <clipPath id="h10-clip"><use href="#h10-path" /></clipPath>
      </defs>
      <circle stroke="#4A4A4A" strokeWidth="4" cx="78.5" cy="78.5" r="76.5" fill="none" />
      <g clipPath="url(#h10-clip)">
        <g transform="translate(78.5,141) rotate(90) translate(-78.5,-141) translate(-62.5,62.5)">
          <circle stroke="#4A4A4A" strokeWidth="4" fill="#52CEFF" cx="78.5" cy="78.5" r="76.5" />
          <path d="M252.9,104 L76.5,104 C71,104 66.6,98.5 66.6,91.8 L66.6,64.2 C66.6,57.5 71,52 76.5,52 L252.9,52 C258.3,52 262.8,57.5 262.8,64.2 L262.8,91.8 C262.8,98.5 258.3,104 252.9,104" fill="#4A4A4A" />
          <polygon fill="#52CEFF" points="66.6,93.6 262.8,93.6 262.8,62.5 66.6,62.5" />
          <path d="M47.9,90.3 L278.1,90.3 C280.2,90.3 282,88.6 282,86.4 L282,68.7 C282,66.6 280.2,64.8 278.1,64.8 L47.9,64.8 C45.8,64.8 44,66.6 44,68.7 L44,86.4 C44,88.6 45.8,90.3 47.9,90.3 Z" fill="#4A4A4A" />
          <polygon fill="#52CEFF" points="74.9,85.3 89.4,85.3 89.4,71 74.9,71" />
          <polygon fill="#52CEFF" points="93.2,85.3 107.7,85.3 107.7,71 93.2,71" />
          <polygon fill="#52CEFF" points="111.6,85.3 126,85.3 126,71 111.6,71" />
          <polygon fill="#52CEFF" points="129.9,85.3 144.3,85.3 144.3,71 129.9,71" />
          <polygon fill="#52CEFF" points="148.2,85.3 162.7,85.3 162.7,71 148.2,71" />
        </g>
      </g>
      <circle stroke="#4A4A4A" strokeWidth="4" cx="78.5" cy="78.5" r="76.5" fill="none" />
    </svg>
  );
}

/* 12-hole chromatic icon - extracted from original CSS */
function HarpIcon12() {
  return (
    <svg width="64" height="64" viewBox="0 0 157 157">
      <defs>
        <circle id="h12-path" cx="78.5" cy="78.5" r="78.5" />
        <clipPath id="h12-clip"><use href="#h12-path" /></clipPath>
      </defs>
      <circle stroke="#4A4A4A" strokeWidth="4" cx="78.5" cy="78.5" r="76.5" fill="none" />
      <g clipPath="url(#h12-clip)">
        <g transform="translate(78.5,166.75) rotate(-90) translate(-78.5,-166.75) translate(-89.25,88.25)">
          <circle stroke="#4A4A4A" strokeWidth="4" fill="#FF761B" cx="257" cy="78.5" r="76.5" />
          <path d="M258.4,106.5 L29.5,106.5 C23.2,106.5 18,100.4 18,92.9 L18,62.1 C18,54.6 23.2,48.5 29.5,48.5 L258.4,48.5 C264.8,48.5 270,54.6 270,62.1 L270,92.9 C270,100.4 264.8,106.5 258.4,106.5" fill="#4A4A4A" />
          <polygon fill="#FF761B" points="16,95.9 270.9,95.9 270.9,58.7 16,58.7" />
          <path d="M2.6,92.6 L285.5,92.6 C287,92.6 288.1,91.4 288.1,90 L288.1,64.6 C288.1,63.2 287,62 285.5,62 L2.6,62 C1.2,62 0,63.2 0,64.6 L0,90 C0,91.4 1.2,92.6 2.6,92.6 Z" fill="#4A4A4A" />
          <polygon fill="#4A4A4A" points="281.7,84.5 298.7,84.5 298.7,69.5 281.7,69.5" />
          <path d="M298.7,62 L298.7,92.6 C298.7,92.6 305,87.9 305,76.7 C305,65.6 298.7,62 298.7,62" fill="#4A4A4A" />
          <polygon fill="#FF761B" points="167.5,85.9 184.3,85.9 184.3,68.7 167.5,68.7" />
          <polygon fill="#FF761B" points="188.8,85.9 205.6,85.9 205.6,68.7 188.8,68.7" />
          <polygon fill="#FF761B" points="210,85.9 226.9,85.9 226.9,68.7 210,68.7" />
          <polygon fill="#FF761B" points="231.3,85.9 248.1,85.9 248.1,68.7 231.3,68.7" />
          <polygon fill="#FF761B" points="252.6,85.9 269.4,85.9 269.4,68.7 252.6,68.7" />
        </g>
      </g>
      <circle stroke="#4A4A4A" strokeWidth="4" cx="78.5" cy="78.5" r="76.5" fill="none" />
    </svg>
  );
}

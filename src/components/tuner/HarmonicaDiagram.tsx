'use client';

import { useMemo } from 'react';
import { MatchedHole, BreathDirection } from '@/lib/tuner/types';
import { getHoleNotes } from '@/lib/tuner/harmonica-mappings';

interface HarmonicaDiagramProps {
  matchedHoles: MatchedHole[];
  breath: BreathDirection;
  totalHoles: number;
}

const BLOW_COLOR = '#52CEFF';
const DRAW_COLOR = '#FF761B';

function noteName(full: string) {
  return full.replace(/\d/, '');
}

export default function HarmonicaDiagram({
  matchedHoles,
  breath,
  totalHoles,
}: HarmonicaDiagramProps) {
  const isChromatic = totalHoles === 12;
  const accentColor = isChromatic ? '#FF761B' : BLOW_COLOR;

  const holes = useMemo(
    () => getHoleNotes(isChromatic ? 'chromatic_12hole' : 'diatonic_standard', 'C'),
    [isChromatic],
  );

  const holeW = isChromatic ? 46 : 54;
  const padX = 24;
  const svgW = totalHoles * holeW + padX * 2 + 4;
  const svgH = 400;

  const bodyX = padX;
  const bodyW = totalHoles * holeW + 4;
  const bodyY = 115;
  const bodyH = 170;
  const bodyRx = 24;

  const blowY = 62;
  const drawY = 308;
  const cellH = 38;
  const cellRx = 6;

  const matchedSet = new Set(
    matchedHoles
      .filter((m) => m.breath === breath)
      .map((m) => m.hole),
  );

  return (
    <div className="flex justify-center">
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="w-full max-w-[600px]"
        role="img"
        aria-label={`口琴孔位图，${breath === 'blow' ? '吹' : '吸'}模式`}
      >
        <defs>
          <linearGradient id="hg-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6b6b6b" />
            <stop offset="8%" stopColor="#9a9a9a" />
            <stop offset="20%" stopColor="#b8b8b8" />
            <stop offset="50%" stopColor="#8a8a8a" />
            <stop offset="80%" stopColor="#6e6e6e" />
            <stop offset="100%" stopColor="#3a3a3a" />
          </linearGradient>
          <linearGradient id="hg-cover" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c0c0c0" />
            <stop offset="40%" stopColor="#d4d4d4" />
            <stop offset="100%" stopColor="#808080" />
          </linearGradient>
          <filter id="hg-shadow">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Blow cell row */}
        {Array.from({ length: totalHoles }, (_, i) => {
          const cx = bodyX + 2 + i * holeW + holeW / 2;
          const active = matchedSet.has(i + 1);
          const note = holes[i]?.blow ?? '';
          return (
            <g key={`blow-${i}`}>
              <rect
                x={cx - (holeW - 14) / 2}
                y={blowY}
                width={holeW - 14}
                height={cellH}
                rx={cellRx}
                fill={active ? accentColor : '#2a2a2a'}
                stroke={active ? accentColor : '#444'}
                strokeWidth={active ? 2 : 1}
                opacity={active ? 1 : 0.7}
                style={{ transition: 'fill 0.12s, stroke 0.12s, opacity 0.12s' }}
              />
              <text
                x={cx}
                y={blowY + 13}
                textAnchor="middle"
                fill={active ? '#fff' : '#fff'}
                opacity={active ? 1 : 0.5}
                fontSize="11"
                fontWeight={active ? 700 : 400}
              >
                {noteName(note)}
              </text>
              <text
                x={cx}
                y={blowY + 28}
                textAnchor="middle"
                fill={active ? '#fff' : '#888'}
                opacity={active ? 1 : 0.5}
                fontSize="10"
              >
                {i + 1}
              </text>
            </g>
          );
        })}

        {/* Harmonica body */}
        <g filter="url(#hg-shadow)">
          <rect x={bodyX} y={bodyY} width={bodyW} height={bodyH} rx={bodyRx} fill="url(#hg-body)" stroke="#3a3a3a" strokeWidth="1" />
          <rect x={bodyX} y={bodyY} width={bodyW} height="26" rx={bodyRx} fill="url(#hg-cover)" opacity="0.55" />
          <rect x={bodyX} y={bodyY + bodyH - 26} width={bodyW} height="26" rx={bodyRx} fill="url(#hg-cover)" opacity="0.55" />
          <line x1={bodyX + 16} y1={bodyY + 48} x2={bodyX + bodyW - 16} y2={bodyY + 48} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1={bodyX + 16} y1={bodyY + bodyH - 48} x2={bodyX + bodyW - 16} y2={bodyY + bodyH - 48} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </g>

        {/* Hole numbers on body */}
        {Array.from({ length: totalHoles }, (_, i) => {
          const cx = bodyX + 2 + i * holeW + holeW / 2;
          const active = matchedSet.has(i + 1);
          return (
            <g key={`body-${i}`}>
              <line x1={cx} y1={bodyY + 2} x2={cx} y2={bodyY + 22} stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
              <line x1={cx} y1={bodyY + bodyH - 22} x2={cx} y2={bodyY + bodyH - 2} stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
              {active && (
                <circle cx={cx} cy={bodyY + bodyH / 2} r="16" fill={accentColor} opacity="0.2">
                  <animate attributeName="opacity" values="0.2;0.35;0.2" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
              <text
                x={cx}
                y={bodyY + bodyH / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.5)"
                fontSize="16"
                fontWeight="700"
              >
                {i + 1}
              </text>
            </g>
          );
        })}

        {/* Draw cell row */}
        {Array.from({ length: totalHoles }, (_, i) => {
          const cx = bodyX + 2 + i * holeW + holeW / 2;
          const active = matchedSet.has(i + 1);
          const note = holes[i]?.draw ?? '';
          return (
            <g key={`draw-${i}`}>
              <rect
                x={cx - (holeW - 14) / 2}
                y={drawY}
                width={holeW - 14}
                height={cellH}
                rx={cellRx}
                fill={active ? accentColor : '#2a2a2a'}
                stroke={active ? accentColor : '#444'}
                strokeWidth={active ? 2 : 1}
                opacity={active ? 1 : 0.7}
                style={{ transition: 'fill 0.12s, stroke 0.12s, opacity 0.12s' }}
              />
              <text
                x={cx}
                y={drawY + 13}
                textAnchor="middle"
                fill={active ? '#fff' : '#fff'}
                opacity={active ? 1 : 0.5}
                fontSize="11"
                fontWeight={active ? 700 : 400}
              >
                {noteName(note)}
              </text>
              <text
                x={cx}
                y={drawY + 28}
                textAnchor="middle"
                fill={active ? '#fff' : '#888'}
                opacity={active ? 1 : 0.5}
                fontSize="10"
              >
                {i + 1}
              </text>
            </g>
          );
        })}

        {/* Blow/Draw labels */}
        <text x={bodyX / 2 - 4} y={blowY + cellH / 2} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.5)" fontSize="14" fontWeight="600">
          吹
        </text>
        <text x={bodyX / 2 - 4} y={drawY + cellH / 2} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.5)" fontSize="14" fontWeight="600">
          吸
        </text>
      </svg>
    </div>
  );
}

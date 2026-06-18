'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { PitchDetector } from 'pitchy';
import { DetectedPitch, CLARITY_THRESHOLD } from '@/lib/tuner/types';

interface UsePitchDetectorReturn {
  isListening: boolean;
  pitch: DetectedPitch | null;
  volume: number;
  error: string | null;
  start: () => Promise<void>;
  stop: () => void;
}

export function usePitchDetector(): UsePitchDetectorReturn {
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number>(0);

  const [isListening, setIsListening] = useState(false);
  const [pitch, setPitch] = useState<DetectedPitch | null>(null);
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const start = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      ctxRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      const detector = PitchDetector.forFloat32Array(analyser.fftSize);
      const sampleRate = ctx.sampleRate;

      setIsListening(true);

      const detect = () => {
        const buf = new Float32Array(analyser.fftSize);
        analyser.getFloatTimeDomainData(buf);

        let rms = 0;
        for (let i = 0; i < buf.length; i++) {
          rms += buf[i] * buf[i];
        }
        rms = Math.sqrt(rms / buf.length);
        setVolume(Math.min(rms * 10, 1));

        const [hz, clarity] = detector.findPitch(buf, sampleRate);

        if (clarity > CLARITY_THRESHOLD && hz > 60 && hz < 5000) {
          setPitch({ frequency: Math.round(hz * 10) / 10, clarity });
        } else {
          setPitch(null);
        }

        frameRef.current = requestAnimationFrame(detect);
      };

      detect();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '无法访问麦克风';
      setError(message);
    }
  }, []);

  const stop = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
    if (ctxRef.current && ctxRef.current.state !== 'closed') {
      ctxRef.current.close();
    }
    setIsListening(false);
    setPitch(null);
    setVolume(0);
  }, []);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { isListening, pitch, volume, error, start, stop };
}

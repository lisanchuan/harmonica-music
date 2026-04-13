'use client';

import { useState, useRef, useEffect } from 'react';

type AudioType = 'demo' | 'accompaniment';

interface AudioPlayerProps {
  title: string;
  localAudio: string;
  localAccompaniment?: string | null;
  onClose?: () => void;
}

export default function AudioPlayer({ title, localAudio, localAccompaniment, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioType, setAudioType] = useState<AudioType>('demo');
  const audioRef = useRef<HTMLAudioElement>(null);

  const hasAccompaniment = !!localAccompaniment;

  const currentSrc = audioType === 'demo' ? localAudio : (localAccompaniment || localAudio);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [currentSrc]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error('Play failed:', err);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = parseFloat(e.target.value);
    setCurrentTime(audio.currentTime);
  };

  const handleAudioTypeChange = (type: AudioType) => {
    if (type === audioType) return;
    setAudioType(type);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-zinc-700 rounded-lg py-1.5 px-2">
      <audio ref={audioRef} src={currentSrc} preload="metadata" />

      <div className="flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700"
        >
          {isPlaying ? (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white">
              {audioType === 'demo' ? '示范演奏' : '伴奏'}
            </span>
            <span className="text-xs text-white/60">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/20 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => handleAudioTypeChange('demo')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              audioType === 'demo'
                ? 'bg-blue-600 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            示范
          </button>
          <button
            onClick={() => handleAudioTypeChange('accompaniment')}
            disabled={!hasAccompaniment}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              !hasAccompaniment
                ? 'bg-white/5 text-white/30 cursor-not-allowed'
                : audioType === 'accompaniment'
                ? 'bg-blue-600 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            伴奏
          </button>
        </div>
      </div>
    </div>
  );
}

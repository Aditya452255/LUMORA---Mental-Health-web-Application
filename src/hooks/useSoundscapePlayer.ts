import { useEffect, useRef, useState } from 'react';

type SoundKey = 'ocean' | 'rain' | 'wind' | 'bowls' | 'crickets' | 'white';

// Use Vite-compatible URL imports so audio assets resolve in the browser
const soundFiles: Record<SoundKey, string> = {
  ocean: new URL('../sounds/Ocean waves.wav', import.meta.url).href,
  rain: new URL('../sounds/Rain Forest.mp3', import.meta.url).href,
  wind: new URL('../sounds/Mounatain Wind.mp3', import.meta.url).href,
  bowls: new URL('../sounds/Tibetan Bowl.mp3', import.meta.url).href,
  crickets: new URL('../sounds/night-crickets.mp3', import.meta.url).href,
  white: new URL('../sounds/White Noise.mp3', import.meta.url).href,
};

export function useSoundscapePlayer() {
  const [activeSound, setActiveSound] = useState<SoundKey | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const cleanupAudio = () => {
    try {
      if (audioRef.current) {
        // remove listeners
        audioRef.current.onloadedmetadata = null;
        audioRef.current.ontimeupdate = null;
        audioRef.current.onended = null;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    } catch (e) {
      // ignore
    }
    setIsPlaying(false);
    setActiveSound(null);
    setDuration(0);
    setCurrentTime(0);
    setIsLoaded(false);
  };

  const playSound = (key: SoundKey) => {
    // If same sound already playing, resume
    if (activeSound === key && audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
      setActiveSound(key);
      return;
    }

    // stop previous
    cleanupAudio();

    try {
      const src = soundFiles[key];
      const audio = new Audio(src);
      audio.preload = 'metadata';
      audio.loop = true;
      audio.volume = volume;

      audio.onloadedmetadata = () => {
        setDuration(audio.duration || 0);
        setIsLoaded(true);
      };

      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime || 0);
      };

      audio.onended = () => {
        setIsPlaying(false);
      };

      audio.play().catch(() => {});
      audioRef.current = audio;
      setActiveSound(key);
      setIsPlaying(true);
    } catch (e) {
      // fail silently
      setActiveSound(null);
      setIsPlaying(false);
    }
  };

  const pauseSound = () => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } catch (e) {}
  };

  const stopSound = () => {
    cleanupAudio();
  };

  const setVolume = (level: number) => {
    const v = Math.max(0, Math.min(1, level));
    setVolumeState(v);
    try {
      if (audioRef.current) {
        audioRef.current.volume = v;
      }
    } catch (e) {}
  };

  const seek = (timeSec: number) => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = Math.max(0, Math.min(timeSec, audioRef.current.duration || 0));
        setCurrentTime(audioRef.current.currentTime || 0);
      }
    } catch (e) {}
  };

  const isActive = (key: SoundKey) => activeSound === key && isPlaying;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      try {
        if (audioRef.current) {
          audioRef.current.onloadedmetadata = null;
          audioRef.current.ontimeupdate = null;
          audioRef.current.onended = null;
          audioRef.current.pause();
          audioRef.current = null;
        }
      } catch (e) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    activeSound,
    isPlaying,
    volume,
    audioInstance: audioRef.current,
    duration,
    currentTime,
    isLoaded,
    playSound,
    pauseSound,
    stopSound,
    setVolume,
    seek,
    isActive,
  };
}

export type { SoundKey };

import { useEffect, useRef, useState } from 'react';

type MeditationSession = {
  title: string;
  description: string;
  script: string[];
  duration: number; // minutes
  audioUrl?: string | null;
};

export function useMeditationSession() {
  const [activeSession, setActiveSession] = useState<MeditationSession | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const clearIntervalRef = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const stopAudio = () => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    } catch (e) {
      // ignore
    }
  };

  const stopMeditationSession = () => {
    clearIntervalRef();
    stopAudio();
    setActiveSession(null);
    setRemainingSeconds(0);
    setIsComplete(false);
  };

  const startMeditationSession = (opts: MeditationSession) => {
    // stop previous
    stopMeditationSession();
    setActiveSession(opts);
    setIsComplete(false);
    setRemainingSeconds(opts.duration * 60);

    // audio
    if (opts.audioUrl) {
      try {
        audioRef.current = new Audio(opts.audioUrl);
        audioRef.current.loop = false;
        audioRef.current.play().catch(() => {});
      } catch (e) {}
    }

    intervalRef.current = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          // complete
          clearIntervalRef();
          stopAudio();
          setIsComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000) as unknown as number;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearIntervalRef();
      stopAudio();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    activeSession,
    remainingSeconds,
    isComplete,
    isRunning: intervalRef.current !== null,
    startMeditationSession,
    stopMeditationSession,
  };
}

export type { MeditationSession };

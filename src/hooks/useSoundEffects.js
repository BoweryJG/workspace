import { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'repSpheres-sound-enabled';

// Web Audio API sound generation
const createSound = (frequency, duration, type = 'sine') => {
  return () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };
};

// Predefined sounds
const sounds = {
  success: () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // Play a pleasant chord progression
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.value = freq;
      osc.type = 'sine';
      
      gain.gain.setValueAtTime(0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.2, now + i * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.4);
      
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.4);
    });
  },
  
  click: createSound(1000, 0.05, 'sine'),
  hover: createSound(800, 0.03, 'sine'),
  error: createSound(200, 0.2, 'sawtooth'),
  notification: createSound(880, 0.15, 'sine'),
  
  whoosh: () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const noise = audioContext.createBufferSource();
    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.2, audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    noise.buffer = noiseBuffer;
    
    const filter = audioContext.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1000, audioContext.currentTime);
    filter.frequency.linearRampToValueAtTime(5000, audioContext.currentTime + 0.2);
    
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0.1, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);
    
    noise.start();
  }
};

export const useSoundEffects = () => {
  const [enabled, setEnabled] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const audioContextRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enabled));
  }, [enabled]);

  const play = (soundName) => {
    if (!enabled) return;
    
    try {
      if (sounds[soundName]) {
        sounds[soundName]();
      }
    } catch (error) {
      console.warn('Failed to play sound:', error);
    }
  };

  const toggleSound = () => {
    setEnabled(prev => !prev);
  };

  return {
    enabled,
    toggleSound,
    play,
    sounds: Object.keys(sounds)
  };
};
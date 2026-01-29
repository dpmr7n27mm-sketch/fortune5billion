"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

// Retro-Future Sound System - Black Mirror x Far East / Early 2000s Dark Elegance
const createAudioContext = () => {
  if (typeof window !== 'undefined') {
    return new (window.AudioContext || window.webkitAudioContext)();
  }
  return null;
};

// Background Music Controller - precise loop timing
const createMusicPlayer = () => {
  let audio = null;
  let isLoaded = false;
  let loopChecker = null;
  const LOOP_POINT = 22.5;
  
  return {
    load: (src) => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
      if (loopChecker) clearInterval(loopChecker);
      
      audio = new Audio(src);
      audio.volume = 0.4;
      
      audio.addEventListener('canplaythrough', () => {
        isLoaded = true;
      });
      audio.load();
    },
    play: () => {
      if (loopChecker) clearInterval(loopChecker);
      
      const startPlayback = () => {
        audio.play().catch(() => {});
        loopChecker = setInterval(() => {
          if (audio && audio.currentTime >= LOOP_POINT) {
            audio.currentTime = 0;
          }
        }, 16); // Check every 16ms (~60fps) for precise timing
      };
      
      if (audio && isLoaded) {
        startPlayback();
      } else if (audio) {
        audio.addEventListener('canplaythrough', startPlayback, { once: true });
      }
    },
    pause: () => {
      if (audio) audio.pause();
      if (loopChecker) clearInterval(loopChecker);
    },
    stop: () => {
      if (loopChecker) clearInterval(loopChecker);
      if (audio) { audio.pause(); audio.currentTime = 0; }
    },
    setVolume: (vol) => {
      if (audio) audio.volume = Math.max(0, Math.min(1, vol));
    },
    isPlaying: () => {
      return audio && !audio.paused;
    }
  };
};

const playSound = (audioCtx, type) => {
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  const now = audioCtx.currentTime;
  
  switch(type) {
    case 'jump': {
      // Smooth digital breath - airy minor key rise
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      const gain = audioCtx.createGain();
      
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc1.type = 'sine';
      osc2.type = 'sine';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.linearRampToValueAtTime(3000, now + 0.08);
      filter.frequency.linearRampToValueAtTime(800, now + 0.15);
      filter.Q.setValueAtTime(2, now);
      
      // Minor third interval - dark but smooth
      osc1.frequency.setValueAtTime(330, now); // E
      osc1.frequency.linearRampToValueAtTime(392, now + 0.08); // G (minor 3rd)
      osc2.frequency.setValueAtTime(165, now); // E octave below
      osc2.frequency.linearRampToValueAtTime(196, now + 0.08);
      
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.008);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.15);
      
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.16);
      osc2.stop(now + 0.16);
      break;
    }
    case 'collect': {
      // Smooth gem collect - warm, round, Power Stone style with subtle reverb
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      const gain = audioCtx.createGain();
      
      // Reverb using short delays
      const delay1 = audioCtx.createDelay();
      const delay2 = audioCtx.createDelay();
      const reverbGain1 = audioCtx.createGain();
      const reverbGain2 = audioCtx.createGain();
      const reverbFilter = audioCtx.createBiquadFilter();
      
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      
      // Reverb path
      filter.connect(reverbFilter);
      reverbFilter.connect(delay1);
      reverbFilter.connect(delay2);
      delay1.connect(reverbGain1);
      delay2.connect(reverbGain2);
      reverbGain1.connect(audioCtx.destination);
      reverbGain2.connect(audioCtx.destination);
      
      delay1.delayTime.setValueAtTime(0.03, now);
      delay2.delayTime.setValueAtTime(0.06, now);
      
      // Fade reverb out smoothly to prevent click
      reverbGain1.gain.setValueAtTime(0.04, now);
      reverbGain1.gain.linearRampToValueAtTime(0.0001, now + 0.30);
      reverbGain2.gain.setValueAtTime(0.025, now);
      reverbGain2.gain.linearRampToValueAtTime(0.0001, now + 0.30);
      
      reverbFilter.type = 'lowpass';
      reverbFilter.frequency.setValueAtTime(2000, now);
      
      osc1.type = 'sine';
      osc2.type = 'sine';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.frequency.linearRampToValueAtTime(600, now + 0.2);
      filter.Q.setValueAtTime(1, now);
      
      // Soft perfect 5th - warm and satisfying
      osc1.frequency.setValueAtTime(440, now); // A
      osc1.frequency.linearRampToValueAtTime(435, now + 0.2); // Gentle settle
      osc2.frequency.setValueAtTime(660, now); // E (perfect 5th)
      osc2.frequency.linearRampToValueAtTime(652, now + 0.2);
      
      // Soft attack, smooth decay
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.10, now + 0.015);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.26);
      
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
      break;
    }
    case 'diamond': {
      // Ethereal bell cluster - harmonic minor, beautiful but unsettling
      const notes = [330, 392, 466]; // E, G, Bb (diminished feel)
      
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const mod = audioCtx.createOscillator();
        const modGain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();
        const gain = audioCtx.createGain();
        
        mod.connect(modGain);
        modGain.connect(osc.frequency);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.type = 'sine';
        mod.type = 'sine';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3000, now);
        filter.frequency.linearRampToValueAtTime(800, now + 0.6);
        
        const delay = i * 0.08;
        osc.frequency.setValueAtTime(freq, now + delay);
        mod.frequency.setValueAtTime(freq * 2.4, now + delay);
        modGain.gain.setValueAtTime(150, now + delay);
        modGain.gain.linearRampToValueAtTime(10, now + delay + 0.5);
        
        gain.gain.setValueAtTime(0.001, now + delay);
        gain.gain.linearRampToValueAtTime(0.12, now + delay + 0.01);
        gain.gain.linearRampToValueAtTime(0.001, now + delay + 0.6);
        
        osc.start(now + delay);
        mod.start(now + delay);
        osc.stop(now + delay + 0.62);
        mod.stop(now + delay + 0.62);
      });
      
      // Deep sub pulse
      const sub = audioCtx.createOscillator();
      const subFilter = audioCtx.createBiquadFilter();
      const subGain = audioCtx.createGain();
      sub.connect(subFilter);
      subFilter.connect(subGain);
      subGain.connect(audioCtx.destination);
      sub.type = 'sine';
      subFilter.type = 'lowpass';
      subFilter.frequency.setValueAtTime(100, now);
      sub.frequency.setValueAtTime(55, now); // Low A
      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.linearRampToValueAtTime(0.2, now + 0.01);
      subGain.gain.linearRampToValueAtTime(0.001, now + 0.5);
      sub.start(now);
      sub.stop(now + 0.52);
      break;
    }
    case 'hit': {
      // Muted digital impact - smooth but unsettling
      const osc = audioCtx.createOscillator();
      const mod = audioCtx.createOscillator();
      const modGain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();
      const gain = audioCtx.createGain();
      
      mod.connect(modGain);
      modGain.connect(osc.frequency);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.type = 'sine';
      mod.type = 'sine';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, now);
      filter.frequency.linearRampToValueAtTime(200, now + 0.15);
      filter.Q.setValueAtTime(3, now);
      
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(60, now + 0.12);
      mod.frequency.setValueAtTime(75, now);
      modGain.gain.setValueAtTime(80, now);
      modGain.gain.linearRampToValueAtTime(10, now + 0.1);
      
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.005);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.18);
      
      // Subtle high frequency glitch
      const glitch = audioCtx.createOscillator();
      const glitchGain = audioCtx.createGain();
      glitch.connect(glitchGain);
      glitchGain.connect(audioCtx.destination);
      glitch.type = 'sine';
      glitch.frequency.setValueAtTime(2200, now);
      glitch.frequency.linearRampToValueAtTime(800, now + 0.04);
      glitchGain.gain.setValueAtTime(0.001, now);
      glitchGain.gain.linearRampToValueAtTime(0.08, now + 0.003);
      glitchGain.gain.linearRampToValueAtTime(0.001, now + 0.04);
      
      osc.start(now);
      mod.start(now);
      glitch.start(now);
      osc.stop(now + 0.2);
      mod.stop(now + 0.2);
      glitch.stop(now + 0.05);
      break;
    }
    case 'debtPit': {
      // Dread swell - beautiful but ominous, like distant warning
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const osc3 = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      const gain = audioCtx.createGain();
      
      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc3.type = 'sine';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.linearRampToValueAtTime(1200, now + 0.2);
      filter.frequency.linearRampToValueAtTime(300, now + 0.5);
      filter.Q.setValueAtTime(2, now);
      
      // Minor 2nd cluster - tension
      osc1.frequency.setValueAtTime(110, now); // A
      osc2.frequency.setValueAtTime(117, now); // Bb (minor 2nd - dissonance)
      osc3.frequency.setValueAtTime(55, now);  // Sub A
      
      // Slow swell then fade
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.15);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.5);
      
      osc1.start(now);
      osc2.start(now);
      osc3.start(now);
      osc1.stop(now + 0.52);
      osc2.stop(now + 0.52);
      osc3.stop(now + 0.52);
      break;
    }
    case 'death': {
      // Melancholic descent - smooth, sad, inevitable
      const minorScale = [494, 440, 392, 330]; // B A G E (natural minor descent)
      
      minorScale.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const filter = audioCtx.createBiquadFilter();
        const gain = audioCtx.createGain();
        
        osc.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.type = 'sine';
        osc2.type = 'sine';
        filter.type = 'lowpass';
        
        const delay = i * 0.15;
        filter.frequency.setValueAtTime(2000, now + delay);
        filter.frequency.linearRampToValueAtTime(600, now + delay + 0.18);
        
        osc.frequency.setValueAtTime(freq, now + delay);
        osc.frequency.linearRampToValueAtTime(freq * 0.98, now + delay + 0.15); // Slight pitch drop
        osc2.frequency.setValueAtTime(freq * 0.5, now + delay); // Octave below
        
        gain.gain.setValueAtTime(0.001, now + delay);
        gain.gain.linearRampToValueAtTime(0.15 - (i * 0.02), now + delay + 0.01);
        gain.gain.linearRampToValueAtTime(0.001, now + delay + 0.2);
        
        osc.start(now + delay);
        osc2.start(now + delay);
        osc.stop(now + delay + 0.22);
        osc2.stop(now + delay + 0.22);
      });
      break;
    }
    case 'win': {
      // Bittersweet resolution - beautiful but melancholic victory
      const progression = [
        { freq: 330, time: 0 },      // E
        { freq: 392, time: 0.12 },   // G
        { freq: 494, time: 0.24 },   // B
        { freq: 659, time: 0.4 },    // E (octave)
      ];
      
      progression.forEach(({ freq, time }) => {
        const osc = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const mod = audioCtx.createOscillator();
        const modGain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();
        const gain = audioCtx.createGain();
        
        mod.connect(modGain);
        modGain.connect(osc.frequency);
        osc.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.type = 'sine';
        osc2.type = 'sine';
        mod.type = 'sine';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3500, now + time);
        filter.frequency.linearRampToValueAtTime(1200, now + time + 0.25);
        
        osc.frequency.setValueAtTime(freq, now + time);
        osc2.frequency.setValueAtTime(freq * 0.5, now + time);
        mod.frequency.setValueAtTime(freq * 2.5, now + time);
        modGain.gain.setValueAtTime(100, now + time);
        modGain.gain.linearRampToValueAtTime(10, now + time + 0.2);
        
        gain.gain.setValueAtTime(0.001, now + time);
        gain.gain.linearRampToValueAtTime(0.14, now + time + 0.01);
        gain.gain.linearRampToValueAtTime(0.001, now + time + 0.3);
        
        osc.start(now + time);
        osc2.start(now + time);
        mod.start(now + time);
        osc.stop(now + time + 0.32);
        osc2.stop(now + time + 0.32);
        mod.stop(now + time + 0.32);
      });
      
      // Final ethereal pad swell
      const pad1 = audioCtx.createOscillator();
      const pad2 = audioCtx.createOscillator();
      const padFilter = audioCtx.createBiquadFilter();
      const padGain = audioCtx.createGain();
      
      pad1.connect(padFilter);
      pad2.connect(padFilter);
      padFilter.connect(padGain);
      padGain.connect(audioCtx.destination);
      
      pad1.type = 'sine';
      pad2.type = 'sine';
      padFilter.type = 'lowpass';
      padFilter.frequency.setValueAtTime(800, now + 0.5);
      padFilter.frequency.linearRampToValueAtTime(2000, now + 0.8);
      padFilter.frequency.linearRampToValueAtTime(600, now + 1.2);
      
      pad1.frequency.setValueAtTime(330, now + 0.5); // E
      pad2.frequency.setValueAtTime(494, now + 0.5); // B (perfect 5th - open, haunting)
      
      padGain.gain.setValueAtTime(0.001, now + 0.5);
      padGain.gain.linearRampToValueAtTime(0.12, now + 0.8);
      padGain.gain.linearRampToValueAtTime(0.001, now + 1.3);
      
      pad1.start(now + 0.5);
      pad2.start(now + 0.5);
      pad1.stop(now + 1.32);
      pad2.stop(now + 1.32);
      break;
    }
  }
};

export default function NIRAGame() {
  const [gameState, setGameState] = useState('start');
  const [, forceRender] = useState(0);
  const audioCtxRef = useRef(null);
  const musicPlayerRef = useRef(null);
  const [musicStarted, setMusicStarted] = useState(false);
  const [glitchText, setGlitchText] = useState('NOTHING IS REAL ANYMORE');
  const [showMessage, setShowMessage] = useState('');
  const [messageColor, setMessageColor] = useState('#fff');
  const [hitFlash, setHitFlash] = useState(false);
  const [glitchBurst, setGlitchBurst] = useState(false);
  const [frozen, setFrozen] = useState(false);

  // Start music on first user interaction (required by browsers)
  useEffect(() => {
    const startMusic = () => {
      if (!musicStarted) {
        try {
          if (!musicPlayerRef.current) {
            musicPlayerRef.current = createMusicPlayer();
            musicPlayerRef.current.load('/nira-bgm.mp3');
          }
          musicPlayerRef.current.play();
          setMusicStarted(true);
        } catch (e) {
          // Music file not available
        }
      }
    };
    
    // Listen for any user interaction to start music
    document.addEventListener('click', startMusic, { once: true });
    document.addEventListener('touchstart', startMusic, { once: true });
    document.addEventListener('keydown', startMusic, { once: true });
    
    return () => {
      document.removeEventListener('click', startMusic);
      document.removeEventListener('touchstart', startMusic);
      document.removeEventListener('keydown', startMusic);
    };
  }, [musicStarted]);

  const gameRef = useRef({
    playerY: 280, velocity: 0, distance: 0, collected: 0, isJumping: false, invincible: false,
    cookies: [], goldenCookies: [], executives: [], contracts: [], pits: [],
    lastTime: 0, nextCookieX: 300, nextGoldenX: 2000, nextExecX: 500, nextContractX: 600, nextPitX: 900,
    cookieId: 0, goldenId: 0, execId: 0, contractId: 0, pitId: 0, justStarted: false,
  });

  const GROUND = 280, GOAL = 10, SPEED = 300;
  const messages = ["OWN YOUR MASTERS", "STAY INDEPENDENT", "BUILD YOUR FORTUNE", "YOU'RE THE LABEL", "NO MIDDLEMEN", "KEEP CREATING", "YOUR VISION YOUR RULES", "CONTROL YOUR DESTINY"];
  const diamondMessages = ["CATALOG SECURED", "UNTOUCHABLE", "EMPIRE MODE", "LEGACY SECURED", "OWNERSHIP UNLOCKED"];
  const hitMessages = ["THEY TOOK YOUR FORTUNE", "BAD DEAL SIGNED", "READ THE FINE PRINT", "360 DEAL ACTIVATED", "LOST YOUR MASTERS", "RIGHTS GONE IN PERPETUITY", "ADVANCE TRAP", "SIGNED YOUR RIGHTS AWAY"];

  const initGame = useCallback(() => {
    // Always recreate AudioContext to fix stale audio after idle
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch (e) {}
    }
    audioCtxRef.current = createAudioContext();
    
    // Resume music if it was stopped (on death/win)
    try {
      if (musicPlayerRef.current) {
        musicPlayerRef.current.play();
      }
    } catch (e) {}
    
    const g = gameRef.current;
    Object.assign(g, { cookies: [], goldenCookies: [], executives: [], contracts: [], pits: [], playerY: GROUND, velocity: 0, distance: 0, collected: 0, isJumping: false, invincible: false, lastTime: performance.now(), nextCookieX: 300, nextGoldenX: 2000, nextExecX: 600, nextContractX: 500, nextPitX: 900, cookieId: 0, goldenId: 0, execId: 0, contractId: 0, pitId: 0 });
    setHitFlash(false); setShowMessage(''); setMessageColor('#fff'); setGlitchBurst(false); setFrozen(false); setGameState('playing');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyR' && gameState === 'playing') { initGame(); return; }
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'start' || gameState === 'dead' || gameState === 'end') return; // Use buttons instead
        if (frozen) return;
        const g = gameRef.current;
        if (g.playerY >= GROUND - 5 && !g.isJumping) { g.isJumping = true; g.velocity = -780; playSound(audioCtxRef.current, 'jump'); }
      }
    };
    const handleTouch = (e) => {
      // Don't auto-start on any screen - use buttons instead
      if (gameState === 'start' || gameState === 'dead' || gameState === 'end') return;
      if (frozen) return;
      const g = gameRef.current;
      if (g.playerY >= GROUND - 5 && !g.isJumping) { g.isJumping = true; g.velocity = -720; playSound(audioCtxRef.current, 'jump'); }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouch, { passive: true });
    return () => { window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('touchstart', handleTouch); };
  }, [gameState, initGame, frozen]);

  useEffect(() => {
    if (gameState !== 'playing' || frozen) return;
    let animId, running = true;
    const triggerHit = () => {
      const g = gameRef.current;
      if (g.invincible) return false;
      if (g.collected <= 0) { 
        try { if (musicPlayerRef.current) musicPlayerRef.current.stop(); } catch (e) {}
        playSound(audioCtxRef.current, 'death'); 
        setGameState('dead'); 
        return true; 
      }
      g.collected = Math.max(0, g.collected - 3); g.invincible = true; setHitFlash(true); setMessageColor('#ff4444');
      playSound(audioCtxRef.current, 'hit');
      setShowMessage(hitMessages[Math.floor(Math.random() * hitMessages.length)]);
      setTimeout(() => { if (running) setShowMessage(''); }, 1200);
      setTimeout(() => { if (running) setHitFlash(false); }, 200);
      setTimeout(() => { g.invincible = false; }, 800);
      return false;
    };
    const spawnObstacles = () => {
      const g = gameRef.current, spawnAhead = g.distance + 700;
      while (g.nextCookieX < spawnAhead) { g.cookies.push({ x: g.nextCookieX, y: Math.random() > 0.6 ? 280 : 210, id: g.cookieId++, active: true }); g.nextCookieX += 320 + Math.random() * 120; }
      while (g.nextGoldenX < spawnAhead) { g.goldenCookies.push({ x: g.nextGoldenX, y: Math.random() > 0.6 ? 280 : 210, id: g.goldenId++, active: true }); g.nextGoldenX += 2500 + Math.random() * 2000; }
      while (g.nextExecX < spawnAhead) { g.executives.push({ x: g.nextExecX, id: g.execId++ }); g.nextExecX += 1200 + Math.random() * 600; }
      while (g.nextContractX < spawnAhead) { g.contracts.push({ x: g.nextContractX, y: -50 - Math.random() * 200, fallSpeed: 100 + Math.random() * 50, id: g.contractId++, active: true }); g.nextContractX += 300 + Math.random() * 200; }
      while (g.nextPitX < spawnAhead) { g.pits.push({ x: g.nextPitX, id: g.pitId++ }); g.nextPitX += 1800 + Math.random() * 800; }
      const cleanup = g.distance - 200;
      g.cookies = g.cookies.filter(c => c.x > cleanup); g.goldenCookies = g.goldenCookies.filter(c => c.x > cleanup);
      g.executives = g.executives.filter(e => e.x > cleanup); g.contracts = g.contracts.filter(c => c.x > cleanup); g.pits = g.pits.filter(p => p.x + 70 > cleanup);
    };
    const loop = (currentTime) => {
      if (!running) return;
      const g = gameRef.current, delta = Math.min((currentTime - g.lastTime) / 1000, 0.05);
      g.lastTime = currentTime; g.distance += SPEED * delta; g.velocity += 1700 * delta; g.playerY += g.velocity * delta;
      if (g.playerY >= GROUND) { g.playerY = GROUND; g.velocity = 0; g.isJumping = false; }
      spawnObstacles();
      g.cookies.forEach(c => { if (!c.active) return; const sx = c.x - g.distance; if (Math.abs(sx - 80) < 48 && Math.abs(c.y - g.playerY) < 50) { c.active = false; g.collected += 1; playSound(audioCtxRef.current, 'collect'); setMessageColor('#fff'); setShowMessage(messages[Math.floor(Math.random() * messages.length)]); setTimeout(() => { if (running) setShowMessage(''); }, 1000); }});
      g.goldenCookies.forEach(c => { if (!c.active) return; const sx = c.x - g.distance; if (Math.abs(sx - 80) < 48 && Math.abs(c.y - g.playerY) < 50) { c.active = false; g.collected += 3; playSound(audioCtxRef.current, 'diamond'); setMessageColor('#fff'); setShowMessage("BLACK DIAMOND FORTUNE +3\n" + diamondMessages[Math.floor(Math.random() * diamondMessages.length)]); setTimeout(() => { if (running) setShowMessage(''); }, 1200); }});
      g.contracts.forEach(c => { if (!c.active) return; const sx = c.x - g.distance; if (sx < 550 && sx > -100) { c.y = Math.min(c.y + c.fallSpeed * delta, GROUND - 10); } if (!g.invincible && Math.abs(sx - 80) < 35 && Math.abs(c.y - g.playerY) < 50 && c.y > 50) { c.active = false; triggerHit(); }});
      g.executives.forEach(ex => { if (g.invincible) return; const sx = ex.x - g.distance; if (sx > -60 && sx < 150 && Math.abs(sx - 80) < 48 && (GROUND - g.playerY) < 65) { triggerHit(); }});
      g.pits.forEach(pit => { const pitLeft = pit.x - g.distance, pitRight = pitLeft + 70; if (128 > pitLeft && 80 < pitRight && g.playerY > GROUND - 60 && !g.invincible) { if (g.collected <= 0) { try { if (musicPlayerRef.current) musicPlayerRef.current.stop(); } catch (e) {} playSound(audioCtxRef.current, 'death'); setGameState('dead'); return; } g.collected = 0; g.invincible = true; setHitFlash(true); setMessageColor('#ff4444'); playSound(audioCtxRef.current, 'debtPit'); setShowMessage("DEBT TRAP"); setTimeout(() => { if (running) setShowMessage(''); }, 1200); setTimeout(() => { if (running) setHitFlash(false); }, 200); setTimeout(() => { g.invincible = false; }, 800); }});
      if (g.collected >= GOAL && !glitchBurst) { 
        setFrozen(true);
        setGlitchBurst(true);
        try { if (musicPlayerRef.current) musicPlayerRef.current.stop(); } catch (e) {}
        playSound(audioCtxRef.current, 'win');
        setTimeout(() => setGameState('end'), 1500); 
        return; 
      }
      forceRender(n => n + 1); animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => { running = false; cancelAnimationFrame(animId); };
  }, [gameState, glitchBurst, frozen]);

  useEffect(() => {
    const glitch = setInterval(() => { if (Math.random() > 0.7) { const chars = '░▒▓█▄▀ΞΩΨΔ'; setGlitchText('NOTHING IS REAL ANYMORE'.split('').map(c => Math.random() > 0.85 ? chars[Math.floor(Math.random() * chars.length)] : c).join('')); setTimeout(() => setGlitchText('NOTHING IS REAL ANYMORE'), 100); }}, 250);
    return () => clearInterval(glitch);
  }, []);

  const g = gameRef.current;
  const FortuneCookie = ({ screenX, y }) => (<div style={{ position: 'absolute', left: screenX, top: y - 20 }}><div style={{ position: 'relative', width: 45, height: 35, filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.6)) drop-shadow(0 0 12px rgba(255,180,0,0.4))' }}><div style={{ position: 'absolute', left: 0, width: 20, height: 30, background: 'linear-gradient(135deg, #ffd700 0%, #b8860b 50%, #8b6914 100%)', borderRadius: '50% 0 0 50%', border: '2px solid #daa520', transform: 'rotate(-15deg)' }} /><div style={{ position: 'absolute', right: 0, width: 20, height: 30, background: 'linear-gradient(225deg, #ffd700 0%, #b8860b 50%, #8b6914 100%)', borderRadius: '0 50% 50% 0', border: '2px solid #daa520', transform: 'rotate(15deg)' }} /><div style={{ position: 'absolute', left: 10, top: 11, width: 24, height: 6, background: '#f5f5f0', borderRadius: 1 }} /></div></div>);
  const GoldenCookie = ({ screenX, y }) => (<div style={{ position: 'absolute', left: screenX, top: y - 22 }}><div style={{ position: 'relative', width: 50, height: 40, filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8)) drop-shadow(0 0 15px rgba(200,200,255,0.6))' }}><div style={{ position: 'absolute', left: 0, width: 22, height: 34, background: 'linear-gradient(135deg, #4a4a4a 0%, #1a1a1a 30%, #000 50%, #3a3a3a 70%, #1a1a1a 100%)', borderRadius: '50% 0 0 50%', border: '2px solid #666', transform: 'rotate(-15deg)' }} /><div style={{ position: 'absolute', right: 0, width: 22, height: 34, background: 'linear-gradient(225deg, #4a4a4a 0%, #1a1a1a 30%, #000 50%, #3a3a3a 70%, #1a1a1a 100%)', borderRadius: '0 50% 50% 0', border: '2px solid #666', transform: 'rotate(15deg)' }} /><div style={{ position: 'absolute', left: 11, top: 12, width: 26, height: 7, background: '#f5f5f0', borderRadius: 1, boxShadow: '0 0 6px rgba(255,255,255,0.5)' }} /><div style={{ position: 'absolute', left: 6, top: 6, width: 8, height: 8, background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 50%, transparent 100%)', borderRadius: '50%' }} /><div style={{ position: 'absolute', right: 8, top: 18, width: 4, height: 4, background: 'rgba(255,255,255,0.6)', borderRadius: '50%' }} /></div></div>);
  const Contract = ({ screenX, y }) => (<div style={{ position: 'absolute', left: screenX, top: y, transform: 'rotate(15deg)' }}><svg width="16" height="24" viewBox="0 0 4 6" style={{ imageRendering: 'pixelated' }}><rect x="0" y="0" width="4" height="5" fill="#f5f5f0" /><rect x="1" y="1" width="2" height="1" fill="#666" /><rect x="1" y="2" width="2" height="1" fill="#666" /><rect x="1" y="4" width="2" height="1" fill="#8B0000" /></svg></div>);
  const DebtPit = ({ screenX }) => { const [pulse, setPulse] = useState(true); useEffect(() => { if (frozen) return; const t = setInterval(() => setPulse(p => !p), 250); return () => clearInterval(t); }, [frozen]); return (<div style={{ position: 'absolute', left: screenX, top: GROUND - 60, width: 70, height: 65 }}><div style={{ width: 30, height: 25, background: pulse ? '#550000' : '#330000', margin: '0 auto', boxShadow: pulse ? '0 0 15px #ff0000' : '0 0 8px #880000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><span style={{ color: pulse ? '#ff6666' : '#cc4444', fontSize: 10, fontWeight: 'bold', fontFamily: 'monospace' }}>$$$</span></div><div style={{ width: 0, height: 0, borderLeft: '35px solid transparent', borderRight: '35px solid transparent', borderTop: pulse ? '35px solid #550000' : '35px solid #330000', filter: pulse ? 'drop-shadow(0 0 15px #ff0000)' : 'drop-shadow(0 0 8px #880000)' }} /></div>); };
  const Executive = ({ screenX }) => (<div style={{ position: 'absolute', left: Math.round(screenX), top: GROUND - 72, transform: 'translateZ(0)' }}><svg width="56" height="72" viewBox="0 0 14 18" shapeRendering="crispEdges"><rect x="4" y="0" width="6" height="1" fill="#2d2d2d"/><rect x="3" y="1" width="8" height="2" fill="#2d2d2d"/><rect x="4" y="3" width="6" height="1" fill="#f5ddd0"/><rect x="3" y="4" width="8" height="3" fill="#f5ddd0"/><rect x="5" y="7" width="4" height="1" fill="#f5ddd0"/><rect x="2" y="8" width="10" height="5" fill="#1a1a1a"/><rect x="5" y="8" width="1" height="1" fill="#ffffff"/><rect x="8" y="8" width="1" height="1" fill="#ffffff"/><rect x="6" y="8" width="2" height="4" fill="#dc2626"/><rect x="0" y="9" width="2" height="3" fill="#1a1a1a"/><rect x="0" y="12" width="2" height="1" fill="#f5ddd0"/><rect x="12" y="9" width="2" height="3" fill="#1a1a1a"/><rect x="12" y="12" width="2" height="1" fill="#f5ddd0"/><rect x="3" y="13" width="8" height="1" fill="#1f1f1f"/><rect x="3" y="14" width="3" height="3" fill="#1f1f1f"/><rect x="8" y="14" width="3" height="3" fill="#1f1f1f"/><rect x="2" y="17" width="4" height="1" fill="#0a0a0a"/><rect x="8" y="17" width="4" height="1" fill="#0a0a0a"/></svg></div>);
  const Player = ({ flash, invincible, y }) => (<div style={{ position: 'absolute', left: 80, top: Math.round(y - 64), opacity: invincible ? 0.6 : 1, filter: flash ? 'brightness(2)' : 'none', transform: 'translateZ(0)' }}><svg width="48" height="64" viewBox="0 0 12 16" shapeRendering="crispEdges"><rect x="3" y="0" width="6" height="1" fill="#1a1a1a"/><rect x="2" y="1" width="8" height="1" fill="#1a1a1a"/><rect x="2" y="2" width="8" height="2" fill="#1a1a1a"/><rect x="3" y="4" width="6" height="1" fill="#c4956a"/><rect x="2" y="5" width="8" height="2" fill="#c4956a"/><rect x="4" y="7" width="4" height="1" fill="#c4956a"/><rect x="2" y="8" width="8" height="4" fill="#2563eb"/><rect x="0" y="8" width="2" height="1" fill="#c4956a"/><rect x="0" y="9" width="2" height="2" fill="#c4956a"/><rect x="10" y="8" width="2" height="1" fill="#c4956a"/><rect x="10" y="9" width="2" height="2" fill="#c4956a"/><rect x="2" y="12" width="8" height="1" fill="#1a1a1a"/><rect x="2" y="13" width="3" height="2" fill="#1a1a1a"/><rect x="7" y="13" width="3" height="2" fill="#1a1a1a"/><rect x="1" y="15" width="4" height="1" fill="#374151"/><rect x="7" y="15" width="4" height="1" fill="#374151"/></svg></div>);

  if (gameState === 'start') return (<div style={{ width: '100%', height: '100dvh', minHeight: 500, overflow: 'hidden', background: 'linear-gradient(180deg, #0a0a0a 0%, #151515 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', color: '#fff', position: 'relative' }}><div style={{ fontSize: 11, color: '#555', letterSpacing: 3, marginBottom: 25 }}>FORTUNE5BILLION PRESENTS</div><div style={{ position: 'relative', width: 70, height: 55, marginBottom: 25, filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8)) drop-shadow(0 0 15px rgba(200,200,255,0.6))' }}><div style={{ position: 'absolute', left: 0, width: 30, height: 45, background: 'linear-gradient(135deg, #4a4a4a 0%, #1a1a1a 30%, #000 50%, #3a3a3a 70%, #1a1a1a 100%)', borderRadius: '50% 0 0 50%', border: '2px solid #666', transform: 'rotate(-15deg)' }} /><div style={{ position: 'absolute', right: 0, width: 30, height: 45, background: 'linear-gradient(225deg, #4a4a4a 0%, #1a1a1a 30%, #000 50%, #3a3a3a 70%, #1a1a1a 100%)', borderRadius: '0 50% 50% 0', border: '2px solid #666', transform: 'rotate(15deg)' }} /><div style={{ position: 'absolute', left: 17, top: 18, width: 36, height: 10, background: '#f5f5f0', borderRadius: 2, boxShadow: '0 0 6px rgba(255,255,255,0.5)' }} /><div style={{ position: 'absolute', left: 8, top: 8, width: 10, height: 10, background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 50%, transparent 100%)', borderRadius: '50%' }} /><div style={{ position: 'absolute', right: 12, top: 28, width: 5, height: 5, background: 'rgba(255,255,255,0.6)', borderRadius: '50%' }} /></div><h1 style={{ fontSize: 42, fontWeight: 'bold', letterSpacing: 8, margin: 0, textShadow: '0 0 25px rgba(255,255,255,0.2)' }}>N.I.R.A.</h1><div style={{ fontSize: 13, color: '#666', letterSpacing: 2, marginTop: 8, marginBottom: 35 }}>{glitchText}</div><div onClick={initGame} onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); initGame(); }} style={{ padding: '14px 45px', fontSize: 13, border: '2px solid #fff', letterSpacing: 4, cursor: 'pointer' }}>TAP TO START</div><div style={{ fontSize: 9, color: '#888', marginTop: 30, textAlign: 'center', lineHeight: 1.8 }}>COLLECT FORTUNES • DODGE EXECUTIVES & CONTRACTS<br/>LOSE ALL COOKIES = GAME OVER</div><div style={{ position: 'absolute', bottom: 20, textAlign: 'center' }}><a href="/" onClick={(e) => e.stopPropagation()} style={{ fontSize: 9, color: '#666', textDecoration: 'none', letterSpacing: 2, display: 'inline-block', padding: '6px 20px', cursor: 'pointer' }}>VISIT FORTUNE5BILLION.COM</a><div style={{ fontSize: 8, color: '#333', marginTop: 4, letterSpacing: 1 }}>© 2026 FORTUNE5BILLION INC. All Rights Reserved.</div></div></div>);
  if (gameState === 'dead') return (<div style={{ width: '100%', height: '100dvh', minHeight: 500, overflow: 'hidden', background: 'linear-gradient(180deg, #0a0a0a 0%, #100000 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', color: '#fff', position: 'relative' }}><div style={{ fontSize: 11, color: '#600', letterSpacing: 3, marginBottom: 20 }}>BYE BYE MASTERS</div><h1 style={{ fontSize: 28, letterSpacing: 4, margin: 0, marginBottom: 15, color: '#ff4444' }}>THEY GOT YOU</h1><div style={{ fontSize: 12, color: '#666', marginBottom: 30 }}>THE INDUSTRY WINS THIS ROUND</div><div onClick={initGame} onTouchEnd={(e) => { e.preventDefault(); initGame(); }} style={{ padding: '14px 35px', fontSize: 13, border: '2px solid #fff', letterSpacing: 3, cursor: 'pointer', marginBottom: 15 }}>TAP TO TRY AGAIN</div><a href="https://ko-fi.com/fortune5billion" target="_blank" rel="noopener noreferrer" style={{ padding: '12px 25px', fontSize: 11, fontFamily: 'monospace', background: 'transparent', border: '1px solid #ff6b6b', color: '#ff6b6b', textDecoration: 'none', letterSpacing: 2, cursor: 'pointer', display: 'inline-block', boxShadow: '0 0 10px rgba(255,107,107,0.4), 0 0 20px rgba(255,107,107,0.2)', textShadow: '0 0 8px rgba(255,107,107,0.5)' }}>SUPPORT THE PRODUCER</a><div style={{ position: 'absolute', bottom: 20, textAlign: 'center' }}><a href="/" style={{ fontSize: 9, color: '#666', textDecoration: 'none', letterSpacing: 2, display: 'inline-block', padding: '6px 20px', cursor: 'pointer' }}>VISIT FORTUNE5BILLION.COM</a><div style={{ fontSize: 8, color: '#333', marginTop: 4, letterSpacing: 1 }}>© 2026 FORTUNE5BILLION INC. All Rights Reserved.</div></div></div>);
  if (gameState === 'end') return (<div style={{ width: '100%', height: '100dvh', minHeight: 500, overflow: 'hidden', background: 'linear-gradient(180deg, #0a0a0a 0%, #151515 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', color: '#fff', position: 'relative' }}><div style={{ fontSize: 14, color: '#888', marginBottom: 30 }}>YOU KEPT YOUR FORTUNE</div><h1 style={{ fontSize: 32, letterSpacing: 6, margin: 0, marginBottom: 15 }}>N.I.R.A. VOL 1</h1><div style={{ fontSize: 12, color: '#555', textAlign: 'center', lineHeight: 1.8, marginBottom: 35 }}>AN AUDITORY EXPERIENCE DESIGNED BY<br /><span style={{ color: '#fff', letterSpacing: 2 }}>FORTUNE5BILLION</span></div><a href="#" target="_blank" rel="noopener noreferrer" style={{ padding: '14px 35px', fontSize: 13, fontFamily: 'monospace', background: '#fff', color: '#000', textDecoration: 'none', letterSpacing: 3, marginBottom: 12, display: 'inline-block' }}>PRE SAVE VOL 1 NOW</a><button onClick={initGame} onTouchEnd={(e) => { e.preventDefault(); initGame(); }} style={{ padding: '10px 25px', fontSize: 11, fontFamily: 'monospace', background: 'transparent', border: '1px solid #444', color: '#444', cursor: 'pointer', letterSpacing: 2 }}>PLAY AGAIN</button><div style={{ position: 'absolute', bottom: 20, textAlign: 'center' }}><a href="/" style={{ fontSize: 9, color: '#666', textDecoration: 'none', letterSpacing: 2, display: 'inline-block', padding: '6px 20px', cursor: 'pointer' }}>VISIT FORTUNE5BILLION.COM</a><div style={{ fontSize: 8, color: '#333', marginTop: 4, letterSpacing: 1 }}>© 2026 FORTUNE5BILLION INC. All Rights Reserved.</div></div></div>);

  return (
    <div onClick={() => { if (frozen) return; const g = gameRef.current; if (g.playerY >= GROUND - 5 && !g.isJumping) { g.isJumping = true; g.velocity = -780; playSound(audioCtxRef.current, 'jump'); } }} style={{ width: '100%', height: '100dvh', minHeight: 500, overflow: 'hidden', background: hitFlash ? '#200000' : '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', userSelect: 'none', cursor: 'pointer', transition: 'background 0.1s', position: 'relative', paddingBottom: 60 }}>
      {glitchBurst && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, pointerEvents: 'none', animation: 'glitchBurst 1.5s ease-out forwards', background: 'transparent' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)', animation: 'scanlineIntense 0.1s linear infinite' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.1)', animation: 'flicker 0.05s linear infinite' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', letterSpacing: 6, textShadow: '0 0 30px #fff, 0 0 60px #fff', animation: 'glitchText 0.1s linear infinite' }}>FORTUNE SECURED</span>
          </div>
          <style>{`
            @keyframes glitchBurst { 0% { opacity: 1; } 90% { opacity: 1; } 100% { opacity: 0; } }
            @keyframes scanlineIntense { 0% { transform: translateY(0); } 100% { transform: translateY(4px); } }
            @keyframes flicker { 0% { opacity: 0.1; } 50% { opacity: 0.2; } 100% { opacity: 0.05; } }
            @keyframes glitchText { 0% { transform: skewX(0deg); } 25% { transform: skewX(2deg); } 50% { transform: skewX(-2deg); } 75% { transform: skewX(1deg); } 100% { transform: skewX(0deg); } }
          `}</style>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '90%', maxWidth: 600, padding: '10px 0', color: '#fff', fontSize: 14 }}><div style={{ fontSize: 9, color: '#555', letterSpacing: 1 }}>TAP SCREEN/SPACEBAR TO JUMP</div><div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#1a1a1a', padding: '6px 14px', border: '1px solid #333' }}><div style={{ width: 14, height: 14, background: '#222', border: '2px solid #555', borderRadius: 2, transform: 'rotate(45deg)' }} /><span style={{ color: g.collected >= GOAL ? '#4f4' : '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 2 }}>{g.collected} / {GOAL}</span></div></div>
      {showMessage && <div style={{ position: 'absolute', top: '35%', color: messageColor, fontSize: 16, letterSpacing: 3, textShadow: `0 0 20px ${messageColor === '#ff4444' ? 'rgba(255,0,0,0.5)' : 'rgba(255,255,255,0.5)'}`, zIndex: 100, textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{showMessage}</div>}
      <div style={{ width: '90%', maxWidth: 600, height: 350, background: 'linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 100%)', position: 'relative', overflow: 'hidden', border: '2px solid #2a2a2a' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, background: 'linear-gradient(180deg, #222 0%, #111 100%)', borderTop: '2px solid #333' }} />
        {g.pits.filter(p => p.x - g.distance > -150 && p.x - g.distance < 700).map(p => <DebtPit key={'pit'+p.id} screenX={p.x - g.distance} />)}
        {g.cookies.filter(c => c.active && c.x - g.distance > -100 && c.x - g.distance < 700).map(c => <FortuneCookie key={c.id} screenX={c.x - g.distance} y={c.y} />)}
        {g.goldenCookies.filter(c => c.active && c.x - g.distance > -100 && c.x - g.distance < 700).map(c => <GoldenCookie key={'g'+c.id} screenX={c.x - g.distance} y={c.y} />)}
        {g.contracts.filter(c => c.active && c.x - g.distance > -100 && c.x - g.distance < 700).map(c => <Contract key={c.id} screenX={c.x - g.distance} y={c.y} />)}
        {g.executives.map(ex => <Executive key={ex.id} screenX={ex.x - g.distance} />)}
        <Player flash={hitFlash} invincible={g.invincible} y={g.playerY} />
      </div>
      <div style={{ color: '#333', fontSize: 10, marginTop: 12, letterSpacing: 2 }}>{glitchText}</div>
      <div style={{ position: 'absolute', bottom: 20, textAlign: 'center' }} onClick={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()} onTouchEnd={(e) => e.stopPropagation()}><a href="/" onClick={(e) => e.stopPropagation()} style={{ fontSize: 9, color: '#666', textDecoration: 'none', letterSpacing: 2, display: 'inline-block', padding: '6px 20px', cursor: 'pointer' }}>VISIT FORTUNE5BILLION.COM</a><div style={{ fontSize: 8, color: '#333', marginTop: 4, letterSpacing: 1 }}>© 2026 FORTUNE5BILLION INC. All Rights Reserved.</div></div>
    </div>
  );
}

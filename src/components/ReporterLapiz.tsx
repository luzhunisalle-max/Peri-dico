import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speakText, stopSpeaking } from '../utils/speech';

interface ReporterLapizProps {
  message: string;
  mood?: 'happy' | 'explaining' | 'thinking' | 'cheering';
  autoSpeak?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showBubble?: boolean;
}

export const ReporterLapiz: React.FC<ReporterLapizProps> = ({
  message,
  mood = 'explaining',
  autoSpeak = false,
  className = '',
  size = 'md',
  showBubble = true,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (autoSpeak && message) {
      const started = speakText(
        message,
        () => setIsSpeaking(false),
        () => setIsSpeaking(true)
      );
      if (!started) setIsSpeaking(false);
    }
    return () => {
      stopSpeaking();
      setIsSpeaking(false);
    };
  }, [message, autoSpeak]);

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      const started = speakText(
        message,
        () => setIsSpeaking(false),
        () => setIsSpeaking(true)
      );
      if (started) setIsSpeaking(true);
    }
  };

  const getEyeExpression = () => {
    switch (mood) {
      case 'cheering':
        return (
          <>
            {/* Happy curved eyes */}
            <path d="M38 48 Q44 42 50 48" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M58 48 Q64 42 70 48" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M46 58 Q54 68 62 58" stroke="#dc2626" strokeWidth="3.5" fill="#f87171" strokeLinecap="round" />
            {/* Star sparkles */}
            <circle cx="34" cy="38" r="2.5" fill="#facc15" className="animate-ping" />
            <circle cx="74" cy="38" r="2.5" fill="#facc15" className="animate-ping" />
          </>
        );
      case 'thinking':
        return (
          <>
            {/* Looking sideways / thinking */}
            <circle cx="44" cy="48" r="6" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <circle cx="64" cy="48" r="6" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <circle cx="46" cy="46" r="3" fill="#1e293b" />
            <circle cx="66" cy="46" r="3" fill="#1e293b" />
            <ellipse cx="54" cy="60" rx="4" ry="2" fill="#1e293b" />
            {/* Eyebrows raised */}
            <path d="M38 40 Q44 38 48 41" stroke="#1e293b" strokeWidth="2.5" fill="none" />
            <path d="M60 41 Q64 36 70 38" stroke="#1e293b" strokeWidth="2.5" fill="none" />
          </>
        );
      case 'explaining':
      default:
        return (
          <>
            {/* Big curious eyes */}
            <circle cx="44" cy="48" r="6.5" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <circle cx="64" cy="48" r="6.5" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <circle cx="45" cy="48" r="3.2" fill="#1e293b" />
            <circle cx="65" cy="48" r="3.2" fill="#1e293b" />
            <circle cx="46.5" cy="46.5" r="1.2" fill="#ffffff" />
            <circle cx="66.5" cy="46.5" r="1.2" fill="#ffffff" />
            <path d="M46 59 Q54 66 62 59" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        );
    }
  };

  const scaleMap = {
    sm: 'w-16 h-20',
    md: 'w-24 h-28',
    lg: 'w-32 h-36',
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-3.5 ${className}`}>
      {/* Animated SVG Character */}
      <div className={`relative flex-shrink-0 ${scaleMap[size]} group`}>
        <svg
          viewBox="0 0 108 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full filter drop-shadow-md transition-transform duration-300 ${
            isSpeaking ? 'animate-bounce' : 'hover:scale-105'
          }`}
        >
          {/* Reporter Vintage Press Fedora / Cap */}
          <path
            d="M20 30 C30 20 78 20 88 30 C94 33 85 36 78 36 L30 36 C23 36 14 33 20 30 Z"
            fill="#1e3a8a"
          />
          <path
            d="M32 30 C32 16 76 16 76 30 Z"
            fill="#2563eb"
          />
          {/* "PRENSA" press card card clipped on hat */}
          <rect x="68" y="16" width="22" height="15" rx="2" fill="#ffffff" stroke="#1e293b" strokeWidth="1.2" transform="rotate(12 68 16)" />
          <text x="70" y="27" fontSize="5.5" fontWeight="bold" fill="#dc2626" transform="rotate(12 68 16)">
            PRENSA
          </text>

          {/* Pencil Eraser (Top) */}
          <rect x="36" y="36" width="36" height="10" rx="3" fill="#f43f5e" />
          {/* Metal Band (Ferrule) */}
          <rect x="35" y="44" width="38" height="6" fill="#94a3b8" stroke="#475569" strokeWidth="0.8" />
          <line x1="36" y1="47" x2="72" y2="47" stroke="#cbd5e1" strokeWidth="1" />

          {/* Pencil Body (Yellow-Orange Hexagon) */}
          <path
            d="M36 50 L72 50 L72 96 L36 96 Z"
            fill="#f59e0b"
          />
          {/* Pencil facet lines */}
          <rect x="48" y="50" width="12" height="46" fill="#fbbf24" />
          <line x1="48" y1="50" x2="48" y2="96" stroke="#d97706" strokeWidth="1" />
          <line x1="60" y1="50" x2="60" y2="96" stroke="#d97706" strokeWidth="1" />

          {/* Pencil Sharpened Wood Cone */}
          <polygon points="36,96 72,96 54,120" fill="#fed7aa" />
          {/* Graphite Lead Tip */}
          <polygon points="48,112 60,112 54,120" fill="#334155" />

          {/* Character Eyes & Expression */}
          {getEyeExpression()}

          {/* Cheeks */}
          <ellipse cx="37" cy="54" rx="3.5" ry="2" fill="#fca5a5" opacity="0.6" />
          <ellipse cx="71" cy="54" rx="3.5" ry="2" fill="#fca5a5" opacity="0.6" />

          {/* Little reporter hand holding a tiny notebook */}
          <g transform="translate(18, 64)">
            <rect x="0" y="0" width="16" height="20" rx="2" fill="#f8fafc" stroke="#334155" strokeWidth="1.2" />
            <line x1="3" y1="5" x2="13" y2="5" stroke="#94a3b8" strokeWidth="1" />
            <line x1="3" y1="9" x2="13" y2="9" stroke="#94a3b8" strokeWidth="1" />
            <line x1="3" y1="13" x2="10" y2="13" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="15" cy="10" r="3" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          </g>

          {/* Tiny reporter badge on body */}
          <circle cx="64" cy="74" r="5" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="0.8" />
          <path d="M62 74 L64 76 L67 72" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </svg>

        {/* Floating audio speaker button overlay */}
        <button
          onClick={handleToggleSpeak}
          title={isSpeaking ? 'Pausar audio de Reportero Lápiz' : 'Escuchar a Reportero Lápiz leer en voz alta'}
          className={`absolute -bottom-1 -right-1 p-1.5 rounded-full shadow-md text-white transition-all transform hover:scale-110 active:scale-95 ${
            isSpeaking ? 'bg-rose-500 animate-pulse' : 'bg-amber-600 hover:bg-amber-700'
          }`}
          aria-label="Escuchar voz de Reportero Lápiz"
        >
          {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Comic Speech Bubble */}
      {showBubble && (
        <div className="relative bg-white border-2 border-amber-300 rounded-2xl p-3.5 sm:p-4 shadow-sm text-slate-800 flex-1 max-w-xl">
          {/* Arrow pointing to character */}
          <div className="hidden sm:block absolute -left-2.5 top-6 w-3 h-3 bg-white border-l-2 border-b-2 border-amber-300 transform rotate-45" />

          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  Reportero Lápiz dice:
                </span>
                {isSpeaking && (
                  <span className="text-xs text-rose-600 font-semibold flex items-center gap-1 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    Leyendo en voz alta...
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed">
                {message}
              </p>
            </div>

            <button
              onClick={handleToggleSpeak}
              className={`flex-shrink-0 flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border font-semibold transition ${
                isSpeaking
                  ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
                  : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
              }`}
              title="Escuchar audio"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Silenciar</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Escuchar</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

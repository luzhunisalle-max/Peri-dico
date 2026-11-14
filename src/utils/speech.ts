/**
 * Speech synthesis utility for Reportero Lápiz to support reading fluency in 4th grade
 */

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}

export function speakText(
  text: string,
  onEnd?: () => void,
  onStart?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    stopSpeaking();

    const cleanText = text
      .replace(/[#*_`]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .trim();

    if (!cleanText) return false;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95; // Slightly slower for better elementary comprehension
    utterance.pitch = 1.05; // Friendly and engaging tone

    // Try finding a good Spanish voice
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice =
      voices.find(v => v.lang.startsWith('es-CO')) ||
      voices.find(v => v.lang.startsWith('es-419')) ||
      voices.find(v => v.lang.startsWith('es-MX')) ||
      voices.find(v => v.lang.startsWith('es-ES')) ||
      voices.find(v => v.lang.includes('es'));

    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      currentUtterance = null;
      if (onEnd) onEnd();
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('Speech synthesis error:', err);
    return false;
  }
}

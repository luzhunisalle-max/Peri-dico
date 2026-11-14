import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ReporterLapiz } from './ReporterLapiz';
import { DecisionNodeData, DecisionOption } from '../types/ova';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, HelpCircle, Sparkles, Lightbulb } from 'lucide-react';

interface DecisionNodeProps {
  data: DecisionNodeData;
  onSuccess: (selectedOption: DecisionOption) => void;
  onPreviousStep?: () => void;
}

export const DecisionNode: React.FC<DecisionNodeProps> = ({
  data,
  onSuccess,
}) => {
  const [selectedOption, setSelectedOption] = useState<DecisionOption | null>(null);
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleChoose = (opt: DecisionOption) => {
    setSelectedOption(opt);
    setHasEvaluated(true);
    setAttempts((prev) => prev + 1);

    if (opt.isCorrect) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // ignore
      }
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setHasEvaluated(false);
    setShowHint(true);
  };

  const mascotMood = !hasEvaluated
    ? 'thinking'
    : selectedOption?.isCorrect
    ? 'cheering'
    : 'explaining';

  const mascotSpeech = !hasEvaluated
    ? `Nodo de decisión número ${data.nodeNumber}: ${data.question}. Piensa como un reportero profesional antes de elegir.`
    : selectedOption?.isCorrect
    ? `¡Excelente decisión de reportero! ${selectedOption.feedback}`
    : `Ojo reportero: ${selectedOption?.feedback}. Revisa la pista y vuelve a intentarlo.`;

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4 sm:py-8">
      {/* Node Header Badge */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Nodo de Decisión {data.nodeNumber} de 3 • El corazón del OVA
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-headline text-slate-900">
          {data.title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-medium">
          {data.question}
        </p>
      </div>

      {/* Mascot Guidance */}
      <div className="bg-amber-100/70 p-4 sm:p-5 rounded-2xl border border-amber-300/80">
        <ReporterLapiz
          message={mascotSpeech}
          mood={mascotMood}
          size="md"
        />
      </div>

      {/* Decision Options Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-md space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 font-headline">
            Elige la mejor opción para tu noticia:
          </h3>
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 transition font-semibold"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>{showHint ? 'Ocultar pista' : 'Ver pista del Reportero'}</span>
          </button>
        </div>

        {/* Emergent Hint (DigCompEdu A3.2) */}
        {showHint && (
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 text-xs sm:text-sm text-amber-900 flex items-start gap-3 animate-fadeIn">
            <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">Pista de Reportero Lápiz:</strong>
              <p>{data.hint}</p>
            </div>
          </div>
        )}

        {/* Options list */}
        <div className="space-y-3">
          {data.options.map((option, index) => {
            const letter = String.fromCharCode(97 + index); // a, b, c
            const isSelected = selectedOption?.id === option.id;

            let buttonStyle = 'border-slate-200 bg-slate-50/60 hover:bg-amber-50/50 hover:border-amber-300 text-slate-800';

            if (hasEvaluated && isSelected) {
              if (option.isCorrect) {
                buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300';
              } else {
                buttonStyle = 'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-200';
              }
            }

            return (
              <button
                key={option.id}
                disabled={hasEvaluated && selectedOption?.isCorrect}
                onClick={() => handleChoose(option)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition flex items-center justify-between gap-4 group ${buttonStyle} ${
                  hasEvaluated && !isSelected ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-sm uppercase transition flex-shrink-0 ${
                      isSelected
                        ? option.isCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                        : 'bg-amber-200 text-amber-900 group-hover:bg-amber-300'
                    }`}
                  >
                    {letter})
                  </span>
                  <span className="text-sm sm:text-base font-semibold">
                    {option.label}
                  </span>
                </div>

                {hasEvaluated && isSelected && (
                  <div className="flex-shrink-0">
                    {option.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-500" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanatory Feedback Box (DigCompEdu A3.1 & A3.2) */}
        {hasEvaluated && selectedOption && (
          <div
            className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
              selectedOption.isCorrect
                ? 'bg-emerald-50/90 border-emerald-300 text-emerald-900'
                : 'bg-rose-50/90 border-rose-300 text-rose-900'
            }`}
          >
            <div className="flex items-start gap-3">
              {selectedOption.isCorrect ? (
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              ) : (
                <div className="p-2 rounded-xl bg-rose-100 text-rose-700 flex-shrink-0">
                  <XCircle className="w-6 h-6" />
                </div>
              )}
              <div className="space-y-1.5 flex-1">
                <h4 className="font-bold text-base sm:text-lg">
                  {selectedOption.isCorrect
                    ? '¡Decisión Correcta!'
                    : '¡Reflexionemos un momento!'}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed font-medium">
                  {selectedOption.feedback}
                </p>

                {/* Additional pedagogical reason */}
                {selectedOption.isCorrect && (
                  <p className="text-xs text-emerald-800 pt-1 font-semibold">
                    💡 {data.explanationText}
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons based on outcome */}
            <div className="mt-4 pt-3 border-t border-current/20 flex justify-end gap-3">
              {!selectedOption.isCorrect ? (
                <button
                  onClick={handleRetry}
                  className="px-5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Volver a intentar (con pista)</span>
                </button>
              ) : (
                <button
                  onClick={() => onSuccess(selectedOption)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
                >
                  <span>¡Avanzar al siguiente paso!</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Progress reminder */}
      <div className="text-center text-xs text-slate-500">
        Intentos realizados en este nodo: <span className="font-bold text-slate-700">{attempts}</span>. Lo importante no es acertar a la primera, sino comprender por qué una decisión hace mejor a la noticia.
      </div>
    </div>
  );
};

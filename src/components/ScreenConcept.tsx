import React, { useState } from 'react';
import { ReporterLapiz } from './ReporterLapiz';
import { Newspaper, Check, X, ArrowRight, Lightbulb, Sparkles, AlertCircle } from 'lucide-react';

interface ScreenConceptProps {
  onContinue: () => void;
}

interface ExampleCard {
  id: number;
  text: string;
  isNews: boolean;
  explanation: string;
}

const EXAMPLES: ExampleCard[] = [
  {
    id: 1,
    text: '🌱 El nuevo huerto escolar cosechó sus primeros tomates y zanahorias con ayuda de 4.° grado.',
    isNews: true,
    explanation: '¡Es noticia! Ocurre en el colegio, es real y le interesa a toda la comunidad educativa.',
  },
  {
    id: 2,
    text: '🎮 Mi fin de semana: me quedé jugando videojuegos en mi casa y dormí hasta tarde.',
    isNews: false,
    explanation: 'No es noticia escolar. Es una experiencia de tu vida personal y privada, no un suceso escolar.',
  },
  {
    id: 3,
    text: '🔬 La Feria de la Ciencia escolar premió un robot reciclador construido por estudiantes.',
    isNews: true,
    explanation: '¡Es noticia! Es un evento escolar novedoso, de interés general y con impacto en el colegio.',
  },
  {
    id: 4,
    text: '🐱 Mi gato ronroneó cuando le di su comida favorita en el desayuno.',
    isNews: false,
    explanation: 'No es noticia escolar. Aunque es un lindo momento familiar, no le compete a la escuela.',
  },
];

export const ScreenConcept: React.FC<ScreenConceptProps> = ({ onContinue }) => {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});

  const speechMessage =
    '¡Atención, reporteros! Antes de escribir, debemos saber qué es una noticia. Una noticia es un texto informativo que cuenta un hecho REAL, reciente y de INTERÉS para toda la escuela. No es un secreto ni lo que comiste en casa. ¡Prueba clasificar estos cuatro casos!';

  const handleSelect = (cardId: number, userThinksIsNews: boolean) => {
    setAnswers((prev) => ({ ...prev, [cardId]: userThinksIsNews }));
    setShowFeedback((prev) => ({ ...prev, [cardId]: true }));
  };

  const answeredCount = Object.keys(answers).length;
  const allCorrect = EXAMPLES.every((ex) => answers[ex.id] === ex.isNews);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 sm:py-8">
      {/* Title Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
          Pantalla 1 • Concepto Clave
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-headline text-slate-900">
          ¿Qué es realmente una Noticia?
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Un buen periodista escolar sabe distinguir entre una anécdota personal y un hecho noticioso.
        </p>
      </div>

      {/* Mascot Explaining */}
      <div className="bg-amber-100/70 p-5 rounded-2xl border border-amber-300/80">
        <ReporterLapiz message={speechMessage} mood="explaining" size="md" />
      </div>

      {/* Concept Definition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-xs flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl mb-3">
            1
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Es un Hecho REAL</h3>
          <p className="text-xs sm:text-sm text-slate-600">
            No es un cuento inventado ni una fantasía. Pasó de verdad y se puede comprobar con testigos o fotos.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-xs flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl mb-3">
            2
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Es RECIENTE</h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Ocurrió hace poco: hoy, ayer o esta misma semana. La gente quiere enterarse de lo que acaba de suceder.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-xs flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl mb-3">
            3
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">De Interés COLECTIVO</h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Le importa a la escuela: a tus compañeros, profesores y familias. No solo a una persona en privado.
          </p>
        </div>
      </div>

      {/* Mini-Challenge: Is it news or not? */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg sm:text-xl font-bold font-headline text-slate-900">
              Mini-Reto: ¿Noticia escolar o Vida personal?
            </h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            Completados: {answeredCount} de {EXAMPLES.length}
          </span>
        </div>

        <p className="text-sm text-slate-600">
          Haz clic en <strong>&ldquo;Es Noticia&rdquo;</strong> o <strong>&ldquo;Vida Personal&rdquo;</strong> para cada tarjeta:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXAMPLES.map((item) => {
            const hasAnswered = answers[item.id] !== undefined;
            const isAnswerCorrect = answers[item.id] === item.isNews;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                  !hasAnswered
                    ? 'border-slate-200 bg-slate-50/50'
                    : isAnswerCorrect
                    ? 'border-emerald-300 bg-emerald-50/40'
                    : 'border-rose-300 bg-rose-50/40'
                }`}
              >
                <p className="text-sm font-medium text-slate-800 mb-3">{item.text}</p>

                {/* Choices buttons */}
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => handleSelect(item.id, true)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      answers[item.id] === true
                        ? item.isNews
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-rose-600 text-white'
                        : 'bg-white border border-slate-300 hover:border-emerald-400 text-slate-700'
                    }`}
                  >
                    <Newspaper className="w-3.5 h-3.5" />
                    <span>¡Es Noticia!</span>
                  </button>

                  <button
                    onClick={() => handleSelect(item.id, false)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      answers[item.id] === false
                        ? !item.isNews
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-rose-600 text-white'
                        : 'bg-white border border-slate-300 hover:border-slate-400 text-slate-700'
                    }`}
                  >
                    <span>Vida Personal</span>
                  </button>
                </div>

                {/* Feedback explanation */}
                {showFeedback[item.id] && (
                  <div
                    className={`mt-2 p-2.5 rounded-xl text-xs flex items-start gap-2 ${
                      isAnswerCorrect
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-rose-100 text-rose-900'
                    }`}
                  >
                    {isAnswerCorrect ? (
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span>{item.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>¿Listo para tomar tu primera gran decisión como reportero?</span>
          </div>

          <button
            onClick={onContinue}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <span>Ir al Nodo 1: Elegir mi noticia</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

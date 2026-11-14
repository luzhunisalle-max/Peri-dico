import React, { useState } from 'react';
import { ReporterLapiz } from './ReporterLapiz';
import { ArrowRight, Layers, HelpCircle, Check, Sparkles } from 'lucide-react';

interface ScreenPyramidProps {
  onContinue: () => void;
}

export const ScreenPyramid: React.FC<ScreenPyramidProps> = ({ onContinue }) => {
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(1);

  const mascotSpeech =
    '¡Mira esta pirámide al revés! Los periodistas no escribimos como en los cuentos donde el misterio se resuelve al final. En la noticia, ¡la parte más gorda y jugosa va al puro principio! Haz clic en cada escalón para entender la pirámide invertida.';

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 sm:py-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
          Pantalla 3 • Jerarquía de la Información
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-headline text-slate-900">
          La Pirámide Invertida
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          ¿Por qué lo más importante va al principio y no al final?
        </p>
      </div>

      {/* Mascot Guidance */}
      <div className="bg-amber-100/70 p-5 rounded-2xl border border-amber-300/80">
        <ReporterLapiz message={mascotSpeech} mood="explaining" size="md" />
      </div>

      {/* Interactive Visual Inverted Pyramid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Pyramid Graphic (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border-2 border-amber-200 shadow-md flex flex-col items-center">
          <div className="w-full max-w-md space-y-3">
            {/* Level 1: Wide top */}
            <div
              onClick={() => setSelectedLevel(1)}
              className={`w-full p-4 rounded-2xl cursor-pointer transition-all transform hover:scale-[1.02] border-2 shadow-sm ${
                selectedLevel === 1
                  ? 'bg-amber-500 border-amber-600 text-white ring-4 ring-amber-200'
                  : 'bg-amber-100 border-amber-300 text-amber-950 hover:bg-amber-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-1">
                <span>Nivel 1: Lo Más Importante (Entrada)</span>
                <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded">¡Va de Primero!</span>
              </div>
              <div className="font-bold text-sm sm:text-base">
                ¿Qué pasó? ¿Quién? ¿Cuándo? ¿Dónde?
              </div>
              <p className={`text-xs mt-1 ${selectedLevel === 1 ? 'text-amber-100' : 'text-amber-800'}`}>
                El corazón de la noticia. Si el lector se va rápido, ya sabe todo lo esencial.
              </p>
            </div>

            {/* Level 2: Medium middle */}
            <div
              onClick={() => setSelectedLevel(2)}
              className={`w-[85%] mx-auto p-3.5 rounded-2xl cursor-pointer transition-all transform hover:scale-[1.02] border-2 shadow-sm ${
                selectedLevel === 2
                  ? 'bg-indigo-600 border-indigo-700 text-white ring-4 ring-indigo-200'
                  : 'bg-indigo-100 border-indigo-300 text-indigo-950 hover:bg-indigo-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-1">
                <span>Nivel 2: El Cuerpo</span>
                <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded">Medio</span>
              </div>
              <div className="font-bold text-sm">
                ¿Cómo y Por qué sucedió? Testimonios y citas.
              </div>
              <p className={`text-xs mt-1 ${selectedLevel === 2 ? 'text-indigo-100' : 'text-indigo-800'}`}>
                Explicación de las causas, entrevistas breves y datos explicativos.
              </p>
            </div>

            {/* Level 3: Narrow bottom */}
            <div
              onClick={() => setSelectedLevel(3)}
              className={`w-[60%] mx-auto p-3 rounded-2xl cursor-pointer transition-all transform hover:scale-[1.02] border-2 shadow-sm text-center ${
                selectedLevel === 3
                  ? 'bg-slate-700 border-slate-800 text-white ring-4 ring-slate-300'
                  : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider mb-0.5">
                Nivel 3: Datos Menores
              </div>
              <div className="font-semibold text-xs">
                Antecedentes y qué pasará después
              </div>
              <p className={`text-[10px] mt-0.5 ${selectedLevel === 3 ? 'text-slate-200' : 'text-slate-600'}`}>
                Lo que menos importa va al final.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
            <Layers className="w-4 h-4 text-amber-600" />
            <span>Haz clic en cada nivel de la pirámide para ver su función periodística.</span>
          </div>
        </div>

        {/* Level Details (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold font-headline text-slate-900">
              Regla de Oro del Periodista:
            </h3>
          </div>

          {selectedLevel === 1 && (
            <div className="space-y-3 animate-fadeIn">
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full uppercase">
                Parte Superior (La más ancha)
              </span>
              <h4 className="text-base font-bold text-slate-900">
                ¡Nunca empieces saludando ni con rodeos!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Una noticia no es una carta de amor ni un mensaje de WhatsApp a un amigo. No decimos <em>&ldquo;Hola a todos, hoy les voy a contar algo bonito...&rdquo;</em>.
              </p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                <strong>Empezamos directo al grano:</strong>
                <p className="mt-1 italic">&ldquo;El pasado martes, el equipo de robótica de 4.° grado ganó la copa escolar de innovación...&rdquo;</p>
              </div>
            </div>
          )}

          {selectedLevel === 2 && (
            <div className="space-y-3 animate-fadeIn">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-full uppercase">
                Zona Media
              </span>
              <h4 className="text-base font-bold text-slate-900">
                ¿Cómo se logró y qué dicen los involucrados?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Aquí agregas testimonios entre comillas. Por ejemplo: <em>&ldquo;Fue difícil ensamblar las piezas, pero nos divertimos mucho&rdquo;, afirmó Mateo, capitán del equipo.</em>
              </p>
            </div>
          )}

          {selectedLevel === 3 && (
            <div className="space-y-3 animate-fadeIn">
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full uppercase">
                Vértice Inferior
              </span>
              <h4 className="text-base font-bold text-slate-900">
                Información complementaria
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Si un editor en el periódico se queda sin espacio de papel, puede recortar esta parte inferior sin que la noticia pierda su sentido principal.
              </p>
            </div>
          )}

          {/* Button to Node 3 */}
          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={onContinue}
              className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <span>Ir al Nodo 3: ¿Por dónde empiezo a escribir?</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

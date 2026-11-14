import React, { useState } from 'react';
import { ReporterLapiz } from './ReporterLapiz';
import { Newspaper, ArrowRight, Eye, Sparkles, CheckCircle2 } from 'lucide-react';

interface ScreenPartsProps {
  onContinue: () => void;
  chosenThemeTitle?: string;
}

export const ScreenParts: React.FC<ScreenPartsProps> = ({ onContinue, chosenThemeTitle = 'El nuevo huerto escolar' }) => {
  const [activePart, setActivePart] = useState<'headline' | 'lead' | 'body' | 'photo'>('headline');

  const mascotSpeech =
    '¡Fíjate bien, colega reportero! Toda buena noticia en un periódico se divide en partes como un rompecabezas: el Titular, la Entrada, el Cuerpo y la Fotografía. Haz clic en cada zona del periódico para descubrir sus secretos antes de inventar tu propio titular.';

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 sm:py-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
          Pantalla 2 • Estructura de la Noticia
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-headline text-slate-900">
          Las 4 Partes Clave de una Noticia
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Explora la primera plana interactiva de nuestro periódico modelo de 4.° grado:
        </p>
      </div>

      {/* Mascot Explaining */}
      <div className="bg-amber-100/70 p-5 rounded-2xl border border-amber-300/80">
        <ReporterLapiz message={mascotSpeech} mood="explaining" size="md" />
      </div>

      {/* Interactive Newspaper Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Newspaper Mockup (7 cols) */}
        <div className="lg:col-span-7 bg-[#fdfbf7] border-4 border-slate-700 rounded-2xl shadow-xl p-5 sm:p-7 relative overflow-hidden font-serif">
          {/* Newspaper Masthead */}
          <div className="border-b-4 border-double border-slate-800 pb-3 mb-4 text-center">
            <div className="flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest font-sans border-b border-slate-300 pb-1 mb-2">
              <span>Edición Especial Escolar</span>
              <span>• Periódico Digital ABP •</span>
              <span>Grado 4.°</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-headline uppercase tracking-tight">
              EL INFORMADOR ESCOLAR
            </h1>
            <div className="flex justify-between text-[11px] font-sans text-slate-600 border-t border-slate-300 pt-1 mt-1">
              <span>Noticias de nuestra escuela</span>
              <span>Viernes, 24 de Octubre</span>
              <span>¡Edición Gratuita!</span>
            </div>
          </div>

          {/* Interactive Clickable Hotspots */}
          <div className="space-y-4">
            {/* Part 1: Headline */}
            <div
              onClick={() => setActivePart('headline')}
              className={`p-3 rounded-xl border-2 cursor-pointer transition ${
                activePart === 'headline'
                  ? 'border-amber-500 bg-amber-100/80 ring-2 ring-amber-300'
                  : 'border-dashed border-slate-300 hover:border-amber-400 bg-white/60'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-sans font-bold text-amber-800 uppercase mb-1">
                <span className="flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px]">1</span>
                  Titular (Título de la Noticia)
                </span>
                <span className="text-amber-600 underline">Clic para explorar</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 leading-tight">
                El huerto escolar dio sus primeros tomates gigantes gracias al trabajo en equipo
              </h2>
            </div>

            {/* Part 2: Lead / Entrada */}
            <div
              onClick={() => setActivePart('lead')}
              className={`p-3 rounded-xl border-2 cursor-pointer transition ${
                activePart === 'lead'
                  ? 'border-indigo-500 bg-indigo-100/80 ring-2 ring-indigo-300'
                  : 'border-dashed border-slate-300 hover:border-indigo-400 bg-white/60'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-sans font-bold text-indigo-800 uppercase mb-1">
                <span className="flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px]">2</span>
                  Entrada o Copete (El primer párrafo)
                </span>
                <span className="text-indigo-600 underline">Clic para explorar</span>
              </div>
              <p className="text-sm font-semibold text-slate-800 leading-snug font-sans">
                Ayer por la mañana, los estudiantes de cuarto grado recolectaron más de 15 kilos de tomates en el patio escolar, inaugurando la primera cosecha ecológica del año escolar.
              </p>
            </div>

            {/* Row with Photo & Body */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Part 4: Photo & Caption */}
              <div
                onClick={() => setActivePart('photo')}
                className={`p-3 rounded-xl border-2 cursor-pointer transition ${
                  activePart === 'photo'
                    ? 'border-emerald-500 bg-emerald-100/80 ring-2 ring-emerald-300'
                    : 'border-dashed border-slate-300 hover:border-emerald-400 bg-white/60'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-sans font-bold text-emerald-800 uppercase mb-1">
                  <span className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px]">3</span>
                    Fotografía y Pie
                  </span>
                  <span className="text-emerald-600 underline">Clic</span>
                </div>
                {/* Simulated photo with emoji art */}
                <div className="h-28 bg-emerald-200/60 rounded-lg flex items-center justify-center text-4xl border border-emerald-300">
                  🍅🌱👦👧
                </div>
                <p className="text-[11px] italic font-sans text-slate-600 mt-1.5 leading-tight">
                  Foto: Estudiantes cosechando tomates en el huerto escolar.
                </p>
              </div>

              {/* Part 3: Body / Cuerpo */}
              <div
                onClick={() => setActivePart('body')}
                className={`p-3 rounded-xl border-2 cursor-pointer transition ${
                  activePart === 'body'
                    ? 'border-purple-500 bg-purple-100/80 ring-2 ring-purple-300'
                    : 'border-dashed border-slate-300 hover:border-purple-400 bg-white/60'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-sans font-bold text-purple-800 uppercase mb-1">
                  <span className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[9px]">4</span>
                    Cuerpo de la Noticia
                  </span>
                  <span className="text-purple-600 underline">Clic</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans line-clamp-5">
                  El proyecto inició hace dos meses con semillas de hortalizas. La profesora de ciencias explicó que todos los cursos ayudaron a regar las plantas en los descansos...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Explanation Sidebar (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold font-headline text-slate-900">
              Guía de la Parte Seleccionada:
            </h3>
          </div>

          {activePart === 'headline' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="inline-block px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase">
                1. El Titular
              </div>
              <h4 className="text-base font-bold text-slate-900">
                La frase más llamativa que resume lo sucedido
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Debe ser <strong>breve, directo y emocionante</strong>. Su misión es hacer que el lector quiera detenerse a leer la noticia completa.
              </p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <strong>¿Qué responde?</strong>
                <p>Responde a la pregunta clave: <em>¿Qué pasó de importante?</em></p>
              </div>
            </div>
          )}

          {activePart === 'lead' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="inline-block px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase">
                2. La Entrada o Copete
              </div>
              <h4 className="text-base font-bold text-slate-900">
                El primer párrafo: las 4 preguntas de oro
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Es la parte más importante. Si el lector solo tiene un minuto, leyendo la entrada ya sabrá de qué trata toda la noticia.
              </p>
              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 text-xs text-indigo-900 space-y-1">
                <strong>Las 4 preguntas de oro:</strong>
                <ul className="list-disc pl-4 space-y-0.5">
                  <li><strong>¿Qué pasó?</strong> El hecho central.</li>
                  <li><strong>¿Quién o quiénes?</strong> Los protagonistas.</li>
                  <li><strong>¿Cuándo fue?</strong> El día o momento.</li>
                  <li><strong>¿Dónde ocurrió?</strong> El lugar exacto.</li>
                </ul>
              </div>
            </div>
          )}

          {activePart === 'photo' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                3. Fotografía y Pie de foto
              </div>
              <h4 className="text-base font-bold text-slate-900">
                La prueba visual del suceso
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Una imagen real muestra a los protagonistas o el lugar. El <em>pie de foto</em> es la oración breve que explica qué vemos en la imagen.
              </p>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                <strong>Consejo:</strong> El pie de foto no repite el titular, añade un dato sobre quiénes aparecen en la foto.
              </div>
            </div>
          )}

          {activePart === 'body' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="inline-block px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase">
                4. El Cuerpo de la Noticia
              </div>
              <h4 className="text-base font-bold text-slate-900">
                La historia completa y los detalles
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Aquí cuentas el <strong>cómo</strong> y el <strong>por qué</strong> sucedió todo, qué dijeron los testigos o profesores, y qué pasará después.
              </p>
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900">
                <strong>Consejo:</strong> Se organiza en párrafos ordenados de mayor a menor importancia.
              </div>
            </div>
          )}

          {/* Navigation to Node 2 */}
          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={onContinue}
              className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <span>¡Desafío! Ir al Nodo 2: Evaluar Titulares</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ReporterLapiz } from './ReporterLapiz';
import { NewsDraft } from '../types/ova';
import {
  Newspaper,
  Sparkles,
  ArrowRight,
  Eye,
  PenTool,
  CheckCircle2,
  Wand2,
  Image as ImageIcon,
  Save,
  MessageSquare
} from 'lucide-react';

interface ScreenDraftWorkshopProps {
  draft: NewsDraft;
  onUpdateDraft: (updated: Partial<NewsDraft>) => void;
  onCompleteWorkshop: () => void;
}

export const ScreenDraftWorkshop: React.FC<ScreenDraftWorkshopProps> = ({
  draft,
  onUpdateDraft,
  onCompleteWorkshop,
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [guidedStep, setGuidedStep] = useState<1 | 2 | 3 | 4>(1);

  const mascotSpeech =
    '¡Felicidades, reportero! Has desbloqueado la Sala de Redacción. Aquí construiremos el borrador de tu primera noticia escolar. Sigue los 4 pasos guiados: Titular, Entrada con las 4 preguntas de oro, Cuerpo y Fotografía. Al final verás tu portada de periódico completa.';

  // Helper to compose lead paragraph automatically from the 4 questions
  const handleAutoComposeLead = () => {
    const { what, who, when, where } = draft.leadParagraph;
    if (!what && !who) return;

    const composed = `${when ? when + ', ' : 'Esta semana, '}${who || 'los estudiantes de cuarto grado'} ${what || 'realizaron una emocionante actividad escolar'} en ${where || 'el patio del colegio'}, marcando un hito inolvidable para toda nuestra comunidad educativa.`;

    onUpdateDraft({
      leadParagraph: {
        ...draft.leadParagraph,
        composedText: composed,
      },
    });
  };

  const photoOptions: { id: NewsDraft['photoStyle']; label: string; icon: string; defaultCaption: string }[] = [
    { id: 'garden', label: 'Huerto Escolar', icon: '🌱🍅', defaultCaption: 'Estudiantes cosechando tomates y hortalizas en el huerto escolar.' },
    { id: 'science', label: 'Feria de la Ciencia', icon: '🔬🤖', defaultCaption: 'Alumnos exhibiendo su proyecto científico escolar ante el jurado.' },
    { id: 'sports', label: 'Deportes y Juegos', icon: '⚽🏆', defaultCaption: 'El equipo escolar celebrando la victoria en el torneo interclases.' },
    { id: 'art', label: 'Arte y Creatividad', icon: '🎨🎭', defaultCaption: 'Mural colaborativo pintado por los estudiantes en el patio central.' },
    { id: 'books', label: 'Biblioteca y Lectura', icon: '📚📖', defaultCaption: 'Jornada de maratón de lectura compartida en la biblioteca.' },
  ];

  const isFormReady =
    draft.headline.trim().length > 5 &&
    (draft.leadParagraph.composedText.trim().length > 10 ||
      (draft.leadParagraph.what.trim().length > 3 && draft.leadParagraph.who.trim().length > 3));

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4 sm:py-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
          Pantalla 4 • Sala de Redacción Escolar
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-headline text-slate-900">
          Taller de Redacción: Tu Primera Noticia
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Insumo directo para el proyecto ABP: Periódico Digital Escolar
        </p>
      </div>

      {/* Mascot Guidance */}
      <div className="bg-amber-100/70 p-5 rounded-2xl border border-amber-300/80">
        <ReporterLapiz message={mascotSpeech} mood="explaining" size="md" />
      </div>

      {/* Editor & Live Preview Switcher (Desktop & Mobile) */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-2xl p-2 gap-2 shadow-xs">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
            activeTab === 'editor'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>1. Taller de Redacción Guiada</span>
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
            activeTab === 'preview'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>2. Vista de Primera Plana (Periódico)</span>
        </button>
      </div>

      {/* TAB 1: Step-by-Step Guided Editor */}
      {activeTab === 'editor' && (
        <div className="bg-white rounded-b-3xl p-6 sm:p-8 border border-t-0 border-amber-200 shadow-md space-y-6">
          {/* Step tabs inside editor */}
          <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-200">
            {[
              { num: 1, title: 'Titular' },
              { num: 2, title: 'Entrada (4 preguntas)' },
              { num: 3, title: 'Cuerpo' },
              { num: 4, title: 'Foto y Pie' },
            ].map((step) => (
              <button
                key={step.num}
                onClick={() => setGuidedStep(step.num as any)}
                className={`py-2 px-3 sm:px-4 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                  guidedStep === step.num
                    ? 'bg-amber-100 text-amber-900 border-2 border-amber-400'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">
                  {step.num}
                </span>
                <span>{step.title}</span>
              </button>
            ))}
          </div>

          {/* STEP 1: HEADLINE */}
          {guidedStep === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg font-headline">
                    Paso 1: Elige o escribe tu Titular
                  </h3>
                  <p className="text-xs text-slate-500">
                    Debe ser claro, breve y responder a: ¿qué pasó?
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                  {draft.headline.split(' ').filter(Boolean).length} palabras
                </span>
              </div>

              {/* Quick Preset Ideas based on Nodo 1 and 2 */}
              <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2">
                <span className="text-xs font-bold text-amber-800 uppercase block">
                  💡 Ideas sugeridas del periódico:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'El huerto escolar dio sus primeros tomates gigantes',
                    'La feria de la ciencia escolar deslumbró con inventos geniales',
                    'Estudiantes de cuarto grado inauguran periódico digital escolar',
                  ].map((idea) => (
                    <button
                      key={idea}
                      onClick={() => onUpdateDraft({ headline: idea })}
                      className="text-xs text-left px-3 py-1.5 bg-white hover:bg-amber-100 rounded-lg border border-amber-300 font-medium text-slate-800 transition"
                    >
                      &ldquo;{idea}&rdquo;
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Escribe tu titular personalizado:
                </label>
                <input
                  type="text"
                  placeholder="Ej: El huerto escolar dio sus primeros tomates gigantes..."
                  value={draft.headline}
                  onChange={(e) => onUpdateDraft({ headline: e.target.value })}
                  className="w-full text-base sm:text-lg font-bold px-4 py-3 bg-slate-50 border-2 border-slate-300 focus:border-amber-500 rounded-xl outline-hidden text-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setGuidedStep(2)}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center gap-2"
                >
                  <span>Siguiente: La Entrada (4 preguntas)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: LEAD / ENTRADA */}
          {guidedStep === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h3 className="font-bold text-slate-900 text-lg font-headline">
                  Paso 2: La Entrada con las 4 Preguntas de Oro
                </h3>
                <p className="text-xs text-slate-500">
                  Responde a cada una para armar el primer párrafo de tu noticia (la cima de la pirámide invertida).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</span>
                    ¿Qué pasó? (El suceso central)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: cosecharon más de 15 kilos de tomates frescos..."
                    value={draft.leadParagraph.what}
                    onChange={(e) =>
                      onUpdateDraft({
                        leadParagraph: { ...draft.leadParagraph, what: e.target.value },
                      })
                    }
                    className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-300 rounded-xl outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">2</span>
                    ¿Quién o quiénes participaron? (Protagonistas)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: los estudiantes de 4.° grado y su profesora..."
                    value={draft.leadParagraph.who}
                    onChange={(e) =>
                      onUpdateDraft({
                        leadParagraph: { ...draft.leadParagraph, who: e.target.value },
                      })
                    }
                    className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-300 rounded-xl outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">3</span>
                    ¿Cuándo fue? (El momento)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Ayer en la mañana durante el descanso..."
                    value={draft.leadParagraph.when}
                    onChange={(e) =>
                      onUpdateDraft({
                        leadParagraph: { ...draft.leadParagraph, when: e.target.value },
                      })
                    }
                    className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-300 rounded-xl outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">4</span>
                    ¿Dónde ocurrió? (Lugar exacto)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: en el patio verde detrás de la cafetería escolar..."
                    value={draft.leadParagraph.where}
                    onChange={(e) =>
                      onUpdateDraft({
                        leadParagraph: { ...draft.leadParagraph, where: e.target.value },
                      })
                    }
                    className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-300 rounded-xl outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Magic auto compose button */}
              <div className="flex justify-center">
                <button
                  onClick={handleAutoComposeLead}
                  className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-xl border border-indigo-200 text-xs font-bold flex items-center gap-2 transition"
                >
                  <Wand2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Unir mis 4 respuestas en el Párrafo de Entrada</span>
                </button>
              </div>

              {/* Textarea for final lead */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Párrafo completo de Entrada (puedes retocarlo libremente):
                </label>
                <textarea
                  rows={3}
                  placeholder="Aquí aparecerá tu párrafo de entrada con las 4 preguntas de oro..."
                  value={draft.leadParagraph.composedText}
                  onChange={(e) =>
                    onUpdateDraft({
                      leadParagraph: { ...draft.leadParagraph, composedText: e.target.value },
                    })
                  }
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl outline-hidden focus:border-indigo-500 font-sans leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => setGuidedStep(1)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold text-xs"
                >
                  Volver al Titular
                </button>
                <button
                  onClick={() => setGuidedStep(3)}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center gap-2"
                >
                  <span>Siguiente: Cuerpo de la noticia</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: BODY */}
          {guidedStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h3 className="font-bold text-slate-900 text-lg font-headline">
                  Paso 3: El Cuerpo de la Noticia
                </h3>
                <p className="text-xs text-slate-500">
                  Explica los detalles, cómo se organizaron y qué dijo algún testigo o profesor.
                </p>
              </div>

              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900 space-y-1">
                <strong>Consejo del Reportero Lápiz:</strong>
                <p>
                  Incluye una frase que alguien haya dicho entre comillas (&ldquo;...&rdquo;). ¡Eso hace que tu noticia parezca de un periódico de verdad!
                </p>
              </div>

              <textarea
                rows={5}
                placeholder="Escribe aquí los párrafos explicativos de tu noticia. Por ejemplo: El proyecto inició con semillas donadas por las familias. Los estudiantes aprendieron sobre abono orgánico y riego. 'Fue una experiencia maravillosa', afirmó la docente tutora..."
                value={draft.bodyParagraph}
                onChange={(e) => onUpdateDraft({ bodyParagraph: e.target.value })}
                className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl outline-hidden focus:border-purple-500 font-sans leading-relaxed"
              />

              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => setGuidedStep(2)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold text-xs"
                >
                  Volver a la Entrada
                </button>
                <button
                  onClick={() => setGuidedStep(4)}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center gap-2"
                >
                  <span>Siguiente: Fotografía y Pie</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PHOTO & CAPTION */}
          {guidedStep === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h3 className="font-bold text-slate-900 text-lg font-headline">
                  Paso 4: Fotografía y Pie de Foto
                </h3>
                <p className="text-xs text-slate-500">
                  Selecciona la temática de la imagen escolar y añade la frase descriptiva.
                </p>
              </div>

              {/* Theme icons picker */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Tema ilustrativo:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {photoOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        onUpdateDraft({
                          photoStyle: opt.id,
                          caption: draft.caption || opt.defaultCaption,
                        });
                      }}
                      className={`p-3 rounded-xl border-2 flex flex-col items-center text-center transition ${
                        draft.photoStyle === opt.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="text-2xl mb-1">{opt.icon}</span>
                      <span className="text-[11px] leading-tight">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Caption input */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Pie de foto (frase explicativa de la imagen):
                </label>
                <input
                  type="text"
                  placeholder="Ej: Estudiantes cosechando tomates en el patio escolar..."
                  value={draft.caption}
                  onChange={(e) => onUpdateDraft({ caption: e.target.value })}
                  className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-300 rounded-xl outline-hidden focus:border-emerald-500"
                />
              </div>

              {/* Reporter name and school confirmation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase flex items-center justify-between">
                    <span>Firma de Autoría (Prensa):</span>
                    {draft.isAnonymous && (
                      <span className="text-emerald-700 font-extrabold text-[10px] bg-emerald-100 px-1.5 py-0.2 rounded">
                        Modo Anónimo
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={draft.isAnonymous ? draft.anonymousAlias : draft.studentName}
                    onChange={(e) => {
                      if (draft.isAnonymous) {
                        onUpdateDraft({ anonymousAlias: e.target.value });
                      } else {
                        onUpdateDraft({ studentName: e.target.value });
                      }
                    }}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-semibold"
                  />
                  {draft.isAnonymous && draft.studentCode && (
                    <span className="text-[10px] text-slate-500 block">
                      Código escolar para Classroom: <strong>{draft.studentCode}</strong>
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase">
                    Nombre del Colegio o Institución:
                  </label>
                  <input
                    type="text"
                    value={draft.schoolName}
                    onChange={(e) => onUpdateDraft({ schoolName: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-semibold"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  onClick={() => setGuidedStep(3)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold text-xs"
                >
                  Volver al Cuerpo
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Primera Plana Completa</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: LIVE NEWSPAPER FRONT-PAGE PREVIEW */}
      {activeTab === 'preview' && (
        <div className="space-y-6">
          <div className="bg-[#fcfaf4] border-4 border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative font-serif text-slate-900">
            {/* Header / Masthead */}
            <div className="border-b-4 border-double border-slate-900 pb-4 mb-6 text-center">
              <div className="flex justify-between items-center text-[10px] sm:text-xs text-slate-600 uppercase tracking-widest font-sans border-b border-slate-300 pb-1 mb-2">
                <span>{draft.schoolName || 'Institución Educativa Escolar'}</span>
                <span className="font-bold text-amber-800">• EDICIÓN ESPECIAL ABP •</span>
                <span>Grado 4.° Primaria</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-headline uppercase tracking-tight text-slate-900">
                EL INFORMADOR ESCOLAR
              </h1>
              <div className="flex justify-between text-xs font-sans text-slate-700 border-t border-slate-400 pt-1.5 mt-2">
                <span>Fecha: {draft.date || 'Octubre 2026'}</span>
                <span className="font-semibold">
                  Reportero oficial: {draft.isAnonymous ? (draft.anonymousAlias || 'Reportero Anónimo') : (draft.studentName || 'Reportero Escolar')}
                  {draft.isAnonymous && draft.studentCode ? ` (${draft.studentCode})` : ''}
                </span>
                <span>Edición Escolar N.° 01</span>
              </div>
            </div>

            {/* Headline */}
            <div className="mb-6 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-headline leading-tight text-slate-950">
                {draft.headline || 'Escribe tu titular en el paso 1 para verlo aquí...'}
              </h2>
              <div className="flex items-center gap-2 font-sans text-xs text-slate-600 mt-2">
                <span className="uppercase font-bold text-amber-700">
                  Por {draft.isAnonymous ? (draft.anonymousAlias || 'Reportero Anónimo') : (draft.studentName || 'Reportero Escolar')}
                </span>
                {draft.isAnonymous && (
                  <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                    Identidad Protegida
                  </span>
                )}
                <span>• Especial para el Periódico Digital</span>
              </div>
            </div>

            {/* Lead / Entrada (Emphasized) */}
            <div className="bg-amber-50/60 p-4 rounded-xl border-l-4 border-amber-600 mb-6 font-sans">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1">
                Entrada / Copete de la Noticia:
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
                {draft.leadParagraph.composedText ||
                  'Aquí aparecerá el resumen de las 4 preguntas de oro: ¿Qué pasó?, ¿Quién?, ¿Cuándo? y ¿Dónde?...'}
              </p>
            </div>

            {/* Layout: Photo + Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Photo Box (5 cols) */}
              <div className="md:col-span-5 bg-white p-3 rounded-2xl border-2 border-slate-300 shadow-xs">
                <div className="h-44 bg-gradient-to-br from-amber-100 to-emerald-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center p-4 text-center">
                  <div className="text-5xl mb-2">
                    {photoOptions.find((p) => p.id === draft.photoStyle)?.icon || '🌱🍅'}
                  </div>
                  <span className="text-xs font-sans font-bold text-slate-700">
                    {photoOptions.find((p) => p.id === draft.photoStyle)?.label || 'Fotografía Noticiosa'}
                  </span>
                </div>
                <p className="text-xs font-sans italic text-slate-600 mt-2 px-1">
                  Foto: {draft.caption || 'Estudiantes en la actividad de la institución escolar.'}
                </p>
              </div>

              {/* Body (7 cols) */}
              <div className="md:col-span-7 font-sans text-sm text-slate-800 space-y-3 leading-relaxed">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-sans">
                  Cuerpo de la Noticia:
                </div>
                {draft.bodyParagraph ? (
                  <p className="whitespace-pre-line">{draft.bodyParagraph}</p>
                ) : (
                  <p className="italic text-slate-400">
                    Aún no has escrito los detalles en el Paso 3. Regresa al taller de redacción para añadir el cuerpo de la noticia.
                  </p>
                )}
              </div>
            </div>

            {/* Editorial Footer */}
            <div className="mt-8 pt-3 border-t border-slate-300 flex flex-wrap justify-between items-center text-[11px] font-sans text-slate-500 gap-2">
              <span>Didactic@TIC • Periódico Escolar Digital ABP</span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                🛡️ Uso Ético de IA • Datos de Menores Protegidos
              </span>
              <span>Construido según la Pirámide Invertida</span>
            </div>
          </div>

          {/* Action to proceed to completion & Google Classroom */}
          <div className="bg-white p-6 rounded-3xl border border-amber-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 text-base">
                ¿Todo listo con tu borrador?
              </h4>
              <p className="text-xs text-slate-600">
                Pasa a la pantalla final para generar tu Carnet Oficial y compartir tu entrega en Google Classroom.
              </p>
            </div>

            <button
              onClick={onCompleteWorkshop}
              disabled={!isFormReady}
              className={`px-8 py-3.5 rounded-xl font-extrabold text-sm shadow-md transition flex items-center gap-2.5 ${
                isFormReady
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer transform hover:scale-[1.02] active:scale-98'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>¡Finalizar y Entregar en Classroom!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

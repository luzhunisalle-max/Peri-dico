import React, { useState } from 'react';
import { ReporterLapiz } from './ReporterLapiz';
import {
  Newspaper,
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Award,
  ShieldCheck,
  EyeOff,
  Dice5,
  Lock,
  UserCheck
} from 'lucide-react';

interface ScreenWelcomeProps {
  studentName: string;
  isAnonymous: boolean;
  anonymousAlias: string;
  studentCode: string;
  onStudentNameChange: (name: string) => void;
  onAnonymousChange: (isAnon: boolean, alias: string, code: string) => void;
  onStart: () => void;
  onOpenTeacherGuide: () => void;
  onOpenEthicalAI: () => void;
}

const SAMPLE_ALIASES = [
  'Reportero Semillero #04',
  'Reportera Curiosa #11',
  'Periodista Guardián Escolar',
  'Reportera de la Ciencia #08',
  'Periodista Eco-Escolar #15',
  'Reportero Investigador #07',
  'Reportera Sembradora #03',
  'Periodista Innovador #09',
  'Reportero Explorador #12',
  'Reportera de la Verdad #02',
];

export const ScreenWelcome: React.FC<ScreenWelcomeProps> = ({
  studentName,
  isAnonymous,
  anonymousAlias,
  studentCode,
  onStudentNameChange,
  onAnonymousChange,
  onStart,
  onOpenTeacherGuide,
  onOpenEthicalAI,
}) => {
  const [localIsAnon, setLocalIsAnon] = useState(isAnonymous);
  const [localAlias, setLocalAlias] = useState(anonymousAlias || SAMPLE_ALIASES[0]);
  const [localCode, setLocalCode] = useState(studentCode || '');

  const welcomeSpeech =
    '¡Hola, futuro periodista escolar! Soy el Reportero Lápiz. ¿Alguna vez has querido contar algo genial que pasó en tu colegio para que toda la comunidad lo sepa? En este viaje aprenderás qué es una noticia, tomarás decisiones como reportero y construirás tu propio borrador. Además, cuidamos tu privacidad con el Modo Anónimo y respetamos la Declaración Ética de la IA. ¡Empecemos!';

  const handleToggleAnon = (enabled: boolean) => {
    setLocalIsAnon(enabled);
    if (enabled && !localAlias) {
      const randomAlias = SAMPLE_ALIASES[Math.floor(Math.random() * SAMPLE_ALIASES.length)];
      setLocalAlias(randomAlias);
      onAnonymousChange(true, randomAlias, localCode);
    } else {
      onAnonymousChange(enabled, localAlias, localCode);
    }
  };

  const handleRandomizeAlias = () => {
    const randomAlias = SAMPLE_ALIASES[Math.floor(Math.random() * SAMPLE_ALIASES.length)];
    setLocalAlias(randomAlias);
    onAnonymousChange(true, randomAlias, localCode);
  };

  const handleAliasChange = (alias: string) => {
    setLocalAlias(alias);
    onAnonymousChange(localIsAnon, alias, localCode);
  };

  const handleCodeChange = (code: string) => {
    setLocalCode(code);
    onAnonymousChange(localIsAnon, localAlias, code);
  };

  const displayName = localIsAnon ? (localAlias || 'Reportero Anónimo') : (studentName || 'Nuevo Reportero');

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 sm:py-8">
      {/* Top Banner Hero Card */}
      <div className="relative bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl overflow-hidden border-4 border-amber-400/40">
        {/* Newspaper watermark background */}
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-6">
          <Newspaper className="w-80 h-80" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="flex-1 space-y-3.5 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold uppercase tracking-wider text-amber-100">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Objeto Virtual de Aprendizaje (OVA) • Grado 4.°
              </span>
              <button
                onClick={onOpenEthicalAI}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 text-xs font-bold transition border border-emerald-400/40"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Uso Ético de IA y Anonimización</span>
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-headline leading-tight tracking-tight text-white drop-shadow-xs">
              ¡Somos Reporteros!
              <span className="block text-amber-200 text-2xl sm:text-3xl font-serif mt-1">
                Escribimos nuestra primera noticia
              </span>
            </h1>

            <p className="text-amber-100 text-sm sm:text-base max-w-xl font-medium leading-relaxed">
              Proyecto ABP: <em>Periódico Digital Escolar</em>. Aprende la estructura de la noticia, supera los 3 nodos de decisión y publica tu primer borrador.
            </p>
          </div>

          {/* Mascot Preview */}
          <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-inner flex flex-col items-center">
            <ReporterLapiz
              message={welcomeSpeech}
              mood="cheering"
              size="lg"
              showBubble={false}
            />
            <span className="text-xs font-bold uppercase tracking-wide text-amber-200 mt-2">
              Tu Guía: Reportero Lápiz
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Mascot Speech Bubble */}
      <div className="bg-amber-100/70 p-5 rounded-2xl border border-amber-300/80">
        <ReporterLapiz message={welcomeSpeech} mood="explaining" size="md" />
      </div>

      {/* Student Entry Card with Privacy & Anonymization options */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-md">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              Paso Inicial: Credencial de Prensa
            </span>
            <h2 className="text-2xl font-bold font-headline text-slate-900 mt-2">
              ¿Cómo te registrarás en la redacción escolar?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Puedes usar tu nombre o activar el <strong>Modo Anónimo</strong> para proteger tus datos personales.
            </p>
          </div>

          {/* Privacy & Anonymization Toggle Box */}
          <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                    Modo Anónimo para Estudiantes (Protección de Datos)
                  </h3>
                  <p className="text-[11px] text-emerald-800">
                    Oculta el nombre real y utiliza un seudónimo periodístico o código escolar.
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localIsAnon}
                  onChange={(e) => handleToggleAnon(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                <span className="ml-2 text-xs font-bold text-slate-700">
                  {localIsAnon ? 'Activado' : 'Desactivado'}
                </span>
              </label>
            </div>

            {/* Input based on Mode */}
            {localIsAnon ? (
              <div className="space-y-3 pt-2 border-t border-emerald-200 animate-fadeIn">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-bold text-emerald-900 flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Seudónimo de Prensa Escolar:
                    </label>
                    <button
                      type="button"
                      onClick={handleRandomizeAlias}
                      className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-emerald-300 hover:bg-emerald-50 transition"
                      title="Generar otro seudónimo seguro"
                    >
                      <Dice5 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Cambiar Seudónimo</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={localAlias}
                    onChange={(e) => handleAliasChange(e.target.value)}
                    placeholder="Ej: Reportero Semillero #04"
                    className="w-full text-base font-bold px-4 py-2.5 bg-white border-2 border-emerald-400 focus:border-emerald-600 rounded-xl text-emerald-950 outline-hidden transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-emerald-900 block">
                      Código / ID de Estudiante (Opcional):
                    </label>
                    <input
                      type="text"
                      value={localCode}
                      onChange={(e) => handleCodeChange(e.target.value)}
                      placeholder="Ej: EST-4A-15 o N° de lista"
                      className="w-full text-xs px-3 py-2 bg-white border border-emerald-300 rounded-lg text-slate-800"
                    />
                    <span className="text-[10px] text-emerald-800 block">
                      Permite a tu docente identificarte en Classroom sin exponer tu nombre completo.
                    </span>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-start gap-2">
                    <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Garantía de Privacidad:</strong> No guardamos datos en servidores ni compartimos información con terceros.
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5 pt-2 border-t border-emerald-200">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Nombre y Apellido del Estudiante:
                </label>
                <input
                  type="text"
                  placeholder="Escribe tu nombre y apellido aquí..."
                  value={studentName}
                  onChange={(e) => onStudentNameChange(e.target.value)}
                  className="w-full text-center text-lg sm:text-xl font-bold px-5 py-3.5 bg-white border-2 border-amber-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-200 rounded-2xl text-slate-800 placeholder-slate-400 outline-hidden transition"
                />
              </div>
            )}
          </div>

          {/* What you'll achieve */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
            <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80 flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-bold text-slate-800">1. Aprender</strong>
                <span className="text-xs text-slate-600">Partes y pirámide invertida de la noticia.</span>
              </div>
            </div>
            <div className="bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-200/80 flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-bold text-slate-800">2. Decidir</strong>
                <span className="text-xs text-slate-600">3 retos interactivos con pistas explicativas.</span>
              </div>
            </div>
            <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200/80 flex items-start gap-2.5">
              <Award className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-bold text-slate-800">3. Publicar</strong>
                <span className="text-xs text-slate-600">Ficha y carnet ético para Google Classroom.</span>
              </div>
            </div>
          </div>

          {/* Call to action button */}
          <div className="pt-2 text-center">
            <button
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-extrabold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 mx-auto"
            >
              <span>¡Empezar mi reportaje como {displayName}!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Pedagogical and Ethics Links bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white/80 rounded-2xl border border-slate-200 text-xs text-slate-600 gap-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span>
            <strong>Docentes:</strong> Basado en el Guion Pedagógico Didactic@TIC (Área Lengua Castellana 4.°, DBA, DigCompEdu A3.1 y A3.2).
          </span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={onOpenEthicalAI}
            className="text-emerald-700 hover:text-emerald-900 font-bold underline flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Declaración Ética IA & Privacidad</span>
          </button>
          <span>•</span>
          <button
            onClick={onOpenTeacherGuide}
            className="text-indigo-600 hover:text-indigo-800 font-bold underline"
          >
            Ficha Pedagógica
          </button>
        </div>
      </div>
    </div>
  );
};

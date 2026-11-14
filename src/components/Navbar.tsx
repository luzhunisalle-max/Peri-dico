import React from 'react';
import { Newspaper, BookOpen, GraduationCap, RotateCcw, ShieldCheck } from 'lucide-react';
import { StepId } from '../types/ova';

interface NavbarProps {
  currentStep: StepId;
  onNavigate: (step: StepId) => void;
  onOpenTeacherGuide: () => void;
  onOpenClassroomShare: () => void;
  onOpenEthicalAI: () => void;
  onReset: () => void;
}

const STEPS: { id: StepId; label: string; number: number }[] = [
  { id: 'welcome', label: 'Inicio', number: 0 },
  { id: 'concept', label: '¿Qué es?', number: 1 },
  { id: 'node1', label: 'Nodo 1: Tema', number: 2 },
  { id: 'parts', label: 'Partes', number: 3 },
  { id: 'node2', label: 'Nodo 2: Titular', number: 4 },
  { id: 'pyramid', label: 'Pirámide', number: 5 },
  { id: 'node3', label: 'Nodo 3: Orden', number: 6 },
  { id: 'workshop', label: 'Borrador', number: 7 },
  { id: 'completed', label: 'Classroom', number: 8 },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentStep,
  onNavigate,
  onOpenTeacherGuide,
  onOpenClassroomShare,
  onOpenEthicalAI,
  onReset,
}) => {
  const currentIndex = STEPS.findIndex(s => s.id === currentStep);
  const progressPercent = Math.round(((currentIndex + 1) / STEPS.length) * 100);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Title */}
          <div
            onClick={() => onNavigate('welcome')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition">
              <Newspaper className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                  Didactic@TIC 4.°
                </span>
                <span className="text-[10px] text-slate-500 font-medium hidden md:inline">
                  • Lengua Castellana
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 font-headline leading-tight">
                ¡Somos Reporteros!
              </h1>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onOpenEthicalAI}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-emerald-300 hover:border-emerald-400 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition"
              title="Declaración de Uso Ético de la IA y Anonimización Escolar"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden md:inline">Ética IA & Privacidad</span>
            </button>

            <button
              onClick={onOpenTeacherGuide}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-300 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-semibold transition"
              title="Ver Guion Pedagógico, DBA y DigCompEdu"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Guía Docente</span>
            </button>

            <button
              onClick={onOpenClassroomShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition transform hover:scale-[1.02] active:scale-98"
              title="Compartir en Google Classroom"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Classroom</span>
            </button>

            <button
              onClick={onReset}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
              title="Reiniciar OVA"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mini Step Flow Bar */}
        <div className="pb-2 pt-0.5 flex flex-col gap-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-amber-800 font-bold">
              <span>Paso {currentIndex + 1} de {STEPS.length}:</span>
              <span className="text-slate-800">{STEPS[currentIndex]?.label}</span>
            </span>
            <span className="font-semibold text-slate-600">{progressPercent}% completado</span>
          </div>

          {/* Progress bar line */}
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
            <div
              className="bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

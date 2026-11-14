import React from 'react';
import { X, ShieldCheck, Sparkles, Lock, UserCheck, EyeOff, CheckCircle2, FileText, HeartHandshake } from 'lucide-react';

interface EthicalAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EthicalAIModal: React.FC<EthicalAIModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-xs">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-bold text-emerald-200 bg-emerald-500/30 px-2 py-0.5 rounded">
                  Didactic@TIC • Bloque 5
                </span>
                <span className="text-xs text-emerald-200">• Grado 4.°</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-headline mt-1">
                Declaración de Uso Ético de la IA y Anonimización Escolar
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100">
                Compromiso pedagógico de transparencia, protección de menores y privacidad digital
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-slate-700 text-sm">
          {/* Bloque 1: Declaración Ética Oficial del Guion */}
          <div className="border border-emerald-200 bg-emerald-50/60 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-base font-headline">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h3>Declaración Ética Docente (Modelo Guion Pedagógico)</h3>
            </div>
            <blockquote className="bg-white p-4 rounded-xl border border-emerald-200 text-slate-700 italic text-xs sm:text-sm leading-relaxed shadow-2xs">
              &ldquo;Declaro que revisé y adapté todo el contenido asistido o generado por IA al nivel pedagógico y cognitivo de 4.° grado de primaria, verifiqué minuciosamente que los ejemplos fueran apropiados y libres de sesgos, <strong>no utilicé ni almacené datos personales de los estudiantes</strong> y dejo constancia explícita del apoyo de IA en la creación del recurso.&rdquo;
            </blockquote>
          </div>

          {/* Bloque 2: ¿En qué se usó la IA en este OVA? */}
          <div className="border border-indigo-200 bg-indigo-50/40 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-indigo-950 font-bold text-base font-headline">
              <FileText className="w-5 h-5 text-indigo-600" />
              <h3>¿En qué se utilizó Inteligencia Artificial en este recurso?</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              De acuerdo con la ficha de transparencia del Guion Pedagógico, la IA intervino exclusivamente en tres tareas de apoyo didáctico bajo supervisión humana:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-indigo-100 shadow-2xs space-y-1">
                <span className="text-xs font-bold text-indigo-700 uppercase block">1. Personaje Guía</span>
                <p className="text-xs text-slate-600">
                  Concepto y diseño visual del personaje <em>Reportero Lápiz</em>, creado para generar empatía y acompañamiento formativo.
                </p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-indigo-100 shadow-2xs space-y-1">
                <span className="text-xs font-bold text-indigo-700 uppercase block">2. Noticias Modelo</span>
                <p className="text-xs text-slate-600">
                  Redacción de dos ejemplos contextualizados al entorno escolar (huerto escolar y feria de ciencias).
                </p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-indigo-100 shadow-2xs space-y-1">
                <span className="text-xs font-bold text-indigo-700 uppercase block">3. Opciones y Distractores</span>
                <p className="text-xs text-slate-600">
                  Formulación de los distractores y de la retroalimentación explicativa en cada uno de los 3 nodos de decisión.
                </p>
              </div>
            </div>
          </div>

          {/* Bloque 3: Política de Anonimización y Protección de Menores */}
          <div className="border border-amber-200 bg-amber-50/50 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-base font-headline">
              <EyeOff className="w-5 h-5 text-amber-600" />
              <h3>Protocolo de Anonimización para los Estudiantes de 4.° Grado</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              Para garantizar el pleno cumplimiento de las normas de protección de la infancia, habeas data y privacidad escolar (como FERPA, RGPD Infantil y normativas latinoamericanas):
            </p>

            <div className="space-y-2.5">
              <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 flex items-start gap-3">
                <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="block text-slate-800 text-sm mb-0.5">1. Almacenamiento 100% Local (Cero Recolección en la Nube)</strong>
                  <p className="text-slate-600">
                    Este recurso opera de forma autónoma en el navegador del dispositivo. Los borradores y respuestas se guardan únicamente en la memoria local (localStorage) del estudiante. Ningún servidor externo recopila nombres, direcciones IP, correos ni datos biométricos.
                  </p>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 flex items-start gap-3">
                <UserCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="block text-slate-800 text-sm mb-0.5">2. Modo Anónimo / Seudónimo de Prensa</strong>
                  <p className="text-slate-600">
                    El OVA incluye un conmutador de <strong>Modo Anónimo</strong> que permite al estudiante usar un seudónimo de periodista escolar (ej. <em>Reportero Semillero #05</em>, <em>Reportero Guardián Escolar</em>) o su código interno de lista, protegiendo su nombre real en todas las pantallas, carnet y fichas impresas.
                  </p>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="block text-slate-800 text-sm mb-0.5">3. Anonimato Seguro en Google Classroom</strong>
                  <p className="text-slate-600">
                    Al compartir la entrega con Google Classroom, el docente puede asociar la tarea calificada mediante la cuenta institucional del estudiante, manteniendo el documento o periódico con seudónimo para murales públicos o exposiciones escolares sin vulnerar la privacidad de ningún menor.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bloque 4: Principios Pedagógicos Clave */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Decálogo de Buenas Prácticas Didactic@TIC:
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>La IA asiste, pero la <strong>decisión cognitiva</strong> pertenece siempre al estudiante (DigCompEdu A3.1).</li>
              <li>La retroalimentación enseña el <em>porqué</em> del error, previniendo respuestas mecánicas por ensayo y error.</li>
              <li>No existen algoritmos de perfilado comercial ni rastreadores publicitarios dentro de la aplicación.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex justify-between items-center">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Didactic@TIC • Marco de Integridad Ética Digital
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-sm transition"
          >
            Aceptar y Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

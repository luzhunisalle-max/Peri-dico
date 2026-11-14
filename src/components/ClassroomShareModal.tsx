import React, { useState } from 'react';
import { X, Share2, Copy, Check, ExternalLink, GraduationCap, ClipboardList, Send } from 'lucide-react';

interface ClassroomShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClassroomShareModal: React.FC<ClassroomShareModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [activeTab, setActiveTab] = useState<'share' | 'teacher_prompt' | 'student_guide'>('share');

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://mi-colegio.edu.co/ova-reporteros';
  const classroomShareUrl = `https://classroom.google.com/share?url=${encodeURIComponent(
    currentUrl
  )}&title=${encodeURIComponent('OVA: ¡Somos reporteros! Escribimos nuestra primera noticia')}`;

  const teacherTemplateText = `📰 TAREA ABP: ¡Somos reporteros! Escribimos nuestra primera noticia
Área: Lengua Castellana (Grado 4.°)
Fase: Antes (Aula Invertida - Periódico Digital Escolar)

Queridos estudiantes:
Ingresen al siguiente OVA interactivo para aprender a redactar su primera noticia escolar junto al Reportero Lápiz:
👉 Enlace del OVA: ${currentUrl}

Pasos a seguir:
1. Explora qué es una noticia y sus partes esenciales.
2. Supera los 3 Nodos de Decisión interactivos.
3. En el taller de redacción, redacta el borrador de tu noticia escolar (titular, entrada con las 4 preguntas de oro y cuerpo).
4. (Privacidad): Si lo prefieres, activa el "Modo Anónimo" para firmar con un seudónimo periodístico seguro o tu código de lista.
5. Al finalizar, descarga tu Ficha de Entrega o copia el texto de tu noticia y adjúntalo a esta tarea de Google Classroom para recibir tu retroalimentación formativa.

🛡️ Compromiso de Ética y Privacidad: Recurso libre de recopilación de datos de menores y con declaración de uso ético de IA (Didactic@TIC).`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(teacherTemplateText);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#1e8e3e] text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-xs flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 px-2 py-0.5 rounded text-white">
                  Google Classroom Ready
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-headline mt-1">
                Compartir e Integrar con Google Classroom
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100">
                Comparte este OVA interactivo directamente con tus estudiantes o docentes
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

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('share')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === 'share'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Compartir Ahora</span>
          </button>
          <button
            onClick={() => setActiveTab('teacher_prompt')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === 'teacher_prompt'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Plantilla para el Docente</span>
          </button>
          <button
            onClick={() => setActiveTab('student_guide')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === 'student_guide'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Guía de Entrega Alumno</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto text-slate-700 text-sm">
          {activeTab === 'share' && (
            <div className="space-y-5">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <h4 className="font-bold text-emerald-900 text-base mb-1">
                  Publicar directamente en tu clase de Google Classroom
                </h4>
                <p className="text-emerald-800 text-xs sm:text-sm mb-4">
                  Haz clic en el botón oficial para abrir el asistente de Google Classroom. Podrás asignarlo como Tarea, Anuncio o Material de estudio con un solo clic.
                </p>

                <a
                  href={classroomShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#1e8e3e] hover:bg-[#187532] text-white font-bold text-sm shadow-md transition transform hover:scale-[1.02] active:scale-98"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Publicar en Google Classroom</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                  Enlace directo del OVA interactivo:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={currentUrl}
                    className="flex-1 px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-xs sm:text-sm font-mono text-slate-700 select-all"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition ${
                      copiedLink
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 hover:bg-slate-900 text-white'
                    }`}
                  >
                    {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? '¡Copiado!' : 'Copiar enlace'}</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <span className="text-base">💡</span>
                <p>
                  <strong>Tip pedagógico para el docente:</strong> Puedes asignar este OVA en la fase <em>&ldquo;Antes&rdquo;</em> de aula invertida. Los estudiantes llegarán al taller presencial o sincrónico ya con su borrador maquetado y conociendo la pirámide invertida.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'teacher_prompt' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600">
                Copia este texto y pégalo directamente en la descripción de una nueva tarea en Google Classroom:
              </p>

              <div className="relative">
                <textarea
                  readOnly
                  rows={9}
                  value={teacherTemplateText}
                  className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-700 select-all"
                />
                <button
                  onClick={handleCopyTemplate}
                  className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition ${
                    copiedTemplate
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {copiedTemplate ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTemplate ? '¡Copiado!' : 'Copiar texto para Classroom'}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'student_guide' && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 text-sm">
                ¿Cómo entregan los estudiantes su trabajo en Google Classroom?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-2">1</div>
                  <strong className="block text-slate-800 mb-1">Completar el OVA</strong>
                  <p className="text-slate-600">Supera los 3 nodos de decisión y escribe tu borrador guiado en la pantalla 4.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-2">2</div>
                  <strong className="block text-slate-800 mb-1">Descargar o Copiar</strong>
                  <p className="text-slate-600">En la pantalla final, presiona &ldquo;Descargar Ficha de Entrega (PDF)&rdquo; o &ldquo;Copiar Noticia&rdquo;.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-2">3</div>
                  <strong className="block text-slate-800 mb-1">Entregar en Classroom</strong>
                  <p className="text-slate-600">Ve a tu tarea en Classroom, adjunta el archivo o pega el texto y pulsa &ldquo;Entregar&rdquo;.</p>
                </div>
              </div>

              {/* Anonymization notice for classroom */}
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
                <span className="text-base">🛡️</span>
                <div>
                  <strong>Privacidad y Anonimización Escolar:</strong>
                  <p className="text-slate-700 mt-0.5">
                    Si el estudiante activa el <em>Modo Anónimo</em>, su ficha y carnet llevarán un seudónimo seguro o código. El docente podrá evaluar con su cuenta institucional en Classroom sin exponer datos personales de menores en murales públicos o redes del colegio.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-700 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

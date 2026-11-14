import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ReporterLapiz } from './ReporterLapiz';
import { NewsDraft, NodeAttempt } from '../types/ova';
import {
  Award,
  GraduationCap,
  Printer,
  Copy,
  Check,
  Share2,
  ExternalLink,
  BookOpen,
  FileCheck,
  Sparkles,
  Send,
  ShieldCheck,
  Lock,
  UserCheck
} from 'lucide-react';

interface ScreenCompletionProps {
  draft: NewsDraft;
  nodeAttempts: Record<string, NodeAttempt>;
  onOpenTeacherGuide: () => void;
  onOpenClassroomShare: () => void;
  onOpenEthicalAI: () => void;
  onRestart: () => void;
}

export const ScreenCompletion: React.FC<ScreenCompletionProps> = ({
  draft,
  nodeAttempts,
  onOpenTeacherGuide,
  onOpenClassroomShare,
  onOpenEthicalAI,
  onRestart,
}) => {
  const [copiedNews, setCopiedNews] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  }, []);

  const authorLabel = draft.isAnonymous
    ? `${draft.anonymousAlias || 'Reportero Anónimo'}${draft.studentCode ? ` (Código: ${draft.studentCode})` : ''}`
    : (draft.studentName || 'Estudiante Reportero');

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const classroomShareUrl = `https://classroom.google.com/share?url=${encodeURIComponent(
    currentUrl
  )}&title=${encodeURIComponent('Entrega de Noticia Escolar: ' + draft.headline)}`;

  const celebrationSpeech = `¡Bravo, ${
    draft.isAnonymous ? draft.anonymousAlias : (draft.studentName || 'colega reportero')
  }! Has completado con éxito el OVA ¡Somos Reporteros! Superaste los 3 nodos de decisión y creaste el borrador de tu primera noticia escolar. Tu trabajo cuenta con protección de datos y cumple la Declaración Ética de la IA. ¡Ahora puedes entregarlo en Google Classroom!`;

  const fullNewsText = `📰 ${draft.headline.toUpperCase()}
Por: ${authorLabel} (Grado 4.°)
Institución: ${draft.schoolName}
Fecha: ${draft.date}

[ENTRADA DE LA NOTICIA]
${draft.leadParagraph.composedText}

[CUERPO DE LA NOTICIA]
${draft.bodyParagraph}

[FOTOGRAFÍA]
Foto: ${draft.caption}
----------------------------------------
Elaborado con el OVA Didactic@TIC - Proyecto ABP: Periódico Digital Escolar.
🛡️ Declaración Ética & Anonimización: Recurso didáctico asistido con IA conforme al Bloque 5. Datos personales de menores 100% protegidos.`;

  const handleCopyNews = () => {
    navigator.clipboard.writeText(fullNewsText);
    setCopiedNews(true);
    setTimeout(() => setCopiedNews(false), 2500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 sm:py-8">
      {/* Celebration Header */}
      <div className="text-center space-y-2 no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          ¡Misión Cumplida! • Acreditación de Prensa
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-headline text-slate-900">
          ¡Ya eres Reportero Escolar Oficial!
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Tu primera noticia está lista para incorporarse al Periódico Digital del colegio.
        </p>
      </div>

      {/* Mascot Cheers */}
      <div className="bg-amber-100/70 p-5 rounded-2xl border border-amber-300/80 no-print">
        <ReporterLapiz message={celebrationSpeech} mood="cheering" size="md" />
      </div>

      {/* SECTION 1: OFFICIAL REPORTER CREDENTIAL BADGE */}
      <div className="bg-gradient-to-br from-amber-600 via-amber-700 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-4 border-amber-300/50 relative overflow-hidden">
        {/* Subtle watermark */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-8 translate-y-8">
          <Award className="w-64 h-64" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          {/* Badge Photo/Icon */}
          <div className="w-28 h-32 bg-white rounded-2xl p-2 border-2 border-amber-300 shadow-md flex flex-col items-center justify-center text-center flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-3xl mb-1 shadow-inner">
              ✏️
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-800 tracking-wider">
              PRENSA 4.°
            </span>
            <span className="text-[9px] text-emerald-700 font-extrabold flex items-center gap-0.5">
              <Check className="w-2.5 h-2.5" /> VERIFICADO
            </span>
          </div>

          {/* Badge Details */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] uppercase tracking-widest font-bold text-amber-200">
                Didactic@TIC • Periódico Escolar Digital
              </span>
              {draft.isAnonymous ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-300 text-emerald-100 text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-emerald-300" />
                  Identidad Anonimizada (Protección de Menores)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/30 border border-blue-300 text-blue-100 text-[10px] font-bold">
                  <UserCheck className="w-3 h-3 text-blue-300" />
                  Acreditación de Autoría
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-headline text-white">
              {authorLabel}
            </h3>
            <p className="text-amber-100 text-xs sm:text-sm font-medium">
              Institución: <strong>{draft.schoolName}</strong> • Grado 4.°
            </p>

            {/* Decision Nodes Achievements */}
            <div className="flex flex-wrap gap-2 pt-2 justify-center sm:justify-start">
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/30 border border-emerald-300/40 px-2.5 py-1 rounded-full text-emerald-100">
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                Nodo 1: Tema Escolar
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/30 border border-emerald-300/40 px-2.5 py-1 rounded-full text-emerald-100">
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                Nodo 2: Titular Claro
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/30 border border-emerald-300/40 px-2.5 py-1 rounded-full text-emerald-100">
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                Nodo 3: Pirámide Invertida
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: GOOGLE CLASSROOM INTEGRATION & SUBMISSION ACTIONS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-md space-y-6 no-print">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-headline text-slate-900">
                Entrega y Compartir en Google Classroom
              </h3>
              <p className="text-xs text-slate-500">
                Opciones directas para estudiantes y docentes del proyecto ABP
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenEthicalAI}
              className="text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 font-bold px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1 transition"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Garantía Ética & Privacidad</span>
            </button>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Listo para entrega
            </span>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {/* 1. Direct Classroom Share Link */}
          <a
            href={classroomShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#1e8e3e] hover:bg-[#187532] text-white flex flex-col justify-between shadow-md transition transform hover:scale-[1.02] active:scale-98 group"
          >
            <div className="flex justify-between items-start mb-2">
              <GraduationCap className="w-6 h-6 text-white" />
              <ExternalLink className="w-4 h-4 text-emerald-200 group-hover:translate-x-0.5 transition" />
            </div>
            <div>
              <strong className="block text-sm font-bold">Publicar en Classroom</strong>
              <span className="text-xs text-emerald-100">Abre el asistente oficial de Google</span>
            </div>
          </a>

          {/* 2. Copy News Text */}
          <button
            onClick={handleCopyNews}
            className={`p-4 rounded-2xl border-2 flex flex-col justify-between transition text-left ${
              copiedNews
                ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                : 'bg-slate-50 border-slate-200 hover:border-amber-400 text-slate-800'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <Copy className="w-6 h-6 text-amber-600" />
              {copiedNews && <Check className="w-4 h-4 text-emerald-600" />}
            </div>
            <div>
              <strong className="block text-sm font-bold">
                {copiedNews ? '¡Texto Copiado!' : 'Copiar Texto de la Noticia'}
              </strong>
              <span className="text-xs text-slate-500">Para pegar en el mensaje de la tarea</span>
            </div>
          </button>

          {/* 3. Print / PDF Sheet */}
          <button
            onClick={handlePrint}
            className="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-indigo-400 text-slate-800 flex flex-col justify-between transition text-left"
          >
            <div className="flex justify-between items-start mb-2">
              <Printer className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <strong className="block text-sm font-bold">Imprimir o Guardar PDF</strong>
              <span className="text-xs text-slate-500">Genera la Ficha con sello ético</span>
            </div>
          </button>
        </div>

        {/* Classroom helpful instructions with Anonymization note */}
        <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-2">
          <strong className="font-bold flex items-center gap-1.5 text-sm">
            <FileCheck className="w-4 h-4 text-emerald-700" />
            Paso a paso para la entrega protegida en Google Classroom:
          </strong>
          <ol className="list-decimal pl-4 space-y-1.5 text-slate-700">
            <li>
              Haz clic en <strong>&ldquo;Copiar Texto de la Noticia&rdquo;</strong> o guarda tu ficha en PDF.
            </li>
            <li>
              Abre tu tarea en Google Classroom y adjunta el texto o PDF.
            </li>
            <li>
              {draft.isAnonymous ? (
                <span>
                  <strong>Entrega con Seudónimo:</strong> Tu tarea está firmada como <em>{authorLabel}</em>. Tu docente te identificará de forma segura y privada a través de tu usuario de Classroom sin exponer tu nombre en exposiciones públicas del periódico escolar.
                </span>
              ) : (
                <span>
                  Presiona el botón <strong>&ldquo;Entregar&rdquo;</strong> en Classroom para que tu profesor revise tu borrador y te otorgue retroalimentación formativa.
                </span>
              )}
            </li>
          </ol>
        </div>
      </div>

      {/* SECTION 3: PRINTABLE SUBMISSION SHEET (VISIBLE ON SCREEN AND CLEAN ON PRINT) */}
      <div className="bg-[#fdfbf7] p-6 sm:p-10 rounded-3xl border-4 border-slate-800 shadow-xl font-serif text-slate-900 space-y-6">
        {/* Printable Header */}
        <div className="border-b-4 border-double border-slate-800 pb-4 text-center">
          <div className="flex justify-between items-center text-xs text-slate-600 font-sans uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
            <span>{draft.schoolName}</span>
            <span>FICHA DE ENTREGA • PROYECTO ABP</span>
            <span>Lengua Castellana 4.°</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-headline uppercase">
            EL INFORMADOR ESCOLAR
          </h1>
          <div className="flex justify-between text-xs font-sans text-slate-700 border-t border-slate-400 pt-1 mt-2">
            <span>Fecha: {draft.date}</span>
            <span className="font-bold">
              Autoría: {authorLabel}
              {draft.isAnonymous && ' [Identidad Protegida]'}
            </span>
            <span>Edición Digital N.° 01</span>
          </div>
        </div>

        {/* News Article Headline */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-headline leading-tight text-slate-950">
            {draft.headline}
          </h2>
          <p className="text-xs font-sans text-slate-600 uppercase font-semibold mt-1 flex items-center gap-2">
            <span>Por {authorLabel} • Reportero Escolar Acreditado</span>
            {draft.isAnonymous && (
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Seudónimo de Prensa Escolar
              </span>
            )}
          </p>
        </div>

        {/* Lead paragraph */}
        <div className="bg-amber-50/70 p-4 rounded-xl border-l-4 border-amber-600 font-sans">
          <span className="text-[10px] font-bold uppercase text-amber-800 block mb-1">
            Entrada (¿Qué?, ¿Quién?, ¿Cuándo?, ¿Dónde?):
          </span>
          <p className="text-base font-bold text-slate-800 leading-snug">
            {draft.leadParagraph.composedText}
          </p>
        </div>

        {/* Body & Caption */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start font-sans">
          <div className="md:col-span-8 text-sm text-slate-800 leading-relaxed whitespace-pre-line">
            <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
              Cuerpo de la Noticia:
            </span>
            <p>{draft.bodyParagraph || 'Noticia escolar redactada conforme a la pirámide invertida.'}</p>
          </div>
          <div className="md:col-span-4 bg-slate-100 p-3 rounded-xl border border-slate-300 text-xs">
            <div className="h-28 bg-emerald-100 rounded-lg flex items-center justify-center text-3xl mb-2">
              📸
            </div>
            <p className="italic text-slate-600">
              {draft.caption || 'Fotografía de los estudiantes participando en la actividad escolar.'}
            </p>
          </div>
        </div>

        {/* Teacher Feedback Rubric Box for Classroom */}
        <div className="mt-6 pt-4 border-t-2 border-dashed border-slate-400 font-sans text-xs text-slate-600 space-y-3">
          <div className="font-bold text-slate-800 uppercase flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Rúbrica Formativa ABP (Para evaluación docente en Google Classroom):</span>
            </div>
            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
              4.° Primaria
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px]">
            <div className="p-2 bg-white rounded border border-slate-300">
              <strong>Titular:</strong> Claro, conciso y responde a qué pasó.
            </div>
            <div className="p-2 bg-white rounded border border-slate-300">
              <strong>Entrada:</strong> Responde las 4 preguntas de oro.
            </div>
            <div className="p-2 bg-white rounded border border-slate-300">
              <strong>Pirámide:</strong> Información jerarquizada adecuadamente.
            </div>
            <div className="p-2 bg-white rounded border border-slate-300">
              <strong>Ortografía:</strong> Puntuación y redacción de 4.° grado.
            </div>
          </div>

          {/* Official Ethical AI & Child Privacy Seal on Printable Sheet */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 text-[11px] text-emerald-950 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Declaración Ética y Anonimización Escolar (Didactic@TIC Bloque 5):</strong>
              <p className="text-slate-700 mt-0.5">
                Recurso educativo elaborado bajo supervisión docente y mediación interactiva (DigCompEdu A3.1 y A3.2). El contenido de apoyo fue verificado y libre de sesgos. Se aplicó el protocolo de anonimización para la protección de datos personales de menores de edad.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 no-print">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenEthicalAI}
            className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Declaración Ética IA & Anonimización</span>
          </button>
          <span>•</span>
          <button
            onClick={onOpenTeacherGuide}
            className="text-xs text-indigo-700 hover:text-indigo-900 font-bold flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Ver Ficha Pedagógica (DBA)</span>
          </button>
        </div>

        <button
          onClick={onRestart}
          className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
        >
          Escribir otra noticia / Reiniciar OVA
        </button>
      </div>
    </div>
  );
};

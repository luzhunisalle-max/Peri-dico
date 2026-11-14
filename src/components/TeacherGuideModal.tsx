import React from 'react';
import { X, BookOpen, Award, CheckCircle2, FileText, Sparkles, Brain, Clock, Users } from 'lucide-react';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-indigo-900 text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-xs">
              <BookOpen className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-amber-200 bg-amber-500/30 px-2 py-0.5 rounded">
                Didactic@TIC • Módulo 1: Recursos Interactivos
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-headline mt-1">
                Ficha Pedagógica y Guía Docente del OVA
              </h2>
              <p className="text-xs sm:text-sm text-amber-100">
                Modelo de referencia curricular para 4.° Grado de Primaria
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
          {/* Bloque 1: Anclaje Curricular */}
          <div className="border border-amber-200 bg-amber-50/50 rounded-xl p-4">
            <h3 className="font-bold text-base text-amber-900 flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-amber-600" />
              Bloque 1. Anclaje Curricular (Lengua Castellana 4.°)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-lg border border-amber-100 shadow-2xs">
                <span className="text-xs font-bold text-slate-500 uppercase block">Área y Nivel</span>
                <p className="font-semibold text-slate-800">Lengua Castellana – Grado 4.° de Primaria</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-amber-100 shadow-2xs">
                <span className="text-xs font-bold text-slate-500 uppercase block">Fase y Metodología</span>
                <p className="font-semibold text-slate-800">Antes (Aula Invertida – 5h estimadas)</p>
              </div>
              <div className="sm:col-span-2 bg-white p-3 rounded-lg border border-amber-100 shadow-2xs">
                <span className="text-xs font-bold text-slate-500 uppercase block">Derecho Básico de Aprendizaje (DBA)</span>
                <p className="text-slate-700 italic">
                  &ldquo;Produce textos atendiendo a elementos como el tipo de público al que va dirigido, el contexto de circulación, sus saberes previos y la diversidad de formatos de la que dispone para su presentación.&rdquo;
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-amber-100 shadow-2xs">
                <span className="text-xs font-bold text-slate-500 uppercase block">Tema del OVA</span>
                <p className="font-semibold text-slate-800">La noticia: qué es, para qué sirve y estructura (titular, entrada y cuerpo – pirámide invertida).</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-amber-100 shadow-2xs">
                <span className="text-xs font-bold text-slate-500 uppercase block">Pregunta Orientadora ABP</span>
                <p className="font-semibold text-amber-800">&iquest;Cómo diseñar un periódico digital escolar en 4.° que cuente lo que pasa en nuestro colegio?</p>
              </div>
            </div>
          </div>

          {/* Bloque 2: Intención Pedagógica DigCompEdu */}
          <div className="border border-indigo-200 bg-indigo-50/40 rounded-xl p-4">
            <h3 className="font-bold text-base text-indigo-900 flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-indigo-600" />
              Bloque 2. Intención Pedagógica y Competencias Digitales (DigCompEdu)
            </h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border border-indigo-100">
                <span className="text-xs font-bold text-indigo-700 uppercase block mb-1">
                  A3.1 Mediación interactiva y co-creación:
                </span>
                <p className="text-slate-700">
                  El estudiante <strong>no lee pasivamente</strong> sobre la noticia, sino que asume el rol activo de reportero escolar: elige qué hecho contar de su colegio, evalúa y escoge el titular más informativo, decide el orden jerárquico de los datos y co-crea el borrador maquetado de su propia noticia.
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-indigo-100">
                <span className="text-xs font-bold text-indigo-700 uppercase block mb-1">
                  A3.2 Orientación y acompañamiento con TIC:
                </span>
                <p className="text-slate-700">
                  Acompañamiento continuo mediante <strong>pistas emergentes</strong> en cada nodo, <strong>retroalimentación explicativa</strong> que razona el porqué del error pedagógico (no un simple clic correcto/incorrecto), personaje guía <em>Reportero Lápiz</em> y <strong>asistencia de voz (TTS)</strong> para estudiantes que fortalecen fluidez lectora.
                </p>
              </div>
            </div>
          </div>

          {/* Bloque 3: Los 3 Nodos de Decisión */}
          <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-4">
            <h3 className="font-bold text-base text-emerald-900 flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Bloque 3. Los 3 Nodos de Decisión (El Corazón del OVA)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-lg border border-emerald-100 text-xs">
                <div className="font-bold text-emerald-800 text-sm mb-1">Nodo 1: Tema</div>
                <p className="text-slate-600 mb-2"><strong>Pregunta:</strong> ¿Qué hecho real del colegio contar?</p>
                <p className="text-slate-500">Distingue entre interés colectivo escolar vs. anécdota de vida personal.</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-emerald-100 text-xs">
                <div className="font-bold text-emerald-800 text-sm mb-1">Nodo 2: Titular</div>
                <p className="text-slate-600 mb-2"><strong>Pregunta:</strong> ¿Cuál es el mejor titular?</p>
                <p className="text-slate-500">Evalúa concisión, claridad y respuesta concreta a &ldquo;¿qué pasó?&rdquo;.</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-emerald-100 text-xs">
                <div className="font-bold text-emerald-800 text-sm mb-1">Nodo 3: Estructura</div>
                <p className="text-slate-600 mb-2"><strong>Pregunta:</strong> ¿Por dónde empiezo a escribir?</p>
                <p className="text-slate-500">Aplica la pirámide invertida: lo nuclear primero (qué, quién, cuándo, dónde).</p>
              </div>
            </div>
          </div>

          {/* Bloque 5: Declaración de Uso Ético de la IA y Anonimización Escolar */}
          <div className="border border-emerald-300 bg-emerald-50/60 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-base text-emerald-950 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              Bloque 5. Declaración de Uso Ético de la IA y Anonimización Escolar
            </h3>

            <div className="text-xs text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-emerald-200 space-y-2">
              <p className="font-bold text-emerald-900 uppercase text-[11px]">
                Declaración Ética Oficial (Modelo Didactic@TIC):
              </p>
              <p className="italic bg-emerald-50/60 p-3 rounded-lg border-l-4 border-emerald-600">
                &ldquo;Declaro que revisé y adapté todo el contenido generado por IA al nivel de 4.° grado, verifiqué que los ejemplos fueran apropiados y libres de sesgos, no usé datos personales de estudiantes y dejo constancia del apoyo de IA en la creación del recurso.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <strong className="block text-slate-800 font-bold mb-1">
                  1. Usos específicos de la Inteligencia Artificial:
                </strong>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  <li>Generación del personaje ilustrado <em>Reportero Lápiz</em>.</li>
                  <li>Creación de 2 ejemplos modelo contextualizados a primaria.</li>
                  <li>Borradores de distractores y retroalimentación explicativa en los 3 nodos.</li>
                </ul>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <strong className="block text-slate-800 font-bold mb-1">
                  2. Protocolo de Anonimización de Estudiantes:
                </strong>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  <li><strong>Modo Seudónimo:</strong> Asignación de alias periodísticos o códigos escolares.</li>
                  <li><strong>Almacenamiento Local:</strong> Cero recopilación de nombres o datos en servidores.</li>
                  <li><strong>Integración Segura en Classroom:</strong> Calificación privada docente sin exponer datos en murales.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Tiempo estimado de interacción autónoma: 25 a 45 minutos.</span>
              <span className="mx-1">•</span>
              <Users className="w-4 h-4 text-slate-400" />
              <span>Alineado para Google Classroom y proyectos ABP.</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition"
          >
            Entendido, volver al OVA
          </button>
        </div>
      </div>
    </div>
  );
};

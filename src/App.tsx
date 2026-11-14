/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { ClassroomShareModal } from './components/ClassroomShareModal';
import { EthicalAIModal } from './components/EthicalAIModal';
import { ScreenWelcome } from './components/ScreenWelcome';
import { ScreenConcept } from './components/ScreenConcept';
import { DecisionNode } from './components/DecisionNode';
import { ScreenParts } from './components/ScreenParts';
import { ScreenPyramid } from './components/ScreenPyramid';
import { ScreenDraftWorkshop } from './components/ScreenDraftWorkshop';
import { ScreenCompletion } from './components/ScreenCompletion';
import { StepId, DecisionNodeData, DecisionOption, NewsDraft, NodeAttempt } from './types/ova';
import { ShieldCheck } from 'lucide-react';

const INITIAL_DRAFT: NewsDraft = {
  studentName: '',
  isAnonymous: false,
  anonymousAlias: 'Reportero Semillero #04',
  studentCode: '',
  aiEthicalNoticeAccepted: true,
  schoolName: 'Institución Educativa Escolar',
  grade: '4.° Grado',
  date: new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
  chosenTheme: 'El nuevo huerto escolar',
  headline: 'El huerto escolar dio sus primeros tomates gracias al trabajo en equipo',
  leadParagraph: {
    what: 'cosecharon más de 15 kilos de tomates frescos',
    who: 'los estudiantes de 4.° grado junto a su profesora',
    when: 'Ayer por la mañana',
    where: 'en el huerto escolar del patio central',
    composedText:
      'Ayer por la mañana, los estudiantes de 4.° grado junto a su profesora cosecharon más de 15 kilos de tomates frescos en el huerto escolar del patio central, inaugurando la temporada de cosecha ecológica.',
  },
  bodyParagraph:
    'El proyecto comenzó hace dos meses con semillas de hortalizas donadas por la comunidad. Los estudiantes se turnaron durante los descansos para regar las plantas y aprender sobre abono orgánico.\n\n"Fue muy emocionante ver crecer los tomates desde que eran pequeñas plantitas", comentó uno de los reporteros de cuarto grado. En las próximas semanas continuarán sembrando lechugas y zanahorias.',
  photoStyle: 'garden',
  caption: 'Estudiantes de 4.° grado cosechando tomates frescos en el huerto escolar.',
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<StepId>('welcome');
  const [studentName, setStudentName] = useState('');
  const [draft, setDraft] = useState<NewsDraft>(INITIAL_DRAFT);
  const [nodeAttempts, setNodeAttempts] = useState<Record<string, NodeAttempt>>({
    node1: { nodeId: 'node1', attempts: 0, completed: false },
    node2: { nodeId: 'node2', attempts: 0, completed: false },
    node3: { nodeId: 'node3', attempts: 0, completed: false },
  });

  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState(false);
  const [isClassroomShareOpen, setIsClassroomShareOpen] = useState(false);
  const [isEthicalAIOpen, setIsEthicalAIOpen] = useState(false);

  // Restore saved progress from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ova_reporteros_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
        if (parsed.studentName) setStudentName(parsed.studentName);
        if (parsed.draft) setDraft(parsed.draft);
        if (parsed.nodeAttempts) setNodeAttempts(parsed.nodeAttempts);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem(
        'ova_reporteros_data',
        JSON.stringify({ currentStep, studentName, draft, nodeAttempts })
      );
    } catch {
      // ignore
    }
  }, [currentStep, studentName, draft, nodeAttempts]);

  const handleUpdateDraft = (updated: Partial<NewsDraft>) => {
    setDraft((prev) => ({ ...prev, ...updated }));
  };

  const handleStudentNameChange = (name: string) => {
    setStudentName(name);
    setDraft((prev) => ({ ...prev, studentName: name }));
  };

  const handleAnonymousChange = (isAnon: boolean, alias: string, code: string) => {
    setDraft((prev) => ({
      ...prev,
      isAnonymous: isAnon,
      anonymousAlias: alias,
      studentCode: code,
    }));
  };

  const handleReset = () => {
    if (window.confirm('¿Deseas reiniciar el OVA desde el principio?')) {
      setCurrentStep('welcome');
      setDraft({ ...INITIAL_DRAFT, studentName: '' });
      setStudentName('');
      setNodeAttempts({
        node1: { nodeId: 'node1', attempts: 0, completed: false },
        node2: { nodeId: 'node2', attempts: 0, completed: false },
        node3: { nodeId: 'node3', attempts: 0, completed: false },
      });
      localStorage.removeItem('ova_reporteros_data');
    }
  };

  // Node 1 Configuration from PDF Guion
  const node1Data: DecisionNodeData = {
    id: 'node1',
    nodeNumber: 1,
    title: '¿Qué noticia voy a contar?',
    question: 'Como reportero, debes elegir un hecho real de tu colegio para tu noticia.',
    hint: 'Piensa en qué hecho le interesa a toda la escuela y no solo a ti en privado.',
    explanationTitle: 'Interés Colectivo Escolar',
    explanationText:
      'Una noticia informa sobre sucesos públicos que importan a la comunidad escolar, a diferencia de los hechos privados o personales.',
    options: [
      {
        id: 'opt1_a',
        label: 'La feria de la ciencia escolar',
        isCorrect: true,
        feedback: '¡Correcto! Es un hecho real y de gran interés para toda la comunidad escolar.',
        themeValue: 'La feria de la ciencia escolar',
      },
      {
        id: 'opt1_b',
        label: 'Mi fin de semana en casa jugando videojuegos',
        isCorrect: false,
        feedback:
          'Incorrecto. Esa es tu vida personal y privada, no una noticia del colegio. Una noticia escolar cuenta un hecho de interés para muchos.',
      },
      {
        id: 'opt1_c',
        label: 'El nuevo huerto escolar y su primera cosecha',
        isCorrect: true,
        feedback: '¡Correcto! Es un hecho escolar colectivo que involucra el trabajo de la escuela.',
        themeValue: 'El nuevo huerto escolar',
      },
    ],
  };

  // Node 2 Configuration from PDF Guion
  const node2Data: DecisionNodeData = {
    id: 'node2',
    nodeNumber: 2,
    title: '¿Cuál es el mejor titular?',
    question: 'Tu noticia necesita un titular que atrape y diga lo esencial. ¿Cuál eliges?',
    hint: 'Un buen titular responde con precisión a la pregunta: ¿qué pasó? No uses títulos vagos.',
    explanationTitle: 'Titular Informativo y Preciso',
    explanationText:
      'El titular resume la acción principal con un verbo claro y despierta el interés sin ambigüedades.',
    options: [
      {
        id: 'opt2_a',
        label: 'Cosas del colegio',
        isCorrect: false,
        feedback:
          'Incorrecto. Ese titular es demasiado vago y no dice qué ocurrió en realidad. Un buen titular siempre responde: ¿qué pasó?',
      },
      {
        id: 'opt2_b',
        label:
          draft.chosenTheme.includes('ciencia')
            ? 'La feria de la ciencia deslumbró con inventos geniales'
            : 'El huerto escolar dio sus primeros tomates',
        isCorrect: true,
        feedback:
          '¡Correcto! Es claro, corto y dice exactamente qué pasó con entusiasmo.',
        headlineValue: draft.chosenTheme.includes('ciencia')
          ? 'La feria de la ciencia deslumbró con inventos geniales'
          : 'El huerto escolar dio sus primeros tomates gracias al trabajo en equipo',
      },
      {
        id: 'opt2_c',
        label: 'Noticia número 1',
        isCorrect: false,
        feedback:
          'Incorrecto. Ese título no aporta ninguna información sobre lo sucedido ni atrae al lector. Inténtalo otra vez.',
      },
    ],
  };

  // Node 3 Configuration from PDF Guion
  const node3Data: DecisionNodeData = {
    id: 'node3',
    nodeNumber: 3,
    title: '¿Por dónde empiezo a escribir?',
    question: 'En una noticia, ¿qué información va primero?',
    hint: 'Recuerda el esquema de la pirámide invertida: la base más ancha va al principio.',
    explanationTitle: 'Pirámide Invertida',
    explanationText:
      'En el periodismo, lo esencial (¿qué?, ¿quién?, ¿cuándo?, ¿dónde?) se ubica en el primer párrafo para que el lector se entere de inmediato.',
    options: [
      {
        id: 'opt3_a',
        label: 'Lo más importante (qué pasó, quiénes participaron, cuándo y dónde)',
        isCorrect: true,
        feedback:
          '¡Correcto! La noticia usa la pirámide invertida: lo más importante va primero. ¡Has desbloqueado la Sala de Redacción!',
      },
      {
        id: 'opt3_b',
        label: 'Un saludo cariñoso a todos los amables lectores',
        isCorrect: false,
        feedback:
          'Incorrecto. Una noticia no es una carta ni un correo personal. El lector quiere saber los hechos esenciales de inmediato sin saludos.',
      },
      {
        id: 'opt3_c',
        label: 'Lo que menos importa al inicio, para dejar la sorpresa al final',
        isCorrect: false,
        feedback:
          'Incorrecto. Eso se hace en los cuentos de misterio, pero en las noticias usamos la pirámide invertida: lo más importante va de primero.',
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800">
      {/* Top Navbar */}
      <Navbar
        currentStep={currentStep}
        onNavigate={(step) => setCurrentStep(step)}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
        onOpenClassroomShare={() => setIsClassroomShareOpen(true)}
        onOpenEthicalAI={() => setIsEthicalAIOpen(true)}
        onReset={handleReset}
      />

      {/* Main Learning Canvas */}
      <main className="flex-1 px-4 sm:px-6 pb-16">
        {currentStep === 'welcome' && (
          <ScreenWelcome
            studentName={studentName}
            isAnonymous={draft.isAnonymous}
            anonymousAlias={draft.anonymousAlias}
            studentCode={draft.studentCode}
            onStudentNameChange={handleStudentNameChange}
            onAnonymousChange={handleAnonymousChange}
            onStart={() => setCurrentStep('concept')}
            onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
            onOpenEthicalAI={() => setIsEthicalAIOpen(true)}
          />
        )}

        {currentStep === 'concept' && (
          <ScreenConcept onContinue={() => setCurrentStep('node1')} />
        )}

        {currentStep === 'node1' && (
          <DecisionNode
            data={node1Data}
            onSuccess={(opt) => {
              setNodeAttempts((prev) => ({
                ...prev,
                node1: { nodeId: 'node1', attempts: prev.node1.attempts + 1, completed: true, selectedOptionId: opt.id },
              }));
              if (opt.themeValue) {
                handleUpdateDraft({
                  chosenTheme: opt.themeValue,
                  photoStyle: opt.themeValue.includes('ciencia') ? 'science' : 'garden',
                });
              }
              setCurrentStep('parts');
            }}
          />
        )}

        {currentStep === 'parts' && (
          <ScreenParts
            chosenThemeTitle={draft.chosenTheme}
            onContinue={() => setCurrentStep('node2')}
          />
        )}

        {currentStep === 'node2' && (
          <DecisionNode
            data={node2Data}
            onSuccess={(opt) => {
              setNodeAttempts((prev) => ({
                ...prev,
                node2: { nodeId: 'node2', attempts: prev.node2.attempts + 1, completed: true, selectedOptionId: opt.id },
              }));
              if (opt.headlineValue) {
                handleUpdateDraft({ headline: opt.headlineValue });
              }
              setCurrentStep('pyramid');
            }}
          />
        )}

        {currentStep === 'pyramid' && (
          <ScreenPyramid onContinue={() => setCurrentStep('node3')} />
        )}

        {currentStep === 'node3' && (
          <DecisionNode
            data={node3Data}
            onSuccess={(opt) => {
              setNodeAttempts((prev) => ({
                ...prev,
                node3: { nodeId: 'node3', attempts: prev.node3.attempts + 1, completed: true, selectedOptionId: opt.id },
              }));
              setCurrentStep('workshop');
            }}
          />
        )}

        {currentStep === 'workshop' && (
          <ScreenDraftWorkshop
            draft={draft}
            onUpdateDraft={handleUpdateDraft}
            onCompleteWorkshop={() => setCurrentStep('completed')}
          />
        )}

        {currentStep === 'completed' && (
          <ScreenCompletion
            draft={draft}
            nodeAttempts={nodeAttempts}
            onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
            onOpenClassroomShare={() => setIsClassroomShareOpen(true)}
            onOpenEthicalAI={() => setIsEthicalAIOpen(true)}
            onRestart={() => setCurrentStep('welcome')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-amber-200 py-6 px-4 text-center text-xs text-slate-500 space-y-1 no-print">
        <p className="font-semibold text-slate-700">
          Didactic@TIC • Módulo 1: Recursos Interactivos • Lengua Castellana Grado 4.°
        </p>
        <p>
          Objeto Virtual de Aprendizaje (OVA) alineado con los Estándares DBA y marco DigCompEdu (A3.1 y A3.2)
        </p>
        <div className="pt-2 flex flex-wrap justify-center items-center gap-3 text-[11px] text-emerald-800">
          <button
            onClick={() => setIsEthicalAIOpen(true)}
            className="hover:underline font-bold flex items-center gap-1 text-emerald-700"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Declaración de Uso Ético de la IA y Anonimización Escolar</span>
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={() => setIsTeacherGuideOpen(true)}
            className="hover:underline font-semibold text-indigo-700"
          >
            Ficha Pedagógica y Rúbrica
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={() => setIsClassroomShareOpen(true)}
            className="hover:underline font-semibold text-emerald-700"
          >
            Compartir en Google Classroom
          </button>
        </div>
      </footer>

      {/* Modals */}
      <TeacherGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
      />
      <ClassroomShareModal
        isOpen={isClassroomShareOpen}
        onClose={() => setIsClassroomShareOpen(false)}
      />
      <EthicalAIModal
        isOpen={isEthicalAIOpen}
        onClose={() => setIsEthicalAIOpen(false)}
      />
    </div>
  );
}

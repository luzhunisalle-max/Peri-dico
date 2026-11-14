export type StepId =
  | 'welcome'
  | 'concept'
  | 'node1'
  | 'parts'
  | 'node2'
  | 'pyramid'
  | 'node3'
  | 'workshop'
  | 'completed';

export interface DecisionOption {
  id: string;
  label: string;
  isCorrect: boolean;
  feedback: string;
  themeValue?: string;
  headlineValue?: string;
}

export interface DecisionNodeData {
  id: 'node1' | 'node2' | 'node3';
  nodeNumber: number;
  title: string;
  question: string;
  hint: string;
  options: DecisionOption[];
  explanationTitle: string;
  explanationText: string;
}

export interface NewsDraft {
  studentName: string;
  isAnonymous: boolean;
  anonymousAlias: string;
  studentCode: string;
  aiEthicalNoticeAccepted: boolean;
  schoolName: string;
  grade: string;
  date: string;
  chosenTheme: string;
  headline: string;
  leadParagraph: {
    what: string;
    who: string;
    when: string;
    where: string;
    composedText: string;
  };
  bodyParagraph: string;
  photoStyle: 'science' | 'garden' | 'sports' | 'books' | 'art';
  caption: string;
}

export interface NodeAttempt {
  nodeId: string;
  attempts: number;
  completed: boolean;
  selectedOptionId?: string;
}

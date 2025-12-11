export enum PersonaType {
  ANGRY_CUSTOMER = 'ANGRY_CUSTOMER',
  CONFUSED_USER = 'CONFUSED_USER',
  VIP_DEMANDING = 'VIP_DEMANDING',
  TROLL = 'TROLL'
}

export interface Scenario {
  id: string;
  title: string;
  category: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile' | 'Extrême';
  duration: string; // Used as Max Resolution Time
  description: string;
  personaName: string;
  personaRole: string; // e.g., "Client depuis 10 ans", "Nouvel utilisateur"
  personaAvatar: string;
  systemInstruction: string; // The prompt for the AI
  initialMessage: string;
  objectives: string[];
  customerInfo?: {
    plan: string;
    ltv: string; // Lifetime Value
    churnRisk: 'Faible' | 'Moyen' | 'Élevé' | 'Critique';
    lastTicket: string;
  };
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface AnalysisReport {
  csatScore: number; // 1 to 5 stars
  empathyScore: number; // 0-100
  patienceScore: number; // 0-100
  solutionRelevance: number; // 0-100
  deEscalationScore: number; // 0-100
  keyMoments: { time: string; title: string; description: string; type: 'positive' | 'negative' | 'neutral' }[];
  feedback: {
    strengths: string[];
    improvements: string[];
    toneAnalysis: string;
    forbiddenWordsUsed: string[];
  };
  coachTip: string;
}
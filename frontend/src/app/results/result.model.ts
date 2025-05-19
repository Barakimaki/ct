export interface TestResult {
  sessionId: number;
  testName: string;
  subject: string;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  completedAt: Date;
  questions: ResultQuestion[];
}

export interface ResultQuestion {
  questionId: number;
  text: string;
  options: string[];
  correctAnswers: string[];
  selectedAnswers: string[];
  isCorrect: boolean;
  explanation?: string;
}

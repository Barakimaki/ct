export interface TestResult {
  sessionId: string;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  questions: ResultQuestion[];
}

export interface ResultQuestion {
  questionId: string;
  text: string;
  selectedAnswers: string[];
  correctAnswers: string[];
  isCorrect: boolean;
  explanation?: string;
}

export interface TestResult {
  sessionId: number;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  questions: ResultQuestion[];
}

export interface ResultQuestion {
  questionId: number;
  text: string;
  selectedAnswers: string[];
  correctAnswers: string[];
  isCorrect: boolean;
  explanation?: string;
}

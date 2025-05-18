export interface UserTestResult {
  sessionId: string;
  testId: string;
  testName: string;
  subject: string;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  completedAt: Date;
}

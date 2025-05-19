export interface UserTestResult {
  sessionId: number;
  testId: number;
  testName: string;
  subject: string;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  completedAt: Date;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswers: string[];
  explanation?: string;
  type: 'single' | 'multiple' | 'open';
  testId: number;
}

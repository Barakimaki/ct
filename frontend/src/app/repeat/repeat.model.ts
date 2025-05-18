export interface RepeatQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswers: string[];
  explanation?: string;
  type: 'single' | 'multiple' | 'open';
}

export class CreateQuestionDto {
    text: string;
    options: string[];
    correctAnswers: string[];
    explanation?: string;
    type: 'single' | 'multiple' | 'open';
    testId: string;
}
export class UpdateQuestionDto {
    text?: string;
    options?: string[];
    correctAnswers?: string[];
    explanation?: string;
    type?: 'single' | 'multiple' | 'open';
}
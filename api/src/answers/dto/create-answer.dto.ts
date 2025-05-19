export class CreateAnswerDto {
    sessionId: number;
    questionId: number;
    selectedAnswers: string[];
    isCorrect: boolean;
}
export class CreateAnswerDto {
    sessionId: string;
    questionId: string;
    selectedAnswers: string[];
    isCorrect: boolean;
}
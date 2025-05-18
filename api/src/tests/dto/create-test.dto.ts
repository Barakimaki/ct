export class CreateTestDto {
    title: string;
    description?: string;
    subjectId: string;
    isExamMode?: boolean;
    timeLimitMinutes?: number;
}
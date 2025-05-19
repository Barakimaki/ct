import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Session } from '../sessions/session.entity';
import { Question } from '../questions/question.entity';

@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'json' })
    selectedAnswers: string[];

    @Column()
    isCorrect: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    answeredAt: Date;

    // Связь с Session
    @ManyToOne(() => Session, (session) => session.answers)
    @JoinColumn({ name: 'sessionId' })
    session: Session;

    @Column()
    sessionId: number;

    // Связь с Question
    @ManyToOne(() => Question, (question) => question.answers)
    @JoinColumn({ name: 'questionId' })
    question: Question;

    @Column()
    questionId: number;
}

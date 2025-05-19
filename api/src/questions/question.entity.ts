import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { Test } from '../tests/test.entity';
import { Answer } from '../answers/answer.entity';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    text: string;

    @Column({ type: 'json' })
    options: string[];

    @Column({ type: 'json' })
    correctAnswers: string[];

    @Column({ type: 'text', nullable: true })
    explanation: string;

    @Column({
        type: 'enum',
        enum: ['single', 'multiple', 'open'],
        default: 'single',
    })
    type: 'single' | 'multiple' | 'open';

    @ManyToOne(() => Test, (test) => test.questions)
    @JoinColumn({ name: 'testId' })
    test: Test;

    @Column()
    testId: number;

    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[];
}
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany, JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Test } from '../tests/test.entity';
import { Answer } from '../answers/answer.entity';

@Entity()
export class Session {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    startedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    finishedAt: Date;

    @Column({ default: false })
    isFinished: boolean;

    @Column({ type: 'int', default: 0 })
    correctAnswersCount: number;

    @Column({ type: 'int', default: 0 })
    totalQuestions: number;

    @ManyToOne(() => User, (user) => user.sessions)
    user: User;

    @ManyToOne(() => Test, (t) => t.sessions)
    @JoinColumn({ name: 'testId' })
    test!: Test;

    @OneToMany(() => Answer, (answer) => answer.session)
    answers: Answer[];
}
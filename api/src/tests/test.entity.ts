import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany, JoinColumn,
} from 'typeorm';
import { Subject } from '../subjects/subject.entity';
import { Question } from '../questions/question.entity';
import {Session} from "../sessions/session.entity";

@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ default: false }) // режим экзамена
    isExamMode: boolean;

    @Column({ type: 'int', nullable: true }) // время в минутах
    timeLimitMinutes?: number;

    @ManyToOne(() => Subject, (s) => s.tests)
    @JoinColumn({ name: 'subjectId' })
    subject: Subject;

    @Column()
    subjectId: number;

    @OneToMany(() => Question, (q) => q.test)
    questions: Question[];

    @OneToMany(() => Session, (session) => session.test)
    sessions: Session[];
}
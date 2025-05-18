import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Subject } from '../subjects/subject.entity';
import { Question } from '../questions/question.entity';
import {Session} from "../sessions/session.entity";

@Entity()
export class Test {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ default: false }) // режим экзамена
    isExamMode: boolean;

    @Column({ type: 'int' }) // время в минутах
    timeLimitMinutes?: number;

    @ManyToOne(() => Subject, (s) => s.tests)
    subject: Subject;

    @OneToMany(() => Question, (q) => q.test)
    questions: Question[];

    @OneToMany(() => Session, (session) => session.test)
    sessions: Session[];
}
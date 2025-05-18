import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Session} from "../sessions/session.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fullName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Session, (session) => session.user)
    sessions: Session[];
}
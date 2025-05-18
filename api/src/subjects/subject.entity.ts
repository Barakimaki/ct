import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Test} from "../tests/test.entity";

@Entity()
export class Subject {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string; // например: "Математика"

    @OneToMany(() => Test, (test) => test.subject)
    tests: Test[];
}
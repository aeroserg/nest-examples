import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column({ nullable: true })
    description: string;

    @Column({ default: false })
    isRead: boolean;

    @Column({ type: 'integer', nullable: true })
    rating: number;

    @Column({ type: 'integer', nullable: false })
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import User from '../../../../users/infra/typeorm/entities/User';

@Entity('coverage')
class Coverage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer')
  origin: number;

  @Column('integer')
  destination: number;

  @Column('numeric')
  price: number;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
export default Coverage;

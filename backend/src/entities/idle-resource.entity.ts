import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum IdleResourceStatus {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  CLOSED = 'Closed',
}

export enum ResourceSource {
  INTERNAL = 'Internal',
  EXTERNAL = 'External',
  REFERRAL = 'Referral',
}

@Entity('idle_resources')
export class IdleResource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeId: string;

  @Column()
  employeeName: string;

  @Column()
  department: string;

  @Column({ type: 'date' })
  idleFromDate: Date;

  @Column({
    type: 'enum',
    enum: IdleResourceStatus,
    default: IdleResourceStatus.OPEN,
  })
  status: IdleResourceStatus;

  @Column({ type: 'text', nullable: true })
  processNote: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  rate: number;

  @Column({ type: 'text' })
  skills: string;

  @Column({
    type: 'enum',
    enum: ResourceSource,
    default: ResourceSource.INTERNAL,
  })
  source: ResourceSource;

  @Column({ default: false })
  isUrgent: boolean;

  @Column({ nullable: true })
  cvFilePath: string;

  @Column({ nullable: true })
  cvFileName: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column()
  createdById: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updatedById' })
  updatedBy: User;

  @Column()
  updatedById: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

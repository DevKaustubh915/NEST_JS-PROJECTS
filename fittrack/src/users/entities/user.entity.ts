/* eslint-disable */
import { UserPlan } from 'src/user-plans/entities/user-plan.entity';
import { WorkoutLog } from 'src/workout-logs/entities/workout-log.entity';
import { WorkoutPlan } from 'src/workout-plans/entities/workout-plan.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  age: number;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ type: 'float', nullable: true })
  height: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({default: true})
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  //Relations
  @OneToMany(()=> WorkoutLog, (log)=> log.user)
  workoutLogs: WorkoutLog[];

  @OneToMany(()=> UserPlan, (userplan)=> userplan.user)
  userPlans:UserPlan[];

  @OneToMany(()=> WorkoutPlan, (plan)=> plan.createdBy)
  createdPlans:WorkoutPlan[];
}

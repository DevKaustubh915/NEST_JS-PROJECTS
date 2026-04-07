// src/user-plans/entities/user-plan.entity.ts
/* eslint-disable */

import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { WorkoutPlan } from '../../workout-plans/entities/workout-plan.entity';

export enum PlanStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

@Entity('user_plans')
export class UserPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: PlanStatus, default: PlanStatus.ACTIVE })
  status: PlanStatus;

  @CreateDateColumn()
  enrolled_at: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.userPlans, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => WorkoutPlan, (plan) => plan.userPlans, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plan_id' })
  workoutPlan: WorkoutPlan;
}
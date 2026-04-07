// src/workout-plans/entities/workout-plan.entity.ts
/* eslint-disable */

import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UserPlan } from '../../user-plans/entities/user-plan.entity';
import { PlanExercise } from './exercise-plan.entity';

@Entity('workout_plans')
export class WorkoutPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.createdPlans)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @OneToMany(() => PlanExercise, (pe) => pe.workoutPlan)
  planExercises: PlanExercise[];

  @OneToMany(() => UserPlan, (userPlan) => userPlan.workoutPlan)
  userPlans: UserPlan[];
}
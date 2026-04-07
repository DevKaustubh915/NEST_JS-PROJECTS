// src/workout-plans/entities/plan-exercise.entity.ts
/* eslint-disable */

import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { WorkoutPlan } from './workout-plan.entity';
import { Exercise } from 'src/exercises/entiries/exercise.entity';

@Entity('plan_exercises')
export class PlanExercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sets: number;

  @Column()
  reps: number;

  @Column({ nullable: true })
  rest_time: number; // in seconds

  // Relations
  @ManyToOne(() => WorkoutPlan, (plan) => plan.planExercises, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plan_id' })
  workoutPlan: WorkoutPlan;

  @ManyToOne(() => Exercise, (exercise) => exercise.planExercises, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;
}
// src/workout-logs/entities/workout-log.entity.ts
/* eslint-disable */

import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Exercise } from 'src/exercises/entiries/exercise.entity';

@Entity('workout_logs')
export class WorkoutLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sets_done: number;

  @Column()
  reps_done: number;

  @Column({ type: 'float', nullable: true })
  weight_used: number; // in kg

  @CreateDateColumn()
  logged_at: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.workoutLogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Exercise, (exercise) => exercise.workoutLogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;
}
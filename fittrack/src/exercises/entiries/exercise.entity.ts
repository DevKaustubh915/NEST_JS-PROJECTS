/* eslint-disable */
import { PlanExercise } from 'src/workout-plans/entities/exercise-plan.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WorkoutLog } from 'src/workout-logs/entities/workout-log.entity';


export enum Difficulty{
    BEGINNER='beginner',
    INTERMEDIATE='intermediate',
    ADVANCED='advanced',
}

@Entity('exercises')
export class Exercise{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:String;

    @Column({type:'text', nullable:true})
    description:string;

    @Column()
    muscle_group:string;

    @Column({type:'enum', enum:Difficulty, default:Difficulty.BEGINNER})
    Difficulty:Difficulty;

    @CreateDateColumn()
    created_at:Date;

    //Relations
    @OneToMany(()=> PlanExercise, (pe)=>pe.exercise)
    planExercises:PlanExercise[];

    @OneToMany(()=> WorkoutLog, (log)=> log.exercise)
    workoutLogs:WorkoutLog[];
}

import { BaseEntity as base, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export abstract class BaseEntity extends base {
  @PrimaryGeneratedColumn('increment')
  id: number

  @CreateDateColumn({ type: 'time with time zone' })
  created_at: Date

  @UpdateDateColumn({ type: 'time with time zone' })
  updated_at: Date
}
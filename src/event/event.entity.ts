import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum EventType {
  CROSS_PROMO = 'crosspromo',
  LIVE_OPS = 'liveops',
  APP = 'app',
  ADS = 'ads',
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 48 })
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: EventType,
    default: EventType.APP,
  })
  type: string;

  @Column({ type: 'smallint' })
  priority: number;
}

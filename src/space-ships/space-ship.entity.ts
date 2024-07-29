import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SpaceShip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  manufacturer: string;

  @Column()
  passengerCapacity: number;
}
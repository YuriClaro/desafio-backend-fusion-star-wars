import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Planet } from '../planets/planet.entity'

@Entity()
export class StarSystem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Planet, planet => planet.id)
    planets:  Planet[];
}
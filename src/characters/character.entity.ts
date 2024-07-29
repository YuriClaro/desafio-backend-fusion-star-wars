import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Planet } from '../planets/planet.entity';

@Entity()
export class Character {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    race: string;

    @Column()
    affiliation: string;

    @ManyToOne(() => Planet, planet => planet.id)
    homePlanet: Planet;
}
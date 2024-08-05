import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Planet } from '../planets/planet.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Character {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'ID do personagem' })
    id: number;

    @Column()
    @ApiProperty({ example: 'Luke Skywalker', description: 'Nome do personagem' })
    name: string;

    @Column()
    @ApiProperty({ example: 'Human', description: 'Raça do personagem' })
    race: string;

    @Column()
    @ApiProperty({ example: 'Jedi', description: 'Afiliação do personagem' })
    affiliation: string;

    @ManyToOne(() => Planet, planet => planet.id)
    @ApiProperty({ type: () => Planet, description: 'Planeta de origem do personagem' })
    homePlanet: Planet;
}
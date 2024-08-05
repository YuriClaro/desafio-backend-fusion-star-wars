import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Planet } from '../planets/planet.entity'
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class StarSystem {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'O identificador único do sistema estelar' })
    id: number;

    @Column()
    @ApiProperty({ example: 'Sistema Solar', description: 'O nome do sistema estelar' })
    name: string;

    @Column()
    @ApiProperty({ example: 'Um sistema estelar que contém o planeta Terra.', description: 'A descrição do sistema estelar' })
    description: string;

    @OneToMany(() => Planet, planet => planet.id)
    @ApiProperty({ type: () => [Planet], description: 'Lista de planetas no sistema estelar' })
    planets:  Planet[];
}
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Planet {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'ID do planeta' })
    id: number;

    @Column()
    @ApiProperty({ example: 'Tatooine', description: 'Nome do planeta' })
    name: string;

    @Column()
    @ApiProperty({ example: 'Arid', description: 'Clima do planeta' })
    climate: string;

    @Column()
    @ApiProperty({ example: 'Desert', description: 'Tipo de solo do planeta' })
    ground: string;

    @Column()
    @ApiProperty({ example: 200000, description: 'População do planeta' })
    population: number;
}
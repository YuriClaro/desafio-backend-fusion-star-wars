import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class SpaceShip {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID da nave espacial' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Millennium Falcon', description: 'Nome da nave espacial' })
  name: string;

  @Column()
  @ApiProperty({ example: 'YT-1300', description: 'Modelo da nave espacial' })
  model: string;

  @Column()
  @ApiProperty({ example: 'Corellian Engineering Corporation', description: 'Fabricante da nave espacial' })
  manufacturer: string;

  @Column()
  @ApiProperty({ example: 6, description: 'Capacidade de passageiros da nave espacial' })
  passengerCapacity: number;
}
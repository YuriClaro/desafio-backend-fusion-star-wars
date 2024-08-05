import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Affiliation } from "./users.affiliation.enum";
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Identificador único do usuário', example: 1 })
    userId: number;

    @Column(({ unique: true }))
    @ApiProperty({ description: 'Nome de usuário único', example: 'john_doe' })
    username: string;

    @Column()
    @ApiProperty({ description: 'Senha do usuário', example: 'password123' })
    password: string;

    @Column()
    @ApiProperty({ description: 'Afiliação do usuário', enum: Affiliation, example: Affiliation.REBEL })
    affiliation: Affiliation;
  }
  
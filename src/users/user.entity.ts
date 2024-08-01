import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Affiliation } from "./users.affiliation.enum";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    userId: number;

    @Column(({ unique: true }))
    username: string;

    @Column()
    password: string;

    @Column()
    affiliation: Affiliation;
  }
  
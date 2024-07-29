import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpaceShip } from './space-ship.entity'

@Injectable()
export class SpaceShipsService {
    constructor(
        @InjectRepository(SpaceShip)
        private readonly spaceshipRepository: Repository<SpaceShip>
    ) {}

    create(spaceship: SpaceShip): Promise<SpaceShip> {
        return this.spaceshipRepository.save(spaceship);
    }

    findAll(): Promise<SpaceShip[]> {
        return this.spaceshipRepository.find();
    }

    async findSpaceShipById(id: number): Promise<SpaceShip | undefined> {
        return this.spaceshipRepository.findOneBy({ id });
      }

    async update(id: number, updateSpaceShipDto: SpaceShip): Promise<SpaceShip> {
        await this.spaceshipRepository.update(id, updateSpaceShipDto);
        return this.findSpaceShipById(id);
    }

    async remove(id: number): Promise<void> {
        await this.spaceshipRepository.delete(id);
    }
}

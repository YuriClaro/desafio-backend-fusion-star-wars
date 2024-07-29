import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StarSystem } from './star-system.entity'

@Injectable()
export class StarSystemsService {
    constructor(
        @InjectRepository(StarSystem)
        private readonly starsystemRepository: Repository<StarSystem>
    ) {}

    create(starSystem: StarSystem): Promise<StarSystem> {
        return this.starsystemRepository.save(starSystem);
    }

    findAll(): Promise<StarSystem[]> {
        return this.starsystemRepository.find();
    }

    async findStarSystemById(id: number): Promise<StarSystem | undefined> {
        return this.starsystemRepository.findOneBy({ id });
      }

    async update(id: number, updatePlanetDto: StarSystem): Promise<StarSystem> {
        await this.starsystemRepository.update(id, updatePlanetDto);
        return this.findStarSystemById(id);
    }

    async remove(id: number): Promise<void> {
        await this.starsystemRepository.delete(id);
    }
}

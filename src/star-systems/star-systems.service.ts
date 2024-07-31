import { Injectable, NotFoundException } from '@nestjs/common';
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

    async remove(id: number): Promise<boolean> {
        const result = await this.starsystemRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Sistema solar com o ID: ${id} não encontrado`);
        }
        return result.affected > 0;
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planet } from './planet.entity'

@Injectable()
export class PlanetsService {
    constructor(
        @InjectRepository(Planet)
        private readonly planetRepository: Repository<Planet>
    ) {}

    create(planet: Planet): Promise<Planet> {
        return this.planetRepository.save(planet);
    }

    findAll(): Promise<Planet[]> {
        return this.planetRepository.find();
    }

    async findPlanetById(id: number): Promise<Planet | undefined> {
    return this.planetRepository.findOneBy({ id });
    }

    async update(id: number, updatePlanetDto: Planet): Promise<Planet> {
        await this.planetRepository.update(id, updatePlanetDto);
        return this.findPlanetById(id);
    }

    async remove(id: number): Promise<boolean> {
        const result = await this.planetRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Planeta com o ID: ${id} não encontrado`);
        }
        return result.affected > 0;
    }
}

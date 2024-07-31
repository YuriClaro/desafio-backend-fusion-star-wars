import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './character.entity'


@Injectable()
export class CharactersService {
    constructor(
        @InjectRepository(Character)
        private readonly characterRepository: Repository<Character>
    ) {}

    create(character: Character): Promise<Character> {
        return this.characterRepository.save(character);
    }

    findAll(): Promise<Character[]> {
        return this.characterRepository.find();
    }

    async findCharacterById(id: number): Promise<Character | undefined> {
        return this.characterRepository.findOneBy({ id });
    }

    async update(id: number, updateCharacterDto: Character): Promise<Character> {
        await this.characterRepository.update(id, updateCharacterDto);
        return this.findCharacterById(id);
    }

    async remove(id: number): Promise<boolean> {
        const result = await this.characterRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Personagem com o ID: ${id} não encontrado.`)
        }
        return result.affected > 0;
    }
}

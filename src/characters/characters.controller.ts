import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { Character } from './character.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('characters')
export class CharactersController {
    constructor(private readonly characterService: CharactersService) {}

    @Post()
    create(@Body() createCharacteraDto: Character): Promise<Character> {
        return this.characterService.create(createCharacteraDto);
    }

    @Get()
    findAll(): Promise<Character[]> {
        return this.characterService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Character> {
        return this.characterService.findCharacterById(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updatedCharacterDto: Character): Promise<Character> {
        return this.characterService.update(id, updatedCharacterDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.characterService.remove(id);
    }
}
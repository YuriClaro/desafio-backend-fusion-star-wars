import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, NotFoundException, BadRequestException, InternalServerErrorException, ParseIntPipe, UsePipes, ValidationPipe  } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { Character } from './character.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationException } from 'src/exceptions/validation.exception';

@UseGuards(JwtAuthGuard)
@Controller('characters')
export class CharactersController {
    constructor(private readonly characterService: CharactersService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true}))
    async create(@Body() createCharacteraDto: Character): Promise<Character> {
        try {
            return await this.characterService.create(createCharacteraDto);
        } catch (error) {
            if (error instanceof ValidationException) {
                throw new BadRequestException('Solicitação Invalida, verifique às informações');
            } else {
                throw new InternalServerErrorException('Um erro insperado aconteceu enquanto o personagem estava sendo criado')
            }
        }
    }

    @Get()
    async findAll(): Promise<Character[]> {
        try {
            const character = await this.characterService.findAll();
            if (character.length === 0) {
                throw new NotFoundException('Nenhum personagem foi encontrado.')
            }
            return character;
        } catch (error) {
            throw new InternalServerErrorException('Um erro inesperado aconteceu enquanto recuperava os personagens.')
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Character> {
        try {
            const character = await this.characterService.findCharacterById(id);
            if (!character) {
                throw new NotFoundException(`Personagem com o id: ${id} não encontrado.`)
            } return character;
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException('Invalid ID format.');
            } else {
                throw new InternalServerErrorException('Um erro inesperado aconteceu enquanto retornava o personagem')
            }
        }
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true}))
    async update(@Param('id') id: number, @Body() updatedCharacterDto: Character): Promise<Character> {
        try {
            const updatedCharacter = await this.characterService.update(id, updatedCharacterDto);
            if(!updatedCharacter) {
                throw new NotFoundException(`Personagem com o ID: ${id} não encontrado.`)
            }
            return updatedCharacter;
        } catch (error) {
            if (error instanceof ValidationException) {
                throw new BadRequestException('Solicitação inválida.')
            } else if (error instanceof BadRequestException) {
                throw new BadRequestException('Formato invalido para ID.')
            } else {
                throw new InternalServerErrorException('Um erro inesperado aconteceu enquanto retornava o personagem.')
            }
        }
        
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        try {
            const result = await this.characterService.remove(id);
            if (!result) {
                throw new NotFoundException(`Planeta com o ID: ${id} não encontrado.`);
            }
        } catch (error) {
            if (error instanceof ValidationException) {
                throw new BadRequestException('Solicitação inválida.')
            } else if (error instanceof BadRequestException) {
                throw new BadRequestException('Formato invalido para ID.')
            } else {
                throw new InternalServerErrorException('Um erro inesperado aconteceu enquanto retornava o planeta.')
            }
        }
    }
}
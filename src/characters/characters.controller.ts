import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, NotFoundException, BadRequestException, InternalServerErrorException, ParseIntPipe, UsePipes, ValidationPipe  } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { Character } from './character.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationException } from 'src/exceptions/validation.exception';
import { ApiOperation, ApiParam, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Characters')
@Controller('characters')
@ApiBearerAuth()
export class CharactersController {
    constructor(private readonly characterService: CharactersService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true}))
    @ApiOperation({ summary: 'Criar um novo personagem.'})
    @ApiResponse({ status: 201, description: 'O personagem foi criado com sucesso.'})
    @ApiResponse({ status: 400, description: 'Solicitação incorreta, cheque as informações.'})
    @ApiResponse({ status: 500, description: 'Erro inesperado enquanto o personagem estava sendo criado.'})
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

    @ApiOperation({ summary: 'Retornando todos os personagens.'})
    @ApiResponse({ status: 201, description: 'Retornando todos os personagens.'})
    @ApiResponse({ status: 400, description: 'Nenhum personagem encontrado.'})
    @ApiResponse({ status: 500, description: 'Erro inesperado enquanto retornavem o personagem criado.'})
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
    @ApiOperation({ summary: 'Retornando um personagem por ID',})
    @ApiParam({ name: 'id', required: true, description: 'Personagem ID', type: Number })
    @ApiResponse({ status: 200, description: 'Personagem retornado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Personagem não encontrado.' })
    @ApiResponse({ status: 400, description: 'Formato inválido.' })
    @ApiResponse({ status: 500, description: 'Um erro inesperado aconteceu enquanto recuperava o personagem.' })
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

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true}))
    @ApiOperation({ summary: 'Atualizando um personagem por ID' })
    @ApiParam({ name: 'id', required: true, description: 'Personagem ID', type: Number  })
    @ApiResponse({ status: 200, description: 'Retornando o personagem.' })
    @ApiResponse({ status: 404, description: 'Personagem não encontrado.' })
    @ApiResponse({ status: 400, description: 'Formato inválido.' })
    @ApiResponse({ status: 500, description: 'Um erro inesperado aconteceu enquanto atualizava o personagem.' })
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

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Deletando um personagem por ID' })
    @ApiParam({ name: 'id', required: true, description: 'Personagem ID', type: Number  })
    @ApiResponse({ status: 200, description: 'Retornando o personagem.' })
    @ApiResponse({ status: 404, description: 'Personagem não encontrado.' })
    @ApiResponse({ status: 400, description: 'Formato inválido.' })
    @ApiResponse({ status: 500, description: 'Um erro inesperado aconteceu enquanto deletava o personagem.' })
    async remove(@Param('id') id: number): Promise<void> {
        try {
            const result = await this.characterService.remove(id);
            if (!result) {
                throw new NotFoundException(`Personagem com o ID: ${id} não encontrado.`);
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
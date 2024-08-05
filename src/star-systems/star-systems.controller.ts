import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, NotFoundException, BadRequestException, InternalServerErrorException, ParseIntPipe, UsePipes, ValidationPipe  } from '@nestjs/common';
import { StarSystemsService } from './star-systems.service';
import { StarSystem } from './star-system.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationException } from 'src/exceptions/validation.exception';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Star Systems')
@Controller('star-systems')
export class StarSystemsController {
    constructor(private readonly starSystemService: StarSystemsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true}))
    @ApiOperation({ summary: 'Cria um novo sistema estelar' })
    @ApiResponse({ status: 201, description: 'O sistema estelar foi criado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Solicitação inválida, verifique as informações.' })
    @ApiResponse({ status: 500, description: 'Um erro inesperado aconteceu enquanto o sistema estelar estava sendo criado.' })
    async create(@Body() createStarSystemaDto: StarSystem): Promise<StarSystem> {
        try {
            return await this.starSystemService.create(createStarSystemaDto);
        } catch (error) {
            if (error instanceof ValidationException) {
                throw new BadRequestException('Solicitação Invalida, verifique às informações');
            } else {
                throw new InternalServerErrorException('Um erro insperado aconteceu enquanto o sistema solar estava sendo criado')
            }
        }
    }

    @Get()
    @ApiOperation({ summary: 'Recupera todos os sistemas estelares' })
    @ApiResponse({ status: 200, description: 'Lista de sistemas estelares recuperada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Nenhum sistema estelar foi encontrado.' })
    @ApiResponse({ status: 500, description: 'Um erro inesperado aconteceu enquanto recuperava os sistemas estelares.' })
    async findAll(): Promise<StarSystem[]> {
        try {
            const starSystem = await this.starSystemService.findAll();
            if (starSystem.length === 0) {
                throw new NotFoundException('Nenhum sistema solar foi encontrado.')
            }
            return starSystem;
        } catch (error) {
            throw new InternalServerErrorException('Um erro inesperado aconteceu enquanto recuperava os sistemas solares.')
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Recupera um sistema estelar pelo ID' })
    @ApiParam({ name: 'id', description: 'O identificador único do sistema estelar', type: Number })
    @ApiResponse({ status: 200, description: 'Sistema estelar recuperado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Sistema estelar com o ID fornecido não foi encontrado.' })
    @ApiResponse({ status: 500, description: 'Um erro inesperado aconteceu enquanto recuperava o sistema estelar.' })
    async findOne(@Param('id') id: number): Promise<StarSystem> {
        try {
            const starSystem = await this.starSystemService.findStarSystemById(id);
            if (!starSystem) {
                throw new NotFoundException(`Sistema solar com o ID: ${id} não encontrado.`)
            }
            return starSystem;
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException('Invalid ID format.');
            } else {
                throw new InternalServerErrorException('Um erro inesperado aconteceu enquanto retornava o sistema solar')
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true}))
    @ApiOperation({ summary: 'Atualiza um sistema estelar pelo ID' })
    @ApiParam({ name: 'id', description: 'O identificador único do sistema estelar', type: Number })
    @ApiResponse({ status: 200, description: 'Sistema estelar atualizado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Solicitação inválida, verifique as informações.' })
    @ApiResponse({ status: 404, description: 'Sistema estelar com o ID fornecido não foi encontrado.' })
    @ApiResponse({ status: 500, description: 'Um erro inesperado aconteceu enquanto atualizava o sistema estelar.' })
    async update(@Param('id') id: number, @Body() updatedStarSystemDto: StarSystem): Promise<StarSystem> {
        try {
            const updatedStarSystem = await this.starSystemService.update(id, updatedStarSystemDto);
            if (!updatedStarSystem) {
                throw new NotFoundException(`Sistema solar com o ID: ${id} não encontrado.`)
            }
            return updatedStarSystem;
        } catch (error) {
            if (error instanceof ValidationException) {
                throw new BadRequestException('Solicitação inválida.')
            } else if (error instanceof BadRequestException) {
                throw new BadRequestException('Formato invalido para ID.')
            } else {
                throw new InternalServerErrorException('Um erro inesperado aconteceu enquanto retornava o sistema solar.')
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Remove um sistema estelar pelo ID' })
    @ApiParam({ name: 'id', description: 'O identificador único do sistema estelar', type: Number })
    @ApiResponse({ status: 200, description: 'Sistema estelar removido com sucesso.' })
    @ApiResponse({ status: 404, description: 'Sistema estelar com o ID fornecido não foi encontrado.' })
    @ApiResponse({ status: 500, description: 'Um erro inesperado aconteceu enquanto removia o sistema estelar.' })
    async remove(@Param('id') id: number): Promise<void> {
        try {
            const result = await this.starSystemService.remove(id);
            if (!result) {
                throw new NotFoundException(`Sistema solar com o ID: ${id} não encontrado.`);
            }
        } catch (error) {
            if (error instanceof ValidationException) {
                throw new BadRequestException('Solicitação inválida.')
            } else if (error instanceof BadRequestException) {
                throw new BadRequestException('Formato invalido para ID.')
            } else {
                throw new InternalServerErrorException('Um erro inesperado aconteceu enquanto retornava o sistema solar.')
            }
        }
    }

}

import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, NotFoundException, BadRequestException, InternalServerErrorException, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { Planet } from './planet.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationException } from 'src/exceptions/validation.exception';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { LoggerService } from '../logger/logger.service';

@ApiTags('Planetas')
@Controller('planets')
export class PlanetsController {
    constructor(private readonly planetService: PlanetsService, private readonly loggerService : LoggerService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true}))
    @ApiOperation({ summary: 'Cria um novo planeta' })
    @ApiResponse({ status: 201, description: 'O planeta foi criado com sucesso.', type: Planet })
    @ApiResponse({ status: 400, description: 'Solicitação inválida, verifique as informações.' })
    @ApiResponse({ status: 500, description: 'Um erro inesperado aconteceu enquanto o planeta estava sendo criado.' })
    async create(@Body() createPlanetaDto: Planet): Promise<Planet> {
        try {
            this.loggerService.log('Criando um novo planeta.')
            return await this.planetService.create(createPlanetaDto);
        } catch (error) {
            this.loggerService.error('Erro ao criar o planeta', error.stack)
            if (error instanceof ValidationException) {
                throw new BadRequestException('Solicitação Invalida, verifique às informações');
            } else {
                throw new InternalServerErrorException('Um erro insperado aconteceu enquanto o planeta estava sendo criado')
            }
        }
    }

    @Get()
    @ApiOperation({ summary: 'Recupera todos os planetas' })
    @ApiResponse({ status: 200, description: 'Os planetas foram recuperados com sucesso.', type: [Planet] })
    @ApiResponse({ status: 404, description: 'Nenhum planeta foi encontrado.' })
    @ApiResponse({ status: 500, description: 'Um erro inesperado aconteceu enquanto recuperava os planetas.' })
    async findAll(): Promise<Planet[]> {
        try {
            this.loggerService.log('Buscando todos os planetas')
            const planets = await this.planetService.findAll();
            if (planets.length === 0) {
                throw new NotFoundException('Nenhum planeta foi encontrado.')
            }
            return planets;
        } catch (error) {
            this.loggerService.error('Erro ao buscar os planetas', error.stack)
            throw new InternalServerErrorException('Um erro inesperado aconteceu enquanto recuperava os planetas.')
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Recupera um planeta pelo ID' })
    @ApiParam({ name: 'id', description: 'ID do planeta' })
    @ApiResponse({ status: 200, description: 'O planeta foi recuperado com sucesso.', type: Planet })
    @ApiResponse({ status: 404, description: 'Planeta com o ID especificado não foi encontrado.' })
    @ApiResponse({ status: 500, description: 'Um erro inesperado aconteceu enquanto retornava o planeta.' })
    async findOne(@Param('id') id: number): Promise<Planet> {
        try {
            this.loggerService.log(`Buscando planeta com ID: ${id}`)
            const planet = await this.planetService.findPlanetById(id);
            if (!planet) {
                throw new NotFoundException(`Planeta com o ID: ${id} não encontrado.`)
            }
            return planet;
        } catch (error) {
            this.loggerService.error(`Erro ao buscar planeta`, error.stack)
            if (error instanceof BadRequestException) {
                throw new BadRequestException('Invalid ID format.');
            } else {
                throw new InternalServerErrorException('Um erro inesperado aconteceu enquanto retornava o planeta')
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true}))
    @ApiOperation({ summary: 'Atualiza um planeta pelo ID' })
    @ApiParam({ name: 'id', description: 'ID do planeta' })
    @ApiResponse({ status: 200, description: 'O planeta foi atualizado com sucesso.', type: Planet })
    @ApiResponse({ status: 404, description: 'Planeta com o ID especificado não foi encontrado.' })
    @ApiResponse({ status: 400, description: 'Solicitação inválida ou formato inválido para ID.' })
    @ApiResponse({ status: 500, description: 'Um erro inesperado aconteceu enquanto atualizava o planeta.' })
    async update(@Param('id') id: number, @Body() updatedPlanetDto: Planet): Promise<Planet> {
        try {
            this.loggerService.log(`Atualizando planeta com ID ${id}`);
            const updatedPlanet = await this.planetService.update(id, updatedPlanetDto);
            if (!updatedPlanet) {
                throw new NotFoundException(`Planeta com o ID: ${id} não encontrado.`)
            }
            return updatedPlanet;
        } catch (error) {
            this.loggerService.error('Erro enquanto atualiza o planeta.', error.stack);
            if (error instanceof ValidationException) {
                throw new BadRequestException('Solicitação inválida.')
            } else if (error instanceof BadRequestException) {
                throw new BadRequestException('Formato invalido para ID.')
            } else {
                throw new InternalServerErrorException('Um erro inesperado aconteceu enquanto retornava o planeta.')
            }
        }
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Remove um planeta pelo ID' })
    @ApiParam({ name: 'id', description: 'ID do planeta' })
    @ApiResponse({ status: 200, description: 'O planeta foi removido com sucesso.' })
    @ApiResponse({ status: 404, description: 'Planeta com o ID especificado não foi encontrado.' })
    @ApiResponse({ status: 400, description: 'Formato inválido para ID.' })
    @ApiResponse({ status: 500, description: 'Um erro inesperado aconteceu enquanto removia o planeta.' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        try {
            this.loggerService.log(`Removendo planeta com ID: ${id}`);
            const result = await this.planetService.remove(id);
            if (!result) {
                throw new NotFoundException(`Planeta com o ID: ${id} não encontrado.`);
            }
        } catch (error) {
            this.loggerService.error('Erro enquanto removia o planeta.', error.stack);
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

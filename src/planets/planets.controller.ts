import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, NotFoundException, BadRequestException, InternalServerErrorException, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { Planet } from './planet.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationException } from 'src/exceptions/validation.exception';

@Controller('planets')
export class PlanetsController {
    constructor(private readonly planetService: PlanetsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true}))
    async create(@Body() createPlanetaDto: Planet): Promise<Planet> {
        try {
            return await this.planetService.create(createPlanetaDto);
        } catch (error) {
            if (error instanceof ValidationException) {
                throw new BadRequestException('Solicitação Invalida, verifique às informações');
            } else {
                throw new InternalServerErrorException('Um erro insperado aconteceu enquanto o planeta estava sendo criado')
            }
        }
    }

    @Get()
    async findAll(): Promise<Planet[]> {
        try {
            const planets = await this.planetService.findAll();
            if (planets.length === 0) {
                throw new NotFoundException('Nenhum planeta foi encontrado.')
            }
            return planets;
        } catch (error) {
            throw new InternalServerErrorException('Um erro inesperado aconteceu enquanto recuperava os planetas.')
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Planet> {
        try {
            const planet = await this.planetService.findPlanetById(id);
            if (!planet) {
                throw new NotFoundException(`Planeta com o ID: ${id} não encontrado.`)
            }
            return planet;
        } catch (error) {
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
    async update(@Param('id') id: number, @Body() updatedPlanetDto: Planet): Promise<Planet> {
        try {
            const updatedPlanet = await this.planetService.update(id, updatedPlanetDto);
            if (!updatedPlanet) {
                throw new NotFoundException(`Planeta com o ID: ${id} não encontrado.`)
            }
            return updatedPlanet;
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
    
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        try {
            const result = await this.planetService.remove(id);
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

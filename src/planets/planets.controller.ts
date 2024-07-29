import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { Planet } from './planet.entity';

@Controller('planets')
export class PlanetsController {
    constructor(private readonly planetService: PlanetsService) {}

    @Post()
    create(@Body() createPlanetaDto: Planet): Promise<Planet> {
        return this.planetService.create(createPlanetaDto);
    }

    @Get()
    findAll(): Promise<Planet[]> {
        return this.planetService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Planet> {
        return this.planetService.findPlanetById(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updatedPlanetDto: Planet): Promise<Planet> {
        return this.planetService.update(id, updatedPlanetDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.planetService.remove(id);
    }
}

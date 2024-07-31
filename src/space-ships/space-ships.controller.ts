import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { SpaceShipsService } from './space-ships.service';
import { SpaceShip } from './space-ship.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('spaceships')
export class SpaceShipsController {
    constructor(private readonly spaceshipService: SpaceShipsService) {}

    @Post()
    create(@Body() createSpaceShipaDto: SpaceShip): Promise<SpaceShip> {
        return this.spaceshipService.create(createSpaceShipaDto);
    }

    @Get()
    findAll(): Promise<SpaceShip[]> {
        return this.spaceshipService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<SpaceShip> {
        return this.spaceshipService.findSpaceShipById(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updatedSpaceShipDto: SpaceShip): Promise<SpaceShip> {
        return this.spaceshipService.update(id, updatedSpaceShipDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.spaceshipService.remove(id);
    } 
}

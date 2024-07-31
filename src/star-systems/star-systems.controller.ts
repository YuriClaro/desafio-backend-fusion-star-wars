import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { StarSystemsService } from './star-systems.service';
import { StarSystem } from './star-system.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('star-systems')
export class StarSystemsController {
    constructor(private readonly starSystemService: StarSystemsService) {}

    @Post()
    create(@Body() createStarSystemaDto: StarSystem): Promise<StarSystem> {
        return this.starSystemService.create(createStarSystemaDto);
    }

    @Get()
    findAll(): Promise<StarSystem[]> {
        return this.starSystemService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<StarSystem> {
        return this.starSystemService.findStarSystemById(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updatedStarSystemDto: StarSystem): Promise<StarSystem> {
        return this.starSystemService.update(id, updatedStarSystemDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.starSystemService.remove(id);
    }

}
